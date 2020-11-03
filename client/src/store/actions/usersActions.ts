import { USERS } from '../constants';
import {
  UsersActions,
  GetSelectedUserData,
  AddPostData,
  UpdatePostData,
  DeletePostData,
} from '../types/usersTypes';
import { UserInfo } from '../../types/UserData';
import User from '../../types/User';

const getUsers = (token: string): UsersActions => ({
  type: USERS.GET_USERS,
  payload: token,
});

const getSelectedUser = (data: GetSelectedUserData): UsersActions => ({
  type: USERS.GET_SELECTED_USER,
  payload: data,
});

const addPost = (postData: AddPostData): UsersActions => ({
  type: USERS.ADD_POST,
  payload: postData,
});

const updatePost = (postData: UpdatePostData): UsersActions => ({
  type: USERS.UPDATE_POST,
  payload: postData,
});

const deletePost = (data: DeletePostData): UsersActions => ({
  type: USERS.DELETE_POST,
  payload: data,
});

const giveBeer = (data: DeletePostData): UsersActions => ({
  type: USERS.GIVE_BEER,
  payload: data,
});

const setUsers = (users: UserInfo[]): UsersActions => ({
  type: USERS.SET_USERS,
  payload: users,
});

const setSelectedUser = (user: User): UsersActions => ({
  type: USERS.SET_SELECTED_USER,
  payload: user,
});

const setLoading = (isLoading: boolean): UsersActions => ({
  type: USERS.SET_LOADING,
  payload: isLoading,
});

const setUsersError = (error: string | null): UsersActions => ({
  type: USERS.FAIL,
  payload: error,
});

export {
  getUsers,
  getSelectedUser,
  addPost,
  updatePost,
  deletePost,
  giveBeer,
  setUsers,
  setSelectedUser,
  setLoading,
  setUsersError,
};
