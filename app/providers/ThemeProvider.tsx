'use client';

import { useEffect } from 'react';

export type AppTheme = 'dark' | 'semi' | 'light';
const THEME_KEY = 'nuvion_theme';

export function getStoredTheme(): AppTheme {
  if (typeof window === 'undefined') return 'dark';
  const v = window.localStorage.getItem(THEME_KEY) as AppTheme | null;
  return v ?? 'dark';
}

export function setStoredTheme(t: AppTheme) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(THEME_KEY, t);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const applyThemeClass = (t: AppTheme) => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-semidark', 'theme-light');
    if (t === 'light') root.classList.add('theme-light');
    else if (t === 'semi') root.classList.add('theme-semidark');
    else root.classList.add('theme-dark');
  };

  useEffect(() => {
    const t = getStoredTheme();
    applyThemeClass(t);
  }, []);

  // escucha cambios externos (otro tab)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY && e.newValue) {
        applyThemeClass(e.newValue as AppTheme);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return <>{children}</>;
}
