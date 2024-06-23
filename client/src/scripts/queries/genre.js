import { API_URL } from "../constants.js";

export async function getGenreById(id) {
  const res = await fetch(`${API_URL}/genres/${id}`);
  return await res.json();
}

export async function getAllGenres() {
  const res = await fetch(`${API_URL}/genres`);
  return await res.json();
}
