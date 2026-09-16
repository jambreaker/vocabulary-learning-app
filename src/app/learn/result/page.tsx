"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLearning } from "../learning-context";

export default function LearnResultPage() {
  const router = useRouter();
  const { cards, results, reset } = useLearning();

  useEffect(() => {
    if (cards.length === 0 || results.length < cards.length) {
      router.replace("/learn");
    }
  }, [cards, results, router]);

  if (cards.length === 0 || results.length < cards.length) {
    return null;
  }

  const knownCount = results.filter(
    (result) => result.assessment === "KNOWN"
  ).length;
  const unknownCount = results.length - knownCount;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-6 px-4 py-12 text-center">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Session abgeschlossen
        </h1>
        <dl className="mt-6 flex flex-col gap-2 text-lg text-slate-700">
          <div className="flex justify-between">
            <dt>Karten gelernt</dt>
            <dd className="font-semibold">{results.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Gewusst</dt>
            <dd className="font-semibold text-emerald-600">{knownCount}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Nicht gewusst</dt>
            <dd className="font-semibold text-slate-600">{unknownCount}</dd>
          </div>
        </dl>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Link
          href="/learn"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Neue Session starten
        </Link>
        <Link
          href="/"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
