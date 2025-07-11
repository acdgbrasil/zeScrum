import { Client, GatewayIntents } from "https://deno.land/x/harmony@v2.9.1/mod.ts";
import { COMUNICATION_CHANNEL } from "../../../../config/config.ts";
export const discordClient = new Client({
    token: COMUNICATION_CHANNEL.token,
    intents:[
        GatewayIntents.GUILDS,
        GatewayIntents.GUILD_MESSAGES,
        GatewayIntents.DIRECT_MESSAGES,
        GatewayIntents.GUILD_MESSAGE_REACTIONS,
        GatewayIntents.GUILD_MESSAGE_TYPING
    ],
    
});