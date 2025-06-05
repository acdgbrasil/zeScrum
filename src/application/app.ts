import { connectToDiscord } from "../infra/comunicationChannel/discord/discordService.ts";
import {mongoConnection} from '../infra/database/mongo/mongoConnection.ts'
import { messageWithDate} from '../utils/logs.ts';

export const app = async () => {
    messageWithDate("Starting application...");
    await mongoConnection(()=>{
        messageWithDate("MongoDB connection established successfully.","green");
    });

    await connectToDiscord(()=>{
        messageWithDate("Discord client connected successfully.","blue");
    })

    messageWithDate("Application started successfully.")
}