const TASKS_KEY = "todoTasks"; // consistent with todo.js

window.addEventListener("DOMContentLoaded", () => {
  const taskTableBody = document.getElementById("taskTableBody");
  const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];

  tasks.forEach((task) => {
    const row = taskTableBody.insertRow();
    row.id = `row-${task.id}`;

    row.insertCell(0).textContent = task.title;
    row.insertCell(1).textContent = task.description;
    row.insertCell(2).textContent = task.priority;
    row.insertCell(3).textContent = task.deadline || "N/A";
    row.insertCell(4).textContent = task.isCompleted ? "Yes" : "No";

    const actionCell = row.insertCell(5);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      localStorage.setItem("editTaskId", task.id); // use id instead of index
      window.location.href = "edit.html";
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      deleteTask(task.id);
      row.remove();
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
  });
});

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}
