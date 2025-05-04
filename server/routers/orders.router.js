import { Router } from "express";
import queries from "../controllers/orders.controller.js";
import validateToken from "../middleware/validateToken.middleware.js";
import protectManager from "../middleware/protectManager.js";

const {
  addOrder,
  getOrders,
  getUserOrders,
  updateStatus,
  deleteOrder,
  confirmPayment,
  getOrdersSummary,
  getWeeklyOrders,
} = queries;

const router = Router();

router.post("/addOrder", validateToken, addOrder);
router.get("/getOrders", protectManager, getOrders);
router.get("/getUserOrders", validateToken, getUserOrders);
router.put("/updateStatus/:id", protectManager, updateStatus);
router.put("/confirm/:id", validateToken, confirmPayment);
router.delete("/deleteOrder/:id", validateToken, deleteOrder);
router.get("/analytics/orders-summary", protectManager, getOrdersSummary);
router.get("/analytics/weekly-orders", protectManager, getWeeklyOrders);

export default router;
