import React from "react";
import Student from "./StudentRow";
import { DataStudents } from "./dataStudents";

const TableStudent = (Student) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Toán</th>
          <th>Văn</th>
          <th>Anh</th>
          <th>Điểm TB</th>
          <th>Học Lực</th>
        </tr>
      </thead>
      <tbody>
        <Student student={DataStudents} />
      </tbody>
    </table>
  );
};

export default TableStudent;
