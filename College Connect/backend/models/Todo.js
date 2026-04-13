import mongoose from "mongoose";
const { Schema } = mongoose;

const TodoSchema = new Schema({
  id: String,
  text: String,
  IsCompleted: Boolean,
});
export const Todo = mongoose.model("Todo", TodoSchema);
