'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// OJO: ruta relativa porque Navbar está en app/components
import { getBrandLogoUrl } from '../../lib/brand';

export default function Navbar() {
  const [logoUrl, setLogoUrl] = useState('/icon.png');

  useEffect(() => {
    setLogoUrl(getBrandLogoUrl());
    const handler = () => setLogoUrl(getBrandLogoUrl());
    window.addEventListener('brand:logo-updated', handler);
    return () => window.removeEventListener('brand:logo-updated', handler);
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-3">
      <Link href="/inicio" className="flex items-center gap-2">
        <Image src={logoUrl} alt="Logo" width={28} height={28} className="rounded" priority />
        <span className="font-semibold">Nuvion IA</span>
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/inicio">Inicio</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/clientes">Clientes</Link>
        <Link href="/reportes">Reportes</Link>
        <Link href="/contacto">Contacto</Link>
        <Link href="/configuracion">Configuración</Link>
      </div>
    </nav>
  );
}
