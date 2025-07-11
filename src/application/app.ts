import { exit } from "node:process";
import { initAllChannels } from "../infra/comunicationChannel/discord/discordService.ts";
import { consumerMessage, watcherDiscordMenssage } from "../infra/database/inMemory/producerConsumer.ts";
import {  messageWithDate } from "../utils/logs.ts";

const initProducerConsumer = async () => {
    const { onSuccess, onError } = await initAllChannels();
    messageWithDate(`["THREAD" 1]: Initializing producer-consumer...`,"orange");
    onError((e) => {
        messageWithDate(`["THREAD" 1]: Error initializing Discord channels: ${e.message}`, "red");
        exit(1);
    });
    onSuccess((client) => watcherDiscordMenssage(client));
    await consumerMessage();
    messageWithDate(`["THREAD" 1]: Producer-consumer initialized successfully.`,"orange");
    messageWithDate(`["THREAD" 1]: Listening for messages...`,"orange");
    messageWithDate(`["THREAD" 1]: You can now send messages to the channels.`,"orange");
    messageWithDate(`["THREAD" 1]: Press Ctrl+C to exit.`,"orange");
    messageWithDate(`["THREAD" 1]: Enjoy!`,"orange");
}












export const app = async () => {
    messageWithDate("Starting application...");
    await initProducerConsumer();
    messageWithDate("Application started successfully.");
};
