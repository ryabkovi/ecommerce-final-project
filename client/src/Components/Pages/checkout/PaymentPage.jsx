import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { AuthContext } from "../../../context/AuthContext";
import { GlobalContext } from "../../../context/GlobalContext";
import { toastSuccess, toastError } from "../../../lib/Toast";
import "../../../styles/UserDashboard.css";
import axios from "axios";

function PaymentPage() {
  const navigate = useNavigate();
  const { user, getAuth } = useContext(AuthContext);
  const { totalPrice, getAllProducts, clearCart } = useContext(GlobalContext);

  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cartProducts, setCartProducts] = useState([]);

  const taxRate = 0.1;
  const tax = totalPrice * taxRate;
  const grandTotal = totalPrice + tax;

  useEffect(() => {
    const savedOrderId = localStorage.getItem("latestOrderId");
    const savedCartData = JSON.parse(localStorage.getItem("cart"));
    const savedCart = savedCartData?.items || [];

    if (!savedOrderId || savedCart.length === 0) {
      toastError("No order found or cart is empty. Redirecting...");
      navigate("/checkout");
    } else {
      setOrderId(savedOrderId);
      setCartProducts(savedCart);
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.paymentMethod) {
      setSelectedMethod(user.paymentMethod);
    }
  }, [user]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toastError("Please select a payment method");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-profile/${user._id}`,
        { paymentMethod: selectedMethod },
        { withCredentials: true }
      );
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/orders/confirm/${orderId}`,
        {},
        { withCredentials: true }
      );
      toastSuccess("Payment successful!");
      clearCart();
      localStorage.removeItem("cart");
      localStorage.removeItem("latestOrderId");
      await getAllProducts();
      await getAuth();
      navigate("/payment-success");
    } catch (err) {
      toastError(err.message || "Payment failed");
      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  const createPayPalOrder = async () => {
    if (cartProducts.length === 0) {
      throw new Error("Cart is empty, cannot create PayPal order.");
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payment/create-order`,
        { cart: cartProducts },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data.orderId;
    } catch (error) {
      console.error("❌ Error creating PayPal order:", error);
      throw new Error("Failed to create PayPal order");
    }
  };

  const onApprovePayPal = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payment/capture-order`,
        { orderId: data.orderID },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.status !== "COMPLETED") {
        throw new Error("Payment not completed");
      }

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/orders/confirm/${orderId}`,
        {},
        { withCredentials: true }
      );
      toastSuccess("✅ PayPal Payment successful!");
      clearCart();
      localStorage.removeItem("cart");
      localStorage.removeItem("latestOrderId");
      await getAllProducts();
      await getAuth();
      navigate("/payment-success");
    } catch (err) {
      console.error(err);
      toastError(err.message || "Payment failed");
      navigate("/payment-failed");
    }
  };

  if (!user) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <h2 className="payment-title">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2 className="payment-title">Confirm Your Payment</h2>
        <div className="payment-summary-box">
          <div className="payment-summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="payment-summary-row">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="payment-summary-row total">
            <strong>Total:</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>
        </div>

        <div className="payment-method-info">
          <h4>Select Payment Method</h4>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedMethod === "card"}
                onChange={() => setSelectedMethod("card")}
              />
              💳 Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={selectedMethod === "paypal"}
                onChange={() => setSelectedMethod("paypal")}
              />
              💰 PayPal
            </label>
          </div>
        </div>

        {selectedMethod === "card" && (
          <button
            onClick={handlePayment}
            className="save-btn blue pay-now-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : "💸 Pay Now"}
          </button>
        )}

        {selectedMethod === "paypal" && (
          <div style={{ marginTop: "20px" }}>
            <PayPalButtons
              style={{
                layout: "horizontal",
                shape: "pill",
                color: "blue",
                tagline: false,
              }}
              createOrder={createPayPalOrder}
              onApprove={onApprovePayPal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
