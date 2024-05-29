import express from "express";
import { getMovieById, getMovies } from "../controllers/movie.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

export default router;
