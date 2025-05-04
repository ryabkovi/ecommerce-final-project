import { Router } from "express";
import feedbackController from "../controllers/feedback.controller.js";

const router = Router();

router.post("/send", feedbackController.sendFeedback);
router.get("/all", feedbackController.getAllFeedback);
router.get("/count", feedbackController.getFeedbackCount);
router.post("/respond/:id", feedbackController.respondToFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);

export default router;
