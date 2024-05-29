import express from "express"
import {getGenreById, getGenres, getMoviesByGenreId} from "../controllers/genre.js";

const router = express.Router()

router.get('/', getGenres)
router.get('/:id', getGenreById)
router.get('/:id/movies', getMoviesByGenreId)

export default router