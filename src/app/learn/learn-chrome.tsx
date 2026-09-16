"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLearning } from "./learning-context";

export function LearnChrome({ children }: { children: ReactNode }) {
  const { reset } = useLearning();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <Link
          href="/"
          onClick={() => reset()}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Zur Startseite (Abbrechen)
        </Link>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
