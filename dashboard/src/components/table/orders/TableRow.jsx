import React from "react";
import { FaEdit, FaRegEye } from "react-icons/fa";
import "../../../styles/AdminStyles.css";

function TableRow({ orders, onEdit, onViewDetails }) {
  return (
    <tbody>
      {orders.map((order, index) => (
        <tr key={order._id}>
          <td>{index + 1}</td>
          <td>
            {order.user
              ? `${order.user.user_firstName || ""} ${
                  order.user.user_lastName || ""
                }`.trim()
              : "Guest"}
          </td>
          <td>{order.user?.user_email || "N/A"}</td>
          <td>{order.status}</td>
          <td>
            <button
              className="edit-btn"
              title="Edit"
              onClick={() => onEdit(order)}
            >
              <FaEdit />
            </button>
            <button
              className="view-btn"
              title="Details"
              onClick={() => onViewDetails(order)}
            >
              <FaRegEye />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableRow;
