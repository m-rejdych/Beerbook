import { put, call, takeEvery, select } from 'redux-saga/effects';

import { USERS } from '../constants';
import {
  setSelectedUser,
  setUsers,
  setUsersError,
  setLoading,
} from '../actions';
import {
  UsersActions,
  GetSelectedUserData,
  AddPostData,
  UpdatePostData,
  DeletePostData,
} from '../types/usersTypes';
import { RootState } from '../reducers';
import {
  GetUsersResponse,
  GetSelectedUserResponse,
  AddPostResponse,
} from '../../types/Responses';
import {
  fetchUsers,
  fetchSelectedUser,
  createPost,
  updatePost,
  deletePost,
  giveBeer,
} from '../../services/usersService';
import User from '../../types/User';

function* handleGetUsers({ payload }: UsersActions) {
  try {
    const response: GetUsersResponse = yield call(
      fetchUsers,
      payload as string,
    );
    const users = response.data.map(({ _id, ...rest }) => ({
      ...rest,
      userId: _id,
    }));
    yield put(setUsers(users));
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* handleGetSelectedUser({ payload }: UsersActions) {
  try {
    const { token, userId } = payload as GetSelectedUserData;
    const response: GetSelectedUserResponse = yield call(fetchSelectedUser, {
      token,
      userId,
    });
    const { _id, ...rest } = response.data;
    yield put(setSelectedUser({ ...rest, userId: _id }));
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* handleAddPost({ payload }: UsersActions) {
  try {
    const response: AddPostResponse = yield call(
      createPost,
      payload as AddPostData,
    );
    const userId: string = yield select(
      (state: RootState) => state.auth.userId,
    );
    const selectedUser: User = yield select(
      (state: RootState) => state.users.selectedUser,
    );
    if (userId === selectedUser.userId) {
      yield put(
        setSelectedUser({
          ...selectedUser,
          posts: [...selectedUser.posts, response.data],
        }),
      );
    } else yield put(setLoading(false));
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* handleUpdatePost({ payload }: UsersActions) {
  try {
    yield call(updatePost, payload as UpdatePostData);
    const selectedUser: User = yield select(
      (state: RootState) => state.users.selectedUser,
    );
    const { token, ...rest } = payload as UpdatePostData;
    yield put(
      setSelectedUser({
        ...selectedUser,
        posts: selectedUser.posts.map((post) =>
          post._id === rest._id ? { ...post, ...rest } : post,
        ),
      }),
    );
    yield put(setLoading(false));
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* handleDeletePost({ payload }: UsersActions) {
  try {
    yield call(deletePost, payload as DeletePostData);
    const selectedUser: User = yield select(
      (state: RootState) => state.users.selectedUser,
    );
    yield put(
      setSelectedUser({
        ...selectedUser,
        posts: selectedUser.posts.filter(
          ({ _id }) => _id !== (payload as DeletePostData)._id,
        ),
      }),
    );
    yield put(setLoading(false));
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* handleGiveBeer({ payload }: UsersActions) {
  try {
    yield call(giveBeer, payload as DeletePostData);
    const selectedUser: User = yield select(
      (state: RootState) => state.users.selectedUser,
    );
    const { _id } = payload as DeletePostData;
    yield put(
      setSelectedUser({
        ...selectedUser,
        posts: selectedUser.posts.map((post) =>
          post._id === _id ? { ...post, beers: post.beers + 1 } : post,
        ),
      }),
    );
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* setGetUsers() {
  yield takeEvery(USERS.GET_USERS, handleGetUsers);
}

function* setGetSelectedUser() {
  yield takeEvery(USERS.GET_SELECTED_USER, handleGetSelectedUser);
}

function* setAddPost() {
  yield takeEvery(USERS.ADD_POST, handleAddPost);
}

function* setUpdatePost() {
  yield takeEvery(USERS.UPDATE_POST, handleUpdatePost);
}

function* setDeletePost() {
  yield takeEvery(USERS.DELETE_POST, handleDeletePost);
}

function* setGiveBeer() {
  yield takeEvery(USERS.GIVE_BEER, handleGiveBeer);
}

export {
  setGetUsers,
  setGetSelectedUser,
  setAddPost,
  setUpdatePost,
  setDeletePost,
  setGiveBeer,
};
