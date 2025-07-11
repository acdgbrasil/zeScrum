export const getAllBoardDataQuery = (
  projectId: string,
  endCursor: string | null,
): string => {
  return `
    {
  node(id: "${projectId}") {
    ... on ProjectV2 {
      items(first: 100${endCursor ? `,after:"${endCursor}"` : ``}) {
        nodes {
          id
          content {
            ... on Issue {
              title
              labels(first: 10) {
                nodes {
                  name
                }
              }
            }
            ... on PullRequest {
              title
              labels(first: 10) {
                nodes {
                  name
                }
              }
            }
          }
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldTextValue {
                text
                field {
                __typename
                }
              }
              ... on ProjectV2ItemFieldDateValue {
                date
                field {
                                  __typename

                }
              }
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field {
                                  __typename

                }
              }
              ... on ProjectV2ItemFieldUserValue {
                users(first: 10) {
                  nodes {
                    login
                  }
                }
                field {
                                  __typename

                }
              }
            }
          }
        },
        pageInfo {
          hasNextPage,
          endCursor
        } 
      }
    }
  }
}
  `;
};
