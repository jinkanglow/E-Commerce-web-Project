//Modal class
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close");

  // Show the modal when the page loads
  modal.style.display = "flex";
  document.body.classList.add("modal-open");

  // Function to close the modal
  const closeModal = () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  };

  // Close the modal when the user clicks on the close button or outside of the modal
  const handleClick = (event) => {
    if (event.target === modal || event.target === closeButton) {
      closeModal();
    }
  };

  window.addEventListener("click", handleClick);
});

