const original = [1, 2, 3, 4, 5];

// Use spread operator to create a copy
// Modify the copy (add a new element)
// Print both arrays to show they are independent

const copy = [...original];
copy.push(6);

console.log(original);
console.log(copy);
