import { Router } from "express";
import queries from "../controllers/users.controller.js";
import queriesManager from "../controllers/managers.controller.js";
import validateToken from "../middleware/validateToken.middleware.js";

const {
  register,
  login,
  authenticate,
  logout,
  updateProfile,
  verifyEmail,
  reportUser,
  signWithGoogle,
  changePassword,
  deleteUser,
  forgotPasswordUser,
  resetPasswordUser,
  toggleFavorite,
  mergeFavorites,
  deleteUserAndData,
} = queries;

const {
  registerManager,
  loginManager,
  getAllUsers,
  forgotPassword,
  resetPassword,
  updateManager,
  deleteAllManagers,
  deleteManager,
  authenticateManager,
  logoutManager,
} = queriesManager;

const router = Router();

// User Routes
router.post("/register", register);
router.post("/sign-with-google", signWithGoogle);
router.post("/login", login);
router.get("/auth", validateToken, authenticate);
router.get("/logout", validateToken, logout);
router.put("/update-profile/:id", validateToken, updateProfile);
router.put("/change-password/:id", validateToken, changePassword);
router.get("/verify-email", verifyEmail);
router.post("/report-user", validateToken, reportUser);
router.delete("/delete/:id", validateToken, deleteUser);
router.post("/forgot-password", forgotPasswordUser);
router.put("/reset-password", resetPasswordUser);
router.post("/favorites/toggle", validateToken, toggleFavorite);
router.post("/favorites/merge", validateToken, mergeFavorites);
router.delete("/delete", validateToken, deleteUserAndData);

// Manager
router.post("/manager/register", registerManager);
router.post("/manager/login", loginManager);
router.post("/manager/forgot-password", forgotPassword);
router.put("/manager/reset-password", resetPassword);
router.put("/manager/update/:id", validateToken, updateManager);
router.delete("/manager/delete-all", deleteAllManagers);
router.delete("/manager/delete/:id", validateToken, deleteManager);
router.get("/manager/auth", validateToken, authenticateManager);
router.get("/manager/logout", logoutManager);

// Admin / Manager Routes
router.get("/all", validateToken, getAllUsers);

export default router;
