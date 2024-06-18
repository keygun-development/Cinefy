import movies from "../database/seeders/movie.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  getGenreByIdQuery,
  getGenresQuery,
} from "../database/queries/genre.js";

export function getGenres(req, res) {
  const { name } = req.query;
  const genres = getGenresQuery(name);

  if (!genres) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(genres);
}

export function getGenreById(req, res) {
  const id = parseInt(req.params.id);
  const genreById = getGenreByIdQuery(id);

  if (!genreById) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(genreById);
}

export function getMoviesByGenreId(req, res) {
  const id = parseInt(req.params.id);
  const genreMovies = movies.filter(function (el) {
    return el.genreId === id;
  });

  if (!genreMovies) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(genreMovies);
}
