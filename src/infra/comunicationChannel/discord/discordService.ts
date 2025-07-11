import { COMUNICATION_CHANNEL } from "../../../config/config.ts";
import {  Client, GatewayIntents, Message } from "https://deno.land/x/harmony@v2.9.1/mod.ts";
import { matchResult } from "../../../utils/idontknownameofthisfile.ts";
import { messageWithDate } from "../../../utils/logs.ts";
import { DISCORD_CHANNELS_ID } from "./config/discordConfig.ts";
const _clients: Client[] = [];

const _createClient = () => {
  const channelIds = Object.values(DISCORD_CHANNELS_ID); 
  channelIds.forEach((_id) =>
    _clients.push(
      new Client({
        token: COMUNICATION_CHANNEL.token,
        intents: [
          GatewayIntents.GUILDS,
          GatewayIntents.GUILD_MESSAGES,
          GatewayIntents.DIRECT_MESSAGES,
          GatewayIntents.GUILD_MESSAGE_REACTIONS,
          GatewayIntents.GUILD_MESSAGE_TYPING,
        ],
        id: _id,
        clientProperties: {
          os: Deno.build.os,
          browser: "zeScrum",
          device: "zeScrum Device",
        },
      }),
    )
  );

  if (_clients.length === 0) {
    return matchResult<Client[], Error>({
      ok: false,
      error: new Error("No Discord channels found in configuration."),
    });
  }
  return matchResult<Client[], Error>({
    ok: true,
    value: _clients,
  });
};

const _connectClients = async (clients: Client[]) => {
  return await Promise.all(
    clients.map(async (clients) => {
      messageWithDate(`Connecting... to Discord channel with ID: ${clients._id}`,"blue");
      await clients.connect();
      messageWithDate(`Connected to Discord channel with ID: ${clients._id}`,"blue");
      return matchResult<Client, Error>({
        ok: true,
        value: clients,
      });
    }),
  );
};

//TODO: REFAZER ESSA FUNÇÃO PARA LANÇAR SÓ OS LISTENNERS ESPECIFICOS PARA CADA CANAL
export const initAllChannels = async () => {
  const { onSuccess, onError } = _createClient();
  onError((e) => messageWithDate(`Error creating Discord client: ${e.message}`, "red"));

  const results = await onSuccess(async (clients) => await _connectClients(clients));
  
  if (!results) messageWithDate(`Error connecting to Discord channels`, "red");

  if (results!.length === 0) messageWithDate(`No Discord channels connected`, "red");
  
  results!.map((closure) => {
    return closure.onSuccess((client) => matchResult<Client,Error>({
      ok: true,
      value: client
    }));
  });

  return results!.filter((results) => results.onSuccess((client) => (client._id !== undefined && client._id !== null))).shift()!; // Return the first client that is successfully connected
};




