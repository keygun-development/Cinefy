import { getMovieById } from "../queries/movie.js";
import { getGenreById } from "../queries/genre.js";
import { getWatchlistMovies } from "../queries/watchlist.js";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalGenre = document.getElementById("modal-genre");
const modalYear = document.getElementById("modal-year");
const modalLink = document.getElementById("modal-link");
const modalDescription = document.getElementById("modal-description");
const modalButton = document.getElementById("modal-button");
const back = document.getElementById("modal-back");
const movieScreen = document.getElementById("movie-screen");

if (back) {
  back.addEventListener("click", function () {
    modal.classList.remove("active");
    modal.setAttribute("data-open", "false");
    document.body.classList.remove("no-scroll");
  });
}

export async function setModalInfo(movieId) {
  if (modalImg.src) {
    const movie = await getMovieById(movieId);
    const genre = await getGenreById(movie.genre_id);
    const watchlist =
      JSON.parse(localStorage.getItem("watchlist")) ||
      (await getWatchlistMovies());
    modalImg.src = movie.thumbnail;
    modalTitle.textContent = movie.title;
    modalGenre.textContent = genre.name;
    modalYear.textContent = movie.year;
    modalDescription.textContent = movie.description;
    modalButton.setAttribute("data-movieid", movie.id);
    modalButton.textContent = watchlist.some((m) => m.id === movie.id)
      ? "Remove from watchlist"
      : "Add to watchlist";
    modalLink.addEventListener("click", function () {
      movieScreen.classList.add("active");
      movieScreen.setAttribute("data-open", "true");
      // I don't really like to do it this way, usually using some framework this can be done way prettier
      movieScreen.innerHTML = `
<div class="button-back" id="movie-screen-back">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="#ffffff"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />

    </svg>
  </div>
      <iframe width="560" height="315" src="${movie.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      const movieScreenBack = document.getElementById("movie-screen-back");

      movieScreenBack.addEventListener("click", function () {
        movieScreen.classList.remove("active");
        movieScreen.setAttribute("data-open", "false");
        movieScreen.innerHTML = "";
      });
    });
  }
}
