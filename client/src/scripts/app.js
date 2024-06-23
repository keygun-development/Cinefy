import Slider from "./components/slide.js";
import { getMoviesPaginated } from "./queries/movie.js";
import { getGenreById } from "./queries/genre.js";
import {
  addMovieToWatchlist,
  getWatchlistMovies,
  removeMovieFromWatchlist,
} from "./queries/watchlist.js";
import { setModalInfo } from "./components/modal.js";
import { createNewMovieObject } from "./components/movie.js";
import { getUser } from "./queries/user.js";
import { setUserValues } from "./components/user.js";
import { setInputValues } from "./components/form.js";
import "./components/sort.js";

let user = null;

async function initializeUser() {
  try {
    user = await getUser();
    setUserValues();
    setInputValues();
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

await initializeUser();

const trending = document.getElementById("trending");
const watchlist = document.getElementById("watchlist");
const modal = document.getElementById("modal");

const slidingImage = document.getElementById("sliding-image");
const slidingTitle = document.getElementById("sliding-title");
const slidingGenre = document.getElementById("sliding-genre");
const slidingYear = document.getElementById("sliding-year");
const slidingDescription = document.getElementById("sliding-description");
const slidingButton = document.getElementById("sliding-button");
const modalButton = document.getElementById("modal-button");

const imageObjectsToScroll = [];
let currentIndex = 0;
let startTime = null;

if (slidingButton) {
  slidingButton.addEventListener("click", async function () {
    await addOrRemoveFromWatchlist(this);
  });
}

if (modalButton) {
  modalButton.addEventListener("click", async function () {
    await addOrRemoveFromWatchlist(this);
  });
}

if (trending) {
  Slider.init("trending");
  getMoviesPaginated(1, 5).then((movies) => {
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
      setTimeout(async () => {
        slidingImage.style.opacity = "1";
        await setSlidingInfo();
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
        const newMovie = createNewMovieObject(m);
        newMovie.setAttribute("data-movieid", m.id);
        watchlist.appendChild(newMovie);
      });
      localStorage.setItem("watchlist", JSON.stringify(movies));
    });
  } else {
    const movies = JSON.parse(localStorage.getItem("watchlist"));
    movies.forEach((m) => {
      const newMovie = createNewMovieObject(m);
      newMovie.setAttribute("data-movieid", m.id);
      watchlist.appendChild(newMovie);
    });
  }
}

async function setSlidingInfo() {
  const watchlist =
    JSON.parse(localStorage.getItem("watchlist")) ||
    (await getWatchlistMovies());
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
  slidingButton.textContent = watchlist.some(
    (m) => m.id === imageObjectsToScroll[currentIndex].id,
  )
    ? "Remove from watchlist"
    : "Add to watchlist";
}

// Function to animate the sliding image
function animateImage(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / 8000, 1);

  slidingImage.style.transform = `translateX(${-10 * progress}%) scale(${1.5 + (1.4 - 1.5) * progress})`;

  if (progress < 1) {
    requestAnimationFrame(animateImage);
  } else {
    slidingImage.style.opacity = "0";
    setTimeout(async () => {
      currentIndex = (currentIndex + 1) % imageObjectsToScroll.length;
      await setSlidingInfo();
      startTime = null;
      slidingImage.style.opacity = "1";
      requestAnimationFrame(animateImage);
    }, 1000);
  }
}

async function addOrRemoveFromWatchlist(button) {
  const movieId = button.getAttribute("data-movieid");
  const result = await addMovieToWatchlist(movieId);
  const watchlistStorage = localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [];

  if (result && result.status === 201) {
    const res = await result.json();
    watchlistStorage.push(res);
    localStorage.setItem("watchlist", JSON.stringify(watchlistStorage));
    const newMovie = createNewMovieObject(res);
    newMovie.setAttribute("data-movieid", res.id);
    watchlist.appendChild(newMovie);
    button.textContent = "Remove from watchlist";
  } else {
    const index = watchlistStorage.findIndex((m) => m.id === parseInt(movieId));
    watchlistStorage.splice(index, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlistStorage));
    await removeMovieFromWatchlist(movieId);
    const movie = document.querySelector(`.card[data-movieid="${movieId}"]`);
    if (movie) {
      movie.remove();
    }
    button.textContent = "Add to watchlist";
  }
}

export function setNewUser(newUser) {
  localStorage.setItem("user", JSON.stringify(newUser));
  user = newUser;
  setUserValues();
}

export { user };
