'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const DEFAULT_LOGO = '/logo.svg'; // Cambiá si tu logo por defecto es otro archivo en /public

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO);

  useEffect(() => {
    // Al montar, leo lo guardado por el uploader
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('brandLogoUrl')
      : null;
    if (saved) setLogoUrl(saved);

    // Escucho cuando el uploader avise que hay un nuevo logo
    const handleUpdate = () => {
      const updated = localStorage.getItem('brandLogoUrl');
      if (updated) setLogoUrl(updated);
    };

    window.addEventListener('brandLogoUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate); // por si se cambia en otra pestaña

    return () => {
      window.removeEventListener('brandLogoUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 p-3">
        <img
          src={logoUrl}
          alt="Logo"
          className="h-8 w-auto rounded-md object-contain"
        />
        <Link href="/" className="font-medium text-white">
          Nuvion IA
        </Link>

        <nav className="ml-auto flex items-center gap-4 text-slate-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/configuracion/brand">Brand</Link>
        </nav>
      </div>
    </header>
  );
}
