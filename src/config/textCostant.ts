const loadBaseScrumPrompt = await Deno.readTextFile("src/core/llm/prompts/scrum.txt");
const loadBaseFinanceiroPrompt = await Deno.readTextFile("src/core/llm/prompts/financeiro.txt");
const loadBaseGeralPrompt = await Deno.readTextFile("src/core/llm/prompts/geral.txt");
const loadBaseJuridicoPrompt = await Deno.readTextFile("src/core/llm/prompts/juridico.txt");

export const TEXT_CONSTANT = {
    SCRUM_PROMPT: loadBaseScrumPrompt,
    FINANCEIRO_PROMPT: loadBaseFinanceiroPrompt,
    GERAL_PROMPT: loadBaseGeralPrompt,
    JURIDICO_PROMPT: loadBaseJuridicoPrompt
}