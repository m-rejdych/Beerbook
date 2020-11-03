import { combineReducers } from 'redux';

import { AuthState } from '../types/authTypes';
import { UsersState } from '../types/usersTypes';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

export interface RootState {
  auth: AuthState;
  users: UsersState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
