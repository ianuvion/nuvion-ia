'use client';

import React from 'react';

type Theme = 'oscuro' | 'semi-dark' | 'claro';

const THEME_KEY = 'nuvion-theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Limpiar clases anteriores
  root.classList.remove('theme-oscuro', 'theme-semi-dark', 'theme-claro');

  // Agregar clase del tema elegido
  if (theme === 'semi-dark') root.classList.add('theme-semi-dark');
  else if (theme === 'claro') root.classList.add('theme-claro');
  else root.classList.add('theme-oscuro'); // default

  // Guardar preferencia
  localStorage.setItem(THEME_KEY, theme);
}

export const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: 'oscuro',
  setTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('oscuro');

  React.useEffect(() => {
    // Cargar desde storage o preferencia de sistema
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'oscuro'
        : 'semi-dark');

    setTheme(initial);
    applyTheme(initial);
  }, []);

  const handleSetTheme = React.useCallback((t: Theme) => {
    setTheme(t);
    applyTheme(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
