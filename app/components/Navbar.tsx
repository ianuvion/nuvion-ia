'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/reportes', label: 'Reportes' },
  { href: '/configuracion/brand', label: 'Brand' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#233043] bg-[#0b1220]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0e1628] ring-1 ring-blue-400/30 shadow-[0_0_25px] shadow-blue-500/20">
            <Image
              src="/icon.png"
              alt="Nuvion IA"
              width={28}
              height={28}
              className="rounded-md"
              priority
            />
          </span>
          <span className="text-[15px] font-semibold tracking-wide">Nuvion IA</span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-2">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={[
                    'px-3 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-[#132034] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#0f1b2e]',
                  ].join(' ')}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
