import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { USER_SECRET } from '../config';
import ExtendedRequest from '../types/Request';
import ErrorType from '../types/Error';

const isAuth = (
  req: ExtendedRequest,
  // @ts-ignore
  res: Response,
  next: NextFunction,
): void => {
  const token = req.get('Authorization')?.split(' ')[1];
  if (!token) {
    const error: ErrorType = new Error('Token not found!');
    error.statusCode = 403;
    throw error;
  }
  try {
    const decodedToken = verify(token, USER_SECRET as string);
    const { userId } = decodedToken as { userId: string };
    req.userId = userId;
    next();
  } catch (error) {
    error.statusCode = 403;
    let errorMessage: string;
    switch (error.message) {
      case 'jwt malformed':
        errorMessage = 'Nice try ⛔️';
        break;
      case 'jwt expired':
        errorMessage = 'Timed out!';
        break;
      default:
        errorMessage = 'Authentication failed!';
    }
    error.message = errorMessage;
    next(error);
  }
};

export default isAuth;
