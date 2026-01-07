import Message from "../models/Message.js";

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket autenticado:", socket.userId);

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);

            const users = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );

            io.to(roomId).emit("roomUsers", users.length);
        });

        socket.on("leaveRoom", (roomId) => {
            socket.leave(roomId);
        });

        socket.on("typing", ({ roomId }) => {
            socket.to(roomId).emit("userTyping", {
                userId: socket.userId,
                name: socket.userName,
            });
        });

        socket.on("stopTyping", ({ roomId }) => {
            socket.to(roomId).emit("userStopTyping", {
                userId: socket.userId,
            });
        });


        socket.on("sendMessage", async ({ roomId, message }) => {
            try {
                const newMessage = await Message.create({
                    roomId,
                    sender: socket.userId,
                    content: message,
                });

                const populatedMessage = await newMessage.populate(
                    "sender",
                    "_id name"
                );

                io.to(roomId).emit("receiveMessage", populatedMessage);
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
