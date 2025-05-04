import jwt from "jsonwebtoken";
import { createToken } from "../service/generateToken.js";

function validateToken(req, res, next) {
  try {
    const userToken = req.cookies.user_token;
    const managerToken = req.cookies.manager_token;

    const token = userToken || managerToken;
    if (!token) throw new Error("Token not found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id || decoded.id;
    const permission = decoded.permission;

    if (!userId || !permission) throw new Error("Invalid token payload");

    req.user = { _id: userId, permission };

    const newToken = createToken({ id: userId, permission });

    if (permission === "Manager" || permission === "Admin") {
      res.cookie("manager_token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000,
      });
    } else {
      res.cookie("user_token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
}

export default validateToken;
