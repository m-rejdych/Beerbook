import UserData, { UserInfo } from './UserData';
import User from './User';
import Post from './Post';

export interface ErrorType {
  message: string;
  statusCode: number;
  data?: object;
}

export interface AuthResponse {
  data: {
    token: string;
    name: string;
    userId: string;
  };
}

export interface GetUserResponse {
  data: UserData;
}

export interface GetUsersResponse {
  data: {
    name: string;
    email: string;
    _id: string;
  }[];
}

export interface GetSelectedUserResponse {
  data: {
    name: string;
    email: string;
    _id: string;
    posts: Post[];
  };
}

export interface AddPostResponse {
  data: Post;
}

export interface MessageResponse {
  data: {
    message: string;
  };
}
