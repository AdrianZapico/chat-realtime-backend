import Room from "../models/Room.js";
import Message from "../models/Message.js";

export const createRoom = async (req, res) => {
    try {
        const { name } = req.body;

        const room = await Room.create({
            name,
            createdBy: req.user._id, // ⚠️ TEM que ser _id
        });

        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar sala" });
    }
};

export const getMyRooms = async (req, res) => {
    // try {
    //     const rooms = await Room.find({
    //         createdBy: req.user,
    //     }).sort({ createdAt: -1 });

    //     res.json(rooms);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Erro ao buscar salas" });
    // }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
            .sort({ createdAt: -1 });

        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar salas" });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Busca a sala
        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({ message: "Sala não encontrada" });
        }

        // 2️⃣ Garantia ABSOLUTA de req.user
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        // 3️⃣ Comparação segura
        if (room.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Sem permissão" });
        }

        // 4️⃣ Remove mensagens da sala
        await Message.deleteMany({ roomId: room._id });

        // 5️⃣ Remove a sala
        await room.deleteOne();

        return res.json({ message: "Sala excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir sala:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};
