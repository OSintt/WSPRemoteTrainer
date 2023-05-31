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
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
    },
  ],
  n: {
    required: true,
    unique: true,
    type: Number,
  },
});

export default model("Bot", BotSchema);
