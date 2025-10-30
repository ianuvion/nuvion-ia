"use client";

import { useEffect, useState } from "react";

type AppTheme = "dark" | "semi" | "light";
const THEME_KEY = "nuvion_theme";

function applyTheme(t: AppTheme) {
  const root = document.documentElement;
  root.classList.remove("theme-dark", "theme-semidark", "theme-light");

  if (t === "light") {
    root.classList.add("theme-light");
    root.dataset.theme = "light";
  } else if (t === "semi") {
    root.classList.add("theme-semidark");
    root.dataset.theme = "semi";
  } else {
    root.classList.add("theme-dark");
    root.dataset.theme = "dark";
  }

  localStorage.setItem(THEME_KEY, t);
  window.dispatchEvent(new StorageEvent("storage", { key: THEME_KEY, newValue: t }));
}


export default function ThemeSwitcher() {
  const [value, setValue] = useState<AppTheme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as AppTheme) || "dark";
    setValue(saved);
    applyTheme(saved);
  }, []);

  const setTheme = (t: AppTheme) => {
    setValue(t);
    applyTheme(t);
  };

  const btn =
    "px-3 py-2 rounded-md border text-sm hover:opacity-90 transition";
  const active = "ring-2 ring-blue-500";

  return (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-2">
        <p className="text-sm opacity-80">Tema actual</p>
        <div className="text-lg font-semibold capitalize">{value}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className={`${btn} ${value === "dark" ? active : ""}`}
          onClick={() => setTheme("dark")}
        >
          Oscuro
        </button>
        <button
          className={`${btn} ${value === "semi" ? active : ""}`}
          onClick={() => setTheme("semi")}
        >
          Semi-dark
        </button>
        <button
          className={`${btn} ${value === "light" ? active : ""}`}
          onClick={() => setTheme("light")}
        >
          Claro
        </button>
      </div>
    </div>
  );
}
