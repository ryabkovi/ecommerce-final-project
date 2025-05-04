import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TableRow({ product, index, onEdit, onDelete }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.product_name}</td>
      <td>${product.product_price}</td>
      <td>
        {product.product_image ? (
          <img
            src={product.product_image}
            alt={product.product_name}
            className="table-img"
          />
        ) : (
          "No image"
        )}
      </td>
      <td>
        <button className="edit-btn" onClick={() => onEdit(product)}>
          <FaEdit />
        </button>
        <button className="delete-btn" onClick={() => onDelete(product)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
