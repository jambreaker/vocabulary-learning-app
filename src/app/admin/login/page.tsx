"use client";

import { useActionState } from "react";
import {
  loginAction,
  type LoginActionState,
} from "@/lib/actions/auth-actions";

const initialState: LoginActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Admin-Anmeldung
        </h1>
        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Benutzername
            <input
              type="text"
              name="username"
              required
              autoComplete="username"
              className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Passwort
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="rounded-xl border border-slate-300 px-4 py-2 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </label>

          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Anmelden …" : "Anmelden"}
          </button>
        </form>
      </div>
    </main>
  );
}
