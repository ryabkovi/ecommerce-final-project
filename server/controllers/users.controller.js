import userModel from "../models/users.model.js";
import managersModel from "../models/managers.model.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../service/generateToken.js";
import transporter from "../service/mailer.js";
import { OAuth2Client } from "google-auth-library";
import { nanoid } from "nanoid";
import { createHash } from "node:crypto";
import mongoose from "mongoose";
import productModel from "../models/products.model.js";
import orderModel from "../models/orders.model.js";

export default {
  register: async (req, res) => {
    try {
      const {
        user_firstName,
        user_lastName,
        user_phone,
        user_birthDate,
        user_password,
        user_email,
        shipment_address,
      } = req.body;

      if (
        !user_firstName ||
        !user_lastName ||
        !user_phone ||
        !user_birthDate ||
        !user_password ||
        !user_email
      ) {
        throw new Error("All fields are required!");
      }

      const existing = await userModel.findOne({ user_email });
      if (existing) throw new Error("Email already exists!");

      const hashedPassword = await hash(user_password, 10);

      const newUser = new userModel({
        user_firstName,
        user_lastName,
        user_phone,
        user_birthDate,
        user_email,
        user_password: hashedPassword,
        shipment_address,
      });

      await newUser.save();

      const token = createToken({
        _id: newUser._id,
        permission: newUser.permission || "Regular",
      });

      res.cookie("user_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const emailHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>Verify Your Email</h2>
          <p>Hello ${user_firstName},</p>
          <p>Please verify your email by clicking the button below:</p>
          <a href="${
            import.meta.env.VITE_API_BASE_URL
          }/users/verify-email?email=${user_email}&token=${
        newUser.verificationToken
      }"
             style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </div>`;

      await transporter.sendMail({
        from: process.env.MAIL_AUTH_USER,
        to: user_email,
        subject: "Verify Email",
        html: emailHTML,
      });

      res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          user_email: newUser.user_email,
          user_firstName: newUser.user_firstName,
          verifyEmail: newUser.verifyEmail,
        },
        token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to register user",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { user_password, user_email } = req.body;
      if (!user_password || !user_email)
        throw new Error("All fields are required!");

      const user = await userModel.findOne({ user_email });
      if (!user) throw new Error("User does not exist!");

      const isMatch = await compare(user_password, user.user_password);
      if (!isMatch) throw new Error("Invalid password!");

      const token = createToken({
        _id: user._id,
        permission: user.permission || "Regular",
      });

      res.cookie("user_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to login",
        error: error.message,
      });
    }
  },

  authenticate: async (req, res) => {
    try {
      const { _id, permission } = req.user;

      const user =
        permission === "Manager" || permission === "Admin"
          ? await managersModel.findById(_id).select("-manager_password")
          : await userModel.findById(_id).select("-user_password").populate({
              path: "favorites",
              select:
                "product_name product_image product_price product_color product_description",
            });

      if (!user) throw new Error("User not found");

      const plainUser = user.toObject();
      if (plainUser.user_phone === "GoogleSignUp") {
        plainUser.user_phone = "";
      }

      res.status(200).json({
        success: true,
        message: "Authentication successful",
        user: plainUser,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to authenticate",
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("user_token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to logout",
        error: error.message,
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { shipment_address, ...rest } = req.body;

      const updateData = {
        $set: {
          ...(shipment_address && {
            "shipment_address.country": shipment_address?.country || "",
            "shipment_address.city": shipment_address?.city || "",
            "shipment_address.street": shipment_address?.street || "",
            "shipment_address.building": shipment_address?.building || "",
            "shipment_address.floor": shipment_address?.floor || "",
            "shipment_address.zipCode": shipment_address?.zipCode || "",
            "shipment_address.apartment": shipment_address?.apartment || "",
          }),
          gender: rest.gender || "Other",
          ...rest,
        },
      };

      const user = await userModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      const token = createToken(user.toObject());

      res.cookie("user_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleted = await userModel.findByIdAndDelete(req.params.id);
      if (!deleted)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      res
        .status(200)
        .json({ success: true, message: "User deleted", data: deleted });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteUserAndData: async (req, res) => {
    try {
      const userId = req.user._id;

      await orderModel.deleteMany({ user: userId });

      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.clearCookie("user_token");

      res.status(200).json({
        success: true,
        message: "User and all related data deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete user and data",
        error: error.message,
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_password, new_password, confirm_password } = req.body;

      if (!user_password || !new_password || !confirm_password)
        throw new Error("All fields are required");
      if (new_password !== confirm_password)
        throw new Error("Passwords do not match");

      const user = await userModel.findById(id);
      if (!user) throw new Error("User not found");

      const isMatch = await compare(user_password, user.user_password);
      if (!isMatch) throw new Error("Incorrect current password");

      user.user_password = new_password;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to update password",
        error: error.message,
      });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, token } = req.query;

      const user = await userModel.updateOne(
        { user_email: email, verificationToken: token },
        { $set: { verificationToken: null, verifyEmail: true } }
      );

      if (!user.matchedCount) throw new Error("Verification failed");

      res.send("Verification successful");
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to verify email",
        error: error.message,
      });
    }
  },

  reportUser: async (req, res) => {
    try {
      const users = await userModel.find();
      const totalUserCreated = users.length;
      res.status(200).json({ success: true, totalUserCreated });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to generate report",
        error: error.message,
      });
    }
  },

  signWithGoogle: async (req, res) => {
    try {
      const { token } = req.body;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, given_name, family_name } = payload;

      if (!email) throw new Error("No email from Google");

      let user = await userModel.findOne({ user_email: email });

      if (!user) {
        user = new userModel({
          user_email: email,
          user_firstName: given_name,
          user_lastName: family_name,
          verifyEmail: true,
          SignUpProvider: "Google",
        });

        await user.save({ validateBeforeSave: false });
      }

      const tokenJwt = createToken({
        _id: user._id,
        permission: user.permission || "Regular",
      });

      res.cookie("user_token", tokenJwt, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const sanitizedUser = { ...user.toObject() };
      if (sanitizedUser.user_phone === "GoogleSignUp") {
        sanitizedUser.user_phone = "";
      }

      res.status(200).json({
        success: true,
        message: "Google sign-in successful",
        user: sanitizedUser,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to sign in with Google",
        error: error.message,
      });
    }
  },

  forgotPasswordUser: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) throw new Error("Email is required");

      const user = await userModel.findOne({ user_email: email });
      if (!user) throw new Error("User not found");

      const rawToken = nanoid(32);
      const hashedToken = createHash("sha256").update(rawToken).digest("hex");

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 1000 * 60 * 30;
      await user.save();

      const resetLink = `http://localhost:5173/reset-password-confirm?email=${email}&token=${rawToken}`;

      const emailHTML = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Reset Your Password</h2>
        <p>Hello ${user.user_firstName},</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>This link will expire in 30 minutes.</p>
      </div>`;

      await transporter.sendMail({
        to: email,
        from: process.env.MAIL_AUTH_USER,
        subject: "Reset Your Password",
        html: emailHTML,
      });

      res.status(200).json({ success: true, message: "Reset link sent" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  resetPasswordUser: async (req, res) => {
    try {
      const { email, token, new_password, confirm_password } = req.body;

      if (!email || !token || !new_password || !confirm_password)
        throw new Error("All fields are required");
      if (new_password !== confirm_password)
        throw new Error("Passwords do not match");

      const hashedToken = createHash("sha256").update(token).digest("hex");

      const user = await userModel.findOne({
        user_email: email,
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) throw new Error("Invalid or expired reset token");

      user.user_password = await hash(new_password, 10);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Password reset successful" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  toggleFavorite: async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid productId" });
      }

      const user = await userModel.findById(userId);
      if (!user) throw new Error("User not found");

      const isFavorite = user.favorites.includes(productId);

      if (isFavorite) {
        user.favorites.pull(productId);
      } else {
        user.favorites.push(productId);
      }

      await user.save();

      const favoriteProducts = await productModel.find({
        _id: { $in: user.favorites },
      });

      res.status(200).json({ success: true, favorites: favoriteProducts });
    } catch (error) {
      console.error("toggleFavorite error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
  mergeFavorites: async (req, res) => {
    try {
      const { localFavorites } = req.body;
      const userId = req.user._id;

      const user = await userModel.findById(userId);
      if (!user) throw new Error("User not found");

      const mergedFavorites = Array.from(
        new Set([
          ...user.favorites.map((fav) => fav.toString()),
          ...localFavorites,
        ])
      );

      user.favorites = mergedFavorites;
      await user.save();

      res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
