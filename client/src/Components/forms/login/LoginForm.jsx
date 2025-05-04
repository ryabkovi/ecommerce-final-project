import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toastSuccess, toastError } from "../../../lib/Toast";

const initialValues = {
  user_email: "",
  user_password: "",
};

function LoginForm({ handleClose }) {
  const [values, setValues] = useState(initialValues);
  const { handleLogin, getAuth } = useContext(AuthContext);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await handleLogin(values);
      if (result?.success) {
        setError("");
        handleClose();
      } else {
        setError(result?.message || "❌ Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toastError("Login failed. Please try again.");
      setError("❌ Login failed. Please try again.");
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    try {
      const { credential } = credentialResponse;
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/sign-with-google`,
        { token: credential },
        { withCredentials: true }
      );

      if (data.success) {
        toastSuccess("Welcome back!");
        await getAuth();
        handleClose();
      }
    } catch (error) {
      console.error(error);
      toastError("Google login failed");
    }
  }

  function handleGoogleError() {
    toastError("Google login was canceled");
  }

  return (
    <form className="modal-content-login" onSubmit={handleSubmit}>
      <h2>Sign in to Your Account</h2>
      <p>Enter your email and password:</p>

      {error && <div className="login-error-message">{error}</div>}

      <input
        type="email"
        name="user_email"
        placeholder="Email Address"
        className="input-field-login"
        value={values.user_email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="user_password"
        placeholder="Password"
        className="input-field-login"
        value={values.user_password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="login-btn-login">
        Login
      </button>

      <div className="modal-links-login">
        <p>
          New customer?{" "}
          <NavLink
            to="/create-account"
            className="link-text-login"
            onClick={handleClose}
          >
            Create an Account
          </NavLink>
        </p>
        <p>
          Forgot password?{" "}
          <NavLink
            to="/reset-password"
            className="link-text-login"
            onClick={handleClose}
          >
            Reset Password
          </NavLink>
        </p>
      </div>

      <div className="or-separator">Or register with</div>

      <div className="social-buttons">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </form>
  );
}

export default LoginForm;
