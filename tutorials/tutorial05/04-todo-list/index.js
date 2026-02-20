let inputEl = document.querySelector("#todoInput");
let todoListEl = document.querySelector("#todoList");

function addTodo() {
  let listEl = inputEl.value;
  todoListEl.insertAdjacentHTML("beforeend", "<li>" + listEl + "</li>");
  inputEl.value = "";
}
