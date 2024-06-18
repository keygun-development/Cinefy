import db from "../../db.js";

export function getWatchlistsQuery() {
  return db.prepare("SELECT * FROM watchlists").all();
}

export function getWatchlistByUserIdQuery(userId) {
  return db.prepare("SELECT * FROM watchlists WHERE userId = ?").all(userId);
}

export function getWatchlistMoviesByUserIdQuery(userId) {
  return db
    .prepare(
      `
      SELECT m.*
      FROM watchlists w
      JOIN movies m ON w.movieId = m.id
      WHERE w.userId = ?
    `,
    )
    .all(userId);
}

export function getMovieFromUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("SELECT * FROM watchlists WHERE userId = ? AND movieId = ?")
    .get(userId, movieId);
}

export function addMovieToUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("INSERT INTO watchlists (userId, movieId) VALUES (?, ?)")
    .run(userId, movieId);
}

export function removeMovieFromUserWatchlistQuery(userId, movieId) {
  return db
    .prepare("DELETE FROM watchlists WHERE userId = ? AND movieId = ?")
    .run(userId, movieId);
}
