import Message from "../models/Message.js";

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket autenticado:", socket.userId);

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
        });

        socket.on("sendMessage", async ({ roomId, message }) => {
            try {
                const newMessage = await Message.create({
                    roomId,
                    sender: socket.userId,
                    content: message,
                });

                io.to(roomId).emit("receiveMessage", {
                    id: newMessage._id,
                    roomId,
                    sender: socket.userId,
                    content: newMessage.content,
                    createdAt: newMessage.createdAt,
                });
            } catch (error) {
                console.error("Erro ao salvar mensagem:", error.message);
            }
        });

        socket.on("disconnect", () => {
            console.log("Socket desconectado:", socket.userId);
        });
    });
};

export default chatSocket;
