import express from "express";
import { getMovieById, getMovies } from "../controllers/movie.js";

const router = express.Router();

// GET /api/v1/movies
router.get("/", getMovies);
router.get("/:id", getMovieById);

export default router;
