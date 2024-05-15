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
}