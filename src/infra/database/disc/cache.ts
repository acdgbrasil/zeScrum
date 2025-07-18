import { join } from "https://deno.land/std/path/mod.ts";
import { actualBoardSprintDay, GITHUB_SPRINTS,compareDaysOfBoard } from "../../kaban/github/github.ts";
import { formatedDatePtBr } from "../../../utils/logs.ts";
import { actualSprintNameFormatted, matchResult } from "../../../utils/idontknownameofthisfile.ts";
import { channelMessage } from "../../../utils/types.ts";
import {disc,has,set,get, Disc, push} from "../../../utils/dataStructures/disc.ts"

const createSnapshotOfdiaryBoardMoment = async (board: {
  id: string;
  title: string;
  responsaveis: string[];
  coluna: string | null;
  time: string | null;
  prioridade: string | null;
  tamanho: string | null;
  etapa: string | null;
  status: string | null;
  sprint: string | null;
  dataEntregue: string | null;
}[], actualSprint: GITHUB_SPRINTS): Promise<void> => {
  const filteredBoard = board.filter((item) => item.sprint === actualSprint);
  const filePath = join(
    Deno.cwd(),
    "cache",
    "github",
    "snapshots",
    "board",
    actualSprintNameFormatted(actualSprint),
  );
  await Deno.mkdir(filePath, { recursive: true });
  await Deno.writeTextFile(
    `${filePath}/${formatedDatePtBr().dateFormat.day_month_year_with_dash}.json`,
    JSON.stringify(filteredBoard, null, 2),
  );
};

const separeteArrayOfChannelMessagesInDiscWithKeyUseChannelName = (channelMessages: channelMessage[]) => {
  const entrys = channelMessages.map((msg) => msg.channelName);
  const values = channelMessages.map((msg) => msg);
  const discMessageWithChannelName: Record<string, channelMessage[]> = {};
  for (let i = 0; i < entrys.length; i++) {
    const channelName = entrys[i];
    if (!has(discMessageWithChannelName, channelName)) {
      discMessageWithChannelName[channelName] = [];
    }
    discMessageWithChannelName[channelName].push(values[i]);
  }
  return discMessageWithChannelName;
}


const saveInFlatFileSnapshotDiscordDay = async (disc:Record<string,channelMessage[]>,actualSprint:number): Promise<void> => {
  const actualDate = formatedDatePtBr().dateFormat.day_month_year_with_dash;
  const actualSprintName = actualSprint === 0 ? "sprint_0" : `sprint_${actualSprint}`;
  const filePath = join(Deno.cwd(),"cache","discord","snapshots",actualSprintName,actualDate);
  console.log(`Saving Discord messages snapshot to ${filePath}`);
  await Deno.mkdir(filePath, { recursive: true });
  for (const [channelName, messages] of Object.entries(disc)) {
    await Deno.writeTextFile(`${filePath}/${channelName}.json`, JSON.stringify(messages, null, 2));
  }
}

export const executeSaveFlatFileSnapshotDiscordDay = async (actualSprint:number): Promise<void> => {
  const discDiaryMessage = await processSnapshotOfDiaryMessagesInCashe();
  await saveInFlatFileSnapshotDiscordDay(discDiaryMessage, actualSprint);
}


export const getSnapshotOFGithub = async (actualSprint: GITHUB_SPRINTS): Promise<object> => {

  const getActualBoard = await actualBoardSprintDay(actualSprint);
  const snapshotDiffBoard = await compareDaysOfBoard(actualSprint);

  return {
    actualBoard: getActualBoard,
    actualSprint: actualSprint,
    diffOfTodayBoardToYesterdayBoard: snapshotDiffBoard,
  }
}

export const executeSaveFlatFileSnapshotBoardMoment = async () => {
  await actualBoardSprintDay(GITHUB_SPRINTS.SPRINT_11);
  const board = await actualBoardSprintDay(GITHUB_SPRINTS.SPRINT_11);
  await createSnapshotOfdiaryBoardMoment(board, GITHUB_SPRINTS.SPRINT_11);
}

 export const saveSnapshotForMessagesOfChannel = async (message:channelMessage) => {
  if(message.channelName === "Unknown Channel") return;
  const filePath = join(Deno.cwd(),"cache","discord","snapshots","messages");
  await Deno.mkdir(filePath, { recursive: true });
  const content = JSON.stringify(message) + "\n";
  await Deno.writeTextFile(`${filePath}/discord_message_log.jsonl`, content, { append: true });
}

 export const processSnapshotOfDiaryMessagesInCashe = async () => {
  const filePath = join(Deno.cwd(),"cache","discord","snapshots","messages");
  const fileName = `discord_message_log.jsonl`;
  const fileContent = await Deno.readTextFile(`${filePath}/${fileName}`);
  const lines = fileContent.trim().split('\n');
  const arrayOfJsonMessage: channelMessage[] = lines.map((line) => line.trim() === '' ? null : JSON.parse(line)).filter(message => message !== null);
  const discMessageWithChannelName = separeteArrayOfChannelMessagesInDiscWithKeyUseChannelName(arrayOfJsonMessage);
  return discMessageWithChannelName;
}

export const saveDiffOfSnapshots = async (cardsArrayDiff: any,actualSprint:GITHUB_SPRINTS): Promise<void> => {
 const filePath = join(
    Deno.cwd(),
    "cache",
    "github",
    "snapshots",
    "board",
    "DIFF",
    actualSprintNameFormatted(actualSprint),
  );
  await Deno.mkdir(filePath, { recursive: true });
  await Deno.writeTextFile(
    `${filePath}/${formatedDatePtBr().dateFormat.day_month_year_hour_minutes_secounds_with_dash}.json`,
    JSON.stringify(cardsArrayDiff, null, 2),
  );
};
