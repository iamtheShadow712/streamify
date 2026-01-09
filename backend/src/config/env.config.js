import { config } from "dotenv";
config({ path: ".env", quiet: true });

export const ENV = {
    PORT: process.env.PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}