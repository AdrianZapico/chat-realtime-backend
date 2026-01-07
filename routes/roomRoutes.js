import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import { createRoom, getMyRooms, getAllRooms, deleteRoom } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, createRoom);
router.get("/mine", protect, getMyRooms);
router.get("/", getAllRooms);
router.delete("/:id", authMiddleware, deleteRoom);

export default router;
