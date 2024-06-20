import db from "../../db.js";
import { seed } from "../factories/movie.js";

const createMovieTable = `CREATE TABLE IF NOT EXISTS movies
                          (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              title TEXT,
                              description TEXT,
                              thumbnail TEXT,
                              year INTEGER,
                              link TEXT,
                              genre_id INTEGER NOT NULL,
                              FOREIGN KEY(genre_id) REFERENCES genres(id) ON DELETE CASCADE
                          )`;
db.prepare(createMovieTable).run();

seed();
