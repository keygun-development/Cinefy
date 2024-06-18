import { API_URL } from "../constants.js";

export async function addMovieToWatchlist(movieId) {
  return await fetch(`${API_URL}/watchlists/1/${movieId}`, {
    method: "POST",
  });
}

export async function getWatchlistMovies() {
  const res = await fetch(`${API_URL}/watchlists/1/movies`);
  return await res.json();
}
