export const dynamic = 'force-dynamic';
export const revalidate = 0;

// app/configuracion/apariencia/page.tsx
"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "semi";

export default function AparienciaPage() {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" &&
        (localStorage.getItem("nuvion-theme") as ThemeMode)) || "light";
    applyTheme(saved);
  }, []);

  function applyTheme(next: ThemeMode) {
    setMode(next);
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      // limpiamos estados previos
      html.classList.remove("dark");
      html.removeAttribute("data-theme");

      if (next === "dark") {
        html.classList.add("dark");
      } else if (next === "semi") {
        html.setAttribute("data-theme", "semi");
      }
    }
    localStorage.setItem("nuvion-theme", next);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="mb-4 text-xl font-semibold">Apariencia</h2>

        <div className="flex gap-3">
          <button
            onClick={() => applyTheme("dark")}
            className={`rounded-md px-4 py-2 text-sm border ${
              mode === "dark"
                ? "bg-slate-900 text-white border-slate-700"
                : "border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
            }`}
          >
            Oscuro
          </button>

          <button
            onClick={() => applyTheme("semi")}
            className={`rounded-md px-4 py-2 text-sm border ${
              mode === "semi"
                ? "bg-slate-800 text-white border-slate-700"
                : "border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
            }`}
          >
            Semi-dark
          </button>

          <button
            onClick={() => applyTheme("light")}
            className={`rounded-md px-4 py-2 text-sm border ${
              mode === "light"
                ? "bg-white text-slate-900 border-slate-300"
                : "border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
            }`}
          >
            Claro
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          El modo <strong>{mode}</strong> se aplicó y quedó guardado en tus
          preferencias.
        </p>
      </section>
    </div>
  );
}
