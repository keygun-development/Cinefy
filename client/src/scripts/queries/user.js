import { API_URL } from "../constants.js";
import { setUserValues } from "../components/user.js";

export async function getUser() {
  if (!localStorage.getItem("user")) {
    // Because we have no user authentication let's just get a random user
    const users = await fetch(`${API_URL}/users`);
    const usersData = await users.json();
    const randomUser = usersData[Math.floor(Math.random() * usersData.length)];
    // Let's store the user in the local storage so we don't have to fetch it again
    // Usually we would use a token or a cookie to store the user
    localStorage.setItem("user", JSON.stringify(randomUser));
    return randomUser;
  }
  return JSON.parse(localStorage.getItem("user"));
}

export async function updateUser(user) {
  if (user) {
    const result = await fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await result.json();
  }
  return null;
}
