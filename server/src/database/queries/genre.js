import db from "../../db.js";

export function getGenresQuery(name) {
  if (name) {
    return db
      .prepare("SELECT * FROM genres WHERE LOWER(name) = LOWER(?)")
      .all(name);
  } else {
    return db.prepare("SELECT * FROM genres").all();
  }
}

export function getGenreByIdQuery(id) {
  return db.prepare("SELECT * FROM genres WHERE id = " + id).get();
}
