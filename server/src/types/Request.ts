import { Request } from 'express';

export default interface ExtendedResponse extends Request {
  userId?: string;
}
