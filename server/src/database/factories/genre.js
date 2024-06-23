import db from "../../db.js";
import genres from "../seeders/genre.js";

// This function seeds the genres table with the genres from the genres array.
export function seed() {
  const genreCount = db.prepare("SELECT COUNT(*) from genres").get();

  if (genreCount["COUNT(*)"] === 0) {
    const insertGenre = db.prepare("INSERT INTO genres (name) VALUES (@name)");

    genres.forEach((genre) => {
      insertGenre.run(genre);
    });
  }
}
