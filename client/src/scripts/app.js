import Slider from "./slide.js";
import { getMovies } from "./queries/movie.js";
import { getGenreById } from "./queries/genre.js";
import {
  addMovieToWatchlist,
  getWatchlistMovies,
} from "./queries/watchlist.js";

window.onload = function () {
  const trending = document.getElementById("trending");
  const watchlist = document.getElementById("watchlist");
  const modal = document.getElementById("modal");

  const slidingImage = document.getElementById("sliding-image");
  const slidingTitle = document.getElementById("sliding-title");
  const slidingGenre = document.getElementById("sliding-genre");
  const slidingYear = document.getElementById("sliding-year");
  const slidingDescription = document.getElementById("sliding-description");
  const slidingButton = document.getElementById("sliding-button");

  if (slidingButton) {
    slidingButton.addEventListener("click", async function () {
      const movieId = this.getAttribute("data-movieid");
      await addMovieToWatchlist(movieId);
      this.textContent = "Added to watchlist";
      slidingButton.disabled = true;
    });
  }

  const imageObjectsToScroll = [];
  let currentIndex = 0;
  let startTime = null;

  if (trending) {
    // I've created a Slider class to reduce code duplication
    Slider.init("trending");

    getMovies().then((movies) => {
      movies.forEach((m) => {
        const movie = document.createElement("div");
        movie.classList.add("card");
        movie.setAttribute("data-trigger", "true");
        movie.innerHTML = `
                    <img src="${m.thumbnail}" alt="${m.title}">
                    `;
        trending.appendChild(movie);
        movie.addEventListener("click", function () {
          if (!modal.classList.contains("active")) {
            modal.classList.add("active");
            modal.setAttribute("data-open", "true");
            window.scrollTo({
              top: 0,
            });
            document.body.classList.add("no-scroll");
          }
        });

        const genre = getGenreById(m.genreId);

        genre.then((genre) => {
          m.genre = genre.name;
        });

        imageObjectsToScroll.push(m);
      });

      if (slidingImage) {
        slidingImage.setAttribute("data-trigger", "true");
        slidingImage.addEventListener("click", function () {
          modal.classList.add("active");
          modal.setAttribute("data-open", "true");
          window.scrollTo({
            top: 0,
          });
          document.body.classList.add("no-scroll");
        });
        setTimeout(() => {
          slidingImage.style.opacity = "1";
          setSlidingInfo();
          requestAnimationFrame(animateImage);
        }, 1000);
      }
    });
  }

  if (watchlist) {
    Slider.init("watchlist");

    getWatchlistMovies().then((movies) => {
      movies.forEach((m) => {
        const movie = document.createElement("div");
        movie.classList.add("card");
        movie.setAttribute("data-trigger", "true");
        movie.innerHTML = `
                    <img src="${m.thumbnail}" alt="${m.title}">
                    `;
        watchlist.appendChild(movie);
        movie.addEventListener("click", function () {
          if (!modal.classList.contains("active")) {
            modal.classList.add("active");
            modal.setAttribute("data-open", "true");
            window.scrollTo({
              top: 0,
            });
            document.body.classList.add("no-scroll");
          }
        });
      });
    });
  }

  const back = document.getElementById("back");

  if (back) {
    back.addEventListener("click", function () {
      modal.classList.remove("active");
      modal.setAttribute("data-open", "false");
      document.body.classList.remove("no-scroll");
    });
  }

  function setSlidingInfo() {
    slidingButton.textContent = "Add to watchlist";
    slidingButton.disabled = false;
    slidingImage.src = imageObjectsToScroll[currentIndex].thumbnail;
    slidingTitle.textContent = imageObjectsToScroll[currentIndex].title;
    slidingGenre.textContent = imageObjectsToScroll[currentIndex].genre;
    slidingYear.textContent = imageObjectsToScroll[currentIndex].year;
    slidingDescription.textContent =
      imageObjectsToScroll[currentIndex].description;
    slidingButton.setAttribute(
      "data-movieid",
      imageObjectsToScroll[currentIndex].id,
    );
  }

  function animateImage(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / 8000, 1);

    slidingImage.style.transform = `translateX(${-10 * progress}%) scale(${1.5 + (1.4 - 1.5) * progress})`;

    if (progress < 1) {
      requestAnimationFrame(animateImage);
    } else {
      slidingImage.style.opacity = "0";
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % imageObjectsToScroll.length;
        setSlidingInfo();
        startTime = null;
        slidingImage.style.opacity = "1";
        requestAnimationFrame(animateImage);
      }, 1000);
    }
  }
};
