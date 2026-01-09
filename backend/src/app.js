import express from "express";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/auth", authRouter)

app.use("/live", (req, res) => {
    return res.status(200).json({
        status: "Live"
    })
})

app.use(errorHandler);

export default app;