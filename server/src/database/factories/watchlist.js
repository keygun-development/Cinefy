import db from "../../db.js";
import watchlists from "../seeders/watchlist.js";

// This function seeds the watchlists table with the watchlists from the watchlists array.
export function seed() {
  const watchListCount = db.prepare("SELECT COUNT(*) from watchlists").get();

  if (watchListCount["COUNT(*)"] === 0) {
    const insertUser = db.prepare(
      "INSERT INTO watchlists (user_id, movie_id) VALUES (@userId, @movieId)",
    );

    watchlists.forEach((movie) => {
      insertUser.run(movie);
    });
  }
}
