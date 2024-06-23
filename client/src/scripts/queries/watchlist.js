import { API_URL } from "../constants.js";
import { user } from "../app.js";

export async function addMovieToWatchlist(movieId) {
  if (movieId) {
    return await fetch(`${API_URL}/watchlists/${user.id}/${movieId}`, {
      method: "POST",
    });
  }
  return null;
}

export async function getWatchlistMovies() {
  const res = await fetch(`${API_URL}/watchlists/${user.id}/movies`);
  return await res.json();
}

export async function removeMovieFromWatchlist(movieId) {
  if (movieId) {
    return await fetch(`${API_URL}/watchlists/${user.id}/${movieId}`, {
      method: "DELETE",
    });
  }
  return null;
}
