'use client';

import { useEffect, useState } from 'react';

export default function AparienciaPage() {
  const [theme, setTheme] = useState<'dark' | 'semi-dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('brandTheme');
    if (saved === 'semi-dark' || saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('brandTheme', theme);
    // si ya tenés lógica de aplicar clases al <html>, hacelo acá
    // document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Apariencia</h2>
      <div className="flex gap-3">
        <button
          onClick={() => setTheme('dark')}
          className={`px-3 py-2 rounded border ${theme === 'dark' ? 'bg-white/10 border-white/60' : 'border-white/20'}`}
        >
          Oscuro
        </button>
        <button
          onClick={() => setTheme('semi-dark')}
          className={`px-3 py-2 rounded border ${theme === 'semi-dark' ? 'bg-white/10 border-white/60' : 'border-white/20'}`}
        >
          Semi-dark
        </button>
        <button
          onClick={() => setTheme('light')}
          className={`px-3 py-2 rounded border ${theme === 'light' ? 'bg-white/10 border-white/60' : 'border-white/20'}`}
        >
          Claro
        </button>
      </div>
    </section>
  );
}
