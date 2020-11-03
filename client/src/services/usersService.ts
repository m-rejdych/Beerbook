import axios from 'axios';

import {
  GetUsersResponse,
  GetSelectedUserResponse,
  AddPostResponse,
  MessageResponse,
} from '../types/Responses';
import {
  GetSelectedUserData,
  AddPostData,
  UpdatePostData,
  DeletePostData,
} from '../store/types/usersTypes';
import { API_URI } from '../config';

const fetchUsers = async (token: string): Promise<GetUsersResponse> => {
  try {
    const response: GetUsersResponse = await axios.get(
      `${API_URI}/users/get-users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const fetchSelectedUser = async ({
  token,
  userId,
}: GetSelectedUserData): Promise<GetSelectedUserResponse> => {
  try {
    const response: GetSelectedUserResponse = await axios.get(
      `${API_URI}/users/get-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const createPost = async ({
  token,
  ...rest
}: AddPostData): Promise<AddPostResponse> => {
  try {
    const response: AddPostResponse = await axios.post(
      `${API_URI}/posts/create-post`,
      rest,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePost = async ({
  token,
  ...rest
}: UpdatePostData): Promise<MessageResponse> => {
  try {
    const response: MessageResponse = await axios.put(
      `${API_URI}/posts/update-post`,
      rest,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const deletePost = async ({
  token,
  _id,
}: DeletePostData): Promise<MessageResponse> => {
  try {
    const response: MessageResponse = await axios.delete(
      `${API_URI}/posts/delete-post/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const giveBeer = async ({
  _id,
  token,
}: DeletePostData): Promise<MessageResponse> => {
  try {
    const response = axios.get(`${API_URI}/posts/give-beer/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  fetchUsers,
  fetchSelectedUser,
  createPost,
  updatePost,
  deletePost,
  giveBeer,
};
