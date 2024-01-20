// Global variables
let page = 1;
let token = "fm7Cti7PfO--g-49PdF0rzLWWyzv7PhAlsquZ0iw06s";

// Reference to pagination section
let paginationEl = document.getElementById("pagination");

// Buttons for pagination
let paginationBtns = paginationEl.getElementsByTagName("button");

// Search button
let searchBtn = document.getElementById("search-btn");

// Event listeners for pagination buttons
paginationBtns[0].addEventListener("click", goBack);
paginationBtns[1].addEventListener("click", goForward);

// Initial data retrieval and display
getPlants();

// Event listener for search button
searchBtn.addEventListener("click", function () {
  let input = document.getElementById("search-input");

  // For validate search input
  if (input.value === "") return;
  if (input.value.length < 4) return;

  // For triggering search function
  searchPlants(input.value);
});

// Pagination function: This is for going back to the previous page
function goBack() {
  if (page == 1) {
    return;
  }
  page = page - 1;
  updatePage();
  getPlants();
}

// Pagination function: This is for going forward to the next page
function goForward() {
  page = page + 1;
  updatePage();
  getPlants();
}

// For updating the displayed page number in the pagination section
function updatePage() {
  let span = paginationEl.getElementsByTagName("span")[0];
  span.innerText = page;
}

// For fetching plant data from the Trefle API based on the current page
function getPlants() {
  fetch(
    "https://corsproxy.io/?" +
      `https://trefle.io/api/v1/plants?token=${token}&page=${page}`,
    {
      method: "GET",
      contentType: "application/json",
    }
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      displayPlants(data.data);
    });
}

// For fetching plant data based on the search query
function searchPlants(q) {
  if (q === "" || q === null || q === undefined) {
    return;
  }

  fetch(
    "https://corsproxy.io/?" +
      `https://trefle.io/api/v1/plants/search?token=${token}&q=${q}`,
    { method: "GET", contentType: "application/json" }
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      displayPlants(data.data);
    });
}

// For display plant information on the webpage
function displayPlants(data) {
  let divEl = document.getElementById("all-plants");

  let plants = "";
  for (let i = 0; i < data.length; i++) {
    let plant = data[i];
    plants =
      plants +
      `
      <div class="a-plant">
        <img src="${plant.image_url}" />
        <div>
          <p>Name:<span>${plant.common_name}</span></p>
        </div>
      </div> 
      `;
  }

  divEl.innerHTML = plants;
}
