"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  CardAssessment,
  CardInSession,
  DirectionChoice,
  SessionResultEntry,
} from "@/lib/learning-types";

interface LearningState {
  topicId: string | null;
  topicTitle: string | null;
  direction: DirectionChoice | null;
  cards: CardInSession[];
  currentIndex: number;
  revealed: boolean;
  results: SessionResultEntry[];
}

interface LearningContextValue extends LearningState {
  selectTopic: (topicId: string, topicTitle: string) => void;
  startSession: (direction: DirectionChoice, cards: CardInSession[]) => void;
  reveal: () => void;
  assess: (assessment: CardAssessment) => void;
  reset: () => void;
}

const LearningContext = createContext<LearningContextValue | null>(null);

const initialState: LearningState = {
  topicId: null,
  topicTitle: null,
  direction: null,
  cards: [],
  currentIndex: 0,
  revealed: false,
  results: [],
};

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(initialState);

  const value = useMemo<LearningContextValue>(
    () => ({
      ...state,
      selectTopic: (topicId, topicTitle) =>
        setState({ ...initialState, topicId, topicTitle }),
      startSession: (direction, cards) =>
        setState((prev) => ({
          ...prev,
          direction,
          cards,
          currentIndex: 0,
          revealed: false,
          results: [],
        })),
      reveal: () => setState((prev) => ({ ...prev, revealed: true })),
      assess: (assessment) =>
        setState((prev) => {
          const currentCard = prev.cards[prev.currentIndex];
          if (!currentCard) return prev;
          return {
            ...prev,
            results: [
              ...prev.results,
              { cardId: currentCard.card.id, assessment },
            ],
            currentIndex: prev.currentIndex + 1,
            revealed: false,
          };
        }),
      reset: () => setState(initialState),
    }),
    [state]
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning(): LearningContextValue {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error(
      "useLearning muss innerhalb von LearningProvider verwendet werden."
    );
  }
  return context;
}
