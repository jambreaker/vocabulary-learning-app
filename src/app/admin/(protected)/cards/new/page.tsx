import { redirect } from "next/navigation";
import Link from "next/link";
import { getTopicsWithCardCount } from "@/lib/topics";
import { createCardAction } from "@/lib/actions/card-actions";

export const dynamic = "force-dynamic";

export default async function NewCardPage({
  searchParams,
}: {
  searchParams: Promise<{ topicId?: string }>;
}) {
  const { topicId: topicIdParam } = await searchParams;
  const topics = await getTopicsWithCardCount();

  if (topics.length === 0) {
    redirect("/admin");
  }

  const selectedTopicId = topicIdParam ?? topics[0].id;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <Link
          href="/admin"
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Alle Themen
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Neue Lernkarte
        </h1>
      </div>

      <form action={createCardAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Thema
          <select
            name="topicId"
            defaultValue={selectedTopicId}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Englisch
          <input
            type="text"
            name="englishText"
            required
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Aussprache (optional)
          <input
            type="text"
            name="pronunciation"
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Deutsch (eine Übersetzung pro Zeile)
          <textarea
            name="germanTranslations"
            required
            rows={3}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Hinweis (optional)
          <textarea
            name="hint"
            rows={2}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Karte anlegen
        </button>
      </form>
    </main>
  );
}
