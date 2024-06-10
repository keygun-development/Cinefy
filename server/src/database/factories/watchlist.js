import db from "../../db.js";
import watchlists from "../seeders/watchlist.js";

export function seed() {
  const watchListCount = db.prepare("SELECT COUNT(*) from watchlists").get();

  if (watchListCount["COUNT(*)"] === 0) {
    const insertUser = db.prepare(
      "INSERT INTO watchlists (userId, movieId) VALUES (@userId, @movieId)",
    );

    watchlists.forEach((movie) => {
      insertUser.run(movie);
    });
  }
}
