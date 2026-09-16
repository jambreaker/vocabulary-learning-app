export type LearningDirection = "GERMAN_TO_ENGLISH" | "ENGLISH_TO_GERMAN";

export type DirectionChoice = LearningDirection | "MIXED";

export type CardAssessment = "KNOWN" | "UNKNOWN";

export interface LearningCard {
  id: string;
  englishText: string;
  pronunciation: string | null;
  germanTranslations: string[];
  hint: string | null;
}

export interface CardInSession {
  card: LearningCard;
  direction: LearningDirection;
}

export interface SessionResultEntry {
  cardId: string;
  assessment: CardAssessment;
}

export const CARD_COUNT_OPTIONS = [5, 10, 20, "ALL"] as const;
export type CardCountChoice = (typeof CARD_COUNT_OPTIONS)[number];
