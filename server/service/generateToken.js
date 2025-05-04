import jwt from "jsonwebtoken";

export function createToken(payload) {
  const tokenPayload = {
    id: payload._id || payload.id,
    permission: payload.permission,
  };

  return jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
