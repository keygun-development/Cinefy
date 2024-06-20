import db from "../../db.js";

export function getWatchlistsQuery() {
  return db.prepare("SELECT * FROM watchlists").all();
}

export function getWatchlistByUserIdQuery(userId) {
  return db.prepare("SELECT * FROM watchlists WHERE user_id = ?").all(userId);
}

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

export function getMovieFromUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("SELECT * FROM watchlists WHERE user_id = ? AND movie_id = ?")
    .get(userId, movieId);
}

export function addMovieToUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("INSERT INTO watchlists (user_id, movie_id) VALUES (?, ?)")
    .run(userId, movieId);
}

export function removeMovieFromUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("DELETE FROM watchlists WHERE user_id = ? AND movie_id = ?")
    .run(userId, movieId);
}
