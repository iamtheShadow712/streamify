import express from "express";
import chatController from "../controllers/chat.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const chatRouter = express.Router();

// generates token for stream to authenticate user
chatRouter.route("/token").get(protectedRoute, chatController.getStreamToken)

export default chatRouter;