import React from "react";
import "../../../../styles/CategoryModal.css";

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content confirm">
        <h2>Are you sure?</h2>
        <p>
          This will permanently delete all products. This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button className="btn-danger-modal" onClick={onConfirm}>
            Yes, Delete All
          </button>
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
