import watchlists from "../seeders/watchlist.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export function getWatchlists(req, res) {
  const { movie } = req.query;
  let result = [...watchlists];

  if (movie) {
    result = result.filter((w) => w.movieId === parseInt(movie));
  }

  return res.status(StatusCodes.OK).json(result);
}

export function getWatchlistByUserId(req, res) {
  const userId = parseInt(req.params.userId);
  const userWatchlist = watchlists.filter((w) => w.userId === userId);

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
  const watchlist = watchlists.find(
    (w) => w.userId === userId && w.movieId === movieId,
  );

  if (watchlist) {
    return res.status(StatusCodes.CONFLICT).json({
      message: "Movie already exists in user watchlist",
    });
  }

  watchlists.push({ userId, movieId });

  return res.status(StatusCodes.CREATED).send();
}

export function removeMovieFromUserWatchlist(req, res) {
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const index = watchlists.findIndex(
    (w) => w.userId === userId && w.movieId === movieId,
  );

  if (index === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  watchlists.splice(index, 1);

  return res.status(StatusCodes.NO_CONTENT).send();
}
