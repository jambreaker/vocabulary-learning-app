import { notFound } from "next/navigation";
import Link from "next/link";
import { getCardById, toTranslationsArray } from "@/lib/cards";
import { updateCardAction, deleteCardAction } from "@/lib/actions/card-actions";

export const dynamic = "force-dynamic";

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;
  const card = await getCardById(cardId);

  if (!card) {
    notFound();
  }

  const translations = toTranslationsArray(card.germanTranslations);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-8">
      <div>
        <Link
          href={`/admin/topics/${card.topicId}`}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Zurück zum Thema
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Lernkarte bearbeiten
        </h1>
      </div>

      <form action={updateCardAction} className="flex flex-col gap-4">
        <input type="hidden" name="cardId" value={card.id} />
        <input type="hidden" name="topicId" value={card.topicId} />

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Englisch
          <input
            type="text"
            name="englishText"
            required
            defaultValue={card.englishText}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Aussprache (optional)
          <input
            type="text"
            name="pronunciation"
            defaultValue={card.pronunciation ?? ""}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Deutsch (eine Übersetzung pro Zeile)
          <textarea
            name="germanTranslations"
            required
            rows={3}
            defaultValue={translations.join("\n")}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Hinweis (optional)
          <textarea
            name="hint"
            rows={2}
            defaultValue={card.hint ?? ""}
            className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900"
          />
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Änderungen speichern
        </button>
      </form>

      <form action={deleteCardAction}>
        <input type="hidden" name="cardId" value={card.id} />
        <input type="hidden" name="topicId" value={card.topicId} />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl border border-red-300 bg-white px-6 py-3 text-base font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          Karte löschen
        </button>
      </form>
    </main>
  );
}
