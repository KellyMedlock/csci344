// Exercise 1: Create a function declaration called createTodoItemHTML
// It should take a text parameter and return an HTML string for a <li> element
// Use template literals (backticks)

// Exercise 2: Rewrite createTodoItemHTML as an arrow function
// You can use the shorter implicit return syntax: (text) => `<li>${text}</li>`

// Exercise 3: Create a function cleanTodoText that validates and cleans input
// Use .trim() to remove whitespace and return empty string if invalid

// Exercise 4: Create a function addTodo that uses cleanTodoText and createTodoItemHTML
// Use insertAdjacentHTML('beforeend', htmlString) to add items to the list

// Exercise 5: Modify createTodoItemHTML to accept a default className parameter
// Include the class in the template literal: `<li class="${className}">${text}</li>`

// Exercise 6: Create a function addTodoWithCount that tracks todo count
// Use your addTodo() function, then increment todoCount and update the display

// Exercise 7: Create a function handleAddClick for the button event
// Get the input value, use addTodoWithCount(), and clear the input field

// Test your functions here (you can uncomment these as you complete each exercise):

function createTodoItemHTML(text, className) {
  return `<li class="${className}">${text}</li>`;
}

// const createTodoItemHTML = (text) => `<li>${text}</li>`;

// Exercise 1 & 2 tests:
const todoList = document.querySelector("#todoList");
// const html1 = createTodoItemHTML("Buy groceries");
// todoList.insertAdjacentHTML("beforeend", html1);
// const html2 = createTodoItemHTML("Finish homework");
// todoList.insertAdjacentHTML("beforeend", html2);
// const html3 = createTodoItemHTML("Call mom");
// todoList.insertAdjacentHTML("beforeend", html3);

function cleanTodoText(text) {
  return text.trim();
}

// Exercise 3 tests:
// console.log(cleanTodoText("  Buy groceries  ")); // Should return "Buy groceries"
// console.log(cleanTodoText("")); // Should return ""
// console.log(cleanTodoText("Finish homework")); // Should return "Finish homework"

function addTodo() {
  const inputEl = document.querySelector("#todoInput");
  const text = inputEl.value;
  cleanText = cleanTodoText(text);
  htmlText = createTodoItemHTML(cleanText);
  todoList.insertAdjacentHTML("beforeend", htmlText);
  inputEl.value = "";
}

// Exercise 4 tests:
// addTodo("  Buy groceries  "); // Should add "Buy groceries"
// addTodo(""); // Should not add anything
// addTodo("Finish homework"); // Should add "Finish homework"

// Exercise 5 tests:
// const todoList = document.querySelector("#todoList");
// const html1 = createTodoItemHTML("Buy groceries"); // Uses default 'todo-item'
// const html2 = createTodoItemHTML("Important task", "todo-item-urgent"); // Uses custom class
// todoList.insertAdjacentHTML("beforeend", html1);
// todoList.insertAdjacentHTML("beforeend", html2);

// Exercise 6 tests:
// addTodoWithCount("Buy groceries");
// addTodoWithCount("Finish homework");
// addTodoWithCount("Call mom");
// console.log("Total todos:", todoCount);  // Should print 3

// Exercise 7: Attach event handler (uncomment when ready):
// const addButton = document.querySelector('#addBtn');
// addButton.addEventListener('click', handleAddClick);
