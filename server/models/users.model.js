import { Schema, model } from "mongoose";
import { hash } from "bcrypt";
import { nanoid } from "nanoid";

const user_schema = new Schema(
  {
    user_firstName: {
      type: String,
      required: true,
      trim: true,
    },
    user_lastName: {
      type: String,
      required: true,
      trim: true,
    },
    user_phone: {
      type: String,
      trim: true,
    },
    user_birthDate: {
      type: Date,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    user_password: {
      type: String,
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    permission: {
      type: String,
      enum: ["Admin", "Manager", "Regular"],
      default: "Regular",
    },
    SignUpProvider: {
      type: String,
      default: "Credential",
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: nanoid,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal"],
      default: undefined,
    },
    shipment_address: {
      country: String,
      city: String,
      street: String,
      building: String,
      floor: String,
      zipCode: String,
      apartment: String,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

user_schema.pre("validate", function (next) {
  if (!this.SignUpProvider || this.SignUpProvider === "Credential") {
    if (!this.user_password) {
      this.invalidate("user_password", "Password is required");
    }
    if (!this.user_phone) {
      this.invalidate("user_phone", "Phone number is required");
    }
  }
  next();
});

user_schema.pre("save", async function (next) {
  if (
    this.isModified("user_password") &&
    !this.user_password.startsWith("$2b$")
  ) {
    this.user_password = await hash(this.user_password, 10);
  }
  next();
});

export default model("Users", user_schema);
