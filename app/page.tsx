"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 flex flex-col items-center justify-center text-center text-slate-100">
      {/* Logo metálico */}
      <Image
        src="/icon.png"
        alt="Nuvion IA"
        width={160}
        height={160}
        className="mb-6 brightness-125 drop-shadow-[0_0_16px_rgba(255,255,255,0.2)] ring-2 ring-white/10 rounded-2xl"
        priority
      />

      {/* Nombre */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Bienvenido a <span className="text-white">Nuvion IA</span>
      </h1>

      {/* Subtexto */}
      <p className="mt-3 text-slate-300 max-w-md">
        Plataforma inteligente para automatizar tu negocio con tecnología IA.
      </p>

      {/* Botones de acceso rápido */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="rounded-lg border border-slate-500/40 bg-slate-700/50 px-4 py-2 text-sm hover:bg-slate-600/60 transition"
        >
          Ir al Dashboard
        </Link>
        <Link
          href="/clientes"
          className="rounded-lg border border-slate-500/40 bg-slate-700/50 px-4 py-2 text-sm hover:bg-slate-600/60 transition"
        >
          Ver Clientes
        </Link>
      </div>

      {/* Footer simple */}
      <footer className="absolute bottom-4 text-xs text-slate-400">
        © {new Date().getFullYear()} Nuvion IA — Todos los derechos reservados.
      </footer>
    </main>
  );
}
