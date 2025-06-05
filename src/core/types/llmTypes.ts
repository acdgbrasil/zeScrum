export type inChanelType = "telegram" | "whatsapp" | "web" | "discord";

export type llmDomainType = "SCRUM" | "JURIDICO" | "FINANCEIRO" | "GERAL";

export interface llmRequestType {
    userId: string;
    channel: inChanelType;
    domain: llmDomainType;
    message: string;
    context?: string;
}