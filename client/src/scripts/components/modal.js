import { getMovieById } from "../queries/movie.js";
import { getGenreById } from "../queries/genre.js";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalGenre = document.getElementById("modal-genre");
const modalYear = document.getElementById("modal-year");
const modalLink = document.getElementById("modal-link");
const modalDescription = document.getElementById("modal-description");
const modalButton = document.getElementById("modal-button");
const back = document.getElementById("modal-back");

if (back) {
  back.addEventListener("click", function () {
    modal.classList.remove("active");
    modal.setAttribute("data-open", "false");
    document.body.classList.remove("no-scroll");
  });
}

export async function setModalInfo(movieId) {
  const movie = await getMovieById(movieId);
  const genre = await getGenreById(movie.genre_id);
  modalImg.src = movie.thumbnail;
  modalTitle.textContent = movie.title;
  modalGenre.textContent = genre.name;
  modalYear.textContent = movie.year;
  modalDescription.textContent = movie.description;
  modalLink.href = movie.link;
  modalButton.setAttribute("data-movieid", movie.id);
}
