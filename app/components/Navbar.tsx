"use client";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  return (
    <header className="w-full border-b">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/clientes" className="hover:underline">Clientes</Link>
          <Link href="/configuracion" className="hover:underline">Configuración</Link>
          <Link href="/reportes" className="hover:underline">Reportes</Link>
        </div>
      </nav>
    </header>
  );
}
