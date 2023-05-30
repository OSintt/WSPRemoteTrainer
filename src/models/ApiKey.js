import { Schema, model } from 'mongoose';

const KeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('ApiKey', KeySchema);