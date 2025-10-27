'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AparienciaPage() {
  const [theme, setTheme] = useState<string>('semi-dark');

  // Cargar el tema guardado
  useEffect(() => {
    const saved = localStorage.getItem('brandTheme');
    if (saved) setTheme(saved);
  }, []);

  // Aplicar el tema cuando cambia
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme !== 'light');
    localStorage.setItem('brandTheme', theme);
  }, [theme]);

  return (
    <section>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Apariencia</h2>
        <Link
          href="/configuracion"
          className="text-sm px-3 py-2 rounded border border-white/20 hover:bg-white/5"
        >
          Ir a General (Logo)
        </Link>
      </div>

      {/* Opciones de tema */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setTheme('dark')}
          className={`px-4 py-2 rounded border transition ${
            theme === 'dark'
              ? 'border-white/70 bg-white/10'
              : 'border-white/20 hover:bg-white/5'
          }`}
        >
          Oscuro
        </button>

        <button
          onClick={() => setTheme('semi-dark')}
          className={`px-4 py-2 rounded border transition ${
            theme === 'semi-dark'
              ? 'border-white/70 bg-white/10'
              : 'border-white/20 hover:bg-white/5'
          }`}
        >
          Semi-dark
        </button>

        <button
          onClick={() => setTheme('light')}
          className={`px-4 py-2 rounded border transition ${
            theme === 'light'
              ? 'border-white/70 bg-white/10 text-black bg-white/80'
              : 'border-white/20 hover:bg-white/5'
          }`}
        >
          Claro
        </button>
      </div>

      {/* Mensaje visual */}
      <p className="text-sm text-white/60">
        El modo <span className="text-white">{theme}</span> se aplicó automáticamente y se
        guardó en tus preferencias.
      </p>
    </section>
  );
}
