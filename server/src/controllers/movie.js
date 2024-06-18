import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  getMovieByIdQuery,
  getMoviesQuery,
} from "../database/queries/movie.js";

export function getMovies(req, res) {
  let { per_page, page, genre } = req.query;
  const movies = getMoviesQuery(per_page, page, genre);

  if (!movies) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(movies);
}

export function getMovieById(req, res) {
  const id = parseInt(req.params.id);
  const movie = getMovieByIdQuery(id);

  if (!movie) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(movie);
}
