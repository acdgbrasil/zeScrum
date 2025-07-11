import { KAMBAN } from "../../../../config/config.ts";

export const getProjectV2IdQuery = `query {
    organization(login: "${KAMBAN.org}") {
        projectsV2(first: 10) {
          nodes {
            id
            title
            number
          }
        }
    }
}`;