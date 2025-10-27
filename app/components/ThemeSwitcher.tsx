'use client';

import { useEffect, useState } from 'react';
import { getStoredTheme, setStoredTheme, AppTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<AppTheme>('dark');

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const apply = (t: AppTheme) => {
    setTheme(t);
    setStoredTheme(t);
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-semidark', 'theme-light');
    if (t === 'light') root.classList.add('theme-light');
    else if (t === 'semi') root.classList.add('theme-semidark');
    else root.classList.add('theme-dark');
  };

  const Btn = ({ value, label }: { value: AppTheme; label: string }) => (
    <button
      onClick={() => apply(value)}
      className={`px-3 py-2 rounded-lg border text-sm transition
        ${theme === value ? 'border-white/60 bg-white/10' : 'border-white/10 hover:bg-white/5'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Apariencia</h2>
      <p className="text-sm text-white/60">Elegí el tema de la interfaz. Se guarda en tu dispositivo.</p>
      <div className="flex gap-2">
        <Btn value="dark" label="Oscuro" />
        <Btn value="semi" label="Semi-dark" />
        <Btn value="light" label="Claro" />
      </div>
    </div>
  );
}
