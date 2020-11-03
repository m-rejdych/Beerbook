import { put, call, takeEvery } from 'redux-saga/effects';

import { AUTH } from '../constants';
import { setAuthError, setUser } from '../actions';
import { AuthActions, AuthData } from '../types/authTypes';
import {
  postSignup,
  postLogin,
  getAutologin,
} from '../../services/authService';
import { AuthResponse, GetUserResponse } from '../../types/Responses';

function* handleSignup({ payload }: AuthActions) {
  try {
    const { data }: AuthResponse = yield call(postSignup, payload as AuthData);
    const { token, ...rest } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', (Date.now() + 1000 * 60 * 60).toString());
    yield put(setUser(rest));
  } catch (error) {
    yield put(setAuthError(error.message));
  }
}

function* handleLogin({ payload }: AuthActions) {
  try {
    const { data }: AuthResponse = yield call(postLogin, payload as AuthData);
    const { token, ...rest } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', (Date.now() + 1000 * 60 * 60).toString());
    yield put(setUser(rest));
  } catch (error) {
    yield put(setAuthError(error.message));
  }
}

function* handleAutologin({ payload }: AuthActions) {
  try {
    const { data }: GetUserResponse = yield call(
      getAutologin,
      payload as string,
    );
    yield put(setUser(data));
  } catch (error) {
    yield put(setAuthError(error.message));
  }
}

function* setSignup() {
  yield takeEvery(AUTH.SIGNUP, handleSignup);
}

function* setLogin() {
  yield takeEvery(AUTH.LOGIN, handleLogin);
}

function* setGetUser() {
  yield takeEvery(AUTH.AUTOLOGIN, handleAutologin);
}

export { setSignup, setLogin, setGetUser };
