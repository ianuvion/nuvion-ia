// trigger build for clients page

'use client';

import { useMemo, useState } from "react";

type Cliente = {
  name: string;
  status: "Onboarding" | "Activo" | "Prueba";
  notes: string;
};

const CLIENTES: Cliente[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", notes: "Conectar WhatsApp API oficial" },
  { name: "Power Techo",         status: "Activo",     notes: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia",  status: "Prueba",     notes: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis",status: "Activo",     notes: "Embudo de reservas" },
  { name: "NovaFit",             status: "Onboarding", notes: "Definir tono del agente" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs rounded-full border px-2 py-0.5 bg-gray-50 border-gray-200 text-gray-700">
      {children}
    </span>
  );
}

export default function ClientesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | Cliente["status"]>("");

  const data = useMemo(() => {
    return CLIENTES.filter((c) => {
      const matchQ =
        q.trim().length === 0 ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.notes.toLowerCase().includes(q.toLowerCase());
      const matchStatus = !status || c.status === status;
      return matchQ && matchStatus;
    });
  }, [q, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
            <p className="text-gray-600 mt-1 text-sm">Listado con filtro rápido.</p>
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Buscar por nombre o nota…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full sm:w-72 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Prueba">Prueba</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-left px-4 py-3">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((c) => (
              <tr key={c.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3"><Badge>{c.status}</Badge></td>
                <td className="px-4 py-3 text-gray-600">{c.notes}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={3}>
                  No se encontraron clientes con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

