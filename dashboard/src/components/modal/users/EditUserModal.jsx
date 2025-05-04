import React, { useState, useEffect } from "react";
import { registerManager } from "../../../services/managerService";
import { deleteUser } from "../../../services/usersService";
import "../../../styles/CategoryModal.css";

function EditUserModal({ user, onClose, onSave }) {
  const [original, setOriginal] = useState({});

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    permission: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        user_name: user.user_firstName + " " + user.user_lastName || "",
        email: user.user_email || "",
        permission: user.permission || "",
      });
      setOriginal({
        user_firstName: user.user_firstName,
        user_lastName: user.user_lastName,
        user_email: user.user_email,
        permission: user.permission,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {};

    const [firstName, lastName] = form.user_name.split(" ");
    const fullName = `${original.user_firstName} ${original.user_lastName}`;

    if (form.user_name && form.user_name !== fullName) {
      updatedFields.user_firstName = firstName || original.user_firstName;
      updatedFields.user_lastName = lastName || original.user_lastName;
    }

    if (form.email && form.email !== original.user_email) {
      updatedFields.user_email = form.email;
    }

    if (form.permission && form.permission !== original.permission) {
      updatedFields.permission = form.permission;

      if (form.permission === "Admin" || form.permission === "Manager") {
        const managerData = {
          manager_name: form.user_name,
          manager_email: form.email,
          manager_password: "Default1234!",
          permission: form.permission,
        };

        try {
          await registerManager(managerData);
          await deleteUser(user._id);
          alert("✅ User moved to Managers table.");
          onClose();
          return;
        } catch (err) {
          console.error("❌ Failed to move user to managers:", err);
          alert("❌ An error occurred during the transfer.");
          return;
        }
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes made.");
      return;
    }

    onSave(user._id, updatedFields);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Permission:
            <select
              name="permission"
              value={form.permission}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="Regular">Regular</option>
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

export default EditUserModal;
