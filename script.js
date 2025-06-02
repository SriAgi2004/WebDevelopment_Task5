const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const tabs = document.querySelectorAll(".tab-btn");

let tasks = []; // store all tasks as objects
let currentFilter = "pending";

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (!text) {
    alert("Please enter a task");
    return;
  }
  if (!date) {
    alert("Please select a date");
    return;
  }
  if (!time) {
    alert("Please select a time");
    return;
  }

  const task = {
    id: Date.now(),
    text,
    date,
    time,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
  clearInputs();
});

// Clear inputs after add
function clearInputs() {
  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

// Render tasks based on filter
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter === "pending") {
    filteredTasks = tasks.filter((t) => !t.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const tr = document.createElement("tr");

    // Number column
    const numTd = document.createElement("td");
    numTd.textContent = index + 1;
    tr.appendChild(numTd);

    // Tick box
    const tickTd = document.createElement("td");
    const tickBox = document.createElement("span");
    tickBox.className = "tick-box";
    if (task.completed) {
      tickBox.classList.add("completed");
      tickBox.textContent = "✔️";
    }
    tickBox.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
    });
    tickTd.appendChild(tickBox);
    tr.appendChild(tickTd);

    // Task text
    const textTd = document.createElement("td");
    textTd.textContent = task.text;
    if (task.completed) {
      textTd.style.textDecoration = "line-through";
      textTd.style.color = "#ccc";
    }
    tr.appendChild(textTd);

    // Date
    const dateTd = document.createElement("td");
    dateTd.textContent = task.date;
    tr.appendChild(dateTd);

    // Time
    const timeTd = document.createElement("td");
    timeTd.textContent = task.time;
    tr.appendChild(timeTd);

    // Delete button
    const delTd = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
    });
    delTd.appendChild(delBtn);
    tr.appendChild(delTd);

    taskList.appendChild(tr);
  });
}

// Tab filtering
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter;
    renderTasks();
  });
});

// Initial render
renderTasks();
