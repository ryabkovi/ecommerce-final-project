import Feedback from "../models/feedback.model.js";

export default {
  sendFeedback: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        throw new Error("All fields are required");
      }
      const feedback = new Feedback({ name, email, message });
      await feedback.save();
      res.status(200).json({ success: true, message: "Feedback sent" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getAllFeedback: async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: feedbacks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getFeedbackCount: async (req, res) => {
    try {
      const count = await Feedback.countDocuments();
      res.status(200).json({ success: true, count });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  respondToFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body;

      const feedback = await Feedback.findById(id);
      if (!feedback) {
        return res
          .status(404)
          .json({ success: false, message: "Feedback not found" });
      }

      feedback.response = response;
      await feedback.save();

      res
        .status(200)
        .json({ success: true, message: "Response sent", data: feedback });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Feedback.findByIdAndDelete(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Feedback not found" });
      }
      res.status(200).json({ success: true, message: "Feedback deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
