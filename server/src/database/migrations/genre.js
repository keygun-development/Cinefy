import db from "../../db.js";
import { seed } from "../factories/genre.js";

// This migration creates the genres table.
const createGenreTable = `CREATE TABLE IF NOT EXISTS genres
                          (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              name TEXT
                          )`;
db.prepare(createGenreTable).run();

seed();
