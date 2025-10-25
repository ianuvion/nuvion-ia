'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1️⃣ Cargar el logo guardado en localStorage (si existe)
    const saved = localStorage.getItem('nuvion_logo_url');
    if (saved) setLogoUrl(saved);

    // 2️⃣ Escuchar cambios si el logo se actualiza desde otra pestaña
    function onStorage(e: StorageEvent) {
      if (e.key === 'nuvion_logo_url') {
        setLogoUrl(e.newValue);
      }
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // 3️⃣ Si no hay logo en S3, usa el icono base del proyecto
  const src = logoUrl || '/icon.png';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/40 bg-slate-800/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* 🔗 Logo y enlace al inicio */}
        <Link href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <Image
            src={src}
            alt="Nuvion IA"
            width={30}
            height={30}
            className="brightness-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] ring-1 ring-white/10 rounded-md"
          />
          <span className="text-sm font-semibold text-slate-100 tracking-tight">
            Nuvion IA
          </span>
        </Link>

        {/* Menú derecho (agregá botones o links si querés) */}
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-200 hover:text-white text-sm">
            Dashboard
          </Link>
          <Link href="/clientes" className="text-slate-200 hover:text-white text-sm">
            Clientes
          </Link>
          <Link href="/configuracion" className="text-slate-200 hover:text-white text-sm">
            Configuración
          </Link>
        </nav>
      </div>
    </header>
  );
}
