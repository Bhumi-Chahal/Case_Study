const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "student@gmail.com" && password === "123456") {

        sessionStorage.setItem("userEmail", email);

        window.location.href = "selection.html";

    } else {

        document.getElementById("errorMessage").textContent =
            "Invalid email or password";

    }
});