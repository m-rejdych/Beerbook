import { Router } from 'express';
import { body } from 'express-validator';

import isAuth from '../middleware/isAuth';
import {
  createPost,
  updatePost,
  deletePost,
  giveBeer,
} from '../controllers/posts';

const router = Router();

router.post(
  '/create-post',
  isAuth,
  [
    body('title', 'Title can not be empty!').trim().notEmpty(),
    body('content', 'Content can not be empty!').trim().notEmpty(),
    body('beers', 'Number of beers must be of type number!').isNumeric(),
  ],
  createPost,
);

router.put(
  '/update-post',
  isAuth,
  [
    body('title', 'Title can not be empty!').trim().notEmpty(),
    body('content', 'Content can not be empty!').trim().notEmpty(),
    body('beers', 'Number of beers must be of type number!').isNumeric(),
  ],
  updatePost,
);

router.get('/give-beer/:postId', isAuth, giveBeer);

router.delete('/delete-post/:postId', isAuth, deletePost);

export default router;
