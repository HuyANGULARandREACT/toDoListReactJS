import { timeStamp } from "console";

import { text } from "stream/consumers";
import mongoose, { Schema, Document } from "mongoose";
export interface ITodo extends Document {
  text: string;
  completed: boolean;
}
const TodoSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);
export default mongoose.model<ITodo>("Todo", TodoSchema);
