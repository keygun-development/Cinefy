import db from "../../db.js";
import movies from "../seeders/movie.js";

export function seed() {
  const movieCount = db.prepare("SELECT COUNT(*) from movies").get();

  if (movieCount["COUNT(*)"] === 0) {
    const insertMovie = db.prepare(
      "INSERT INTO movies (title, description, thumbnail, year, link, genre_id) VALUES (@title, @description, @thumbnail, @year, @link, @genreId)",
    );

    movies.forEach((movie) => {
      insertMovie.run(movie);
    });
  }
}
