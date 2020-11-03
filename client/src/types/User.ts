import Post from './Post';

export default interface User {
  email: string;
  name: string;
  userId: string;
  posts: Post[];
}
