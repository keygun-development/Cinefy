const express = require('express')
const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Sci-Fi'}
]

const users = [
    {id: 1, firstname: 'John', lastname: 'Doe'},
    {id: 2, firstname: 'Jane', lastname: 'Doe'},
    {id: 3, firstname: 'Alice', lastname: 'Smith'},
    {id: 4, firstname: 'Bob', lastname: 'Smith'}
]

const movies = [
    {
        id: 1,
        title: 'The Terminator',
        genreId: 1,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMjAyMTk3ODA2MF5BMl5BanBnXkFtZTcwMTkzNDQyNA@@._V1_.jpg',
        year: 1984,
        description: 'A cyborg assassin is sent back in time to kill Sarah Connor, whose unborn son is destined to lead the'
    },
    {
        id: 2,
        title: 'The Matrix',
        genreId: 4,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
        year: 1999,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
    },
    {
        id: 3,
        title: 'The Conjuring',
        genreId: 2,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_FMjpg_UX1000_.jpg',
        year: 2013,
        description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.'
    },
    {
        id: 4,
        title: 'The Hangover',
        genreId: 3,
        thumbnail: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
        year: 2009,
        description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.'
    },
    {
        id: 5,
        title: 'Stranger Things',
        genreId: 4,
        thumbnail: 'https://occ-0-6144-768.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABer7SeWc6FvkBqWtk61GwL7rshAEVCOARQZVTEJGnLXykYBlO4nbbr6gs7M650BjULuaN6hucXKr5xY2iqPAajrxXd70HawdJeuD.jpg?r=608',
        year: 2016,
        description: 'Set in the 1980s, the series centers around the residents of the fictional small town of Hawkins, Indiana, as they are plagued by a hostile alternate dimension known as the Upside Down, after a nearby human experimentation facility opens a gateway between Earth and the Upside Down.'
    },
    {
        id: 5,
        title: 'Squid Game',
        genreId: 1,
        thumbnail: 'https://phantom-marca.unidadeditorial.es/1dae96dc691d041105915b4915754bc8/crop/0x0/1597x899/resize/828/f/jpg/assets/multimedia/imagenes/2021/10/01/16330974723192.png',
        year: 2021,
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.'
    }
]

const watchlists = [
    {userId: 1, movieId: 1},
    {userId: 1, movieId: 2},
    {userId: 2, movieId: 3},
    {userId: 3, movieId: 4},
    {userId: 4, movieId: 1},
    {userId: 4, movieId: 3}
]

app.get('/api/v1/genres', function (req, res) {
    const {name} = req.query
    let result = [...genres]

    if (name) {
        result = result.filter(g => g.name.toLowerCase() === name.toLowerCase())
    }

    return res
        .status(StatusCodes.OK)
        .json(result)
})

app.get('/api/v1/genres/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const genre = genres.find(g => g.id === id);

    if (!genre) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    return res
        .status(StatusCodes.OK)
        .json(genre);
});

app.get('/api/v1/genres/:id/movies', function (req, res) {
    const id = parseInt(req.params.id);
    const genreMovies = movies.filter(m => m.genreId === id);

    if (!genreMovies) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    return res
        .status(StatusCodes.OK)
        .json(genreMovies);
})

app.get('/api/v1/users', function (req, res) {
    return res
        .status(StatusCodes.OK)
        .json(users)
})

app.get('/api/v1/users/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    return res.json(user);
});

app.get('/api/v1/movies', function (req, res) {
    let {per_page, page, genre} = req.query;
    let result = [...movies];

    per_page = parseInt(per_page);
    page = parseInt(page);

    if (genre) {
        result = result.filter(m => m.genreId === parseInt(genre));
    }

    if (!isNaN(per_page)) {
        const start = !isNaN(page) ? (page - 1) * per_page : 0;
        const end = start + per_page;
        result = result.slice(start, end);
    }

    return res
        .status(StatusCodes.OK)
        .json(result);
});

app.get('/api/v1/movies/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    return res
        .status(StatusCodes.OK)
        .json(movie);
});

app.get('/api/v1/watchlists', function (req, res) {
    const {movie} = req.query;
    let result = [...watchlists];

    if (movie) {
        result = result.filter(w => w.movieId === parseInt(movie));
    }

    return res
        .status(StatusCodes.OK)
        .json(result);
})

app.get('/api/v1/watchlists/:userId', function (req, res) {
    const userId = parseInt(req.params.userId);
    const userWatchlist = watchlists.filter(w => w.userId === userId);

    if (!userWatchlist) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    return res
        .status(StatusCodes.OK)
        .json(userWatchlist);
});

app.delete('/api/v1/watchlists/:userId/:movieId', function (req, res) {
    const userId = parseInt(req.params.userId);
    const movieId = parseInt(req.params.movieId);
    const index = watchlists.findIndex(w => w.userId === userId && w.movieId === movieId);

    if (index === -1) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    watchlists.splice(index, 1);

    return res
        .status(StatusCodes.NO_CONTENT)
        .send();
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
        .json({
            message: err.message || "Something went wrong!"
        })
})

app.listen(3000, function () {
    console.log('Server is running on port 3000')
})