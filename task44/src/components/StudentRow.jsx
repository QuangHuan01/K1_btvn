import React from "react";

const StudentRow = ({ students }) => {
  students.map((item) => {
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.literature}</td>
        <td>{item.english}</td>
        <td>{item.id}</td>
      </tr>
    );
  });
};

export default StudentRow;
