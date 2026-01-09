import express from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { userRegisterSchema } from "../schema/user.schema.js";

const authRouter = express.Router();

authRouter.route("/register").post(validate(userRegisterSchema), authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/logout").post(authController.logout);

export default authRouter;