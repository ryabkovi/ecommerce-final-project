import React from "react";
import TableRow from "./TableRow";

function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <TableRow categories={categories} onEdit={onEdit} onDelete={onDelete} />
    </table>
  );
}

export default CategoryTable;
