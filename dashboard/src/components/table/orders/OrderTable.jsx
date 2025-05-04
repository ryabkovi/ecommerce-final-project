import React from "react";
import TableRow from "./TableRow";

function OrderTable({ orders, onEdit, onViewDetails }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <TableRow orders={orders} onEdit={onEdit} onViewDetails={onViewDetails} />
    </table>
  );
}

export default OrderTable;
