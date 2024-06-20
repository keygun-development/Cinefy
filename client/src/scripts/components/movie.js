import { setModalInfo } from "./modal.js";

export function createNewMovieObject(movie) {
  const modal = document.getElementById("modal");
  const newMovie = document.createElement("div");
  newMovie.classList.add("card");
  newMovie.setAttribute("data-trigger", "true");
  newMovie.innerHTML = `
                    <img src="${movie.thumbnail}" alt="${movie.title}">
                    `;
  newMovie.addEventListener("click", async function () {
    if (!modal.classList.contains("active")) {
      await setModalInfo(movie.id);
      modal.classList.add("active");
      modal.setAttribute("data-open", "true");
      window.scrollTo({
        top: 0,
      });
      document.body.classList.add("no-scroll");
    }
  });
  return newMovie;
}
