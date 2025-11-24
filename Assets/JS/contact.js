document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector(".contact-form form");
    let modal = document.createElement("div");

    // Create the modal structure
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <p>Thank you! Your request has been received.</p>
            <button class="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        modal.style.display = "flex";
        modal.classList.add("fade-in");
    });

    // Close the modal
    let closeModal = () => {
        modal.classList.remove("fade-in");
        modal.classList.add("fade-out");
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("fade-out");
        }, 500); // Match the fade-out animation duration
    };

    modal.querySelector(".close-modal").addEventListener("click", closeModal);

    // Close modal when clicking outside the content
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
