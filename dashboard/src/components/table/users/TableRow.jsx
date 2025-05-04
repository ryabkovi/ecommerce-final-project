import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TableRow({ users = [], onEdit, onDelete }) {
  return (
    <>
      {users.map((user, index) => (
        <tr key={user._id || user.id}>
          <td>{index + 1}</td>
          <td>{`${user.user_firstName || ""} ${user.user_lastName || ""}`}</td>
          <td>{user.user_email || "—"}</td>
          <td>{user.permission || "—"}</td>
          <td>
            <button className="edit-btn" onClick={() => onEdit(user)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => onDelete(user)}>
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableRow;
