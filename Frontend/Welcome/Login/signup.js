async function signup() {
  let warn = document.getElementById("warning");
  let name = document.getElementById("name");
  let email = document.getElementById("email").value;
  let cpassword = document.getElementById("cpassword");
  let passwordInput = document.getElementById("password");

  console.log("email in signup: ", email);
  let password = passwordInput.value.trim();
  cpassword = cpassword.value.trim();
  name = name.value.trim();

  // Clear previous warnings
  warn.innerHTML = "";

  // Function to create and append a warning message
  const appendWarning = (message, color) => {
    let warningMessage = document.createElement("div");
    warningMessage.style.color = color;

    let p = document.createElement("p");
    p.textContent = message;
    warningMessage.appendChild(p);
    warn.appendChild(warningMessage);
  };

  // Check if the email and password are not empty
  if (email === "" || password === "" || name === "" || cpassword === "") {
    appendWarning("Please fill in all fields", "red");
    return;
  }
  if (password !== cpassword) {
    appendWarning("Passwords must be same.", "red");
    return;
  }
  if (password.length < 6) {
    appendWarning("Password must contain char greater than 6", "red");
    return;
  }
  
  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      appendWarning(data.message, "green");

      // Dispatch the custom event after successful signup
      const signupEvent = new CustomEvent("signupSuccess", { detail: { email } });
      document.dispatchEvent(signupEvent);
      localStorage.setItem("User", email);

      // Redirect after successful signup
      setTimeout(() => {
        location.href = "../../main/Home/Home.html";
      }, 2000);
    } else {
      appendWarning(data.message, "red");
    }
  } catch (error) {
    console.log(error);
  }
}
