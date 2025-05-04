import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String },
  },
  { timestamps: true }
);

export default model("Feedback", feedbackSchema);
