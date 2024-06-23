// Just a global error message handler
const error = document.getElementById("error");

export function setError(message) {
  error.textContent = message;
}
