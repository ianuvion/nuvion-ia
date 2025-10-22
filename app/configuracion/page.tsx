"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "semidark" | "light";
const THEME_KEY = "nuvion_theme";

const THEME_DESC: Record<Theme, string> = {
  dark: "Más contrastado. Ideal para foco.",
  semidark: "Equilibrado (recomendado para tu logo).",
  light: "Claro, similar a documentos.",
};

// Para que otras páginas puedan leer el tema sin romper nada
function readSavedTheme(): Theme {
  if (typeof window === "undefined") return "semidark";
  const t = window.localStorage.getItem(THEME_KEY) as Theme | null;
  return t ?? "semidark";
}

export default function ConfiguracionPage() {
  const [theme, setTheme] = useState<Theme>("semidark");

  useEffect(() => {
    setTheme(readSavedTheme());
  }, []);

  function saveTheme(next: Theme) {
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  const cardBase =
    "flex-1 min-w-[220px] cursor-pointer rounded-2xl border p-4 transition shadow-sm hover:shadow";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-xl font-semibold mb-2">Configuración</h1>
        <p className="text-slate-300 mb-6">Elegí el tema visual de Nuvion IA. Tu elección queda guardada en este dispositivo.</p>

        {/* Cards de selección */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* DARK */}
          <button
            onClick={() => saveTheme("dark")}
            className={`${cardBase} ${
              theme === "dark"
                ? "border-slate-500/60 bg-slate-800/70"
                : "border-slate-600/30 bg-slate-800/40"
            }`}
          >
            <div className="h-24 rounded-xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 mb-3" />
            <h3 className="font-medium">Dark</h3>
            <p className="text-sm text-slate-300">{THEME_DESC.dark}</p>
          </button>

          {/* SEMI-DARK */}
          <button
            onClick={() => saveTheme("semidark")}
            className={`${cardBase} ${
              theme === "semidark"
                ? "border-slate-400/70 bg-slate-700/60"
                : "border-slate-500/30 bg-slate-700/40"
            }`}
          >
            <div className="h-24 rounded-xl bg-gradient-to-b from-slate-700 via-slate-700 to-slate-600 mb-3" />
            <h3 className="font-medium">Semi-Dark</h3>
            <p className="text-sm text-slate-300">{THEME_DESC.semidark}</p>
          </button>

          {/* LIGHT */}
          <button
            onClick={() => saveTheme("light")}
            className={`${cardBase} ${
              theme === "light"
                ? "border-slate-300/70 bg-slate-100/80 text-slate-800"
                : "border-slate-300/40 bg-slate-100/60 text-slate-800"
            }`}
          >
            <div className="h-24 rounded-xl bg-gradient-to-b from-slate-100 via-slate-100 to-white mb-3" />
            <h3 className="font-medium">Claro</h3>
            <p className="text-sm text-slate-600">{THEME_DESC.light}</p>
          </button>
        </div>

        {/* Acciones */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => location.reload()}
            className="rounded-lg border border-slate-500/40 bg-slate-700/50 px-4 py-2 text-sm hover:bg-slate-600/60"
            title="Recarga para aplicar el tema en todas las páginas que ya lo soportan"
          >
            Aplicar ahora (recargar)
          </button>
          <span className="text-sm text-slate-300">
            Tema actual: <strong>{theme}</strong>
          </span>
        </div>

        <hr className="my-6 border-slate-600/30" />

        <p className="text-sm text-slate-400">
          Nota: El tema se guarda en <code className="text-slate-300">localStorage</code> con la clave{" "}
          <code className="text-slate-300">{THEME_KEY}</code>. Las páginas nuevas ya pueden leerlo.
        </p>
      </main>
    </div>
  );
}
