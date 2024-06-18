import db from "../../db.js";

export function getMoviesQuery(...params) {
  let { per_page, page, genre } = params;

  if ((!per_page || !page) && genre) {
    return db.prepare("SELECT * FROM movies WHERE genreId = ?").all(genre);
  }

  if (per_page && page && !genre) {
    return db
      .prepare("SELECT * FROM movies WHERE OFFSET = ?, LIMIT = ?")
      .all(per_page, page);
  }

  if (genre) {
    return db
      .prepare("SELECT * FROM movies WHERE OFFSET = ?, LIMIT = ?, genreId = ?")
      .all(per_page, page, genre);
  }

  return db.prepare("SELECT * FROM movies").all();
}

export function getMovieByIdQuery(id) {
  return db.prepare("SELECT * FROM movies WHERE id = " + id).get();
}
