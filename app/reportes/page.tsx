'use client';

import React from 'react';

type Reporte = {
  id: number;
  nombre: string;
  estado: 'En proceso' | 'Completado' | 'Pendiente';
  fecha: string; // ISO o dd/mm/yyyy
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
      r =>
        r.nombre.toLowerCase().includes(q) ||
        r.estado.toLowerCase().includes(q) ||
        r.fecha.toLowerCase().includes(q) ||
        String(r.id).includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0b1420] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Reportes</h1>

        <div className="mb-5">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar reporte…"
            className="w-full max-w-md rounded-md bg-[#0f1b2b] border border-[#233348] px-4 py-2 outline-none focus:ring-2 focus:ring-[#1f9eff]"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#233348] bg-[#0f1b2b]">
          <table className="min-w-full text-left">
            <thead className="bg-[#122033] text-sm text-[#9ab0c3]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((r) => (
                <tr key={r.id} className="border-t border-[#1a2a40] hover:bg-[#122033]">
                  <td className="px-4 py-3">{r.id}</td>
                  <td className="px-4 py-3">{r.nombre}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        'inline-flex items-center rounded-full px-2 py-1 text-xs ' +
                        (r.estado === 'Completado'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : r.estado === 'En proceso'
                          ? 'bg-amber-500/15 text-amber-300'
                          : 'bg-sky-500/15 text-sky-300')
                      }
                    >
                      {r.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">{r.fecha}</td>
                </tr>
              ))}

              {filtrados.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-[#9ab0c3]" colSpan={4}>
                    No hay resultados para “{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-[#9ab0c3] text-sm mt-4">
          *Esto es un placeholder visual. Luego lo conectamos a datos reales (S3/DB/API) cuando
          definamos el origen.
        </p>
      </div>
    </div>
  );
}
