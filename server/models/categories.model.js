import { Schema, model } from "mongoose";

const category_schema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    category_image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default model("Categories", category_schema);
