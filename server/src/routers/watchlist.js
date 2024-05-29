import express from "express"
import {getWatchlistByUserId, getWatchlists, removeMovieFromUserWatchlist} from "../controllers/watchlist.js";

const router = express.Router()

router.get('/', getWatchlists)
router.get('/:userId', getWatchlistByUserId);
router.delete('/:userId/:movieId', removeMovieFromUserWatchlist);

export default router;