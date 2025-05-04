import React from "react";
import "../../../../styles/DeleteModal.css";

function DeleteManagersModal({ onConfirm, onCancel, userName }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content confirm">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete <strong>{userName}</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteManagersModal;
