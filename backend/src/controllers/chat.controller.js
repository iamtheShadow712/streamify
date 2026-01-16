import { generateStreamToken } from "../lib/stream.js";
import asyncHandler from "../utils/asyncHandler.js";

class ChatController {
    getStreamToken = asyncHandler(async (req, res) => {
        const token = generateStreamToken(req.user._id);
        res.status(200).json({ success: true, token })
    })
}

const chatController = new ChatController();

export default chatController;