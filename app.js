// GLOBALS
let todos = getLocalStorage("timely-todos").tasks;
let current_id = getLocalStorage("timely-todos").id;
console.log(todos);

// SELECTORS
const newTodoButton = document.querySelector("#new-todo");
const inputForm = document.querySelector("#inputForm");
const input = document.querySelector("#input");
const addButton = document.querySelector(".task-button");
const taskContainer = document.querySelector(".task-container");

// EVENT LISTENERS
addButton.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", create(todos));
newTodoButton.addEventListener("click", newTodo);

function newTodo() {
  input.style.display = "block";
  input.focus();
  console.log("got it");
}

function getLocalStorage(data) {
  let array = [];
  let i = 1;
  const localdata = localStorage.getItem(data);
  if (localdata !== null && localdata !== "[]") {
    array = JSON.parse(localdata);
    i = array[array.length - 1].id + 1;
  }
  return { tasks: array, id: i };
}

// ADD TODO
function addTodo(event) {
  // PREVENT DEFAULT FORM SUBMISSION
  event.preventDefault();

  // PREVENT EMPTY STRINGS
  if (!/\S/.test(input.value)) {
    return null;
  }

  // ADD TO LOCAL STORAGE
  todos.push({
    task: input.value,
    completed: false,
    id: current_id,
    timestamp: Math.floor(Date.now() / 100),
  });
  localStorage.setItem("timely-todos", JSON.stringify(todos));

  // CREATE HTML ELEMENTS
  create(todos);

  // CLEAR INPUT
  newTodo();
  input.value = "";
}

function create(todos) {
  taskContainer.innerHTML = "";
  todos.forEach(function (listItem) {
    // CREATE DIV
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");

    // [TASK]
    const newTask = document.createElement("div");
    newTask.classList.add("task-item");
    newTask.innerText = listItem.task;
    taskDiv.appendChild(newTask);

    // [REMOVE]
    const removeTask = document.createElement("div");
    removeTask.classList.add("task-remove");
    removeTask.innerText = "REMOVE";
    taskDiv.appendChild(removeTask);

    // APPEND TO CONTAINER
    taskContainer.appendChild(taskDiv);

    // UPDATE CLASSLIST
    if (listItem.completed) {
      todoDiv.classList.add("completed");
      completedButton.innerHTML = '<i class="far fa-check-square"></i>';
    }
  });
}

function removeLocalTodos(todo) {
  todos = todos.filter((obj) => {
    return String(obj.id) !== todo.id;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todo);
  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
}
