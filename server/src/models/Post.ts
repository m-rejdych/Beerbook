import { Schema, model, Document } from 'mongoose';

interface PostType extends Document {
  user: typeof Schema.Types.ObjectId;
  title: string;
  content: string;
  beers: number;
}

const postSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  beers: {
    type: Number,
    required: true,
  },
});

export default model<PostType>('Post', postSchema);
