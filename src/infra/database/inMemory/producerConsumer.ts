import { Client } from "https://deno.land/x/harmony@v2.9.1/mod.ts";
import { saveSnapshotForMessagesOfChannel } from "../disc/cache.ts";
import { channelMessage } from "../../../utils/types.ts";
import { formatedDatePtBr } from "../../../utils/logs.ts";
import { discordConfigs } from "../../comunicationChannel/discord/config/discordConfig.ts";
import { setTimer } from "./RAM/globalVariables.ts";
import { discordClient } from "../../comunicationChannel/discord/core/discordCore.ts";

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
    //TOODO: Deixar isso melhor em uma arquitetura, mas isso é trabalho de um refactor, porém duvido MUITO que eu use JS/TS para fazer isso, então vou deixar assim mesmo.
    // Provavel que eu use dart, em questão de performance, e por eu Poder escalar, deixando em threads, e não em processos...
    // Em questão de MVP, acho que isso foi um sucesso, eu consegui fazer o mais importante, e vi todos os processos que preciso que sejam feitos.
    const bufferOfMessage = [];
    let countBuffer = 0;
    const limits = [];
    for (let i = 0; i < message.length; i++){
        
        
        if(i === 0) limits.push(i);
        if (countBuffer == 1900){
            bufferOfMessage.push(message.slice(limits.pop(),i));
            limits.push(i);
            countBuffer = 0;
        }
        if(i === message.length - 1) {
            bufferOfMessage.push(message.slice(limits.pop(),i + 1));
        }
        countBuffer++;
    }
    
    for await (const msg of bufferOfMessage){
        const a = await discordClient.channels.sendMessage("1376332473197269054", {
            content: msg,
        });
        console.log("Message sent to Discord channel:", a.id);
    }
    
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