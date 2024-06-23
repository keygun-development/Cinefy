import express from "express";
import { getUserById, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router();

// GET /api/v1/users
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
