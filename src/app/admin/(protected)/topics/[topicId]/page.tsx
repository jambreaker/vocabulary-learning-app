import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopicWithCards } from "@/lib/topics";
import { toTranslationsArray } from "@/lib/cards";

export const dynamic = "force-dynamic";

export default async function AdminTopicDetailPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = await getTopicWithCards(topicId);

  if (!topic) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="text-sm text-indigo-600 hover:underline"
          >
            ← Alle Themen
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            {topic.title}
          </h1>
        </div>
        <Link
          href={`/admin/cards/new?topicId=${topic.id}`}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Neue Karte
        </Link>
      </div>

      {topic.cards.length === 0 ? (
        <p className="text-slate-600">
          Dieses Thema enthält noch keine Lernkarten.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {topic.cards.map((card) => (
            <li
              key={card.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Englisch
                  </p>
                  <p className="font-medium text-slate-900">
                    {card.englishText}
                  </p>
                  {card.pronunciation && (
                    <p className="text-sm text-slate-500">
                      Aussprache: {card.pronunciation}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Deutsch
                  </p>
                  <p className="text-slate-700">
                    {toTranslationsArray(card.germanTranslations).join("; ")}
                  </p>
                </div>
                {card.hint && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Hinweis
                    </p>
                    <p className="whitespace-pre-line text-slate-700">
                      {card.hint}
                    </p>
                  </div>
                )}
              </div>
              <Link
                href={`/admin/cards/${card.id}/edit`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Bearbeiten
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
