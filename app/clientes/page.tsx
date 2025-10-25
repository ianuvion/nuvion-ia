'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';

const clientes = [
  { nombre: 'RC Plenitud Seguros', estado: 'Onboarding', detalle: 'Conectar WhatsApp API oficial' },
  { nombre: 'Power Tech', estado: 'Activo', detalle: 'Optimizar flujo de seguimiento' },
  { nombre: 'Lava Autos Venecia', estado: 'Prueba', detalle: 'A/B de script de ventas' },
  { nombre: 'La Fonda de Don Luis', estado: 'Activo', detalle: 'Embudo de reservas' },
  { nombre: 'NovaFit', estado: 'Onboarding', detalle: 'Definir tono del agente' },
];

function EstadoBadge({ estado }: { estado: string }) {
  const estilos: Record<string, string> = {
    Activo: 'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30',
    Onboarding: 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30',
    Prueba: 'bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30',
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs rounded-full ${
        estilos[estado] ??
        'bg-slate-400/10 text-slate-200 ring-1 ring-slate-500/30'
      }`}
    >
      {estado}
    </span>
  );
}

export default function ClientesPage() {
  return (
    <main className="min-h-screen bg-slate-900/95 text-slate-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Clientes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clientes.map((cliente) => (
          <div
            key={cliente.nombre}
            className="rounded-xl border border-slate-700 bg-slate-800/60 p-5 hover:bg-slate-800/80 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium text-slate-100">{cliente.nombre}</h2>
              <EstadoBadge estado={cliente.estado} />
            </div>
            <p className="text-sm text-slate-400">{cliente.detalle}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
