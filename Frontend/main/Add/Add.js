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
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function displayWarning(message, color, backgroundColor = "") {
    warn.innerHTML = `<div style="color: ${color};"><p>${message}</p></div>`;
  }
}
