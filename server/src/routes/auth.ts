import { Router } from 'express';
import { body } from 'express-validator';

import { login, signup, autologin } from '../controllers/auth';
import isAuth from '../middleware/isAuth';

const router = Router();

router.post(
  '/signup',
  [
    body('email', 'Invalid email!').isEmail().normalizeEmail(),
    body('name', 'Name should be at least 2 characters long!')
      .trim()
      .isLength({ min: 2 }),
    body('password').custom((value) => {
      if (!/^(?=.*\d).{4,8}$/.test(value))
        throw new Error(
          'Password should be at least 4 characters long and contain at least one number!',
        );
      return true;
    }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('Passwords must match each other!');
      return true;
    }),
  ],
  signup,
);

router.post(
  '/login',
  [body('email', 'Invalid email!').isEmail().normalizeEmail()],
  login,
);

router.get('/autologin', isAuth, autologin);

export default router;
