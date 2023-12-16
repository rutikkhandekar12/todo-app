async function login() {
  const warn = document.getElementById("warning");
  const emailInput = document.getElementById("email1");
  const passwordInput = document.getElementById("password1");
  const email = emailInput.value.trim(); 
  const password = passwordInput.value.trim();

  // Clear previous warning messages
  warn.innerHTML = '';

  // Check if the email and password are not empty
  if (email === "" || password === "") {
    const warningDiv = document.createElement('div');
    warningDiv.style.color = 'red';
    const warningText = document.createElement('p');
    warningText.textContent = 'Please fill in all fields';
    warningDiv.appendChild(warningText);
    warn.appendChild(warningDiv);
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    const messageDiv = document.createElement('div');
    const messageText = document.createElement('p');

    if (response.ok) {
      messageDiv.style.color = 'green';
      messageText.textContent = data.message;
      messageDiv.appendChild(messageText);
      warn.appendChild(messageDiv);
      
      // Redirect after successful login
      localStorage.setItem("User", email);
      setTimeout(() => {
        location.href = "../../main/Home/Home.html";
      }, 2000);
    } else {
      messageDiv.style.color = 'red';
      messageText.textContent = data.message;
      messageDiv.appendChild(messageText);
      warn.appendChild(messageDiv);
    }
  } catch (error) {
    console.log(error);
  }
}
