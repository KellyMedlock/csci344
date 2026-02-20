let navEl = document.querySelector(".nav-links");

function toggleMenu() {
  if (navEl.classList.contains("active")) {
    navEl.classList.remove("active");
  } else {
    navEl.classList.add("active");
  }
}
