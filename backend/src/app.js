import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";
import usersRouter from "./routes/users.route.js";
import chatRouter from "./routes/chat.route.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // allow frontend to send cookies
}))
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/chat", chatRouter)

app.use("/live", (req, res) => {
    return res.status(200).json({
        status: "Live"
    })
})

app.use(errorHandler);

export default app;