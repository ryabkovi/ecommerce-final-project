import React from "react";
import "./LoginModal.css";
import LoginForm from "../forms/login/LoginForm";

function LoginModal({ show, handleClose }) {
  if (!show) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay-login" onClick={handleClose}>
      <div onClick={stopPropagation}>
        <LoginForm handleClose={handleClose} />
      </div>
    </div>
  );
}

export default LoginModal;
