import { IA } from "../../config/config.ts";
import { TEXT_CONSTANT } from "../../config/textCostant.ts";

export async function generateWithGPT(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${IA.api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: TEXT_CONSTANT.SCRUM_PROMPT,
        },
        { role: "user", content: prompt },
      ],
    }),
  });
  return await response.json();
}