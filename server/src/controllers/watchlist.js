import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  addMovieToUserWatchlistQuery,
  getMovieFromUserWatchlistQuery,
  getWatchlistByUserIdQuery,
  getWatchlistMoviesByUserIdQuery,
  getWatchlistsQuery,
  removeMovieFromUserWatchlistQuery,
} from "../database/queries/watchlist.js";
import { getMovieByIdQuery } from "../database/queries/movie.js";

/**
 * Get all watchlists
 * @param req
 * @param res
 * @returns {*}
 */
export function getWatchlists(req, res) {
  const watchlists = getWatchlistsQuery();

  if (!watchlists) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(watchlists);
}

/**
 * Get watchlist by user id
 * @param req
 * @param res
 * @returns {*}
 */
export function getWatchlistByUserId(req, res) {
  const userId = parseInt(req.params.userId);
  const userWatchlist = getWatchlistByUserIdQuery(userId);

  if (!userWatchlist) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(userWatchlist);
}

/**
 * Get watchlist movies by user id
 * @param req
 * @param res
 * @returns {*}
 */
export function getWatchlistMoviesByUserId(req, res) {
  const userId = parseInt(req.params.userId);
  const userWatchlist = getWatchlistMoviesByUserIdQuery(userId);

  if (!userWatchlist) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(userWatchlist);
}

/**
 * Add movie to user watchlist
 * @param req
 * @param res
 * @returns {*}
 */
export function addMovieToUserWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const watchlist = getMovieFromUserWatchlistQuery(userId, movieId);

  if (watchlist) {
    return res.status(StatusCodes.CONFLICT).json({
      message: "Movie already exists in user watchlist",
    });
  }

  addMovieToUserWatchlistQuery(userId, movieId);

  const movie = getMovieByIdQuery(movieId);

  return res.status(StatusCodes.CREATED).json(movie);
}

/**
 * Remove movie from user watchlist
 * @param req
 * @param res
 * @returns {*}
 */
export function removeMovieFromUserWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const watchlist = getWatchlistByUserIdQuery(userId);

  if (watchlist.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  removeMovieFromUserWatchlistQuery(userId, movieId);

  return res.status(StatusCodes.OK).json({
    message: "Movie removed from user watchlist",
  });
}
