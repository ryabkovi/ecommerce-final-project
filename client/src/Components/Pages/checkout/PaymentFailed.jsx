import React from "react";
import { Link } from "react-router-dom";
import "./PaymentResult.css";

function PaymentFailed() {
  return (
    <div className="payment-result">
      <div className="payment-box failed">
        <div className="icon">❌</div>
        <h2>Payment Failed</h2>
        <p>We couldn’t process your payment.</p>
        <p>Please try again or use a different payment method.</p>
        <Link to="/payment-method" className="save-btn yellow">
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default PaymentFailed;
