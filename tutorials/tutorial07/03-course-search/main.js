let searchTerm = "";
let openOnly = false;

function isClassFull(course) {
  // Return true if course.Classification.Open === false
  if (course.Classification.Open === false) {
    return true;
  }
}

function getInstructorNames(instructors) {
  return instructors.Name;
}

function doesTermMatch(course) {
  // If searchTerm is empty, return true (show all courses)
  // Convert searchTerm to lowercase
  // Check if searchTerm appears in (all converted to lowercase):
  //   - course.Code
  //   - course.Title
  //   - course.CRN (convert to string first)
  //   - course.Instructors[].Name (use map to get all names, then join)
  // Use includes() for case-insensitive matching
  // Return true if searchTerm matches any of these fields
  if (searchTerm === "") {
    return true;
  }

  const instructorNames = course.Instructors[0].Name.toLowerCase();
  // console.log(instructorNames);
  const searchTermLower = searchTerm.toLowerCase();
  const courseCode = course.Code.toLowerCase();
  const courseTitle = course.Title.toLowerCase();
  const courseCRN = String(course.CRN);

  return (
    courseCode.includes(searchTermLower) ||
    courseTitle.includes(searchTermLower) ||
    courseCRN.includes(searchTermLower) ||
    instructorNames.includes(searchTermLower)
  );
}

function dataToHTML(course) {
  const instructorNames = course.Instructors[0].Name;

  if (isClassFull(course)) {
    return `<section class="course-card">
        <h2>${course.Code}: ${course.Title}</h2>
        <p class="status closed">
            <i class="fa-solid fa-circle-xmark"></i>
            Closed &bull; ${course.CRN} &bull; Number on Waitlist 0
        </p>
        <p>
            ${course.Days} &bull; ${course.Location.FullLocation}&bull; ${course.Hours} credit hour(s)
        </p>
        <p>
            <strong>${instructorNames}</strong>
        </p>
    </section>`;
  } else {
    return `<section class="course-card">
        <h2>${course.Code}: ${course.Title}</h2>
        <p class="status open">
            <i class="fa-solid fa-circle-check"></i>
            Open &bull; ${course.CRN} &bull; Seats Available: 14
        </p>
        <p>
            ${course.Days} &bull; ${course.Location.FullLocation}&bull; ${course.Hours} credit hour(s)
        </p>
        <p>
            <strong>${instructorNames}</strong>
        </p>
    </section>`;
  }
}

function showMatchingCourses() {
  // 1. Get the .courses container element
  // 2. Clear it
  // 3. Start with courseList (from course-data.js)
  // 4. Apply the filters and store the matched courses in a variable
  // 5. If no courses match, display "No courses match your search." and return
  // 6. Output each course to the .courses container (forEach + insertAdjacentHTML)
  const displayedCourses = document.querySelector(".courses");

  displayedCourses.innerHTML = "";

  let filteredCourses = courseList.filter(doesTermMatch);
  console.log(filteredCourses);
  if (openOnly === true) {
    filteredCourses = filteredCourses.filter((course) => !isClassFull(course));
  }
  console.log(filteredCourses);

  if (filteredCourses.length === 0) {
    displayedCourses.innerHTML = "<h1>No courses match your search.</h1>";
    return;
  }

  filteredCourses.forEach((course) => {
    displayedCourses.insertAdjacentHTML("beforeend", dataToHTML(course));
  });
}

function filterCourses() {
  // Update global variables (searchTerm and openOnly) by
  // reaching into the DOM and retrieving their values
  // Invoke the showMatchingCourses() function
  const searchTermInput = document.querySelector("#search_term");
  const openOnlyInput = document.querySelector("#is_open");

  searchTerm = searchTermInput.value;
  openOnly = openOnlyInput.checked;

  showMatchingCourses();
}

showMatchingCourses();
