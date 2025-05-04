import jwt from "jsonwebtoken";
import { createToken } from "../service/generateToken.js";

function protectManager(req, res, next) {
  try {
    const token = req.cookies.manager_token;
    if (!token) throw new Error("Token not exist");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, permission, exp } = decoded;

    if (!id || !permission) throw new Error("Invalid token payload");
    if (permission !== "Manager" && permission !== "Admin") {
      throw new Error("Unauthorized: Manager/Admin only");
    }

    req.user = { _id: id, permission };

    const now = Math.floor(Date.now() / 1000);
    const tenMinutes = 10 * 60;

    if (exp - now < tenMinutes) {
      const refreshedToken = createToken({ id, permission });
      res.cookie("manager_token", refreshedToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000,
      });
    }

    next();
  } catch (error) {
    console.log("\u274C protectManager error:", error.message);
    return res.status(401).json({ success: false, error: error.message });
  }
}

export default protectManager;
