import { Client } from "https://deno.land/x/harmony@v2.9.1/mod.ts";
import { saveSnapshotForMessagesOfChannel } from "../disc/cache.ts";
import { channelMessage } from "../../../utils/types.ts";
import { formatedDatePtBr } from "../../../utils/logs.ts";
import { discordConfigs } from "../../comunicationChannel/discord/config/discordConfig.ts";

export type listOfCommunicationChannelMessageDay = {
    name:string
    id:string;
    channelId:string;
    messages:{
        data:string;
        content:string
    }
}
export const DISCORD_CHANNELS_MESSAGES:listOfCommunicationChannelMessageDay[] = [];

export const messageQueue: channelMessage[] = [];

export const consumerMessage = async () => {
    if (messageQueue.length > 0){
    const message = messageQueue.pop();
    await saveSnapshotForMessagesOfChannel(message!);
    }
    setTimeout(() => consumerMessage(), 500);
}

export const productorMessage = (value:channelMessage) => messageQueue.push(value);

export const watcherDiscordMenssage = (client: Client) => client.on("messageCreate",(msg)=>productorMessage({
    id: msg.id,
    channelName: discordConfigs().DISCORD_CHANNELS_NAME.get(msg.channel.id) || "Unknown Channel",
    channelId: msg.channel.id,
    personName: msg.author.username,
    personId: msg.author.id,
    msg: {
        pureContent: msg.content,
        createdAt: msg.createdAt.toISOString(),
        formatMessage: `${msg.author.username} say ${msg.content} in channel ${msg.channel} at ${formatedDatePtBr().dateFormat.day_month_year_hour_minutes_secounds}`,
        attachments: msg.attachments.map(att => att.url), 
    }
}));