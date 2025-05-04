import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { GlobalContext } from "../../../context/GlobalContext";
import axios from "axios";
import { toastSuccess, toastError } from "../../../lib/Toast";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const { handleSubmit, getValues } = useFormContext();
  const { cart, totalPrice } = useContext(GlobalContext);
  const navigate = useNavigate();

  const taxRate = 0.1;
  const tax = totalPrice * taxRate;
  const grandTotal = totalPrice + tax;

  const onSubmit = async (data) => {
    if (cart.length === 0) {
      toastError("Cart is empty");
      return;
    }

    if (!data.address || !data.building || !data.city) {
      toastError("Address, Building, and City are required");
      return;
    }

    const orderPayload = {
      shipment_address: {
        address: data.address,
        building: data.building,
        city: data.city,
      },
      total_price: grandTotal,
      isPaid: false,
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/addOrder`,
        orderPayload,
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.setItem("latestOrderId", response.data.order._id);
        localStorage.setItem(
          "cart",
          JSON.stringify({ items: cart, createdAt: Date.now() })
        );
        toastSuccess("✅ Order submitted successfully!");
        navigate("/checkout/payment");
      }
    } catch (error) {
      console.error("❌ Error submitting order:", error.response || error);
      toastError("Failed to submit order");
    }
  };

  return (
    <form className="order-summary" onSubmit={handleSubmit(onSubmit)}>
      <h3>Order Summary</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.product_name} x {item.quantity} — ${" "}
                {(item.product_price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <hr />
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-line total">
            <strong>Total:</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <button type="submit" className="save-btn blue pay-now-btn">
            Confirm & Pay
          </button>
        </>
      )}
    </form>
  );
}

export default OrderSummary;
