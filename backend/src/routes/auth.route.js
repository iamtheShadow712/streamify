import express from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { userLoginSchema, userRegisterSchema } from "../schema/user.schema.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.route("/register").post(validate(userRegisterSchema), authController.register);
authRouter.route("/login").post(validate(userLoginSchema), authController.login);
authRouter.route("/logout").post(authController.logout);
authRouter.route("/onboarding").post(protectedRoute, authController.onboarding)
authRouter.route("/me").get(protectedRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user })
})

export default authRouter;