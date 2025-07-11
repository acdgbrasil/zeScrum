import { join } from "https://deno.land/std/path/mod.ts";
import { GITHUB_SPRINTS } from "../../kaban/github/github.ts";
import { formatedDatePtBr } from "../../../utils/logs.ts";
import { actualSprintNameFormatted } from "../../../utils/idontknownameofthisfile.ts";
import { channelMessage } from "../../../utils/types.ts";

export const createSnapshotOfdiaryBoardMoment = async (board: {
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


export const saveSnapshotForMessagesOfChannel = async (message:channelMessage) => {
  const filePath = join(Deno.cwd(),"cache","discord","snapshots","messages");
  await Deno.mkdir(filePath, { recursive: true });
  await Deno.writeTextFile(`${filePath}/discord_message_log.jsonl`,JSON.stringify(message),{append:true});
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
