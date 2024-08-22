"use strict";

// Function to initialize the TinySlider
const initializeTinySlider = () => {
  const sliders = document.querySelectorAll(".testimonial-slider");

  if (sliders.length > 0) {
    tns({
      container: ".testimonial-slider",
      items: 1,
      axis: "horizontal",
      controlsContainer: "#testimonial-nav",
      swipeAngle: false,
      speed: 700,
      nav: true,
      controls: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3500,
      autoplayButtonOutput: false,
    });
  }
};

// Function to show content based on the index
const showContent = (contentNumber) => {
  const contents = document.querySelectorAll(".content");

  contents.forEach((content, index) => {
    content.style.display = (index === contentNumber - 1) ? "block" : "none";
  });
};

// Function to handle quantity increase and decrease
const sitePlusMinus = () => {
  const quantityContainers = document.getElementsByClassName("quantity-container");

  const updateQuantity = (quantityAmount, increment) => {
    let value = parseInt(quantityAmount.value, 10);
    value = isNaN(value) ? 0 : value;
    value = increment ? value + 1 : (value > 0 ? value - 1 : 0);
    quantityAmount.value = value;
  };

  const createBindings = (quantityContainer) => {
    const quantityAmount = quantityContainer.querySelector(".quantity-amount");
    const increase = quantityContainer.querySelector(".increase");
    const decrease = quantityContainer.querySelector(".decrease");

    increase.addEventListener("click", () => updateQuantity(quantityAmount, true));
    decrease.addEventListener("click", () => updateQuantity(quantityAmount, false));
  };

  Array.from(quantityContainers).forEach(createBindings);
};

// Initialize all components
const initializeComponents = () => {
  initializeTinySlider();
  sitePlusMinus();
};

// Call the initialization function
initializeComponents();
