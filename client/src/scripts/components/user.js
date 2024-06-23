import { user } from "../app.js";

const profilePicture = document.getElementById("profile-picture");
const profilePictureBig = document.getElementById("profile-picture-big");
const profileName = document.getElementById("profile-name");

export function setUserValues() {
  if (profilePicture) {
    profilePicture.src = `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${user.firstname}_${user.lastname}`;
  }
  if (profilePictureBig) {
    profilePictureBig.src = `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${user.firstname}_${user.lastname}`;
  }
  if (profileName) {
    profileName.textContent = `${user.firstname} ${user.lastname}`;
  }
}
