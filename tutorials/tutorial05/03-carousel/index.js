let currentPosition = 0;
// creates a variable called currentPosition and sets its value to 0
let gap = 10;
// creates a variable called gap and sets its value to 10
const slideWidth = 400;
// creates a variable called slideWidth and sets its value to 400

// creates a function called moveCarousel that takes a parameter for direction
function moveCarousel(direction) {
  // creates a variable called items that is set to all of the elements in the DOM with class 'carousel-item'
  const items = document.querySelectorAll(".carousel-item");

  // if direction is equal to the string 'forward' then check if the currentPosition is greater than or equal to the number
  // of slide elements minus 2, if it is do nothing, otherwise increment currentPosition by 1. If direction is not equal to
  // the string 'forward' then check is currentPosition is equal to 0, if it is do nothing, otherwise decrement
  // currentPosition by 1.
  if (direction == "forward") {
    // minus 2 b/c first 2 slides already showing
    if (currentPosition >= items.length - 2) {
      return false;
    }
    currentPosition++;
  } else {
    if (currentPosition == 0) {
      return false;
    }
    currentPosition--;
  }

  // create a variable called offset that is equal to slideWidth + gap multiplied by currentPosition
  const offset = (slideWidth + gap) * currentPosition;

  // for each item in the variable items, set their transform css variable to translateX(with a negative value of the
  // variable of offset in pixels)
  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`;
  }
}
