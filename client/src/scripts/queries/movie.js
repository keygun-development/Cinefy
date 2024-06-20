import { API_URL } from "../constants.js";

export async function getMovies() {
  const res = await fetch(`${API_URL}/movies`);
  return await res.json();
}

export async function getMovieById(movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}`);
  return await res.json();
}
