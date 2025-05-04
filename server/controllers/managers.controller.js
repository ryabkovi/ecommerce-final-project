import managerModel from "../models/managers.model.js";
import usersModel from "../models/users.model.js";
import { createToken } from "../service/generateToken.js";
import { compare, hash } from "bcrypt";
import transporter from "../service/mailer.js";
import crypto from "crypto";

export default {
  registerManager: async (req, res) => {
    try {
      const { manager_name, manager_password, manager_email } = req.body;

      if (!manager_name || !manager_password || !manager_email)
        throw new Error("All fields required!");

      const manager = await managerModel.create({
        manager_name,
        manager_password,
        manager_email,
      });

      res.status(200).json({
        success: true,
        message: "Manager registered successfully",
        user: manager,
      });
    } catch (error) {
      if (error.code === 11000) error.message = "Email already exists!";
      res.status(401).json({
        success: false,
        message: "Manager registration failed",
        error: error.message,
      });
    }
  },

  loginManager: async (req, res) => {
    try {
      const { manager_password, manager_email } = req.body;

      if (!manager_password || !manager_email)
        throw new Error("All fields required!");

      const manager = await managerModel.findOne({ manager_email });
      if (!manager) throw new Error("User does not exist!");

      const isMatch = await compare(manager_password, manager.manager_password);
      if (!isMatch) throw new Error("Invalid password!");

      const token = createToken({
        id: manager._id,
        permission: manager.permission,
      });

      res.cookie("manager_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      });

      const safeUser = { ...manager.toObject(), manager_password: undefined };

      res.status(200).json({
        success: true,
        message: "Manager login successful",
        user: safeUser,
        token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Manager login failed",
        error: error.message,
      });
    }
  },

  logoutManager: async (req, res) => {
    try {
      res.clearCookie("manager_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const [managers, users] = await Promise.all([
        managerModel.find(),
        usersModel.find(),
      ]);

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: [...managers, ...users],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get users",
        error: error.message,
      });
    }
  },

  updateManager: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedManager = await managerModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedManager) {
        return res
          .status(404)
          .json({ success: false, message: "Manager not found" });
      }

      res.status(200).json({
        success: true,
        message: "Manager updated successfully",
        data: updatedManager,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update manager",
        error: error.message,
      });
    }
  },

  deleteManager: async (req, res) => {
    try {
      const canceled = await managerModel.findByIdAndDelete(req.params.id);
      if (!canceled) {
        return res
          .status(404)
          .json({ success: false, message: "Manager not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Manager canceled", data: canceled });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteAllManagers: async (req, res) => {
    try {
      await managerModel.deleteMany({});
      res.status(200).json({ success: true, message: "All managers canceled" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete all managers",
        error: error.message,
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const refreshPasswordToken = crypto.randomBytes(20).toString("hex");
      const resetToken = crypto
        .createHash("sha256")
        .update(refreshPasswordToken)
        .digest("hex");
      const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

      const manager = await managerModel.findOneAndUpdate(
        { manager_email: email },
        { resetToken, resetTokenExpiry }
      );

      if (!manager) throw new Error("User not found");

      const emailHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="http://localhost:5173/resetPassword?email=${email}&token=${refreshPasswordToken}"
             style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>This link will expire in 10 minutes.</p>
        </div>`;

      await transporter.sendMail({
        from: process.env.MAIL_AUTH_USER,
        to: email,
        subject: "Password Reset Request",
        html: emailHTML,
      });

      res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to send password reset email",
        error: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, token, manager_password } = req.body;
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const manager = await managerModel.findOne({
        manager_email: email,
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: Date.now() },
      });

      if (!manager) throw new Error("Reset token is invalid or expired");

      manager.manager_password = await hash(manager_password, 10);
      manager.resetToken = null;
      manager.resetTokenExpiry = null;
      await manager.save();

      res
        .status(200)
        .json({ success: true, message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to reset password",
        error: error.message,
      });
    }
  },

  authenticateManager: async (req, res) => {
    try {
      const { _id } = req.user;
      const manager = await managerModel
        .findById(_id)
        .select("-manager_password");
      if (!manager) throw new Error("Manager not found");

      res.status(200).json({
        success: true,
        message: "Authentication successful",
        user: manager,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to authenticate",
        error: error.message,
      });
    }
  },
};
