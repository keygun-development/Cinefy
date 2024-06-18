import db from "../../db.js";

export function getUsersQuery() {
  return db.prepare("SELECT * FROM users").all();
}

export function getUserByIdQuery(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}