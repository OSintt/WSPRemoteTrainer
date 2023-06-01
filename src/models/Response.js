import { Schema, model } from 'mongoose';
const ResponseSchema = new Schema({
  content: String,
});

export default model('Response', ResponseSchema);