'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const Tab = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`px-3 py-2 rounded-lg text-sm border transition
          ${active ? 'border-white/60 bg-white/10' : 'border-white/10 hover:bg-white/5'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>

      <div className="flex gap-2 mb-8">
        <Tab href="/configuracion" label="General" />
        <Tab href="/configuracion/apariencia" label="Apariencia" />
      </div>

      {children}
    </main>
  );
}
