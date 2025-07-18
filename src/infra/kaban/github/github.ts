import { KAMBAN } from "../../../config/config.ts";
import { actualSprintNameFormatted } from "../../../utils/idontknownameofthisfile.ts";
import { formatedDatePtBr } from "../../../utils/logs.ts";
import { getAllBoardDataQuery } from "./querys/getAllBoardData.ts";
import { getProjectV2IdQuery } from "./querys/getProjectV2IdQuery.ts";
import { join } from "https://deno.land/std/path/mod.ts";
const GITHUB_API = "https://api.github.com/graphql";

enum REQUEST_METHOD {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  CONNECT = "CONNECT",
}

export enum GITHUB_SPRINTS {
  SPRINT_0 = "0º SPRINT",
  SPRINT_1 = "1º SPRINT",
  SPRINT_2 = "2º SPRINT",
  SPRINT_3 = "3º SPRINT",
  SPRINT_4 = "4º SPRINT",
  SPRINT_5 = "5º SPRINT",
  SPRINT_6 = "6º SPRINT",
  SPRINT_7 = "7º SPRINT",
  SPRINT_8 = "8º SPRINT",
  SPRINT_9 = "9º SPRINT",
  SPRINT_10 = "10º SPRINT",
  SPRINT_11 = "11º SPRINT",
  SPRINT_12 = "12º SPRINT",
  SPRINT_13 = "13º SPRINT",
  SPRINT_14 = "14º SPRINT",
  SPRINT_15 = "15º SPRINT",
  SPRINT_16 = "16º SPRINT",
  SPRINT_17 = "17º SPRINT",
  SPRINT_18 = "18º SPRINT",
  SPRINT_19 = "19º SPRINT",
  SPRINT_20 = "20º SPRINT",
}

function requestInit(
  method: REQUEST_METHOD,
  headers: HeadersInit,
  query: { query: string },
): RequestInit {
  return {
    method: method,
    headers: headers,
    body: JSON.stringify(query),
  };
}

function parseProjectCardsFromGitHub(rawCards: any[]): {
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
}[] {
  const tamanhoEmojis = ["🐇", "🐂", "🦑", "🐋", "🦔", "🤯"];
  const timeEmojis = ["🎨", "⚙", "🖼", "🔍", "🧑‍💼"];
  const prioridadeEmojis = ["🌋", "🏔", "🏕", "🏝", "☕"];
  const colunaKeywords = ["DOING", "DONE", "REVIEW", "BACKLOG"];
  const statusKeywords = ["Aceito", "Reprovado", "Aguardando"];

  return rawCards.map((item: any) => {
    let responsaveis: string[] = [];
    let coluna: string | null = null;
    let time: string | null = null;
    let prioridade: string | null = null;
    let tamanho: string | null = null;
    let etapa: string | null = null;
    let status: string | null = null;
    let sprint: string | null = null;
    let dataEntregue: string | null = null;
    let dateValues: string[] = [];

    for (const fv of item.fieldValues?.nodes ?? []) {
      if (fv?.users?.nodes) {
        responsaveis = fv.users.nodes.map((u: any) => u.login);
        continue;
      }
      if (typeof fv.name === "string" && /SPRINT/i.test(fv.name)) {
        sprint = fv.name;
        continue;
      }
      if (
        typeof fv.name === "string" &&
        colunaKeywords.some((kw) => fv.name.toUpperCase().includes(kw))
      ) {
        coluna = fv.name;
        continue;
      }
      if (
        typeof fv.name === "string" && statusKeywords.some((kw) =>
          fv.name.toUpperCase().includes(kw.toUpperCase())
        )
      ) {
        status = fv.name;
        continue;
      }
      if (
        typeof fv.name === "string" &&
        timeEmojis.some((e) => fv.name.trim().startsWith(e))
      ) {
        time = fv.name;
        continue;
      }
      if (
        typeof fv.name === "string" &&
        tamanhoEmojis.some((e) => fv.name.trim().startsWith(e))
      ) {
        tamanho = fv.name;
        continue;
      }
      if (
        typeof fv.name === "string" &&
        prioridadeEmojis.some((e) => fv.name.trim().startsWith(e))
      ) {
        prioridade = fv.name;
        continue;
      }
      if (
        typeof fv.name === "string" &&
        /^[^\w\s]/.test(fv.name.trim()) &&
        !coluna && !time && !tamanho && !prioridade && !/SPRINT/i.test(fv.name)
      ) {
        etapa = fv.name;
        continue;
      }
      if (typeof fv.date === "string") {
        dateValues.push(fv.date);
        continue;
      }
    }

    if (dateValues.length > 0) {
      dataEntregue = dateValues.sort().reverse()[0];
    }

    return {
      id: item.id,
      title: item.content?.title ?? "",
      responsaveis,
      coluna,
      time,
      prioridade,
      tamanho,
      etapa,
      status,
      sprint,
      dataEntregue,
    };
  });
}

