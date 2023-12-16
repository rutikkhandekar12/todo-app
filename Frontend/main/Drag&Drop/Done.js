async function displayDone() {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${currentUser}`);
    const data = await response.json();
    console.log("data:", data);

    const entireInfo = data
      .filter(value => value.stage === "Done")
      .map(value => createTaskHTML(value))
      .join("");

    done.innerHTML = entireInfo;
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
        <div>
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

async function doneDrop(ev) {
  try {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(id));
    console.log("Dropped in done section");
    console.log("ID of dropped item: ", id);

    const updatedData = { stage: "Done" };

    const response = await fetch(`${BASE_URL}/updateTask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const resDone = await response.json();
    console.log(resDone);
  } catch (error) {
    console.error("Error in doneDrop:", error);
  }

  // Refresh the page to reflect changes
  window.location.reload();
}

function allowDrop(ev) {
  ev.preventDefault();
}

displayDone();
