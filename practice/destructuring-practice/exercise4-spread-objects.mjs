const basicInfo = { name: "Bob", age: 30 };
const contactInfo = { email: "bob@example.com", phone: "555-1234" };

// Use spread operator to merge the objects
// Print the merged object

const fullProfile = { ...basicInfo, ...contactInfo };

console.log(fullProfile);
