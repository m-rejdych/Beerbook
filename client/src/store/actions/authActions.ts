import { AUTH } from '../constants';
import { AuthActions, AuthData } from '../types/authTypes';
import UserData from '../../types/UserData';

const signup = (data: AuthData): AuthActions => ({
  type: AUTH.SIGNUP,
  payload: data,
});

const login = (data: AuthData): AuthActions => ({
  type: AUTH.LOGIN,
  payload: data,
});

const autologin = (token: string): AuthActions => ({
  type: AUTH.AUTOLOGIN,
  payload: token,
});

const setUser = (userData: UserData): AuthActions => ({
  type: AUTH.SET_USER,
  payload: userData,
});

const setAuthError = (error: string | null): AuthActions => ({
  type: AUTH.FAIL,
  payload: error,
});

export { signup, login, setUser, setAuthError, autologin };
