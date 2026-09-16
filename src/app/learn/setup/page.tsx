"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "../learning-context";
import { getCardsForTopicAction } from "@/lib/actions/learning-actions";
import {
  CARD_COUNT_OPTIONS,
  type CardCountChoice,
  type CardInSession,
  type DirectionChoice,
} from "@/lib/learning-types";

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const DIRECTION_OPTIONS: Array<{ value: DirectionChoice; label: string }> = [
  { value: "GERMAN_TO_ENGLISH", label: "Deutsch → Englisch" },
  { value: "ENGLISH_TO_GERMAN", label: "Englisch → Deutsch" },
  { value: "MIXED", label: "Gemischt" },
];

export default function LearnSetupPage() {
  const router = useRouter();
  const { topicId, topicTitle, startSession } = useLearning();
  const [direction, setDirection] = useState<DirectionChoice>("MIXED");
  const [count, setCount] = useState<CardCountChoice>(10);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) {
      router.replace("/learn");
    }
  }, [topicId, router]);

  if (!topicId) {
    return null;
  }

  function handleStart() {
    setError(null);
    startTransition(async () => {
      const cards = await getCardsForTopicAction(topicId!);
      if (cards.length === 0) {
        setError("Dieses Thema enthält noch keine Lernkarten.");
        return;
      }

      const cardCount =
        count === "ALL" ? cards.length : Math.min(count, cards.length);
      const selectedCards = shuffle(cards).slice(0, cardCount);
      const sessionCards: CardInSession[] = selectedCards.map((card) => ({
        card,
        direction:
          direction === "MIXED"
            ? Math.random() < 0.5
              ? "GERMAN_TO_ENGLISH"
              : "ENGLISH_TO_GERMAN"
            : direction,
      }));

      startSession(direction, sessionCards);
      router.push("/learn/session");
    });
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-4 py-12">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Lernsession einrichten
        </h1>
        <p className="mt-2 text-slate-600">Thema: {topicTitle}</p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-slate-700">
          Lernrichtung
        </legend>
        {DIRECTION_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50"
          >
            <input
              type="radio"
              name="direction"
              value={option.value}
              checked={direction === option.value}
              onChange={() => setDirection(option.value)}
              className="h-4 w-4 accent-indigo-600"
            />
            <span className="text-slate-800">{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-slate-700">
          Kartenanzahl
        </legend>
        <div className="flex flex-wrap gap-2">
          {CARD_COUNT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCount(option)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                count === option
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {option === "ALL" ? "Alle" : option}
            </button>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleStart}
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Lädt …" : "Lernen beginnen"}
      </button>
    </main>
  );
}
