import mongoose, { Schema, model } from "mongoose";

const product_schema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    product_description: {
      type: String,
      default: "",
    },
    product_image: {
      type: String,
      default: "",
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_color: {
      type: String,
      default: "",
    },
    product_title: {
      type: String,
      default: "",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
      },
    ],
  },
  { timestamps: true }
);

export default model("Products", product_schema);
