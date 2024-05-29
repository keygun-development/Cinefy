import Slider from "./slide.js";

// Unfortunately we can't use a .env file and use process.env (Node.js functionality) to define the API URL
// So I've hardcoded the URL here, if you want to change it, you can do it here
const API_URL = 'http://localhost:3000/api/v1';
const getMovies = async () => {
    const res = await fetch(`${API_URL}/movies`);
    return await res.json();
}

const getGenreById = async (id) => {
    const res = await fetch(`${API_URL}/genres/${id}`);
    return await res.json();
}

window.onload = function () {
    // I've created a Slider class to reduce code duplication
    const trending = document.getElementById('trending');
    const watchlist = document.getElementById('watchlist');
    const modal = document.getElementById('modal');

    const slidingImage = document.getElementById('sliding-image');
    const slidingTitle = document.getElementById('sliding-title');
    const slidingGenre = document.getElementById('sliding-genre');
    const slidingYear = document.getElementById('sliding-year');
    const slidingDescription = document.getElementById('sliding-description');
    const slidingButton = document.getElementById('sliding-button');

    const imageObjectsToScroll = [];
    let currentIndex = 0;
    let startTime = null;

    if (trending) {
        Slider.init('trending')
    }
    if (watchlist) {
        Slider.init('watchlist');
    }

    getMovies().then(movies => {
        movies.forEach(m => {
            const movie = document.createElement('div');
            movie.classList.add('card', 'movie');
            movie.innerHTML = `
                    <img src="${m.thumbnail}" alt="${m.title}">
                    `;
            trending.appendChild(movie);
            movie.addEventListener('click', function () {
                if (!modal.classList.contains('active')) {
                    modal.classList.add('active');
                    window.scrollTo({
                        top: 0
                    });
                    document.body.classList.add('no-scroll');
                }
            });

            const genre = getGenreById(m.genreId);

            genre.then(genre => {
                m.genre = genre.name;
            })

            imageObjectsToScroll.push(m);
        });

        setTimeout(() => {
            if (slidingImage) {
                slidingImage.style.opacity = '1';
                setSlidingInfo();
                requestAnimationFrame(animateImage);
            }
        }, 1000)
    });

    const back = document.getElementById('back');

    if (back) {
        back.addEventListener('click', function () {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    function setSlidingInfo() {
        slidingImage.src = imageObjectsToScroll[currentIndex].thumbnail;
        slidingTitle.textContent = imageObjectsToScroll[currentIndex].title;
        slidingGenre.textContent = imageObjectsToScroll[currentIndex].genre;
        slidingYear.textContent = imageObjectsToScroll[currentIndex].year;
        slidingDescription.textContent = imageObjectsToScroll[currentIndex].description;
    }

    function animateImage(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / 8000, 1);

        slidingImage.style.transform = `translateX(${(-10) * progress}%) scale(${1.5 + (1.4 - 1.5) * progress})`;

        if (progress < 1) {
            requestAnimationFrame(animateImage);
        } else {
            slidingImage.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % imageObjectsToScroll.length;
                setSlidingInfo();
                startTime = null;
                slidingImage.style.opacity = '1';
                requestAnimationFrame(animateImage);
            }, 1000);
        }
    }
}