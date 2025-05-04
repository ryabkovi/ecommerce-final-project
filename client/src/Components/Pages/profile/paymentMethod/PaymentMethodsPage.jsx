import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { toastSuccess, toastError } from "../../../../lib/Toast";
import axios from "axios";
import "../../../../styles/UserDashboard.css";
import DeleteAccountModal from "../../../modal/DeleteAccountModal";

function PaymentMethodsPage() {
  const { user, getAuth } = useContext(AuthContext);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.paymentMethod) {
      setSelectedMethod(user.paymentMethod);
    }
  }, [user]);

  const handleSavePaymentMethod = async (e) => {
    e.preventDefault();

    if (!selectedMethod) {
      toastError("Please select a payment method!");
      return;
    }

    try {
      setSaving(true);
      const { data } = await axios.put(
        `http://localhost:3000/users/update-profile/${user._id}`,
        { paymentMethod: selectedMethod },
        { withCredentials: true }
      );

      if (data.success) {
        toastSuccess("✅ Payment method saved successfully!");
        await getAuth();
      }
    } catch (error) {
      toastError(
        error.response?.data?.message || "Failed to save payment method."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="payment-methods-page">
      <div className="sidebar">
        <NavLink to="/account" className="sidebar-item">
          <i className="fas fa-user"></i> Personal Info
        </NavLink>
        <NavLink to="/payment-method" className="sidebar-item active">
          <i className="fas fa-credit-card"></i> Payment Methods
        </NavLink>
        <NavLink to="/MyOrder" className="sidebar-item">
          <i className="fas fa-box"></i> My Orders
        </NavLink>
        <NavLink to="/shipping-info" className="sidebar-item">
          <i className="fas fa-truck"></i> Shipping Info
        </NavLink>
        <NavLink to="/favorites" className="sidebar-item">
          <i className="fas fa-star"></i> Favorites
        </NavLink>
        {/* <button type="button" className="sidebar-item delete">
          <i className="fas fa-trash-alt"></i> Delete Account
        </button> */}
        <DeleteAccountModal />
      </div>

      <div className="content">
        <h2>Payment Methods</h2>
        <form onSubmit={handleSavePaymentMethod}>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedMethod === "card"}
                onChange={() => setSelectedMethod("card")}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={selectedMethod === "paypal"}
                onChange={() => setSelectedMethod("paypal")}
              />
              PayPal
            </label>
          </div>

          <button
            type="submit"
            className="save-btn blue"
            style={{ marginTop: "30px" }}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Payment Method"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentMethodsPage;
