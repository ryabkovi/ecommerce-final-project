import React from "react";
import { Link } from "react-router-dom";
import "./PaymentResult.css";

function PaymentSuccess() {
  return (
    <div className="payment-result">
      <div className="payment-box success">
        <div className="icon">✅</div>
        <h2>Thank You!</h2>
        <p>Your payment was successful.</p>
        <p>You’ll receive an order confirmation email shortly.</p>
        <Link to="/my-order" className="save-btn blue">
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
