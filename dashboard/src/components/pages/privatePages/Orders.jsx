import React, { useState, useEffect, useContext } from "react";
import "../../../styles/AdminStyles.css";
import Sidebar from "../../section/navigation/Sidebar";
import OrderTable from "../../table/orders/OrderTable";
import { FaBars } from "react-icons/fa";
import DropdownButton from "../../../lib/DropdownButton";
import { AuthContext } from "../../../contexts/AuthContext";
import EditOrderModal from "../../modal/orders/EditOrderModal";
import OrderDetailsModal from "../../modal/orders/OrderDetailsModal";
import axios from "axios";

function Orders() {
  const { user, isAuth, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const filters = ["All", "new", "process", "completed", "canceled"];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/orders/getOrders`,
        {
          params: {
            status: filter !== "All" ? filter.toLowerCase() : undefined,
          },
          withCredentials: true,
        }
      );
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error(
        "❌ Failed to fetch orders:",
        error?.response?.data || error
      );
    }
  };

  useEffect(() => {
    if (!loading && isAuth) {
      fetchOrders();
    }
  }, [filter, isAuth, loading, refresh]);

  const handleEdit = (order) => setSelectedOrder(order);
  const handleUpdate = () => {
    setSelectedOrder(null);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown-toggle")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="orders">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <h1>Orders</h1>
          <div className="user-info">
            <span>👤 {user?.manager_name || "Manager"}</span>
          </div>
          <div className="dropdown-toggle">
            <button className="hamburger" onClick={toggleDropdown}>
              <FaBars />
            </button>
            {dropdownOpen && <DropdownButton />}
          </div>
        </header>

        <div className="action-buttons">
          {filters.map((f) => (
            <button
              key={f}
              className={`btn-filter ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <OrderTable
          orders={orders}
          onEdit={handleEdit}
          onViewDetails={setDetailsOrder}
        />

        {detailsOrder && (
          <OrderDetailsModal
            order={detailsOrder}
            onClose={() => setDetailsOrder(null)}
          />
        )}

        {selectedOrder && (
          <EditOrderModal
            orderId={selectedOrder._id}
            currentStatus={selectedOrder.status}
            onClose={() => setSelectedOrder(null)}
            onStatusUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
