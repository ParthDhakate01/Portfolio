import mongoose from "mongoose";
const { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notification: {
    type: Number,
  },
  start: {
    type: Date,
    required: true,
  },

  end: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
  },

  color: {
    type: String,
  },

  repeatDays: {
    type: [Number],
  },
});
export const Event = mongoose.model("Event", EventSchema);
