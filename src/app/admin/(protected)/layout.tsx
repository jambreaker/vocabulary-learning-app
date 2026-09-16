import type { ReactNode } from "react";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth-actions";

export default function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/admin" className="text-lg font-semibold text-slate-900">
            Admin-Bereich
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Abmelden
            </button>
          </form>
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
