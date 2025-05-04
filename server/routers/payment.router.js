import { Router } from "express";
import { createOrder, capturePayment } from "../service/payment.js";

const router = Router();

router.post("/create-order", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is missing or empty" });
    }

    const orderId = await createOrder(cart);
    res.status(200).json({ success: true, orderId });
  } catch (error) {
    console.error("Create order error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

router.post("/capture-order", async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is missing" });
    }

    const captureData = await capturePayment(orderId);
    res.status(200).json(captureData);
  } catch (error) {
    console.error("Capture order error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to capture order" });
  }
});

export default router;
