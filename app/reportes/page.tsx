'use client';

import React from 'react';

type Reporte = {
  id: number;
  nombre: string;
  estado: 'En proceso' | 'Completado' | 'Pendiente';
  fecha: string;
};

const DATA: Reporte[] = [
  { id: 1, nombre: 'Conversiones Semanales', estado: 'Completado', fecha: '20/10/2025' },
  { id: 2, nombre: 'Leads Entrantes', estado: 'En proceso', fecha: '24/10/2025' },
  { id: 3, nombre: 'Embudo de Ventas', estado: 'Pendiente', fecha: '18/10/2025' },
];

export default function ReportesPage() {
  const [query, setQuery] = React.useState('');

  const filtrados = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter(
      (r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.estado.toLowerCase().includes(q) ||
        r.fecha.toLowerCase().includes(q) ||
        String(r.id).includes(q),
    );
  }, [query]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Reportes</h1>

      <div className="mb-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar reporte…"
          className="w-full max-w-md rounded-md border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none
                     focus:ring-2 focus:ring-sky-500
                     dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm
                      dark:border-slate-800 dark:bg-slate-950">
        <table className="min-w-full text-left">
          <thead className="text-sm text-slate-500 dark:text-slate-400">
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((r) => (
              <tr
                key={r.id}
                className="border-b border-slate-100 hover:bg-slate-50
                           dark:border-slate-900 dark:hover:bg-slate-900/50"
              >
                <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{r.id}</td>
                <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{r.nombre}</td>
                <td className="px-4 py-3">
                  <span
                    className={[
                      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                      r.estado === 'Completado'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                        : r.estado === 'En proceso'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
                        : 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
                    ].join(' ')}
                  >
                    {r.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{r.fecha}</td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-500 dark:text-slate-400" colSpan={4}>
                  No hay resultados para “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        *Placeholder visual. Luego lo conectamos a datos reales (S3/DB/API).
      </p>
    </main>
  );
}
