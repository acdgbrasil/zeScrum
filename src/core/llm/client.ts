import { IA } from "../../config/config.ts";
import { TEXT_CONSTANT } from "../../config/textCostant.ts";

export type SEND_PROMPT = {
  whoIsSending: string,
  promptMessage: string,
  contexts: CONTEXT,
};

export type CONTEXT = 
  {
    role: string,
    content: string
  }[];


export async function sendToChat(prompt: SEND_PROMPT): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${IA.api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: prompt,
    }),
  });
  return await response.json();
}