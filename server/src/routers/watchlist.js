import express from "express";
import {
  getWatchlistByUserId,
  getWatchlists,
  removeMovieFromUserWatchlist,
  addMovieToUserWatchlist,
  getWatchlistMoviesByUserId,
} from "../controllers/watchlist.js";

const router = express.Router();

router.get("/", getWatchlists);
router.get("/:userId", getWatchlistByUserId);
router.get("/:userId/movies", getWatchlistMoviesByUserId);
router.post("/:userId/:movieId", addMovieToUserWatchlist);
router.delete("/:userId/:movieId", removeMovieFromUserWatchlist);

export default router;
