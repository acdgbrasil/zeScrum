import { Profiler } from "node:inspector/promises";

export const enum TEAM_FUNCTIONS {
    OWNER = "owner",
    PARTNER = "partner",
    PRODUCT_OUWNER = "product_owner",
    SCRUM_MASTER = "scrum_master",
    DEVELOPER_FRONT_WEB = "developer_front_web",
    DEVELOPER_FRONT_MOBILE = "developer_front_mobile",
    DEVELOPER_BACKEND = "developer_backend",
    DEVELOPER_DEVOPS = "developer_devops",
    QUALITY_ASSURANCE = "quality_assurance",
    DESIGNER = "designer",
    OTHER = "other"
}

export const enum TEAM_LEVEL {
    INTERSHIP = "internship",
    JUNIOR = "junior",
    PLENO = "pleno",
    SENIOR = "senior",
    SPECIALIST = "specialist",
    LEAD = "lead",
}

export const enum TYPE_OF_FREQUENCY_TO_CHARGE {
    ONE_TIME = "one_time",
    WEEKLY = "weekly",
    EVERY_DAY = "every_day",
    TWO_DAYS_FOR_WEEK = "two_days_for_week",
    ONE_DAY_FOR_WEEK = "one_day_for_week",
    FINAL_IN_SPRINT = "final_in_sprint",
}

export const enum TYPE_OF_TONE_OF_VOICE {
    FUNNY = "funny",
    FORMAL = "formal",
    INFORMAL = "informal",
    POSITIVE = "positive",
    NEUTRAL = "neutral",
    NEGATIVE = "negative",
    ANGRY = "angry",
    SAD = "sad",
    HAPPY = "happy",
    EXCITED = "excited",
    CALM = "calm",
    ENTHUSIASTIC = "enthusiastic",
    SERIOUS = "serious",
    MOTIVATIONAL = "motivational",
    SUPPORTIVE = "supportive",
    ENCOURAGING = "encouraging",
    CONFIDENT = "confident",
    OPTIMISTIC = "optimistic",
    PESSIMISTIC = "pessimistic",
    FRUSTRATED = "frustrated",
    CURIOUS = "curious",
    INQUISITIVE = "inquisitive",
    SKEPTICAL = "skeptical",
    INSPIRATIONAL = "inspirational",
    CALCULATED = "calculated",
    REFLECTIVE = "reflective",
    ASSERTIVE = "assertive",
    RESPECTFUL = "respectful",
}

export const enum TYPE_OF_STYLE_OF_CHARGE {
    DIRECT = "direct",
    INDIRECT = "indirect",
    VISUAL = "visual",
    MEETING = "meeting",
    WRITTEN = "written",
}

export const enum CARD_STATUS {
    SPRINT_BACKLOG = "sprint_backlog",
    DOING = "doing",
    CARD_REVIEW = "card_review",
    IN_QUALITY_ASSURANCE = "in_quality_assurance",
    IN_MERGE = "in_merge",
    DONE = "done",
    BLOCKED = "blocked",
    CANCELED = "canceled",
}

export const enum TRUST_LEVEL_TAG {
    UNKNOWN = "unknown",
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    VERY_HIGH = "very_high",
    EXCELLENT = "excellent",
}

export const enum PREFERRED_TIME_TO_BE_CHARGED {
    MORNING = "morning",
    AFTERNOON = "afternoon",
    EVENING = "evening",
    NIGHT = "night",
    ANYTIME = "anytime",
}

export interface Profile {
    comunicacationPreferences: string;
    workStyle: string;
    badTriggers: string[];
    motivations: string[];
    reactions: string[];
}

export interface IdealCharge {
    frequency: TYPE_OF_FREQUENCY_TO_CHARGE;
    hour_to_charge: Date;
    LastedCharge: Date;
    chargeValue: number;
    toneOfVoice: TYPE_OF_TONE_OF_VOICE[];
    styleOfCharge: TYPE_OF_STYLE_OF_CHARGE[];
    communicationToneExamples?: string[];
    preferredTimeToBeCharged?: PREFERRED_TIME_TO_BE_CHARGED[];
}

export interface ProfileHistoryInSprint {
    numberOfSprint: number;
    delays: number;
    compliments: number;
    amountOfTaskSwitching:number;
    timesFailedToRespondTheBot: number;
    importantEvents: string[];
}

export interface Task_Delivery {
    cardId: string;
    cardTitle: string;
    status: CARD_STATUS;
    initialDate: Date;
    finalDate: Date;
    deliveryDate: Date;
    cardPoint: number;
    observations?: string[];
}

export interface META_DATA {
    numberOfTasks: number;
    numberOfPoints: number;
    numberOfProfileHasPercentOfAtualSprint: number;
    numberOfPointsProfileHasDeliveredOfFinalSprint: number;
    numberOfPointsProfileHasDeliveredOfSprintBacklog: number;
    profileConfiability: number;
    lastAtualization: Date;
    whoCreateAt: string;
    whoUpdateAt: string;
    createAt: Date;
    updateAt: Date;
    trustLevelTag: TRUST_LEVEL_TAG;
}

export interface ActualSprintPerformance {
    numberOfSprint: number;
    observations: string[];
    tasksDelivery: Task_Delivery[];
    metaData: META_DATA;
    profileHistoryInSprint: ProfileHistoryInSprint[];
}

export interface UserProfile{
    userId:string,
    userName:string,
    userEmail:string,
    teamFunctions: TEAM_FUNCTIONS[],
    teamLevel: TEAM_LEVEL,
    firstContact: Date,
    profile: Profile,
    idealCharge: IdealCharge,
    profileHistoryInSprint: Record<number, ProfileHistoryInSprint>,
    lastContactWithBot: Date;
}