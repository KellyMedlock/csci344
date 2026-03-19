const students = [
  { name: "Alice", age: 20, grade: 85, major: "Computer Science" },
  { name: "Bob", age: 21, grade: 92, major: "Mathematics" },
  { name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
  { name: "Diana", age: 22, grade: 95, major: "Physics" },
  { name: "Eve", age: 20, grade: 88, major: "Computer Science" },
];

console.log(students);

// const sortByMajorAlph = (a, b) => {
//   a.major.localeCompare(b.major);
// };

function sortByGradeAlph(a, b) {
  return a.grade - b.grade;
}

const sortedStudents = students.toSorted(sortByGradeAlph);

console.log(sortedStudents);
