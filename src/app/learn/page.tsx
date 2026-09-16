import { getTopicsWithCardCount } from "@/lib/topics";
import { TopicPicker } from "./topic-picker";

// Themenliste kann sich jederzeit aendern - keine statische Vorgenerierung.
export const dynamic = "force-dynamic";

export default async function LearnPage() {
  const topics = await getTopicsWithCardCount();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Thema wählen
        </h1>
        <p className="mt-2 text-slate-600">
          Wähle einen Vokabelbestand, um eine Lernsession zu starten.
        </p>
      </div>
      <TopicPicker
        topics={topics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          cardCount: topic._count.cards,
        }))}
      />
    </main>
  );
}
