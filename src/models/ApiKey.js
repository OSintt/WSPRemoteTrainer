import { Schema, model } from 'mongoose';

const KeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    start: Number,
    finish: Number
  }
});

export default model('ApiKey', KeySchema);