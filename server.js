import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import socketAuth from "./middlewares/socketAuth.js";
import chatSocket from "./sockets/chatSocket.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ✅ CORS PRIMEIRO (e SÓ ISSO) */
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

/* parsers */
app.use(express.json());

/* rotas */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rooms", roomRoutes);


/* servidor HTTP */
const server = http.createServer(app);

/* socket.io */
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.use(socketAuth);
chatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
