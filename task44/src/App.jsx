import { useState } from "react";
import "./App.css";
import { DataStudents } from "./components/dataStudents.js";

function App() {
  //

  const [search, setSearch] = useState("");
  const [dtb, setDtb] = useState("");
  const [hl, setHl] = useState("");
  const hocLuc = (dtb) => {
    if (dtb >= 8) {
      return "Giỏi";
    } else if (dtb >= 6.5) {
      return "Khá";
    } else if (dtb >= 5) {
      return "TB";
    } else if (dtb < 5) {
      return "Yếu";
    }
  };
  return (
    <>
      <div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          id="form1"
        />
      </div>
      <select onChange={(e) => setDtb(e.target.value)}>
        <option>Điểm trung bình</option>
        <option value="desc">Cao → Thấp</option>
        <option value="asc">Thấp → Cao</option>
      </select>
      <select onChange={(e) => setHl(e.target.value)}>
        <option value="">Học Lực</option>
        <option value="Yếu">Yếu</option>
        <option value="TB">TB</option>
        <option value="Khá">Khá</option>
        <option value="Giỏi">Giỏi</option>
      </select>
      <table border={"1"}>
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
          {DataStudents.map((i) => ({
            ...i,
            dtb: (+i.math + +i.literature + +i.english) / 3,
          }))
            .sort((a, b) => {
              if (dtb === "desc") {
                return b.dtb - a.dtb;
              }
              if (dtb === "asc") {
                return a.dtb - b.dtb;
              }
            })
            .filter((i) => {
              const nameMatch = i.name
                .toLowerCase()
                .includes(search.toLowerCase());
              const hocLucValue = hocLuc(i.dtb);
              const hocLucMatch = hl === "" || hocLucValue === hl;
              return nameMatch && hocLucMatch;
            })
            .map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.math}</td>
                  <td>{item.literature}</td>
                  <td>{item.english}</td>
                  <td>{item.dtb.toFixed(2)}</td>
                  <td>{hocLuc(item.dtb)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default App;
