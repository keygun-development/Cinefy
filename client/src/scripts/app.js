import Slider from "./components/slide.js";
import { getMovies } from "./queries/movie.js";
import { getGenreById } from "./queries/genre.js";
import {
  addMovieToWatchlist,
  getWatchlistMovies,
} from "./queries/watchlist.js";
import { setModalInfo } from "./components/modal.js";
import { createNewMovieObject } from "./components/movie.js";
import { getUser } from "./queries/user.js";
import { setUserValues } from "./components/user.js";
import { setInputValues } from "./components/form.js";

let user = null;

async function initializeUser() {
  try {
    user = await getUser();
    setUserValues();
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

await initializeUser();

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

  const imageObjectsToScroll = [];
  let currentIndex = 0;
  let startTime = null;

  setInputValues();

  if (slidingButton) {
    slidingButton.addEventListener("click", async function () {
      const movieId = this.getAttribute("data-movieid");
      const result = await addMovieToWatchlist(movieId);

      if (result && result.status === 201) {
        const res = await result.json();
        const watchlistStorage = localStorage.getItem("watchlist")
          ? JSON.parse(localStorage.getItem("watchlist"))
          : [];
        watchlistStorage.push(res);
        localStorage.setItem("watchlist", JSON.stringify(watchlistStorage));
        watchlist.appendChild(createNewMovieObject(res));
        this.textContent = "Added to watchlist";
      } else if (result && result.status === 409) {
        this.textContent = "Already in watchlist";
      }

      slidingButton.disabled = true;
    });
  }

  if (trending) {
    Slider.init("trending");
    getMovies().then((movies) => {
      movies.forEach((m) => {
        trending.appendChild(createNewMovieObject(m));
        const genre = getGenreById(m.genre_id);

        genre.then((genre) => {
          m.genre = genre.name;
        });

        imageObjectsToScroll.push(m);
      });

      if (slidingImage) {
        slidingImage.setAttribute("data-trigger", "true");
        slidingImage.addEventListener("click", async function () {
          await setModalInfo(imageObjectsToScroll[currentIndex].id);
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
    if (localStorage.getItem("watchlist") === null) {
      getWatchlistMovies().then((movies) => {
        movies.forEach((m) => {
          watchlist.appendChild(createNewMovieObject(m));
        });
        localStorage.setItem("watchlist", JSON.stringify(movies));
      });
    } else {
      const movies = JSON.parse(localStorage.getItem("watchlist"));
      movies.forEach((m) => {
        watchlist.appendChild(createNewMovieObject(m));
      });
    }
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

export function setNewUser(newUser) {
  localStorage.setItem("user", JSON.stringify(newUser));
  user = newUser;
  setUserValues();
}

export { user };
