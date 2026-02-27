let counter = 0;
const counterEl = document.querySelector("#counter");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");

function increment() {
  counter++;
  updateDisplay();
}

function decrement() {
  counter--;
  updateDisplay();
}

function reset() {
  counter = 0;
  updateDisplay();
}

function updateDisplay() {
  counterEl.textContent = counter;
  if (counter > 0) {
    counterEl.style.color = "#4CAF50";
  } else if (counter < 0) {
    counterEl.style.color = "#f44336";
  } else {
    counterEl.style.color = "#666";
  }
}

updateDisplay();
