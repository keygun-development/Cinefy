import {genres, movies} from "../data.js";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

export function getGenres(req, res) {
    const {name} = req.query
    let result = [...genres]

    if (name) {
        result = result.filter(g => g.name.toLowerCase() === name.toLowerCase())
    }

    return res
        .status(StatusCodes.OK)
        .json(result)
}

export function getGenreById(req, res) {
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
        .json(genre[0]);
}

export function getMoviesByGenreId(req, res) {
    const id = parseInt(req.params.id);
    const genreMovies = movies.filter(function (el) {
        return el.genreId === id;
    });

    console.log('test')

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
}