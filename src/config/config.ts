import {load} from "jsr:@std/dotenv";

const env = await load({export: true,envPath: "./.env"});

export const SNAPSHOT_CONFIG = {
    timeForFirstSnapshot: (1000*60)*10, // 10 minutes
}

export const KAMBAN = {
    token:env.GITHUB_TOKEN,
    org: env.GITHUB_ORG,
    project_id: env.GITHUB_PROJECT_ID,
    last_sprint_number: env.LAST_SPRINT_NUMBER,
};

export const COMUNICATION_CHANNEL = {
    webkook: env.DISCORD_WEBHOOK,
    token: env.DISCORD_TOKEN,
};

export const DATABASE = {
    type: env.TYPE_DATABASE,
    url: env.URL_DATABASE,
    name: env.DATABASE_NAME
};

export const IA = {
    provider: env.IA_PROVIDER,
    api_key: env.OPENAI_API_KEY,
};

