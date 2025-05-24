# 🤖 ZéScrum – o estagiário Scrum Master que não some no meio da sprint

**ZéScrum** é um bot feito pra fazer o que ninguém mais quer: acompanhar cards, gerar relatórios, cutucar dev que some e lembrar todo mundo que a sprint está acabando – tudo isso sem reclamar, pedir aumento ou dizer “não tive tempo”.

---

## 🧨 Por que esse bot existe?

Porque um dia eu percebi que:
- Eu era o único tentando organizar a sprint.
- Os cards ficavam parados por dias e ninguém lembrava nem o que era.
- O standup virava um “bom dia” coletivo e nada mais.
- Eu era P.O, dev, Scrum Master e psicólogo ao mesmo tempo.
- E ainda achavam que eu pegava leve com o Davi.

Então pensei: e se eu **criasse um estagiário digital que não esquece, não dorme e ainda entrega relatório sarcástico às 9h da manhã?**  
Nasceu o Zé.

---

## ⚙️ Funcionalidades

✅ Lê seu **Project Board do GitHub** (colunas, cards, tempo em cada fase, etc)  
✅ Lê **planilhas do Google Sheets** (com planning, horas, responsáveis, etc)  
✅ Lê **mensagens de um canal específico no Discord** (pra saber quem chorou mais)  
✅ Gera um relatório ácido, engraçado e útil, com:
- Quantidade de cards movidos
- Cards travados há dias
- Cards sem pontuação
- Cards nas mãos de ninguém
- Cards que o Jorge esqueceu de mover
- Cards que o Davi “tava vendo isso sim, juro”

✅ Envia o relatório no canal certo do Discord, formatado em Markdown, todo santo dia útil

---

## 🧪 Tecnologias

- 🦕 **Deno** – porque Node é overkill pra um bot educado
- 🔥 **GPT-4 Turbo ou DeepSeek** – você escolhe quem te julga com palavras
- 🧾 **GitHub API** – sua verdade está nos cards
- 📊 **Google Sheets API** – pra puxar dados que ninguém atualiza
- 📢 **Discord Webhook ou Bot** – pra jogar a verdade na cara do time

---

## 📦 Instalação

```bash
deno run --allow-net --allow-env main.ts
```

Crie um arquivo `.env` com base no `.env.example`.  
Não comita, ou o Zé te comita de volta.

---

## 🧠 Observações

- O bot só funciona de segunda a sexta. Ele tem mais noção que o Jorge.
- Jorge só trabalha de segunda a quarta, então o Zé pega leve com ele (mais ou menos).
- Ana é estagiária e meio-período. O Zé lembra ela de pedir ajuda.
- Davi... bom, Davi é o Davi.
- Se o card tá parado, o Zé aponta. Se tá errado, ele sugere. Se tá abandonado, ele cobra.

---

## ✨ Futuro

- Painel web pra ver histórico dos relatórios
- Modo dark (porque claro que alguém vai pedir)
- Integração com Jira, Notion, Slack, WhatsApp, Twitter, Pombo-Correio
- Modo “boss level” que manda relatório direto pro RH

---

## 🙏 Contribuições

Pode abrir PR. Mas saiba que o Zé vai revisar com sarcasmo.

---

> Feito com raiva, café e a vontade de não virar Scrum Master de verdade.