let page = 1;
let token = "fm7Cti7PfO--g-49PdF0rzLWWyzv7PhAlsquZ0iw06s"

let paginationEl = document.getElementById("pagination");

// both buttons.
let paginationBtns = paginationEl.getElementsByTagName("button");
//console.log(paginationBtns);

let searchBtn = document.getElementById("search-btn");

paginationBtns[0].addEventListener("click", goBack);
paginationBtns[1].addEventListener("click", goForward);

getPlants();

searchBtn.addEventListener("click", function () {
  let input = document.getElementById("search-input");

  if (input.value === "") return;

  if (input.value.length < 4) return;

  searchPlants(input.value);
});

// DRY ---> Do not repeat yourself
function goBack() {
  console.log("Back");
  if (page == 1) {
    return; // to exit a function
  }
  page = page - 1;
  updatePage();
  getPlants();
}

function goForward() {
  console.log("Go Forward");
  page = page + 1;
  updatePage();
  getPlants();
}

// Update the current page.
function updatePage() {
  let span = paginationEl.getElementsByTagName("span")[0];
  span.innerText = page;
}

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

function displayPlants(data) {
  let divEl = document.getElementById("all-plants");

  let plants = "";
  for (let i = 0; i < data.length; i++) {
    let plant = data[i];
    plants =
      plants +
      `
      <div class="a-plant">
      <img
        src="${plant.image_url}"
      />
      <div>
        <p>Name:<span>${plant.common_name}</span></p>
      </div>
    </div> 
      `;
  }

  //console.log(plants);

  divEl.innerHTML = plants;
}
