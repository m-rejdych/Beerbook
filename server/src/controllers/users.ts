import { Response, NextFunction } from 'express';

import ExtendedRequest from '../types/Request';
import User from '../models/User';
import ErrorType from '../types/Error';

const getUsers = async (
  // @ts-ignore
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await User.find().select('name email');
    console.log(users.map(({ _id, ...rest }) => ({ _id, ...rest })));
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .select('-password -__v')
      .populate('posts');
    if (!user) {
      const error: ErrorType = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser };
