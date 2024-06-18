import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getUserByIdQuery, getUsersQuery } from "../database/queries/user.js";

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

  return res.json(user);
}
