'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';

export default function ClientesPage() {
  // Demo simple para verificar que renderiza
  const clientes = [
    { nombre: 'RC Plenitud Seguros', estado: 'Onboarding' },
    { nombre: 'Power Tech', estado: 'Activo' },
    { nombre: 'Lava Autos Venecia', estado: 'Prueba' },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-white">Clientes</h1>
      <p className="text-slate-300">
        Esta es una vista de prueba para confirmar que la ruta /clientes renderiza correctamente.
      </p>

      <div className="grid gap-3">
        {clientes.map((c) => (
          <div
            key={c.nombre}
            className="rounded-lg border border-slate-700 bg-slate-800/60 p-4"
          >
            <div className="font-medium text-slate-100">{c.nombre}</div>
            <div className="text-sm text-slate-400">Estado: {c.estado}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
