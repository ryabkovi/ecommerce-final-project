import React from "react";
import TableRow from "./TableRow";

function ManagersTable({ managers, onEdit, onDelete }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Manager Name</th>
            <th>Email</th>
            <th>Permission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <TableRow managers={managers} onEdit={onEdit} onDelete={onDelete} />
      </table>
    </>
  );
}

export default ManagersTable;
