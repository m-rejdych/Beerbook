import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';

import { PORT, DB_URI } from './config';
import ErrorType from './types/Error';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import postsRoutes from './routes/posts';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

// @ts-ignore
app.use((error: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode = 500 } = error;
  console.log(error);
  res.status(statusCode).json({ message });
});

connect(DB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT);
});
