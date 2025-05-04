import React, { useState } from "react";
import axios from "axios";
import "../../../styles/resetPasswordPage.css";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/forgot-password`,
        { email },
        { withCredentials: true }
      );
      setMessage(data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="reset-password-container">
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <p>Enter your email and we’ll send you a reset link</p>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
