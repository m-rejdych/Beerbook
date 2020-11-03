import { all } from 'redux-saga/effects';

import { setSignup, setLogin, setGetUser } from './authSaga';
import {
  setGetUsers,
  setGetSelectedUser,
  setAddPost,
  setUpdatePost,
  setDeletePost,
  setGiveBeer,
} from './usersSaga';

function* rootSaga() {
  yield all([
    setSignup(),
    setLogin(),
    setGetUser(),
    setGetUsers(),
    setGetSelectedUser(),
    setAddPost(),
    setUpdatePost(),
    setDeletePost(),
    setGiveBeer(),
  ]);
}

export default rootSaga;
