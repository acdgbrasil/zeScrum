import { discordClient } from "./core/discordCore.ts"

export const connectToDiscord = async (callback: () => void = () => {}) => {
    await discordClient.connect();
    callback();
}

export const disconnectFromDiscord  = async (callback: () => void = () => {}) => {
    await discordClient.destroy();
    callback();
}