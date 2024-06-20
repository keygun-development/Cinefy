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

export function getWatchlists(req, res) {
  const watchlists = getWatchlistsQuery();

  if (!watchlists) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(watchlists);
}

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

export function removeMovieFromUserWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const index = getWatchlistByUserIdQuery(userId).findIndex(
    (w) => w.movieId === movieId,
  );

  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  removeMovieFromUserWatchlistQuery(userId, movieId);

  return res.status(StatusCodes.NO_CONTENT).send();
}
