import db from "../../db.js";
import { seed } from "../factories/watchlist.js";

const createWatchlistTable = `CREATE TABLE IF NOT EXISTS watchlists
                              (
                                  id
                                  INTEGER
                                  PRIMARY
                                  KEY
                                  AUTOINCREMENT,
                                  userId
                                  INTEGER,
                                  movieId
                                  INTEGER
                              )`;
db.prepare(createWatchlistTable).run();

seed();
