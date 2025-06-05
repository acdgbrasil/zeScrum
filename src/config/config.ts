import "https://deno.land/x/dotenv/load.ts";
import { messageWithDate } from "../utils/logs.ts";
function getEnv(key: string): string {
  const value = Deno.env.get(key);
  if (!value) {
    console.error(`Environment variable ${key} is not set.`);
    Deno.exit(1);
  }
  return value;
}

function loadEnv(){
  const GITHUB_TOKEN = getEnv("GITHUB_TOKEN");
  const GITHUB_ORG = getEnv("GITHUB_ORG");
  const GITHUB_PROJECT_ID = getEnv("GITHUB_PROJECT_ID");

  // Discord
  const DISCORD_WEBHOOK = getEnv("DISCORD_WEBHOOK");

  // IA
  const AI_PROVIDER = getEnv("AI_PROVIDER");
  const OPENAI_API_KEY = getEnv("OPENAI_API_KEY");
  const URL_MONG = getEnv("URL_MONG");
  const MONGO_DB_NAME = getEnv("MONGO_DB_NAME");
  const LAST_SPRINT = getEnv("LAST_SPRINT_NUMBER");
  const DISCORD_TOKEN = getEnv("DISCORD_TOKEN");
  const a = messageWithDate(`ENV VARIEBLES ARE LOADED WITH SUCESS!`);
  console.log(a);
  return {
    GITHUB_TOKEN,
    GITHUB_ORG,
    GITHUB_PROJECT_ID,
    DISCORD_WEBHOOK,
    AI_PROVIDER,
    OPENAI_API_KEY,
    URL_MONG,
    MONGO_DB_NAME,
    LAST_SPRINT,
    DISCORD_TOKEN
  }

}

export const ENV = loadEnv();


