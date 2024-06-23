import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  getUserByIdQuery,
  getUsersQuery,
  updateUserQuery
} from "../database/queries/user.js";

/**
 * Get all users
 * @param req
 * @param res
 * @returns {*}
 */
export function getUsers(req, res) {
  const { firstname } = req.query;
  const users = getUsersQuery(firstname);

  if (!users) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND
    });
  }

  return res.status(StatusCodes.OK).json(users);
}

/**
 * Get user by id
 * @param req
 * @param res
 * @returns {*}
 */
export function getUserById(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = getUserByIdQuery(id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND
    });
  }

  console.log(user);

  return res.json(user);
}

export function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const user = req.body;

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: ReasonPhrases.BAD_REQUEST
    });
  }

  updateUserQuery(id, user);

  return res.status(StatusCodes.OK).json(user);
}
