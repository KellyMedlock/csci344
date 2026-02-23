let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(index) {
  let i = 0;
  let slides = document.querySelectorAll(".slide");
  for (let j = 0; j < slides.length; j++) {
    console.log(slides[j]);
  }

  if (index > slides.length) {
    slideIndex = 1;
  }
  if (index < 1) {
    slideIndex = slides.length;
  }

  for (i; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "flex";
}
