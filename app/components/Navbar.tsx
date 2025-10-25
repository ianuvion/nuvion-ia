'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // lee al montar
  useEffect(() => {
    try {
      const url = localStorage.getItem('brand.logoUrl');
      if (url) setLogoUrl(url);
    } catch {}
  }, []);

  // escucha cambios de storage (cuando la página de Brand actualiza el logo)
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'brand.logoUrl') {
        setLogoUrl(e.newValue || null);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <header className="w-full border-b border-slate-800 bg-slate-900/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-md overflow-hidden grid place-items-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Logo"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="text-xs text-slate-400">Logo</span>
            )}
          </div>
          <span className="font-medium">Nuvion IA</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-sky-400">Dashboard</Link>
          <Link href="/configuracion/brand" className="hover:text-sky-400">Brand</Link>
        </nav>
      </div>
    </header>
  );
}
