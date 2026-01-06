import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createRoom } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, createRoom);

export default router;
