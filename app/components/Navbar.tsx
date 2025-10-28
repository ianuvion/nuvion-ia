'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DEFAULT_LOGO = '/icon.png'; // fallback

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO);

  // Lee el logo persistido y escucha cambios (evento y storage)
  useEffect(() => {
    const read = () =>
      setLogoUrl(localStorage.getItem('brandLogoUrl') || DEFAULT_LOGO);

    read();

    const onBrandUpdated = () => read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'brandLogoUrl') read();
    };

    window.addEventListener('brand:updated', onBrandUpdated);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('brand:updated', onBrandUpdated);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <header className="w-full border-b border-white/10 bg-background/60 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* si falla la carga del S3, volvemos al default */}
          {/* @ts-ignore */}
          <Image
            src={logoUrl}
            alt="Nuvion IA"
            width={32}
            height={32}
            onError={() => setLogoUrl(DEFAULT_LOGO)}
            className="rounded"
          />
          <span className="font-semibold">Nuvion IA</span>
        </Link>

        <ul className="flex items-center gap-6 text-sm">
          <li><Link href="/inicio">Inicio</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/clientes">Clientes</Link></li>
          <li><Link href="/reportes">Reportes</Link></li>
          <li><Link href="/contacto">Contacto</Link></li>
          <li><Link href="/configuracion">Configuración</Link></li>
        </ul>
      </nav>
    </header>
  );
}
