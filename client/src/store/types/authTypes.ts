import { AUTH } from '../constants';
import UserData from '../../types/UserData';

export interface AuthData {
  email: string;
  name?: string;
  password: string;
  confirmPassword?: string;
}

interface SignupAction {
  type: typeof AUTH.SIGNUP;
  payload: AuthData;
}

interface LoginAction {
  type: typeof AUTH.LOGIN;
  payload: AuthData;
}

interface AutologinAction {
  type: typeof AUTH.AUTOLOGIN;
  payload: string;
}

interface SetUserAction {
  type: typeof AUTH.SET_USER;
  payload: UserData;
}

interface SetAuthErrorAction {
  type: typeof AUTH.FAIL;
  payload: string | null;
}

export interface AuthState {
  loading: boolean;
  name: string;
  userId: string;
  error: string | null;
}

export type AuthActions =
  | SignupAction
  | LoginAction
  | AutologinAction
  | SetUserAction
  | SetAuthErrorAction;
