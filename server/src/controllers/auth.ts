import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import ErrorType from '../types/Error';
import ExtendedRequest from '../types/Request';
import { LoginData, SignupData } from '../types/Auth';
import { USER_SECRET } from '../config';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: ErrorType = new Error(
        errors
          .array()
          .map(({ msg }) => msg)
          .join('\n'),
      );
      error.statusCode = 422;
      throw error;
    }
    const { email, name, password }: SignupData = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const error: ErrorType = new Error('This email is already in use!');
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await hash(password, 12);
    const user = await new User({ email, name, password: hashedPassword });
    await user.save();
    const token = sign({ userId: user._id, email }, USER_SECRET as string, {
      expiresIn: '1h',
    });
    res.status(201).json({
      token,
      userId: user._id,
      name,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: ErrorType = new Error(
        errors
          .array()
          .map(({ msg }) => msg)
          .join('\n'),
      );
      error.statusCode = 422;
      throw error;
    }
    const { email, password }: LoginData = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error: ErrorType = new Error('User not found!');
      error.statusCode = 401;
      throw error;
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      const error: ErrorType = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = sign(
      { email: user.email, userId: user._id },
      USER_SECRET as string,
      { expiresIn: '1h' },
    );
    res.status(200).json({
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};

const autologin = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      const error: ErrorType = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }
    const { name } = user;
    res.json({ name, userId });
  } catch (error) {
    next(error);
  }
};

export { signup, login, autologin };
