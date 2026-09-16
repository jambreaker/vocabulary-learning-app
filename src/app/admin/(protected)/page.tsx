import Link from "next/link";
import { getTopicsWithCardCount } from "@/lib/topics";

export const dynamic = "force-dynamic";

export default async function AdminTopicsPage() {
  const topics = await getTopicsWithCardCount();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Themen</h1>
      {topics.length === 0 ? (
        <p className="text-slate-600">Es sind noch keine Themen vorhanden.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link
                href={`/admin/topics/${topic.id}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50"
              >
                <span className="font-medium text-slate-900">
                  {topic.title}
                </span>
                <span className="text-sm text-slate-500">
                  {topic._count.cards} Lernkarten
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
