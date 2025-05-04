import React from "react";
import TableRow from "./TableRow";

function FeedbackTable({ feedbacks, onSort, onDelete, onRespond }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th onClick={() => onSort("name")}>Name</th>
          <th onClick={() => onSort("email")}>Email</th>
          <th>Message</th>
          <th onClick={() => onSort("createdAt")}>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback, index) => (
          <TableRow
            key={feedback._id}
            feedback={feedback}
            index={index}
            onRespond={onRespond}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default FeedbackTable;
