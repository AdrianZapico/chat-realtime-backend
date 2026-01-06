import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getMessagesByRoom } from "../controllers/chatController.js";
import Message from "../models/Message.js";

const router = express.Router();

// rota de teste
router.get("/test", protect, (req, res) => {
    res.json({ message: "Acesso autorizado", userId: req.user });
});

// GET histórico
router.get("/messages/:roomId", protect, getMessagesByRoom);

// POST TEMPORÁRIO (para teste)
router.post("/messages", protect, async (req, res) => {
    const { roomId, content } = req.body;

    let message = await Message.create({
        roomId,
        content,
        sender: req.user,
    });

    message = await message.populate("sender", "name email");

    res.status(201).json(message);
});


export default router;
