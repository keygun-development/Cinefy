import db from "../../db.js";
import { seed } from "../factories/genre.js";

const createGenreTable = `CREATE TABLE IF NOT EXISTS genres
                          (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              name TEXT
                          )`;
db.prepare(createGenreTable).run();

seed();
