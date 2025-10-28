// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/reportes", label: "Reportes" },
  { href: "/contacto", label: "Contacto" },
  { href: "/configuracion", label: "Configuración" },
];

export default function Navbar() {
  const pathname = usePathname();

  const items = useMemo(
    () =>
      links.map((l) => {
        const active =
          l.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(l.href);

        return (
          <Link
            key={l.href}
            href={l.href}
            className={[
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              active
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60",
            ].join(" ")}
          >
            {l.label}
          </Link>
        );
      }),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-slate-100">
          Nuvion IA
        </Link>
        <nav className="flex items-center gap-1">{items}</nav>
      </div>
    </header>
  );
}
