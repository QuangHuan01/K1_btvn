const todoInput = document.getElementById("todoInput");
const errorMessage = document.getElementById("errorMessage");
const todoList = document.getElementById("todoList");
let todos = [];
let currentFilter = "all";
console.log(todoInput);
//!
function generateId(length, prefix) {
  const listCharaters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newId = "";
  for (let i = 0; i < length; i++) {
    numberRD = Math.floor(Math.random() * listCharaters.length);
    newId += listCharaters[numberRD];
  }
  return `${prefix}${newId}`;
}
console.log(generateId(4, "todo-"));
//!
function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === "") {
    errorMessage.style.display = "block";
    todoInput.style.boxShadow = "0 0 5px rgba(255, 26, 26, 0.5)";
    todoInput.classList.add("error");
    return;
  }
  errorMessage.style.display = "none";
  todoInput.style.boxShadow = "none";
  //!
  const todo = {
    id: generateId(4, "todo-"),
    text: taskText,
    completed: false,
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodos();
}
//!
function filterTodos(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-section button").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent.toLocaleLowerCase() === filter) {
      btn.classList.add("active");
    }
  });
  renderTodos();
}
//!
function deleteTodo(id) {
  const deletetd = confirm("Bạn Chắc Chắn Muốn Xóa?");
  console.log(deletetd);
  if (deletetd) {
    todos = todos.filter((todo) => todo.id != id);
  }
  renderTodos();
}
//!
function startEdit(id) {
  const todo = todos.find((todo) => todo.id === id);
  const li = document.querySelector(`li[data-id="${id}"]`);
  li.innerHTML = `<span class="status ${
    todo.completed ? "completed" : "active"
  }" 
              onclick="toggleStatus('${todo.id}')">
          ${todo.completed ? "Completed" : "Active"}
        </span>
        <input type="text" class="edit-input" value="${todo.text}">
        <button class="edit" onclick="saveEdit('${todo.id}')">Save</button>
        <button class="delete" onclick="renderTodos()">Cancel</button>`;
  const editInput = li.querySelector(".edit-input");
  editInput.focus();
}
//!
function saveEdit(id) {
  const li = document.querySelector(`li[data-id="${id}"]`);
  const editInput = li.querySelector(".edit-input");
  const newTodo = editInput.value.trim();
  if (newTodo != "") {
    const todo = todos.find((todo) => todo.id === id);
    todo.text = newTodo;
  }
  renderTodos();
}
//!
function toggleStatus(id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  renderTodos();
}
//!
function renderTodos() {
  todoList.innerHTML = "";
  //!
  let filterTodos = todos;
  if (currentFilter === "active") {
    filterTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filterTodos = todos.filter((todo) => todo.completed);
  }
  //!
  filterTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.setAttribute("data-id", todo.id);
    li.innerHTML = `
          <span class="status ${todo.completed ? "completed" : "active"}" 
          onclick="toggleStatus('${todo.id}')">
          ${todo.completed ? "Completed" : "Active"}
          </span>
          <span class="task-text">${todo.text}</span>
          <button class="edit" onclick="startEdit('${todo.id}')">Edit</button>
          <button class="delete" onclick="deleteTodo('${
            todo.id
          }')">Delete</button>
        `;
    todoList.appendChild(li);
  });
}
