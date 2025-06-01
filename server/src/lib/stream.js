import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.STREAMIFY_KEY;
const apiSecret = process.env.STREAMIFY_SECRET;


const serverClient = StreamChat.getInstance(apiKey, apiSecret)

export async function upsertStreamUser(userData) {
    try {
        await serverClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.log(`Error upserting stream user ${error}`);

    }
}

export function generateStreamToken(token) {
    try {
        const userId = token.toString()
        return serverClient.createToken(userId)
    } catch (error) {
        console.log(`error ${error.message}`);

    }
}