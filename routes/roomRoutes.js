import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createRoom, getMyRooms } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, createRoom);
router.get("/", protect, getMyRooms);


export default router;
