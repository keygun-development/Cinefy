import db from "../../db.js";

// Get all users
export function getUsersQuery(firstname) {
  if (firstname) {
    return db.prepare("SELECT * FROM users WHERE firstname = ?").all(firstname);
  }
  return db.prepare("SELECT * FROM users").all();
}

// Get user by id
export function getUserByIdQuery(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

// Create user
export function updateUserQuery(id, user) {
  db.prepare("UPDATE users SET firstname = ?, lastname = ? WHERE id = ?").run(
    user.firstname,
    user.lastname,
    id
  );
}
