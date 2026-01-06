import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        roomId: String,
        content: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
