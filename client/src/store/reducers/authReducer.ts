import { AUTH } from '../constants';
import { AuthActions, AuthState } from '../types/authTypes';
import UserData from '../../types/UserData';

const initialState: AuthState = {
  name: '',
  userId: '',
  loading: false,
  error: null,
};

const authReducer = (
  state = initialState,
  { type, payload }: AuthActions,
): AuthState => {
  switch (type) {
    case AUTH.SIGNUP:
      return { ...state, loading: true };
    case AUTH.LOGIN:
      return { ...state, loading: true };
    case AUTH.AUTOLOGIN:
      return { ...state, loading: true };
    case AUTH.SET_USER:
      return {
        ...state,
        loading: false,
        error: null,
        ...(payload as UserData),
      };
    case AUTH.FAIL:
      return { ...state, loading: false, error: payload as string };
    default:
      return state;
  }
};

export default authReducer;
