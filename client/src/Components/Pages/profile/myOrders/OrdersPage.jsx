import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./MyOrdersPage.css";
import { AuthContext } from "../../../../context/AuthContext";
import { formatDate } from "../../../../lib/Date";
import { NavLink } from "react-router-dom";
import { toastSuccess, toastError } from "../../../../lib/Toast";
import DeleteAccountModal from "../../../modal/DeleteAccountModal";

function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/orders/getUserOrders`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setOrders(response.data.orders);
          setFilteredOrders(response.data.orders);
        }
      } catch (error) {
        toastError(error.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  const handleFilterChange = (status) => {
    setFilter(status);
    setFilteredOrders(
      status === "all"
        ? orders
        : orders.filter((order) => order.status === status)
    );
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/orders/deleteOrder/${orderId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toastSuccess("✅ Order canceled successfully");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        setFilteredOrders((prev) => prev.filter((o) => o._id !== orderId));
      }
    } catch (err) {
      toastError(err?.response?.data?.error || "Failed to delete order");
    }
  };

  return (
    <div className="my-order-page">
      {/* Sidebar */}
      <div className="sidebar">
        <NavLink to="/account" className="sidebar-item">
          <i className="fas fa-user"></i> Personal Info
        </NavLink>
        <NavLink to="/payment-method" className="sidebar-item">
          <i className="fas fa-credit-card"></i> Payment Methods
        </NavLink>
        <NavLink to="/MyOrder" className="sidebar-item active">
          <i className="fas fa-box"></i> My Orders
        </NavLink>
        <NavLink to="/shipping-info" className="sidebar-item">
          <i className="fas fa-truck"></i> Shipping Info
        </NavLink>
        <NavLink to="/favorites" className="sidebar-item">
          <i className="fas fa-star"></i> Favorites
        </NavLink>
        <DeleteAccountModal />
      </div>

      {/* Content */}
      <div className="content">
        <h2>My Orders</h2>

        {/* Filters */}
        <div className="filter-buttons">
          {["all", "new", "process", "completed", "Canceled"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? "active" : ""}`}
              onClick={() => handleFilterChange(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Order List */}
        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length > 0 ? (
          <ul className="order-list">
            {filteredOrders.map((order) => (
              <li key={order._id} className="order-item">
                <div className="order-details">
                  <span>
                    <strong>Order #:</strong>{" "}
                    {order.order_number ?? order._id.slice(-6).toUpperCase()}
                  </span>
                  <span>
                    <strong>Date:</strong> {formatDate(order.createdAt)}
                  </span>
                  <span>
                    <strong>Status:</strong>{" "}
                    <span className={`status-${order.status}`}>
                      {order.status}
                    </span>
                  </span>
                  <button
                    className="delete-order-btn"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    ❌ Cancel Order
                  </button>
                </div>

                <div className="order-products">
                  {order.products.map((item, index) => (
                    <div key={index} className="order-product">
                      <span>{item.productId?.product_name}</span>
                      <span>
                        {item.quantity} x ${item.productId?.product_price}
                      </span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
