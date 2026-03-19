const original = {
  name: "Eve",
  age: 20,
  courses: ["CSCI 182", "CSCI 344"],
};

// Use spread operator to create a shallow copy
// Modify the copy's name property
// Modify the copy's courses array (add a new course)
// Print both original and copy to see the difference
const copy = { ...original, courses: [...original.courses] };

copy.name = "Evelyn";
copy.courses.push("NM 420");

console.log(original);
console.log(copy);

// deep copy
const copy1 = JSON.parse(JSON.stringify(original));
copy1.courses.push("NM 101");
console.log(copy1);
