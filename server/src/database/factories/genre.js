import db from "../../db.js";
import genres from "../seeders/genre.js";

export function seed() {
  const genreCount = db.prepare("SELECT COUNT(*) from genres").get();

  if (genreCount["COUNT(*)"] === 0) {
    const insertGenre = db.prepare("INSERT INTO genres (name) VALUES (@name)");

    genres.forEach((genre) => {
      insertGenre.run(genre);
    });
  }
}
