const pro = document.querySelector(".progress-stage");
const done = document.querySelector(".done-stage");

async function displayPro() {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${currentUser}`);
    const data = await response.json();
    console.log("data:", data);

    const entireInfo = data
      .filter(value => value.stage === "In progress")
      .map(createTaskHTML)
      .join("");

    pro.innerHTML = entireInfo;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

function createTaskHTML(value) {
  const formattedDate = value.date === dayOfMonth
    ? `${dayOfMonth}/${currMonth}/${currYear}`
    : `${value.date}/${currMonth}/${currYear}`;

  return `
    <div id="${value._id}" class="task-module draggable" draggable="true" ondragstart="drag(event)">
      <div class="task-module-title">
        <p class="task-title same">${value.task}</p>
        <p class="priority-p" style="color: green">${value.stage}</p>
      </div>
      <div class="middle-of-task">
        <div>
          <p class="para same">${value.description}</p>
        </div>
        <div class="btn-of-task">
          <p class="edit" onclick="handleEdit('${value._id}')">Edit</p>
          <img onclick="deleteTask('${value._id}')" src="../../Asset/bin_484611.png" alt="Delete">
        </div>
      </div>
      <div class="date-of-task">
        <div class="date">
          <p>Upload date: ${formattedDate}</p>
          <p>Updated date: ${dayOfMonth}/${currMonth}/${currYear}</p>
        </div>
        <div>
          <p>Upload time: ${value.time}</p>
          <p>Updated time: ${time}</p>
        </div>
      </div>
    </div>
  `;
}

async function progressDrop(ev) {
  try {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(id));
    console.log("Dropped in progress section");
    console.log("ID of dropped item: ", id);

    const updatedData = { stage: "In progress" };
    const response = await fetch(`${BASE_URL}/updateTask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const resPro = await response.json();
    console.log("resPro: ", resPro);
  } catch (error) {
    console.error("Error in progressDrop:", error);
  }

  window.location.reload();
}

function allowDrop(ev) {
  ev.preventDefault();
}

displayPro();
