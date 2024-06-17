import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
});

BlogPostSchema.index({ title: 'text', content: 'text' });

export default model('BlogPost', BlogPostSchema);