export async function getProjectV2Id(): Promise<string> {
  const response = await fetch(
    GITHUB_API,
    requestInit(REQUEST_METHOD.POST, {
      "Authorization": `Bearer ${KAMBAN.token}`,
      "Content-Type": "application/json",
    }, { query: getProjectV2IdQuery }),
  );

  if (response.status !== 200) {
    throw new Error(`Erro ao buscar projetos: ${response.statusText}`);
  }
  const data = await response.json();
  //   const data = await response.json();

  const project = data.data.organization.projectsV2.nodes.find(
    (p: any) => p.number === 5, // ← Esse é o número da URL que você me passou
  );

  if (!project) throw new Error("Projeto não encontrado ou sem permissão");
  return project.id;
}

export const getBoardData = async (): Promise<
  {
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
  }[]
> => {
  let allItems: any[] = [];
  let hasNextPage: boolean | null = null;
  let endCursor: string | null = null;
  let counter = 0;
  const projectId = await getProjectV2Id();

  while (hasNextPage == true || counter == 0) {
    const response: Response = await fetch(
      GITHUB_API,
      requestInit(REQUEST_METHOD.POST, {
        "Authorization": `Bearer ${KAMBAN.token}`,
        "Content-Type": "application/json",
      }, {
        query: getAllBoardDataQuery(
          projectId,
          endCursor,
        ),
      }),
    );

    counter = counter + 1;
    const resJson: any = await response.json();
    const items = resJson.data.node.items.nodes;
    allItems.push(...items);
    hasNextPage = resJson.data.node.items.pageInfo.hasNextPage;
    endCursor = resJson.data.node.items.pageInfo.endCursor;
  }
  return parseProjectCardsFromGitHub(allItems);
};


export const getOfBoardCardsOfActualSprint = (boardData:{id: string;
    title: string;
    responsaveis: string[];
    coluna: string | null;
    time: string | null;
    prioridade: string | null;
    tamanho: string | null;
    etapa: string | null;
    status: string | null;
    sprint: string | null;
    dataEntregue: string | null}[],sprint:GITHUB_SPRINTS) => {
    const getCardsForActualSprint = boardData.filter((card) => {
      if(card.sprint === sprint){
       return card;
      }
    })
    return getCardsForActualSprint;
}

export const actualBoardSprintDay = async (sprint:GITHUB_SPRINTS) => {
  const boardData = await getBoardData();
  const actualSprintBoardData = getOfBoardCardsOfActualSprint(boardData, sprint);
  return actualSprintBoardData;
}

export const compareDaysOfBoard = async (actualSprint:GITHUB_SPRINTS) => {
  
  const filePath = join("cache",
    "github",
    "snapshots",
    "board",actualSprintNameFormatted(actualSprint))

  const filePathToday = join(filePath, `${formatedDatePtBr().dateFormat.day_month_year_with_dash}.json`);
  const filePathYesterday = join(filePath, `${formatedDatePtBr().yDateFormat.day_month_year_with_dash_yesterday}.json`);
  const fileToday = await Deno.readTextFile(filePathToday);
  const fileYesterday = await Deno.readTextFile(filePathYesterday);
  
  const jsonToday: {
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
  }[] = JSON.parse(fileToday);
  
  const jsonYesterday: {
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
  }[] = JSON.parse(fileYesterday);

  const lengthDiff = jsonToday.length - jsonYesterday.length;

  const newCards = jsonToday.filter((cardToday) => {
    return !jsonYesterday.some((cardYesterday) =>
      cardYesterday.id === cardToday.id
    );
  });

  const removedCards = jsonYesterday.filter((cardYesterday) => {
    return !jsonToday.some((cardToday) => cardToday.id === cardYesterday.id);
  });

  const updatedCards = jsonToday.map((cardToday) => {
    const a = jsonYesterday.map((cardYesterday) => {
      if (cardYesterday.id === cardToday.id) {
        const hasDifference =
          JSON.stringify(cardYesterday) !== JSON.stringify(cardToday);
        if (hasDifference) {
          return {
            ...cardToday,
            updated: true,
            previousData: cardYesterday,
          };
        }
      }
      return null;
    });
    return a.filter((item) => item !== null);
  });

  const updatedCardsFlat = updatedCards.flat().filter((item) => item !== null);

  const diffCardsArray = updatedCardsFlat.map((card) => {
    const a = Object(card);
    const b = Object.entries(card.previousData).map(([key, value]) => {
      const currentValue = a[key];

      if (currentValue !== value) {
        return {
          field: key,
          previousValue: value,
          currentValue: currentValue,
        };
      }
    });
    return b.filter((item) => item !== undefined);
  });

  return {
    previewsLenght: jsonYesterday.length,
    currentLenght: jsonToday.length,
    lengthDiff: lengthDiff,
    newCards: newCards,
    removedCards: removedCards,
    updatedCards: updatedCardsFlat,
    diffCardsArray: diffCardsArray,
    diffText: diffCardsArray.map((objectArray) => objectArray.map((object)=> `O campo: ${object.field} foi alterado de "${object.previousValue}" para "${object.currentValue}"`)).flat()
  }
};
