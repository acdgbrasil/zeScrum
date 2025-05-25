import { ENV } from "../../config/config.ts";
const GITHUB_API = "https://api.github.com/graphql";

const getProjectFildsQuery = `query {
  node(id: "${ENV.GITHUB_PROJECT_ID}") {
    ... on ProjectV2 {
      fields(first: 50) {
        nodes {
          __typename
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



const requestInit:RequestInit = {
    method: "POST",
    headers:{
        "Authorization": `Bearer ${ENV.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({query:getProjectFildsQuery})
}




export async function getProjectV2Id(): Promise<string> {
    const query = `
    query {
      organization(login: "${ENV.GITHUB_ORG}") {
        projectsV2(first: 10) {
          nodes {
            id
            title
            number
          }
        }
      }
    }
  `;
  

  const response = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

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


export async function getBoardData(): Promise<string> {
const query = `query {
  node(id: "${ENV.GITHUB_PROJECT_ID}") {
    ... on ProjectV2 {
      title
      items(first: 100) {
        nodes {
          id
          createdAt
          updatedAt
          content {
            ... on Issue {
              number
              title
              url
              state
              labels(first: 10) {
                nodes {
                  name
                }
              }
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
              }
              ... on ProjectV2ItemFieldTextValue {
                text
              }
              ... on ProjectV2ItemFieldDateValue {
                date
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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  const items = result.data.node.items.nodes

  return items || "Nenhum item da Sprint 9 encontrado no board.";
}


export async function getProjectFilds(): Promise<any>{
    const response:Response = await fetch("https://api.github.com/graphql", requestInit)
    if (response.status !== 200) {
        console.error("Erro ao buscar campos do projeto:", response.statusText);
        return null;
        
    }

    const data = await response.json();
    const fields = data.data.node.fields.nodes;
    return fields

}