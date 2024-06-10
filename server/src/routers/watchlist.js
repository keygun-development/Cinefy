import express from "express";
import {
  getWatchlistByUserId,
  getWatchlists,
  removeMovieFromUserWatchlist,
  addMovieToUserWatchlist,
} from "../controllers/watchlist.js";

const router = express.Router();

router.get("/", getWatchlists);
router.get("/:userId", getWatchlistByUserId);
router.put("/:userId/:movieId", addMovieToUserWatchlist);
router.delete("/:userId/:movieId", removeMovieFromUserWatchlist);

export default router;
