import React from "react";
import "../../../../styles/CategoryModal.css";

function DeleteSingleModal({ onConfirm, onCancel, categoryName }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content confirm">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete <strong>{categoryName}</strong>?
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

export default DeleteSingleModal;
