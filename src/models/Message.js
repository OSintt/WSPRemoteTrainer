import { Schema, model, Types } from 'mongoose';
const MessageSchema = new Schema({
  author: {
    type: Types.ObjectID,
    ref: 'Numbers'
  },
  content: String,
  date: Date
});

export default model('Message', MessageSchema);