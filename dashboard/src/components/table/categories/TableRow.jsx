import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TableRow({ categories, onEdit, onDelete }) {
  return (
    <tbody>
      {categories.map((category, index) => (
        <tr key={category._id || category.id}>
          <td>{index + 1}</td>
          <td>{category.category_name}</td>
          <td>
            {category.category_image ? (
              <img
                src={category.category_image}
                alt={category.category_name}
                className="table-img"
              />
            ) : (
              "No image"
            )}
          </td>
          <td>
            <button className="edit-btn" onClick={() => onEdit(category)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => onDelete(category)}>
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableRow;
