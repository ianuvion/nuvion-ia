'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
      <Link href="/" className="flex items-center gap-3">
        {/* Logo dinámico: se actualiza solo cuando cambiás el logo en Brand */}
        <BrandLogo className="h-7 w-auto object-contain" alt="Logo" />
        <span className="text-white/90 font-semibold tracking-wide">
          Nuvion IA
        </span>
      </Link>

      <nav className="ml-auto flex items-center gap-6 text-sm">
        <Link
          href="/dashboard"
          className="text-white/70 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/configuracion/brand"
          className="text-white/70 hover:text-white transition-colors"
        >
          Brand
        </Link>
      </nav>
    </header>
  );
}
