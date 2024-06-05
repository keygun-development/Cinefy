import { ReasonPhrases, StatusCodes } from "http-status-codes";
import users from "../seeders/user.js";

export function getUsers(req, res) {
  return res.status(StatusCodes.OK).json(users);
}

export function getUserById(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }

  return res.json(user);
}
