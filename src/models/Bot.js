import { Schema, model, Types } from "mongoose";

const BotSchema = new Schema({
  l_active: {
    type: Boolean,
    default: false,
  },
  t_active: {
    type: Boolean,
    default: false,
  },
  instance_id: {
    unique: true,
    type: String,
    required: true,
  },
  api_key: {
    unique: true,
    type: String,
    required: true
  },
  group_id: {
    type: String,
    default: '120363139133672481@g.us'
  },
  phone: {
    type: String,
    unique: true
  },
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
    },
  ],
  numbers: [
    {
      type: Types.ObjectId,
      ref: "Number",
    },
  ],
});

export default model("Robot", BotSchema);
