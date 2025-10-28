"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeCtx = createContext<Ctx | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // 1) Leo preferencia guardada
    const stored = (typeof window !== "undefined" && localStorage.getItem("nv-theme")) as Theme | null;
    // 2) Si no hay, miro el sistema
    const systemDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (systemDark ? "dark" : "light");
    setThemeState(initial);
  }, []);

  useEffect(() => {
    // Aplico la clase en <html> y guardo en localStorage
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("nv-theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}
