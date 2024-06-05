import Database from "better-sqlite3";

let db;
try {
  db = new Database("../db/data.sqlite");
} catch (e) {
  console.error(e);
}

export default db;
