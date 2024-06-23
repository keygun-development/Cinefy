import { createNewMovieObject } from "./movie.js";

let perPage = 15;
let page = 1;
let currentData = [];

const currentPage = document.getElementById("page");
const totalPages = document.getElementById("total-pages");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const select = document.getElementById("genre-select");

if (prev) {
  prev.addEventListener("click", function () {
    if (page > 1) {
      page--;
      currentPage.textContent = page.toString();
      updateDisplay();
    }
  });
}

if (next) {
  next.addEventListener("click", function () {
    const totalPageCount = Math.ceil(currentData.length / perPage);
    if (page < totalPageCount) {
      page++;
      currentPage.textContent = page.toString();
      updateDisplay();
    }
  });
}

if (select) {
  select.addEventListener("change", async function () {
    page = 1;
    currentPage.textContent = page.toString();
  });
}

export function paginate(data) {
  currentData = data;
  updateDisplay();
}

function updateDisplay() {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = currentData.slice(start, end);
  totalPages.textContent = Math.ceil(currentData.length / perPage).toString();

  prev.disabled = page === 1;

  next.disabled = page === Math.ceil(currentData.length / perPage);

  const trendingList = document.getElementById("movielist");
  trendingList.innerHTML = "";
  paginatedItems.forEach((movie) => {
    trendingList.appendChild(createNewMovieObject(movie));
  });
}
