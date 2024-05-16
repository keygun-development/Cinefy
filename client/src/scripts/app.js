import Slider from "./slide.js";

window.onload = function () {
    // I've created a Slider class to reduce code duplication
    const trending = document.getElementById('trending');
    const watchlist = document.getElementById('watchlist');
    if (trending) {
        Slider.init('trending')
    }
    if (watchlist) {
        Slider.init('watchlist');
    }

    const movies = document.getElementsByClassName('movie');
    const modal = document.getElementById('modal');
    const back = document.getElementById('back');
    for (let i = 0; i < movies.length; i++) {
        movies[i].addEventListener('click', function () {
            if(!modal.classList.contains('active')) {
                modal.classList.add('active');
                document.body.classList.add('no-scroll');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (back) {
        back.addEventListener('click', function () {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
}