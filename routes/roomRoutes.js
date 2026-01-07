import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createRoom, getMyRooms, getAllRooms } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, createRoom);
router.get("/mine", protect, getMyRooms);
router.get("/", getAllRooms);

export default router;
