import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TableRow({ managers, onEdit, onDelete }) {
  return (
    <tbody>
      {managers.map((manager, index) => (
        <tr key={manager._id || manager.id}>
          <td>{index + 1}</td>
          <td>{manager.manager_name}</td>
          <td>{manager.manager_email}</td>
          <td>{manager.permission}</td>
          <td>
            <button className="edit-btn" onClick={() => onEdit(manager)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => onDelete(manager)}>
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableRow;
