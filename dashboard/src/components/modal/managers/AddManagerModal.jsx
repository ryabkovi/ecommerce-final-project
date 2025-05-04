import React, { useState, useEffect } from "react";
import "../../../styles/CategoryModal.css";

function AddManagerModal({ onClose, onSave, defaultValues }) {
  const [form, setForm] = useState({
    manager_name: "",
    manager_email: "",
    manager_password: "",
  });

  useEffect(() => {
    setForm(
      defaultValues || {
        manager_name: "",
        manager_email: "",
        manager_password: "",
      }
    );
  }, [defaultValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Manager</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="manager_name"
              value={form.manager_name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="manager_email"
              value={form.manager_email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="manager_password"
              value={form.manager_password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              Save
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

export default AddManagerModal;
