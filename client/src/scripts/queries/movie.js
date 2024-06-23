import { API_URL } from "../constants.js";

export async function getMovies() {
  const res = await fetch(`${API_URL}/movies`);
  return await res.json();
}

export async function getMovieById(movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}`);
  return await res.json();
}

export async function getMoviesByGenreId(genreId) {
  const res = await fetch(`${API_URL}/movies?genre=${genreId}`);
  return await res.json();
}

export async function getMoviesPaginated(page = 1, perPage = 15) {
  const res = await fetch(`${API_URL}/movies?page=${page}&per_page=${perPage}`);
  return await res.json();
}
