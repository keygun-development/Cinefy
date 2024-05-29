import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { users } from "../data.js";

const router = express.Router();

router.get("/", function (req, res) {
    return res
        .status(StatusCodes.OK)
        .json(users)
});

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({
                message: ReasonPhrases.NOT_FOUND
            });
    }

    return res.json(user);
})

export default router;