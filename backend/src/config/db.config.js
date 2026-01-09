import mongoose from "mongoose";

async function connectDB(databaseUrl) {
    try {
        await mongoose.connect(databaseUrl);
    } catch (error) {
        console.error("Database connection failed!!!\n", error);
        process.exit(1);
    }
}

export default connectDB;