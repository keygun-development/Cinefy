import { setNewUser, user } from "../app.js";
import { updateUser } from "../queries/user.js";
import { setError } from "./error.js";

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const profileForm = document.getElementById("profile-form");

export function setInputValues() {
  if (firstname && lastname) {
    firstname.value = user.firstname;
    lastname.value = user.lastname;
  }
}

if (profileForm) {
  profileForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(profileForm);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    if (!firstname || !lastname) {
      setError("Please fill in all fields");
    }
    const result = await updateUser({ id: user.id, firstname, lastname });
    setNewUser(result);
  });
}
