// Make this UI work!

// 1. categorySelect() event listener function:
//     * accesses the selected category from the dom
//     * calls the fetchData function
//     * Attach the event listener to the select element's onchange event!
function categorySelect() {
  const categorySelectInput = document.querySelector("#category-select");
  fetchData(categorySelectInput);
}

// 2. fetchData(category) function:
//     * builds the url from the selected category
//       example: https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood
//     * issues the fetch request
//     * calls the displayData function (passing in the server data)
async function fetchData(category) {
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
  const endpoint = `${url}${category}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
}

// 3. displayData(serverData) function:
//     * accepts the data from the function
//     * iterates through the results
//     * builds an HTML representation of each result and appends it to the DOM.
