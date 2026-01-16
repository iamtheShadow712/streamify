import express from "express";
import userController from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const usersRouter = express.Router();

usersRouter.use(protectedRoute)
usersRouter.route("/").get(userController.getRecommendedUsers);
usersRouter.route("/friends").get(userController.getMyFriends);
usersRouter.route("/friend-request/:id").post(userController.sendFriendRequest);
usersRouter.route("/friend-request/:id/accept").put(userController.acceptFriendRequest);
usersRouter.route("/friend-requests").get(userController.getFriendRequests);
usersRouter.route("/outgoing-friend-requests").get(userController.getOutgoingFriendReqs);

export default usersRouter;