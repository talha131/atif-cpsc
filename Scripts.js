document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Toggle the nav-links visibility on hamburger click
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

// Scroll Animation Trigger
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".fade-in-on-scroll");
  elements.forEach((element) => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (position < windowHeight - 100) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  });
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Get the image source from the clicked gallery item
    const imageSrc = this.querySelector("img").src;

    // Set the source of the modal image to the clicked image's source
    modalImage.src = imageSrc;

    // Show the modal
    modal.style.display = "block";
  });
});
