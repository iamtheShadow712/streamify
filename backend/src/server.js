import app from "./app.js";
import { ENV } from "./config/env.config.js"
import connectDB from "./config/db.config.js";


async function startServer(databaseUrl) {
    connectDB(databaseUrl)
        .then(() => {
            console.log("Database connected!!!✅")
            app.listen(ENV.PORT, () => {
                console.log(`Server is running on http://localhost:${ENV.PORT}`)
            })
        }).catch((err) => {
            console.error("Database connection failed\n", err)
        })
}


startServer(ENV.DATABASE_URL)