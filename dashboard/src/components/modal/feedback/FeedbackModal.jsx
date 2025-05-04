import React, { useState } from "react";
import axios from "axios";
import "../../../styles/AdminStyles.css";
import "../../../styles/FeedbackModal.css";

function FeedbackModal({ feedback, onClose, onResponseSent }) {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/feedback/respond/${feedback._id}`,
        { response: responseText },
        { withCredentials: true }
      );
      if (data.success) {
        onResponseSent();
        onClose();
      } else {
        setError(data.message || "Failed to send response.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-modal__overlay">
      <div className="feedback-modal__content">
        <h2>Respond to Feedback</h2>
        <p>
          <strong>From:</strong> {feedback.name} ({feedback.email})
        </p>
        <p>
          <strong>Message:</strong> {feedback.message}
        </p>
        <form onSubmit={handleSubmit}>
          <label className="feedback-modal__label">
            Your Response:
            <textarea
              className="feedback-modal__textarea"
              required
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            ></textarea>
          </label>

          {error && <p className="feedback-modal__error">{error}</p>}

          <div className="feedback-modal__actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Response"}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
