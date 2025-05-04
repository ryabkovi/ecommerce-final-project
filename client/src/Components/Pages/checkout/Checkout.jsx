import React, { useContext, useState, useEffect } from "react";
import CheckoutForm from "../../forms/checkout/CheckoutForm";
import OrderSummary from "../../forms/checkout/OrderSummary";
import { AuthContext } from "../../../context/AuthContext";
import LoginModal from "../../modal/LoginModal";
import "./Checkout.css";

function Checkout() {
  const { user, isAuth } = useContext(AuthContext);
  const [isGuest, setIsGuest] = useState(!isAuth);
  const [formData, setFormData] = useState({});
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isAuth && user) {
      const address = user.shipment_address || {};
      setFormData({
        name: `${user.user_firstName || ""} ${user.user_lastName || ""}`.trim(),
        email: user.user_email || "",
        address: address.address || "",
        building: address.building || "",
        city: address.city || "",
        zip: address.zipCode || "",
      });
      setIsGuest(false);
    } else {
      setIsGuest(true);
      setFormData({});
    }
  }, [isAuth, user]);

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        {isGuest && (
          <div className="guest-message">
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowLogin(true)}>Sign in</button>
            </p>
          </div>
        )}
        <CheckoutForm isGuest={isGuest} prefilledData={formData}>
          <OrderSummary />
        </CheckoutForm>
      </div>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </div>
  );
}

export default Checkout;
