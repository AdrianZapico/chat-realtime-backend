import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import { createRoom, getMyRooms, getAllRooms, deleteRoom, updateRoom } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, createRoom);
router.get("/mine", protect, getMyRooms);
router.get("/", getAllRooms);
router.delete("/:id", authMiddleware, deleteRoom);
router.put("/:id", protect, updateRoom);

export default router;
