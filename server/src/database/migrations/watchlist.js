import db from "../../db.js";
import { seed } from "../factories/watchlist.js";

const createWatchlistTable = `CREATE TABLE IF NOT EXISTS watchlists
                              (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  user_id INTEGER NOT NULL,
                                  movie_id INTEGER NOT NULL,
                                  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
                              )`;
db.prepare(createWatchlistTable).run();

seed();
