import mongoose, { Schema, model } from "mongoose";

const order_schema = new Schema(
  {
    order_number: {
      type: Number,
      unique: true,
    },
    status: {
      type: String,
      enum: ["new", "process", "completed", "canceled"],
      default: "new",
    },
    shipment_address: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      building: {
        type: String,
        required: true,
      },
    },
    total_price: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("Orders", order_schema);
