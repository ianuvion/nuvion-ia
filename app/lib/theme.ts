"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "semidark" | "light";
export const THEME_KEY = "nuvion_theme";

export function readSavedTheme(): Theme {
  if (typeof window === "undefined") return "semidark";
  const v = window.localStorage.getItem(THEME_KEY) as Theme | null;
  return v ?? "semidark";
}

export function useTheme(): Theme {
  const [t, setT] = useState<Theme>("semidark");
  useEffect(() => {
    try {
      setT(readSavedTheme());
      const onStorage = (e: StorageEvent) => {
        if (e.key === THEME_KEY) setT(readSavedTheme());
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    } catch {}
  }, []);
  return t;
}

export function bgClasses(theme: Theme): string {
  switch (theme) {
    case "light":
      return "from-slate-100 via-slate-100 to-white text-slate-900";
    case "semidark":
      return "from-slate-700 via-slate-700 to-slate-600 text-slate-50";
    case "dark":
    default:
      return "from-slate-800 via-slate-800 to-slate-700 text-slate-100";
  }
}

export function cardClasses(theme: Theme): string {
  switch (theme) {
    case "light":
      return "border-slate-300/60 bg-white/80";
    case "semidark":
      return "border-slate-400/50 bg-slate-600/40";
    case "dark":
    default:
      return "border-slate-500/50 bg-slate-700/50";
  }
}

export function dividerBorder(theme: Theme): string {
  return theme === "light" ? "border-slate-300/40" : "border-slate-500/30";
}
