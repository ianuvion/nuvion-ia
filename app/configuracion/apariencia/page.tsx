"use client";

import Link from "next/link";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function AparienciaPage() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Configuración</h1>
        <div className="flex gap-2">
          <Link href="/dashboard" className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">
            ← Volver al Dashboard
          </Link>
          <Link href="/" className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">Inicio</Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Link href="/configuracion" className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">
          General
        </Link>
        <span className="rounded-lg border bg-slate-100 px-3 py-1.5 dark:bg-slate-800">Apariencia</span>
      </div>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-2">Apariencia</h2>
        <p className="text-sm text-slate-500 mb-4">
          Activá o desactivá el modo oscuro para todo Nuvion IA. Se guarda en tu dispositivo.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setTheme("dark")}
            className={`rounded-lg px-3 py-2 border hover:opacity-90 ${
              theme === "dark" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : ""
            }`}
          >
            Oscuro
          </button>

        <button
            onClick={() => setTheme("light")}
            className={`rounded-lg px-3 py-2 border hover:opacity-90 ${
              theme === "light" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : ""
            }`}
          >
            Claro
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          El modo <b>{theme}</b> se aplicó automáticamente y se guardó en tus preferencias.
        </p>

        <div className="mt-6">
          <Link
            href="/configuracion"
            className="rounded-lg border px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Ir a General (Logo)
          </Link>
        </div>
      </section>
    </main>
  );
}
