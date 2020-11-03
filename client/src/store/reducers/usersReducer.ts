import { USERS } from '../constants';
import { UsersState, UsersActions } from '../types/usersTypes';
import { UserInfo } from '../../types/UserData';
import User from '../../types/User';

const initialState: UsersState = {
  users: [],
  selectedUser: {
    name: '',
    email: '',
    userId: '',
    posts: [],
  },
  loading: false,
  error: null,
};

const usersReducer = (
  state = initialState,
  { type, payload }: UsersActions,
): UsersState => {
  switch (type) {
    case USERS.GET_USERS:
      return { ...state, loading: true };
    case USERS.GET_SELECTED_USER:
      return { ...state, loading: true };
    case USERS.ADD_POST:
      return { ...state, loading: true };
    case USERS.UPDATE_POST:
      return { ...state, loading: true };
    case USERS.DELETE_POST:
      return { ...state, loading: true };
    case USERS.GIVE_BEER:
      return { ...state, loading: true };
    case USERS.SET_USERS:
      return {
        ...state,
        loading: false,
        error: null,
        users: payload as UserInfo[],
      };
    case USERS.SET_SELECTED_USER:
      return {
        ...state,
        loading: false,
        error: null,
        selectedUser: payload as User,
      };
    case USERS.SET_LOADING:
      return { ...state, loading: payload as boolean };
    case USERS.FAIL:
      return { ...state, loading: false, error: payload as string | null };
    default:
      return state;
  }
};

export default usersReducer;
