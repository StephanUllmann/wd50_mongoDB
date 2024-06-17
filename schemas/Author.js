import { Schema, model } from 'mongoose';

const AuthorSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
      },
      message: 'Please provide avalid email address.',
    },
  },
  image: {
    type: String,
    default: 'default.jpeg',
    match: [
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
      "Please provide a proper URL for the Author's image",
    ],
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }],
});

export default model('Author', AuthorSchema);
