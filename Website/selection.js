const selectionForm = document.getElementById("selectionForm");

selectionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const selectedEvent = document.querySelector(
        'input[name="event"]:checked'
    );

    if (selectedEvent) {

        sessionStorage.setItem("selectedEvent", selectedEvent.value);

        window.location.href = "registration.html";

    } else {

        document.getElementById("selectionMessage").textContent =
            "Please select an event.";

    }
});