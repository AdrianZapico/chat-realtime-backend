import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import socketAuth from "./middlewares/socketAuth.js";
import chatSocket from "./sockets/chatSocket.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());




app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.use(socketAuth);
chatSocket(io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Servidor rodando na porta ${PORT}`)
);
