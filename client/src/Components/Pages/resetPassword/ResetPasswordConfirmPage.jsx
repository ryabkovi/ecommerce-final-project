import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/ResetPasswordConfirmPage.css";

function ResetPasswordConfirmPage() {
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    new_password: "",
    confirm_password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      email: params.get("email") || "",
      token: params.get("token") || "",
    }));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const { data } = await axios.put(
        "http://localhost:3000/users/reset-password",
        formData,
        { withCredentials: true }
      );
      setSuccess(data.message);
      setError("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
      setSuccess("");
    }
  };

  return (
    <div className="reset-password-confirm-container">
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <h2>Set New Password</h2>
        <p>Please enter your new password</p>

        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}

        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordConfirmPage;
