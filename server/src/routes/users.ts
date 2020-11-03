import { Router } from 'express';

import isAuth from '../middleware/isAuth';
import { getUsers, getUser } from '../controllers/users';

const router = Router();

router.get('/get-users', isAuth, getUsers);

router.get('/get-user/:userId', isAuth, getUser);

export default router;
