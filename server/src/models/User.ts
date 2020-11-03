import { Schema, model, Document } from 'mongoose';

export interface UserType extends Document {
  email: string;
  name: string;
  password: string;
  posts: typeof Schema.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export default model<UserType>('User', userSchema);
