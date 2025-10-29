// app/configuracion/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function ConfigLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Configuración</h1>

        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            ← Volver al Dashboard
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            Inicio
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2">
        <Link
          href="/configuracion"
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-300 dark:border-slate-700"
        >
          General
        </Link>
        <Link
          href="/configuracion/apariencia"
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-300 dark:border-slate-700"
        >
          Apariencia
        </Link>
      </div>

      {children}
    </section>
  );
}
