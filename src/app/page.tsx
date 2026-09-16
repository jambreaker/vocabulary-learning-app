import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Vocabulary Learning App
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Lerne englische Vokabeln – Wörter, Ausdrücke und kurze Sätze – in
          deinem eigenen Tempo.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lernen starten
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Admin-Bereich
          </Link>
        </div>
      </div>
    </main>
  );
}
