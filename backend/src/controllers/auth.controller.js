import CustomError from "../lib/CustomError.js";
import { ENV } from "../config/env.config.js";
import databaseService from "../services/database.service.js";
import JWTService from "../services/jwt.service.js";
import asyncHandler from "../utils/asyncHandler.js"
import { upsertStreamUser } from "../lib/stream.js";

class AuthController {
    register = asyncHandler(
        async (req, res) => {
            const { email, password, fullName } = req.body;

            if (!email || !password || !fullName) {
                throw new CustomError(400, "All fields are required!!!");
            }

            if (password.length < 6) {
                throw new CustomError(400, "Password must be atleast 6 character long!!!");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new CustomError(400, "Invalid email format!!!");
            }

            // check if user already exist
            const user = await databaseService.getUser({ email })
            if (user) {
                throw new CustomError(400, "Email already in-use, please try with different email!!!")
            }

            const idx = Math.floor(Math.random() * 100) + 1; // generate a number between 1 - 100
            const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`;

            // Create User
            const newUser = await databaseService.createUser({ email, fullName, password, profilePic: randomAvatar });

            // Create Stream User
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            });
            // generate the JWT token
            const token = JWTService.createToken({ userId: newUser._id }, ENV.JWT_SECRET_KEY, { expiresIn: "7d" });

            res.cookie("token", token, {
                httpOnly: true, // prevent XSS attacks
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict", // prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(201).json({
                success: true,
                user: newUser
            })
        }
    )

    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new CustomError(400, "All fields are required!!!")
        }

        const user = await databaseService.getUser({ email });
        if (!user) {
            throw new CustomError(404, "Invalid Credentials")
        }
        const isValidPassword = await user.matchPassword(password)
        if (!isValidPassword) {
            throw new CustomError(401, "Invalid Credentials")
        }

        const token = JWTService.createToken({ userId: user._id }, ENV.JWT_SECRET_KEY, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true, // prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            user
        })
    })

    logout = asyncHandler(async (req, res) => {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    })
}

const authController = new AuthController();
export default authController;