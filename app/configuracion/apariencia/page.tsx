'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AparienciaPage() {
  const [theme, setTheme] = useState<'dark' | 'semi-dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('brandTheme');
    if (saved === 'semi-dark' || saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('brandTheme', theme);
  }, [theme]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Apariencia</h2>
        <Link
          href="/configuracion"
          className="text-sm px-3 py-2 rounded border border-white/20 hover:bg-white/5"
        >
          Ir a General (Logo)
        </Link>
      </div>

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
