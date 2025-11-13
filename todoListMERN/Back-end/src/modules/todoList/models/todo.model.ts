import { timeStamp } from "console";

import { text } from "stream/consumers";
import mongoose, { Schema, Document } from "mongoose";
export interface ITodo extends Document {
  text: string;
  completed: boolean;
  deadLine: Date;
}
const TodoSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    deadLine: {type: Date }
  },
  { timestamps: true }
);
export default mongoose.model<ITodo>("Todo", TodoSchema);
