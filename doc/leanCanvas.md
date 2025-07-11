# 🧩 Lean UX Canvas — ZéScrum

## 1. Problema
Times ágeis pequenos ou desorganizados enfrentam dificuldades recorrentes como:
- Falta de atualização nos cards do GitHub Projects.
- Cards sem pontuação ou responsáveis.
- Standups sem propósito claro.
- Sobrecarga de funções (dev, PO, Scrum Master).
- Falta de visibilidade do andamento real da sprint.

## 2. Usuários / Personas
- Desenvolvedores em times de 3 a 10 pessoas.
- Líderes técnicos ou POs sobrecarregados.
- Times que já usam GitHub Projects + Discord.
- Estagiários e devs júnior que esquecem de atualizar cards.

## 3. Hipóteses
- Automatando o acompanhamento da sprint com um bot sarcástico e funcional:
  - Os devs atualizarão mais os cards.
  - O time terá mais clareza sobre o andamento da sprint.
  - O tempo de standup será reduzido.
  - O feedback do bot será melhor aceito que o de humanos.

## 4. Soluções / Ideias
- Bot que:
  - Lê o GitHub Projects e planilhas do Google Sheets.
  - Analisa conversas no Discord (opcional).
  - Gera relatórios automáticos com linguagem sarcástica e útil.
  - Envia os relatórios no canal da sprint do Discord.
  - Usa GPT (OpenAI ou DeepSeek) para compor os relatórios.

## 5. Resultados Esperados
- Aumento na taxa de atualização de cards por sprint.
- Redução de cards sem dono ou pontuação.
- Feedback positivo dos usuários (qualitativo).
- Retenção de uso por ao menos 4 semanas.

## 6. Métricas
- % de cards atualizados por sprint.
- % de cards com responsável e pontuação.
- Cliques ou reações aos relatórios enviados no Discord.
- Feedback informal (enquetes simples ou emojis).

## 7. Canais de Aprendizado / Testes
- Uso inicial no próprio time.
- Coleta de feedback direto via Discord.
- Logs de execução e análise de métricas semanais.

## 8. Próximas Etapas (1ª Iteração Lean)
- [ ] Criar `.env.example` com variáveis usadas.
- [ ] Adicionar logs simples de métricas no console.
- [ ] Adicionar flag `--dry-run` para testar relatórios.
- [ ] Criar canal de feedback no Discord.
- [ ] Documentar hipóteses e aprendizados no `docs/`.

---