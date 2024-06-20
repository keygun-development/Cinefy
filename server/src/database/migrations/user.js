import db from "../../db.js";
import { seed } from "../factories/user.js";

const createUserTable = `CREATE TABLE IF NOT EXISTS users
                          (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              firstname TEXT,
                              lastname TEXT
                          )`;
db.prepare(createUserTable).run();

seed();
