import { StreamChat } from "stream-chat";
import { ENV } from "../config/env.config.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Stream API Key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

// const token = streamClient.createToken()

export const upsertStreamUser = async (userData) => {
    try {
        const respone = await streamClient.upsertUsers([userData]);
        return respone;
    } catch (error) {
        console.error("Error upserting Stream User: ", error);
    }
}

export const generateStreamToken = (userId) => {
    return streamClient.createToken(userId);
}