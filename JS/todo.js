const TASKS_KEY = "todoTasks";

window.addEventListener("load", () => {
  const savedTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
  savedTasks.forEach((task) => {
    addTaskToDOM(task);
    addTaskToTable(task);
  });

  const form = document.getElementById("myForm") || document.getElementById("taskForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const task = {
        id: Date.now().toString(),
        title: form.title.value.trim(),
        description: form.description.value.trim(),
        priority: form.priority.value,
        deadline: form.deadline.value,
        isCompleted: form.isCompleted?.checked || false,
      };

      if (task.title !== "") {
        saveTask(task);
        addTaskToDOM(task);
        addTaskToTable(task);
        form.reset();
        alert("Task saved!");
      }
    });
  }
});

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
  tasks.push(task);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function addTaskToDOM(task) {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  const taskDiv = document.createElement("div");
  taskDiv.className = "task-item";
  taskDiv.id = `task-${task.id}`;

  const content = document.createElement("div");
  content.innerHTML = `
    <strong>${task.title}</strong><br>
    ${task.description}<br>
    <small>Priority: ${task.priority} | Deadline: ${
    task.deadline || "N/A"
  } | Done: ${task.isCompleted ? "Yes" : "No"}</small>
  `;

  const buttons = document.createElement("div");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    localStorage.setItem("editTaskId", task.id);
    window.location.href = "/TODO-APP/HTML/edit.html";
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    deleteTask(task.id);
    taskDiv.remove();
    removeTaskFromTable(task.id);
  };

  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);
  taskDiv.appendChild(content);
  taskDiv.appendChild(buttons);
  taskList.appendChild(taskDiv);
}

function addTaskToTable(task) {
  const taskTable = document.getElementById("taskTable");
  if (!taskTable) return;

  const tbody = taskTable.querySelector("#taskTableBody");
  if (!tbody) return;

  const row = tbody.insertRow();
  row.id = `row-${task.id}`;
  row.insertCell(0).textContent = task.title;
  row.insertCell(1).textContent = task.description;
  row.insertCell(2).textContent = task.priority;
  row.insertCell(3).textContent = task.deadline;
  row.insertCell(4).textContent = task.isCompleted ? "Yes" : "No";
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
  tasks = tasks.filter((t) => t.id !== id);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function removeTaskFromTable(id) {
  const row = document.getElementById(`row-${id}`);
  if (row) row.remove();
}
