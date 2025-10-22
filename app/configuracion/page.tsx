"use client";

import React, { useEffect, useState } from "react";

type Theme = "dark" | "semidark" | "light";
const THEME_KEY = "nuvion_theme";

const CARDS: { key: Theme; title: string; desc: string; preview: string }[] = [
  { key: "dark",     title: "Dark",     desc: "Más contrastado, ideal para foco.",         preview: "from-slate-900 via-slate-900 to-slate-800" },
  { key: "semidark", title: "Semi-Dark",desc: "Equilibrado (recomendado para tu logo).",  preview: "from-slate-700 via-slate-700 to-slate-600" },
  { key: "light",    title: "Claro",    desc: "Fondo claro, estilo documento.",            preview: "from-slate-100 via-slate-100 to-white" },
];

export default function ConfiguracionPage() {
  const [theme, setTheme] = useState<Theme>("semidark");

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(THEME_KEY) as Theme) || "semidark";
      setTheme(saved);
    } catch {}
  }, []);

  function choose(t: Theme) {
    setTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-xl font-semibold">Configuración</h1>
        <p className="text-slate-300 mt-1 mb-6">
          Elegí el tema visual. Se guarda en este dispositivo.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {CARDS.map((c) => (
            <button
              key={c.key}
              onClick={() => choose(c.key)}
              className={
                "rounded-2xl border p-4 text-left transition shadow-sm " +
                (theme === c.key
                  ? "border-slate-400/70 bg-slate-700/60"
                  : "border-slate-500/30 bg-slate-700/40 hover:bg-slate-700/60")
              }
            >
              <div className={"h-24 mb-3 rounded-xl bg-gradient-to-b " + c.preview} />
              <h3 className="font-medium">{c.title}</h3>
              <p className="text-sm text-slate-300">{c.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => location.reload()}
            className="rounded-lg border border-slate-500/40 bg-slate-700/50 px-4 py-2 text-sm hover:bg-slate-600/60"
          >
            Aplicar ahora (recargar)
          </button>
          <span className="text-sm text-slate-300">
            Tema actual: <strong>{theme}</strong>
          </span>
        </div>

        <hr className="my-6 border-slate-600/30" />

        <p className="text-sm text-slate-400">
          Se guarda como <code className="text-slate-200">{THEME_KEY}</code> en <code className="text-slate-200">localStorage</code>.
        </p>
      </main>
    </div>
  );
}
