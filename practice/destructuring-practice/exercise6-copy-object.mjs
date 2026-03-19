const original = { name: "Charlie", age: 28, city: "Boston" };

// Use spread operator to create a copy
// Modify the copy (change the age)
// Print both objects to show they are independent

const copy = { ...original };
copy.age = 29;

console.log(original);
console.log(copy);
