import React, { useState } from "react";
import axios from "axios";
import "../../../styles/CategoryModal.css";

function EditOrderModal({ orderId, currentStatus, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(currentStatus);

  const updateStatus = async () => {
    try {
      await axios.put(
        `http://localhost:3000/orders/updateStatus/${orderId}`,
        { status },
        { withCredentials: true }
      );
      onStatusUpdate();
      onClose();
    } catch (error) {
      console.error("❌ Failed to update status:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Order Status</h2>

        <form>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="new">New</option>
              <option value="process">In Process</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={updateStatus}
            >
              Update
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

export default EditOrderModal;
