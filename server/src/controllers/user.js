import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  getUserByIdQuery,
  getUsersQuery,
  updateUserQuery,
} from "../database/queries/user.js";

export function getUsers(req, res) {
  const users = getUsersQuery();

  if (!users) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.status(StatusCodes.OK).json(users);
}

export function getUserById(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = getUserByIdQuery(id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
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
      message: ReasonPhrases.BAD_REQUEST,
    });
  }

  updateUserQuery(id, user);

  return res.status(StatusCodes.OK).json(user);
}
