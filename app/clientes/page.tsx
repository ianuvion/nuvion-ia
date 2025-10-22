"use client";

import React from "react";

type Client = {
  name: string;
  status: "Activo" | "Onboarding" | "Prueba";
  note: string;
};

const ROWS: Client[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", note: "Conectar WhatsApp API oficial" },
  { name: "Power Tech", status: "Activo", note: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia", status: "Prueba", note: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis", status: "Activo", note: "Embudo de reservas" },
  { name: "NovaFit", status: "Onboarding", note: "Definir tono del agente" }
];

function Badge(props: { status: Client["status"] }) {
  const map: Record<Client["status"], string> = {
    Activo: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30",
    Onboarding: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30",
    Prueba: "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30"
  };
  return <span className={"px-2 py-0.5 text-xs rounded-full " + map[props.status]}>{props.status}</span>;
}

export default function ClientesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-700 to-slate-600 text-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold">Clientes</h1>
          <div className="flex gap-2">
            <input
              placeholder="Buscar por nombre o nota..."
              className="w-64 rounded-lg border border-slate-400/40 bg-slate-600/30 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-200 outline-none"
            />
            <select className="rounded-lg border border-slate-400/40 bg-slate-600/30 px-3 py-2 text-sm text-slate-50 outline-none">
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Prueba">Prueba</option>
            </select>
            <button className="rounded-lg border border-slate-300/50 bg-slate-500/40 px-3 py-2 text-sm">
              + Nuevo
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-400/50 bg-slate-600/40">
          <div className="px-5 pt-4 pb-2 border-b border-slate-400/40">
            <p className="text-sm font-medium">Listado</p>
          </div>

          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-100/90">
                    <th className="py-2 font-normal">Cliente</th>
                    <th className="py-2 font-normal">Estado</th>
                    <th className="py-2 font-normal">Notas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-400/40">
                  {ROWS.map((c) => (
                    <tr key={c.name} className="hover:bg-slate-500/30">
                      <td className="py-3 pr-3">{c.name}</td>
                      <td className="py-3 pr-3"><Badge status={c.status} /></td>
                      <td className="py-3">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
