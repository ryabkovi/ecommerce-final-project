import React from "react";
import TableRow from "./TableRow";

function UsersTable({ users, onEdit, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Permission</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
              No users registered.
            </td>
          </tr>
        ) : (
          <TableRow users={users} onEdit={onEdit} onDelete={onDelete} />
        )}
      </tbody>
    </table>
  );
}

export default UsersTable;
