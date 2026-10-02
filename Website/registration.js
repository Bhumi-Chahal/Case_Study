const userEmail = sessionStorage.getItem("userEmail");
const selectedEvent = sessionStorage.getItem("selectedEvent");

document.getElementById("userEmail").textContent =
    userEmail || "student@gmail.com";


if (selectedEvent === "techfest") {

    document.getElementById("selectedEvent").textContent =
        "TechFest 2026 - 15 October 2026";

} else if (selectedEvent === "cultural") {

    document.getElementById("selectedEvent").textContent =
        "Cultural Night - 18 October 2026";

} else if (selectedEvent === "sports") {

    document.getElementById("selectedEvent").textContent =
        "Sports Meet - 20 October 2026";

} else {

    document.getElementById("selectedEvent").textContent =
        "No event selected";
}


document.getElementById("registerButton").addEventListener(
    "click",
    function() {

        document.getElementById("registrationMessage").textContent =
            "Registration Successful";

    }
);