const students = [
  { name: "Alice", age: 20, grade: 85, major: "Computer Science" },
  { name: "Bob", age: 21, grade: 92, major: "Mathematics" },
  { name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
  { name: "Diana", age: 22, grade: 95, major: "Physics" },
  { name: "Eve", age: 20, grade: 88, major: "Computer Science" },
];

// Your code here (hint: use template literals)
function filterCompSci(students) {
  return students.major == "Computer Science";
}

function gradeSort(a, b) {
  return a.grade - b.grade;
}

function htmlSetup(object) {
  console.log(
    `<p><strong>${object.name}</strong> ${object.grade} (${object.major})</p>`,
  );
}

const compSciStudents = students.filter(filterCompSci);

// console.log(compSciStudents);

const sortedCompSciStudents = compSciStudents.toSorted(gradeSort);

// console.log(sortedCompSciStudents);

sortedCompSciStudents.forEach(htmlSetup);
