import Database from "better-sqlite3";

let db;
try {
  // Database is created and connected to the file data.sqlite
  db = new Database("db/data.sqlite");
} catch (e) {
  console.error(e);
}

export default db;
