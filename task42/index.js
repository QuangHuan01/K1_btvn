const studentTable = document.getElementById("tableStudent");
const actionBTN = document.getElementById("addStudent");
const errortext = document.getElementById("error");
const successText = document.getElementById("success");
const hoTen = document.getElementById("name");
const math = document.getElementById("math");
const english = document.getElementById("english");
const science = document.getElementById("science");
let editingStudentId = null;
let dataStudents = JSON.parse(localStorage.getItem("student") || "[]");

//?----------------------
function avgDiem(a, b, c) {
  return ((+a + +b + +c) / 3).toFixed(2);
}
//?----------------------
function hocLuc(v) {
  if (v >= 8) {
    return "Giỏi";
  } else if ((v >= 6.5) & (v < 8)) {
    return "Khá";
  } else if ((v >= 5) & (v < 6.5)) {
    return "TB";
  } else if (v < 5) {
    return "Yếu";
  }
}
//?----------------------
function generateId(length) {
  const listCharaters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newId = "";
  for (let i = 0; i < length; i++) {
    numberRD = Math.floor(Math.random() * listCharaters.length);
    newId += listCharaters[numberRD];
  }
  return `SV-${newId}`;
}

//?----------------------
function add() {
  if (
    hoTen.value.trim() == "" ||
    math.value == "" ||
    english.value == "" ||
    science.value == ""
  ) {
    errortext.innerText = "Không Được để Trống !";
    errortext.style.display = "block";
    return;
  }
  if (
    math.value > 10 ||
    math.value < 0 ||
    english.value > 10 ||
    english.value < 0 ||
    science.value > 10 ||
    science.value < 0
  ) {
    errortext.innerText = "Điểm không hợp lệ !";
    errortext.style.display = "block";
    return;
  }
  errortext.style.display = "none";
  let avg = avgDiem(math.value, english.value, science.value);
  if (editingStudentId !== null) {
    const student = dataStudents.find((s) => s.id === editingStudentId);
    student.math = math.value;
    student.english = english.value;
    student.science = science.value;
    student.avg = avg;
    student.hLuc = hocLuc(avg);
    successText.innerText = "Đã Sửa thành công !";
    successText.style.display = "block";
    Mess();
  } else {
    let student = {
      id: generateId(4),
      name: hoTen.value,
      math: math.value,
      english: english.value,
      science: science.value,
      avg: avg,
      hLuc: hocLuc(avg),
    };
    dataStudents.push(student);
    successText.innerText = "Đã thêm thành công !";
    successText.style.display = "block";
    Mess();
  }
  localStorage.setItem("student", JSON.stringify(dataStudents));
  reset();
  renderTable(dataStudents);
}

//?----------------------
function deleteST(id) {
  const i = confirm("Bạn Chắc Chưa !");
  if (i) {
    dataStudents = dataStudents.filter((hs) => hs.id != id);
    renderTable(dataStudents);
    localStorage.setItem("student", JSON.stringify(dataStudents));
    successText.innerText = "Đã xóa thành công !";
    successText.style.display = "block";
    Mess();
  } else {
    renderTable(dataStudents);
    localStorage.setItem("student", JSON.stringify(dataStudents));
  }
}

//?----------------------
function update(id) {
  const student = dataStudents.find((s) => s.id == id);
  editingStudentId = id;
  hoTen.value = student.name;
  hoTen.setAttribute("readonly", "readonly");
  math.value = student.math;
  english.value = student.english;
  science.value = student.science;
  document.getElementById("addStudent").textContent = "Lưu";
  document.getElementById("huy-btn").style.display = "inline";
  document.getElementById("huy-btn").addEventListener("click", reset);
}

//?----------------------
function searchStudents() {
  const search = document.getElementById("search").value.toLowerCase();

  const filterStudents = dataStudents.filter((student) =>
    student.name.toLowerCase().includes(search.trim())
  );
  renderTable(filterStudents);
}
//?----------------------
function filterStudents() {
  const filterOption = document.getElementById("filter").value;
  if (!filterOption) {
    renderTable(dataStudents);
    return;
  }
  const filterStudents = dataStudents.filter((s) => s.hLuc === filterOption);
  renderTable(filterStudents);
}
//?----------------------
function sortStudents() {
  const sortOption = document.getElementById("sort").value;
  let sortStudents = [...dataStudents];
  if (sortOption === "avg-desc") {
    sortStudents.sort((a, b) => b.avg - a.avg);
  } else if (sortOption === "avg-asc") {
    sortStudents.sort((a, b) => a.avg - b.avg);
  }
  renderTable(sortStudents);
}
//?----------------------
function renderTable(data) {
  if (!Array.isArray(data)) {
    errortext.innerText = "Dữ liệu không hợp lệ !";
    errortext.style.display = "block";
    return;
  }
  studentTable.innerHTML = `<tr>
        <th scope="col">Id</th>
        <th scope="col">Họ Tên</th>
        <th scope="col">Điểm Toán</th>
        <th scope="col">Điểm Anh</th>
        <th scope="col">Điểm KH</th>
        <th scope="col">Điểm TB</th>
        <th scope="col">Học Lực</th>
        <th scope="col">Hành động</th>
      </tr>`;

  data.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td style="font-size: 12px;">${student.id}</td>
    <td>${student.name}</td>
    <td>${student.math}</td>
    <td>${student.english}</td>
    <td>${student.science}</td>
    <td>${student.avg}</td>
    <td>${student.hLuc}</td>
    <td scope="col"><button onclick="update('${student.id}')">Cập Nhật</button>
     <button onclick="deleteST('${student.id}')">Xóa</button></td>
    `;
    studentTable.appendChild(trElement);
  });
}
//?----------------------
function reset() {
  hoTen.value = "";
  math.value = "";
  english.value = "";
  science.value = "";
  document.getElementById("addStudent").textContent = "Thêm";
  document.getElementById("huy-btn").style.display = "none";
  hoTen.removeAttribute("readonly");
  editingStudentId = null;
  renderTable(dataStudents);
}

//?----------------------
function Mess() {
  setTimeout(() => {
    successText.style.display = "none";
  }, 3000);
}
//?----------------------
renderTable(dataStudents);
