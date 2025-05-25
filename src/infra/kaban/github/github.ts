import { ENV } from "../../../config/config.ts";
const GITHUB_API = "https://api.github.com/graphql";

enum REQUEST_METHOD{
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

const getProjectFildsQuery = `query {
  node(id: "${ENV.GITHUB_PROJECT_ID}") {
    ... on ProjectV2 {
      fields(first: 50) {
        nodes {
          ... on ProjectV2FieldCommon {
            id
            name
            dataType
          }
        }
      }
    }
  }
}`

const getProjectV2IdQuery = `query {
    organization(login: "${ENV.GITHUB_ORG}") {
        projectsV2(first: 10) {
          nodes {
            id
            title
            number
          }
        }
    }
}`;


const getBoardDataQuery = `query {
  node(id: "${ENV.GITHUB_PROJECT_ID}") {
    ... on ProjectV2 {
      items(first: 100) {
        nodes {
        content {
            ... on Issue {
              number
              title
              url
              state
            }

            ... on PullRequest {
              number
              title
              url
              state
            }
          }
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field {
                  ... on ProjectV2SingleSelectField {
                    id
                  }
                }
              }

              ... on ProjectV2ItemFieldTextValue {
                text
                field {
                  ... on ProjectV2Field {
                    id
                  }
                }
              }

              ... on ProjectV2ItemFieldDateValue {
                date
                field {
                  ... on ProjectV2Field {
                    id
                  }
                }
              }

              ... on ProjectV2ItemFieldUserValue {
                users(first: 5) {
                  nodes {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`




function requestInit(method:REQUEST_METHOD,headers:HeadersInit,query:{query:string}):RequestInit {
    return {
        method: method,
        headers: headers,body: JSON.stringify(query),
    };
}


function convertToMapFields(fields:[any]){
  const fieldsMap: Map<string,string> = new Map<string,string>();
  for(const field of fields) {
    fieldsMap.set(field.id,field.name);
  }

  return fieldsMap;
}


export async function getProjectV2Id(): Promise<string> {

  const response = await fetch(GITHUB_API,requestInit(REQUEST_METHOD.POST,{
        "Authorization": `Bearer ${ENV.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
    },
        {query: getProjectV2IdQuery}
    ));


  if(response.status !== 200) {
    throw new Error(`Erro ao buscar projetos: ${response.statusText}`);
  }

  const data = await response.json();

  console.log("✅ Dados do projeto:", data);


//   const data = await response.json();

  const project = data.data.organization.projectsV2.nodes.find(
    (p: any) => p.number === 5, // ← Esse é o número da URL que você me passou
  );

  if (!project) throw new Error("Projeto não encontrado ou sem permissão");

  console.log("✅ Project ID:", project.id, "→", project.title);

  return project.id;
}


export async function getBoardData(): Promise<{
    content:{
      number: number,
      title:string,
      url: string,
      state: string,
      user: string,
      project:string,
      type:string,
    },
    fieldValues:any}[]> {

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query:getBoardDataQuery }),
  });

  const result = await response.json();
  if(response.status !== 200) {
    throw new Error(`Erro ao buscar dados do board: ${response.statusText}`);
  }

  const nodes = result.data.node.items.nodes
  
  const cardInformation:{
    content:{
      number: number,
      title:string,
      url: string,
      state: string,
      user: string,
      project:string,
      type:string,
    },
    fieldValues:any}[] = []



  for(const node of nodes){
    const fieldValues = node.fieldValues.nodes;
    const content = node.content;
    if(!content.url == undefined || content.url == null) continue;
    const [headerUrl,_,url,organization,project,type,number] = content.url.split("/");
    const userName = fieldValues[0]?.users?.nodes[0]?.login
    const b: {
    content:{
      number: number,
      title:string,
      url: string,
      state: string,
      user: string,
      project:string,
      type:string,
    },
    fieldValues:any} = {
      content:{
        number: content.number,
        title: content.title,
        url: content.url,
        state: content.state,
        user: userName,
        project: project,
        type: type,
      },
      fieldValues: fieldValues
    }
    cardInformation.push(b);
  }

  return cardInformation;
}

export async function getProjectFilds(): Promise<Map<string,string>> {
    const response:Response = await fetch("https://api.github.com/graphql", 
        requestInit(REQUEST_METHOD.POST,
            {
                "Authorization": `Bearer ${ENV.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
            {query:getProjectFildsQuery}
        )
    );

    if (response.status !== 200) {
        console.error("Erro ao buscar campos do projeto:", response.statusText);
        throw new Error(`Erro ao buscar campos do projeto: ${response.statusText}`);
    }

    const data = await response.json();
    const fields = data.data.node.fields.nodes;
    const fieldsMap = convertToMapFields(fields);
    return fieldsMap;
}

export async function getBoardCards(): Promise<Map<string,Map<string,string>>> {
  
  const mapFields = await getProjectFilds();
  const boardData = await getBoardData();
  const boardContent = new Map<string,string>();
  const cardFieldMap: Map<string,Map<string,string>> = new Map<string,Map<string,string>>();

  for(let i = 0; i < boardData.length; i++) {
    for(let j=0; j < boardData[i].fieldValues.length; j++) {
      const fieldId = boardData[i].fieldValues[j].field;
      if(fieldId === undefined || fieldId === null) continue;
      const fieldIdString = fieldId.id;
      const fieldName = mapFields.get(fieldIdString);
      if(fieldName === undefined || fieldName === null) continue;
      const fieldValues = boardData[i].fieldValues[j]?.name ||
        boardData[i].fieldValues[j]?.text ||
        boardData[i].fieldValues[j]?.date ||
        boardData[i].fieldValues[j]?.users?.nodes[0]?.login;
      
      boardContent.set(fieldName, fieldValues)
    }

    cardFieldMap.set(`${boardData[i].content.number}-${boardData[i].content.project}`, boardContent);
  }
  return cardFieldMap;
}