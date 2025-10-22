// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuvion IA", // como pediste: sin la palabra “plataforma”
  description: "Dashboard y herramientas de Nuvion IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* NAVBAR — ligeramente más clara para que el logo destaque */}
        <header className="sticky top-0 z-40 border-b border-slate-700/40 bg-slate-800/85 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
            {/* Logo + marca (clickeable al inicio) */}
            <Link href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
              <Image
                src="/icon.png"
                alt="Nuvion IA"
                width={28}
                height={28}
                className="brightness-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] ring-1 ring-white/10 rounded-md"
                priority
              />
              <span className="text-sm font-semibold text-slate-100 tracking-tight">
                Nuvion IA
              </span>
            </Link>

            {/* Menú principal */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200/90">
              <Link href="/dashboard" className="hover:text-white">Inicio</Link>
              <Link href="/clientes" className="hover:text-white">Clientes</Link>
              <Link href="/reportes" className="hover:text-white">Reportes</Link>
              <Link href="/configuracion" className="hover:text-white">Configuración</Link>
              <Link href="/contacto" className="hover:text-white">Contacto</Link>
            </nav>

            {/* Acción (placeholder cerrar sesión) */}
            <Link
              href="/api/auth/signout"
              className="rounded-xl border border-slate-600/60 bg-slate-700/60 px-3 py-1.5 text-sm text-slate-100 hover:bg-slate-600/70"
            >
              Cerrar sesión
            </Link>
          </div>
        </header>

        {/* Contenido de cada página */}
        {children}
      </body>
    </html>
  );
}
