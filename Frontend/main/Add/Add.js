<<<<<<< HEAD
const warn = document.getElementById("warning");
function handleClose() {
  formContainer.classList.remove("visible");
  formContainer.classList.add("hidden");
}

function handleTaskForm() {
  formContainer.classList.remove("hidden");
  formContainer.classList.add("visible");

  //edit coming from edit file
  edit.addEventListener("click", taskAdd);

  async function taskAdd(e) {
    e.preventDefault();

    const task = document.getElementById('task1').value.trim();
    const desc = document.getElementById('desc1').value.trim();
    const priority = document.getElementById('tasks-priority').value;
    const stage = "Upcoming";

    if (!task || !desc) {
      displayWarning("Please fill in all fields", "red");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/taskform`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, desc, time, dayOfMonth, priority, stage, email: currentUser }),
      });

      const data = await response.json();

      if (response.ok) {
        displayWarning(data.message, "green", "aqua");
        setTimeout(() => {
          location.href = "../Home/Home.html";
        }, 2000);
      } else {
        displayWarning("Invalid data", "red");
      }
=======

function handleClose() {
    formContainer.classList.remove("visible");
    formContainer.classList.add("hidden");
}
  
function handleTaskFrom() {
    formContainer.classList.remove("hidden");
    formContainer.classList.add("visible");
    
    edit.addEventListener("click", (e) => {
      taskAdd(e);
    });
  
    async function taskAdd(e) {
      try {
        e.preventDefault();
        const warn = document.getElementById("warning");
        let task = document.getElementById('task1').value;
        let desc = document.getElementById('desc1').value;
        let priority = document.getElementById('tasks-priority').value;
        let stage = "Upcoming";
        // Check if the task, priority and desc are not empty
        if (task === "" || desc === "") {
          warn.innerHTML = `<div style="color: red"><p>Please fill in all fields</p></div>`;
          return;
        }
      
        const response = await fetch(`${BASE_URL}/taskform`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({task, desc, time, dayOfMonth, priority, stage}),
        });
      
        const data = await response.json();
      
        if (response.ok) {
          warn.innerHTML = `<div style="color: green; background-color: aqua;"><p>${data.message}</p></div>`;
          // Redirect after successful login
          setTimeout(() => {
            location.href = "../Home/Home.html";
          }, 2000);
        } else {
          warn.innerHTML = `<div style="color: red"><p>Invalid data</p></div>`;
        }
>>>>>>> 98bf541 (Work)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function displayWarning(message, color, backgroundColor = "") {
    warn.innerHTML = `<div style="color: ${color};"><p>${message}</p></div>`;
  }
}
