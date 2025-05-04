import React from "react";
import "../../../styles/CategoryModal.css";

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>

        <div className="details-section">
          <strong>Customer Name:</strong>
          <p>
            {order.user?.user_firstName || ""} {order.user?.user_lastName || ""}
          </p>
        </div>

        <div className="details-section">
          <strong>Email:</strong>
          <p>{order.user?.user_email || "N/A"}</p>
        </div>

        <div className="details-section">
          <strong>Status:</strong>
          <p>{order.status}</p>
        </div>

        <div className="details-section">
          <strong>Address:</strong>
          <p>
            {order.shipment_address?.address},{" "}
            {order.shipment_address?.building}, {order.shipment_address?.city}
          </p>
        </div>

        <div className="details-section">
          <strong>Is Paid:</strong>
          <p>{order.isPaid ? "✅ Yes" : "❌ No"}</p>
        </div>

        <div className="details-section">
          <strong>Total Price:</strong>
          <p>${order.total_price.toFixed(2)}</p>
        </div>

        <div className="details-section">
          <strong>Products:</strong>
          {order.products.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <p>
                {item.productId?.product_name || "Unknown Product"} ×{" "}
                {item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
