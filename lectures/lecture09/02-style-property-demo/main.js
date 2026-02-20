const makeRed = () => {
  // your code here...
  console.log("Change background to red");
  document.querySelector("#section1").style.backgroundColor = "red";
};

const makeBlue = () => {
  // your code here...
  console.log("Change background to blue");
  document.querySelector("#section2").style.backgroundColor = "blue";
};

const makePink = () => {
  // your code here...
  console.log("Change background to pink");
  document.querySelector("#section3").style.backgroundColor = "pink";
};

const makeOrange = () => {
  // your code here...
  console.log("Change background to orange");
  document.querySelector("#section4").style.backgroundColor = "orange";
};

const changeColor = (color, id) => {
  console.log(`Change background to ${color}`);
  document.querySelector(id).style.backgroundColor = color;
  document.querySelector(id).style.fontWeight = "bold";
};

const resetStyles = () => {
  console.log("Reset styles for each section");
  document.querySelectorAll(".my-section").style.backgroundColor = transparent;
  document.querySelectorAll(".my-section").style.fontWeight = "unset";
};
