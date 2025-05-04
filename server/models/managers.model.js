import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const managerSchema = new Schema(
  {
    manager_name: {
      type: String,
    },
    manager_email: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true,
    },
    manager_password: {
      type: String,
      required: true,
      minlength: 5,
    },
    permission: {
      type: String,
      default: "Manager",
      enum: ["Admin", "Manager"],
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password only when it's new or modified
managerSchema.pre("save", async function (next) {
  if (!this.isModified("manager_password")) return next();
  this.manager_password = await hash(this.manager_password, 10);
  next();
});

export default model("Managers", managerSchema);
