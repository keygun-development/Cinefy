import {movies} from "../data.js";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

export function getMovies(req, res) {
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
}

export function getMovieById(req, res) {
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
}