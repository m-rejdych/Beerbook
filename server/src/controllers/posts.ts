import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import ExtendedRequest from '../types/Request';
import ErrorType from '../types/Error';
import User from '../models/User';
import Post from '../models/Post';

interface PostData {
  title: string;
  content: string;
  beers: number;
  _id?: string;
}

const createPost = async (
  req: ExtendedRequest,
  // @ts-ignore
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
          .join(' '),
      );
      error.statusCode = 422;
      throw error;
    }
    const { userId } = req;
    const { title, content, beers }: PostData = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error: ErrorType = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }
    const post = new Post({
      user: req.userId,
      title,
      content,
      beers,
    });
    await post.save();
    user.posts = [...user.posts, post._id];
    await user.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (
  req: ExtendedRequest,
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
          .join(' '),
      );
      error.statusCode = 422;
      throw error;
    }
    const { userId } = req;
    const { title, content, beers, _id }: PostData = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error: ErrorType = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }
    const post = await Post.findById(_id);
    if (!post) {
      const error: ErrorType = new Error('Post not found!');
      error.statusCode = 404;
      throw error;
    }
    if (post.user.toString() !== userId?.toString()) {
      const error: ErrorType = new Error('Access denied!');
      error.statusCode = 403;
      throw error;
    }
    post.title = title;
    post.content = content;
    post.beers = beers;
    await post.save();
    res.status(200).json({ message: 'Post successfully updated!' });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      const error: ErrorType = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }
    const post = await Post.findById(postId);
    if (!post) {
      const error: ErrorType = new Error('Post not found!');
      error.statusCode = 404;
      throw error;
    }
    if (post.user.toString() !== userId?.toString()) {
      const error: ErrorType = new Error('Access denied!');
      error.statusCode = 403;
      throw error;
    }
    await Post.findByIdAndDelete(postId);
    user.posts = user.posts.filter((id) => id.toString() !== postId.toString());
    await user.save();
    res.status(200).json({ message: 'Post successfully deleted!' });
  } catch (error) {
    next(error);
  }
};

const giveBeer = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      const error: ErrorType = new Error('Post not found!');
      error.statusCode = 404;
      throw error;
    }
    post.beers = post.beers + 1;
    await post.save();
    res.status(200).json({ message: 'Beer delivered! 🍻' });
  } catch (error) {
    next(error);
  }
};

export { createPost, updatePost, deletePost, giveBeer };
