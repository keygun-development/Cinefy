import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  getGenreByIdQuery,
  getGenresQuery,
} from "../database/queries/genre.js";

/**
 * Get all genres
 * @param req
 * @param res
 * @returns {*}
 */
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

/**
 * Get genre by id
 * @param req
 * @param res
 * @returns {*}
 */
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
