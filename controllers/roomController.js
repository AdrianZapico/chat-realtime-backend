import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nome da sala é obrigatório" });
        }

        const room = await Room.create({
            name,
            createdBy: req.user,
        });

        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar sala" });
    }
};

export const getMyRooms = async (req, res) => {
    try {
        const rooms = await Room.find({
            createdBy: req.user,
        }).sort({ createdAt: -1 });

        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar salas" });
    }
};
