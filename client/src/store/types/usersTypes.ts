import { USERS } from '../constants';

import { UserInfo } from '../../types/UserData';
import User from '../../types/User';

export interface GetSelectedUserData {
  token: string;
  userId: string;
}

export interface AddPostData {
  title: string;
  content: string;
  beers: number;
  token: string;
}

export interface DeletePostData {
  _id: string;
  token: string;
}

export interface UpdatePostData extends AddPostData {
  _id: string;
}

interface GetUsersAction {
  type: typeof USERS.GET_USERS;
  payload: string;
}

interface GetSelectedUserAction {
  type: typeof USERS.GET_SELECTED_USER;
  payload: GetSelectedUserData;
}

interface AddPostAction {
  type: typeof USERS.ADD_POST;
  payload: AddPostData;
}

interface UpdatePostAction {
  type: typeof USERS.UPDATE_POST;
  payload: UpdatePostData;
}

interface DeletePostAction {
  type: typeof USERS.DELETE_POST;
  payload: DeletePostData;
}

interface GiveBeerAction {
  type: typeof USERS.GIVE_BEER;
  payload: DeletePostData;
}

interface SetUsersAction {
  type: typeof USERS.SET_USERS;
  payload: UserInfo[];
}

interface SetSelectedUserAction {
  type: typeof USERS.SET_SELECTED_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof USERS.SET_LOADING;
  payload: boolean;
}

interface SetUsersError {
  type: typeof USERS.FAIL;
  payload: string | null;
}

export interface UsersState {
  users: UserInfo[];
  selectedUser: User;
  error: null | string;
  loading: boolean;
}

export type UsersActions =
  | GetUsersAction
  | GetSelectedUserAction
  | SetUsersAction
  | AddPostAction
  | UpdatePostAction
  | DeletePostAction
  | GiveBeerAction
  | SetSelectedUserAction
  | SetLoadingAction
  | SetUsersError;
