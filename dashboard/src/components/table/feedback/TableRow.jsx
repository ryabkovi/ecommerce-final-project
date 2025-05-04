import React from "react";
import { FaReply, FaTrash } from "react-icons/fa";

function TableRow({ feedback, index, onRespond, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{feedback.name}</td>
      <td>{feedback.email}</td>
      <td>{feedback.message}</td>
      <td>{new Date(feedback.createdAt).toLocaleString()}</td>
      <td>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary" onClick={() => onRespond(feedback)}>
            <FaReply style={{ marginRight: "5px" }} />
            Respond
          </button>
          <button className="btn-danger" onClick={() => onDelete(feedback._id)}>
            <FaTrash style={{ marginRight: "5px" }} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
