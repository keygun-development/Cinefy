import db from "../../db.js";
import users from "../seeders/user.js";

export function seed() {
  const userCount = db.prepare("SELECT COUNT(*) from users").get();

  if (userCount["COUNT(*)"] === 0) {
    const insertUser = db.prepare(
      "INSERT INTO users (firstname, lastname) VALUES (@firstname, @lastname)",
    );

    users.forEach((movie) => {
      insertUser.run(movie);
    });
  }
}
