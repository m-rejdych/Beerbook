import axios from 'axios';

import { API_URI } from '../config';
import { AuthResponse, GetUserResponse } from '../types/Responses';
import { AuthData } from '../store/types/authTypes';

const postSignup = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response: AuthResponse = await axios.post(
      `${API_URI}/auth/signup`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const postLogin = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response: AuthResponse = await axios.post(
      `${API_URI}/auth/login`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const getAutologin = async (token: string): Promise<GetUserResponse> => {
  try {
    const response: GetUserResponse = await axios.get(
      `${API_URI}/auth/autologin`,
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

export { postSignup, postLogin, getAutologin };
