document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const form = event.target;
  const title = form.elements["title"].value;
  const description = form.elements["description"].value;
  const priority = form.elements["priority"].value;
  const deadline = form.elements["deadline"].value;

  console.log("title:", title);
  console.log("description:", description);
  console.log("priority:", priority);
  console.log("deadline:", deadline);
});
