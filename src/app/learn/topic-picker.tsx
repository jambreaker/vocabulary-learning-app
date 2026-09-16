"use client";

import { useRouter } from "next/navigation";
import { useLearning } from "./learning-context";

interface TopicOption {
  id: string;
  title: string;
  cardCount: number;
}

export function TopicPicker({ topics }: { topics: TopicOption[] }) {
  const router = useRouter();
  const { selectTopic } = useLearning();

  if (topics.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-600">
        Es ist noch kein Vokabelbestand vorhanden.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {topics.map((topic) => (
        <li key={topic.id}>
          <button
            type="button"
            onClick={() => {
              selectTopic(topic.id, topic.title);
              router.push("/learn/setup");
            }}
            className="flex w-full flex-col items-start rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="text-lg font-medium text-slate-900">
              {topic.title}
            </span>
            <span className="mt-1 text-sm text-slate-500">
              {topic.cardCount} Lernkarten
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
