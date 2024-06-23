import db from "../../db.js";

// Get all movies
export function getMoviesQuery(per_page, page, genre) {
  if ((!per_page || !page) && genre) {
    return db.prepare("SELECT * FROM movies WHERE genre_id = ?").all(genre);
  }

  if (per_page && page && !genre) {
    return db
      .prepare("SELECT * FROM movies LIMIT ? OFFSET ?")
      .all(per_page, page);
  }

  if (genre) {
    return db
      .prepare("SELECT * FROM movies WHERE genre_id = ? LIMIT ? OFFSET ?")
      .all(per_page, page, genre);
  }

  return db.prepare("SELECT * FROM movies").all();
}

// Get movie by id
export function getMovieByIdQuery(id) {
  return db.prepare("SELECT * FROM movies WHERE id = " + id).get();
}
