import { exit } from "node:process";
import { initAllChannels } from "../infra/comunicationChannel/discord/discordService.ts";
import {
  consumerMessage,
  producerTime,
  watcherDiscordMenssage,
} from "../infra/database/inMemory/producerConsumer.ts";
import { messageWithDate } from "../utils/logs.ts";
import {
  executeSaveFlatFileSnapshotBoardMoment,
  executeSaveFlatFileSnapshotDiscordDay,
  getSnapshotOFGithub,
} from "../infra/database/disc/cache.ts";
import { GITHUB_SPRINTS } from "../infra/kaban/github/github.ts";
import { getTimer, setTimer } from "../infra/database/inMemory/RAM/globalVariables.ts";
import { createRelatoryUseCase } from "./useCase/sendRelatoryUseCase.ts";


const initProgram = async () => {
    await initProducerConsumer(0);
    setTimer(0);
    todaySnapShot(0);
}
const initProducerConsumer = async (workers: number) => {
  const { onSuccess, onError } = await initAllChannels();
  messageWithDate(
    `["THREAD" ${workers}]: Initializing producer-consumer...`,
    "orange",
  );
  onError((e) => {
    messageWithDate(
      `["THREAD" ${workers}]: Error initializing Discord channels: ${e.message}`,
      "red",
    );
    exit(1);
  });
  onSuccess((client) => watcherDiscordMenssage(client));
  await consumerMessage();
  messageWithDate(
    `["THREAD" ${workers}]: Producer-consumer initialized successfully.`,
    "orange",
  );
  messageWithDate(`["THREAD" ${workers}]: Listening for messages...`, "orange");
  messageWithDate(
    `["THREAD" ${workers}]: You can now send messages to the channels.`,
    "orange",
  );
  messageWithDate(`["THREAD" ${workers}]: Press Ctrl+C to exit.`, "orange");
  messageWithDate(`["THREAD" ${workers}]: Enjoy!`, "orange");
};

const todaySnapShot = (worker: number) => {
  let i = 0;
  setTimeout(async () => {
    if (await getTimer() === i) {
      messageWithDate(
        `[Thread ${worker}]: Taking a snapshot of today's data...`,
        "pink",
      );
      messageWithDate(
        `[Thread ${worker}]: getting of today's data taken...`,
        "pink",
      );
      await executeSaveFlatFileSnapshotDiscordDay(0);
      messageWithDate(
        `[Thread ${worker}]: getting of today's data taken successfully.`,
        "pink",
      );
      messageWithDate(
        `[Thread ${worker}]: Taking a snapshot of today's board moment...`,
        "pink",
      );
      await executeSaveFlatFileSnapshotBoardMoment();
      messageWithDate(
        `[Thread ${worker}]: Snapshot of today's board moment taken successfully.`,
        "pink",
      );
      producerTime();
      await createRelatoryUseCase();
      messageWithDate(`[Thread ${worker}]: Update timer to ${await getTimer()}`, "green");
    }
    messageWithDate(`timer for another snapshot: ${timerLog(await getTimer() - i)}`,"green");
    i++;
    setTimer(await getTimer() - i);
    setTimeout(() => todaySnapShot(worker));
  }, 1000);
};

const timerLog = (i: number) => {
  const hour = Math.floor(i / 3600);
  const minute = Math.floor((i % 3600) / 60);
  const second = i % 60;
  return `${hour.toString().padStart(2, "0")}:${
    minute.toString().padStart(2, "0")
  }:${second.toString().padStart(2, "0")}`;
};

export const app = async () => {
 initProgram();
};
