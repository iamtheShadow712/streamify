import asyncHandler from "../utils/asyncHandler.js";
import JWTService from "../services/jwt.service.js";
import CustomError from "../lib/CustomError.js";
import { ENV } from "../config/env.config.js";
import databaseService from "../services/database.service.js";

export const protectedRoute = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.token;
    if (!token) {
        throw new CustomError(401, "Unauthorized - No token provided");
    }
    const decode = JWTService.verifyToken(token, ENV.JWT_SECRET_KEY);
    if (!decode) {
        throw new CustomError(401, "Unauthorized - Invalid token")
    }
    const userId = decode.userId;
    const user = await databaseService.getUser({ _id: userId }).select("-password");
    if (!user) {
        throw new CustomError(401, "Unauthorized - User not found")
    }
    req.user = user;
    next();
})
