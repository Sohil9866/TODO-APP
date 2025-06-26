const TASKS_KEY = "todoTasks";
const editTaskId = localStorage.getItem("editTaskId");
const form = document.getElementById("editForm");

if (!editTaskId) {
  alert("No task selected to edit!");
  window.location.href = "table.html";
}

const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
const taskIndex = tasks.findIndex((t) => t.id === editTaskId);
const task = tasks[taskIndex];

if (!task) {
  alert("Task not found!");
  window.location.href = "table.html";
}

document.getElementById("title").value = task.title;
document.getElementById("description").value = task.description;
document.getElementById("priority").value = task.priority;
document.getElementById("deadline").value = task.deadline;
document.getElementById("isCompleted").checked = task.isCompleted;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  task.title = form.title.value.trim();
  task.description = form.description.value.trim();
  task.priority = form.priority.value;
  task.deadline = form.deadline.value;
  task.isCompleted = form.isCompleted.checked;

  tasks[taskIndex] = task;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

  alert("Task updated successfully!");
  localStorage.removeItem("editTaskId");
  window.location.href = "table.html";
});
