import Message from "../models/Message.js";

export const getMessagesByRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await Message.find({ roomId })
            .populate("sender", "name email")
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar mensagens" });
    }
};
