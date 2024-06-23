import { getAllGenres } from "../queries/genre.js";
import { getMovies, getMoviesByGenreId } from "../queries/movie.js";
import { paginate } from "./pagination.js";

const genres = await getAllGenres();
const select = document.getElementById("genre-select");
const movieList = document.getElementById("movielist");

if (select) {
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    select.appendChild(option);
  });

  select.addEventListener("change", async function () {
    let moviesByGenre = await getMoviesByGenreId(this.value);
    if (moviesByGenre.length > 0) {
      paginate(moviesByGenre);
    } else {
      let movies = await getMovies();
      paginate(movies);
    }
  });
}

if (movieList) {
  let movies = await getMovies();
  paginate(movies);
}
