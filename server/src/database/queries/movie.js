import db from "../../db.js";

export function getMoviesQuery(...params) {
  let { per_page, page, genre } = params;

  if ((!per_page || !page) && genre) {
    return db.prepare("SELECT * FROM movies WHERE genre_id = ?").all(genre);
  }

  if (per_page && page && !genre) {
    return db
      .prepare("SELECT * FROM movies WHERE OFFSET = ?, LIMIT = ?")
      .all(per_page, page);
  }

  if (genre) {
    return db
      .prepare("SELECT * FROM movies WHERE OFFSET = ?, LIMIT = ?, genre_id = ?")
      .all(per_page, page, genre);
  }

  return db.prepare("SELECT * FROM movies").all();
}

export function getMovieByIdQuery(id) {
  return db.prepare("SELECT * FROM movies WHERE id = " + id).get();
}
