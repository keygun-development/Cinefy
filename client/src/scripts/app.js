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
            if (!modal.classList.contains('active')) {
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

    const slidingImage = document.getElementById('sliding-image');
    const imagesToScroll = [
        "https://occ-0-6144-768.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABer7SeWc6FvkBqWtk61GwL7rshAEVCOARQZVTEJGnLXykYBlO4nbbr6gs7M650BjULuaN6hucXKr5xY2iqPAajrxXd70HawdJeuD.jpg?r=608",
        "https://phantom-marca.unidadeditorial.es/1dae96dc691d041105915b4915754bc8/crop/0x0/1597x899/resize/828/f/jpg/assets/multimedia/imagenes/2021/10/01/16330974723192.png"
    ];

    if (slidingImage) {
        let index = 0;
        slidingImage.classList.add('animate')
        setInterval(() => {
            slidingImage.classList.add('fade-out');

            setTimeout(() => {
                index = (index + 1) % imagesToScroll.length;
                slidingImage.src = imagesToScroll[index];
                slidingImage.classList.remove('fade-out');
            }, 1200);
        }, 9000);
    }
}