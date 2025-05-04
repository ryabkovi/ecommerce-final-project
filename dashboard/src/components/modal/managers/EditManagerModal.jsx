import React, { useState, useEffect } from "react";
import "../../../styles/CategoryModal.css";

function EditManagerModal({ manager, onClose, onSave }) {
  const [form, setForm] = useState({
    manager_name: "",
    manager_email: "",
    permission: "",
  });

  useEffect(() => {
    if (manager) {
      setForm({
        manager_name: manager.manager_name,
        manager_email: manager.manager_email,
        permission: manager.permission,
      });
    }
  }, [manager]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(manager._id, form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Manager</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="manager_name"
              value={form.manager_name || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              name="manager_email"
              type="email"
              value={form.manager_email || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Permission:
            <select
              name="permission"
              value={form.permission || ""}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">
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

export default EditManagerModal;
