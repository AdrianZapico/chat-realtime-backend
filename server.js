import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Usuário conectado:", socket.id);

    socket.on("disconnect", () => {
        console.log("Usuário desconectado:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Servidor rodando na porta ${PORT}`)
);
