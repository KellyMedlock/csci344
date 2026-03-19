const user = {
  name: "Diana",
  age: 32,
  email: "diana@example.com",
  city: "Seattle",
  country: "USA",
};

// Use destructuring to extract name and age
// Use rest operator (...) to collect the remaining properties
// Print the extracted values and the rest object

const { name, age, ...rest } = user;

console.log(name);
console.log(age);
console.log(rest);
