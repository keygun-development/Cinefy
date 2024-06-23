import db from "../../db.js";

// Get all watchlists
export function getWatchlistsQuery() {
  return db.prepare("SELECT * FROM watchlists").all();
}

// Get watchlist by user id
export function getWatchlistByUserIdQuery(userId) {
  return db.prepare("SELECT * FROM watchlists WHERE user_id = ?").all(userId);
}

// Get movies on watchlist by user id
export function getWatchlistMoviesByUserIdQuery(userId) {
  return db
    .prepare(
      `
      SELECT m.*
      FROM watchlists w
      JOIN movies m ON w.movie_id = m.id
      WHERE w.user_id = ?
    `,
    )
    .all(userId);
}

// Get watchlist by user id and movie id
export function getMovieFromUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("SELECT * FROM watchlists WHERE user_id = ? AND movie_id = ?")
    .get(userId, movieId);
}

// Add movie to user watchlist
export function addMovieToUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("INSERT INTO watchlists (user_id, movie_id) VALUES (?, ?)")
    .run(userId, movieId);
}

// Remove movie from user watchlist
export function removeMovieFromUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("DELETE FROM watchlists WHERE user_id = ? AND movie_id = ?")
    .run(userId, movieId);
}
