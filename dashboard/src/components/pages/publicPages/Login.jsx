import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../styles/login.css";
import { AuthContext } from "../../../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setUsername("");
      setPassword("");
    }
  }, [location.pathname]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin({
      manager_email: username,
      manager_password: password,
    });

    if (success) {
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit} autoComplete="off">
        <h2>Manager/Admin Login</h2>
        <input
          type="text"
          placeholder="Email"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
