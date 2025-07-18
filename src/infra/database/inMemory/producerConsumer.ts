import { AllowedMentionType, Client } from "https://deno.land/x/harmony@v2.9.1/mod.ts";
import { saveSnapshotForMessagesOfChannel } from "../disc/cache.ts";
import { channelMessage } from "../../../utils/types.ts";
import { formatedDatePtBr } from "../../../utils/logs.ts";
import { discordConfigs } from "../../comunicationChannel/discord/config/discordConfig.ts";
import { setTimer } from "./RAM/globalVariables.ts";
import { config, off } from "node:process";
import { createRelatoryUseCase } from "../../../application/useCase/sendRelatoryUseCase.ts";
import {COMUNICATION_CHANNEL} from "../../../config/config.ts"

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



export const consumerTimer = () => {
    setTimeout(() => consumerTimer(), 3600);
}
export const consumerMessage = async () => {
    if (messageQueue.length > 0){
    const message = messageQueue.pop();
    await saveSnapshotForMessagesOfChannel(message!);
    }
    setTimeout(() => consumerMessage(), 500);
}

export const productorMessage = (value:channelMessage) => messageQueue.push(value);
export const producerTime = () => setTimer(formatedDatePtBr().dateIndividual.int.sumAll*3600);

export const sendToDayMessage = async (message:string) => {
    const client = new Client();
    const channel = discordConfigs().DISCORD_CHANNELS_NAME.get("relatorios do zeScrum");
    const c = await client.connect(COMUNICATION_CHANNEL.token);

    c.channels.sendMessage(channel!, {
        content: message,
        title: "Relatório do dia: @everyone",
        footer: {
            text: "Relatório gerado automaticamente pelo Zé Scrum Bot",
        },
        timestamp: new Date().toISOString(),
        embeds: [],
        components: [],
        files: [],
        allowedMentions: {
            parse: [AllowedMentionType.Users, AllowedMentionType.Roles],
        },
    })
    
}

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