"use client";

import { useState, useEffect } from "react";

export default function ConfiguracionPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Configuración de apariencia
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Activá o desactivá el modo oscuro para todo Nuvion IA.
      </p>
      <button
        onClick={toggleTheme}
        className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-500 dark:bg-yellow-400 dark:text-black"
      >
        Cambiar a modo {theme === "light" ? "oscuro" : "claro"}
      </button>
    </main>
  );
}
