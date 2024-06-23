import express from "express";
import { getGenreById, getGenres } from "../controllers/genre.js";

const router = express.Router();

// GET /api/v1/genres
router.get("/", getGenres);
router.get("/:id", getGenreById);

export default router;
