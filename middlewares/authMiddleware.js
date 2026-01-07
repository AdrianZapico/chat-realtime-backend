import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 🔥 busca o usuário completo no banco
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({ message: "Usuário não encontrado" });
            }

            // 🔥 agora req.user é o USUÁRIO
            req.user = user;
            next();
        } catch (error) {
            console.error("Erro no auth middleware:", error);
            return res.status(401).json({ message: "Token inválido" });
        }
    } else {
        return res.status(401).json({ message: "Não autorizado, token ausente" });
    }
};

export default protect;
