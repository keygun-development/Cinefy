import express from "express"
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {watchlists} from "../data.js";

const router = express.Router()

router.get('/', function (req, res) {
    const {movie} = req.query;
    let result = [...watchlists];

    if (movie) {
        result = result.filter(w => w.movieId === parseInt(movie));
    }

    return res
        .status(StatusCodes.OK)
        .json(result);
})

router.get('/:userId', function (req, res) {
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

router.delete('/:userId/:movieId', function (req, res) {
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

export default router;