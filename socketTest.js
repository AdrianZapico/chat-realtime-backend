import { io } from "socket.io-client";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWMwNTQ3NTM2YmY3ZjExMDNhYmNlZCIsImlhdCI6MTc2NzYzODQ4MSwiZXhwIjoxNzY3NzI0ODgxfQ.idePJY55rQnsz3Qdjs36cppdsvXOWMJR_Ch7HMV-bAo";

const socket = io("http://localhost:5000", {
    auth: {
        token: TOKEN,
    },
});

socket.on("connect", () => {
    console.log("Conectado ao socket:", socket.id);

    socket.emit("joinRoom", "room1");

    socket.emit("sendMessage", {
        roomId: "room1",
        message: "Mensagem enviada via socket",
    });
});

socket.on("receiveMessage", (data) => {
    console.log("Mensagem recebida:", data);
});

socket.on("connect_error", (err) => {
    console.error("Erro de conexão:", err.message);
});
