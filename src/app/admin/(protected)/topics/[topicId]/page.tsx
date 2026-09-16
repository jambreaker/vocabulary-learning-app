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
            <li key={card.id}>
              <Link
                href={`/admin/cards/${card.id}/edit`}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50"
              >
                <span className="font-medium text-slate-900">
                  {card.englishText}
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  {toTranslationsArray(card.germanTranslations).join("; ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
