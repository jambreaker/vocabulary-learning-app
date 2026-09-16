"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "../learning-context";

export default function LearnSessionPage() {
  const router = useRouter();
  const { cards, currentIndex, revealed, reveal, assess } = useLearning();

  useEffect(() => {
    if (cards.length === 0) {
      router.replace("/learn");
      return;
    }
    if (currentIndex >= cards.length) {
      router.push("/learn/result");
    }
  }, [cards, currentIndex, router]);

  const current = cards[currentIndex];
  if (!current) {
    return null;
  }

  const { card, direction } = current;
  const questionIsEnglish = direction === "ENGLISH_TO_GERMAN";
  const questionText = questionIsEnglish
    ? card.englishText
    : card.germanTranslations.join("; ");
  const questionPronunciation = questionIsEnglish ? card.pronunciation : null;
  const solutionText = questionIsEnglish
    ? card.germanTranslations.join("; ")
    : card.englishText;
  const solutionPronunciation = questionIsEnglish ? null : card.pronunciation;

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-12">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Karte {currentIndex + 1} von {cards.length}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-indigo-600">
          {direction === "GERMAN_TO_ENGLISH"
            ? "Deutsch → Englisch"
            : "Englisch → Deutsch"}
        </p>
        <p className="mt-4 text-sm text-slate-500">Übersetzung von:</p>
        <p className="mt-1 text-xl font-semibold text-slate-900">
          {questionText}
        </p>
        {questionPronunciation && (
          <p className="mt-1 text-slate-500">
            Aussprache: {questionPronunciation}
          </p>
        )}

        {!revealed && (
          <button
            type="button"
            onClick={reveal}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Auflösen
          </button>
        )}

        {revealed && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">Lösung:</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {solutionText}
            </p>
            {solutionPronunciation && (
              <p className="mt-1 text-slate-500">
                Aussprache: {solutionPronunciation}
              </p>
            )}

            {card.hint && (
              <div className="mt-4">
                <p className="text-sm text-slate-500">Hinweis:</p>
                <p className="mt-1 whitespace-pre-line text-slate-700">
                  {card.hint}
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => assess("KNOWN")}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Gewusst
              </button>
              <button
                type="button"
                onClick={() => assess("UNKNOWN")}
                className="flex-1 rounded-xl bg-slate-200 px-4 py-3 text-base font-medium text-slate-800 transition-colors hover:bg-slate-300"
              >
                Nicht gewusst
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
