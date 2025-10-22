"use client";

import React from "react";
import Link from "next/link";

type Row = { name: string; status: "Activo" | "Onboarding" | "Prueba"; note: string };

const KPIS = [
  { label: "Clientes", value: 5 },
  { label: "Activos", value: 2 },
  { label: "Onboarding", value: 2 },
  { label: "En Prueba", value: 1 }
];

const RECENT: Row[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", note: "Conectar WhatsApp API oficial" },
  { name: "Power Tech", status: "Activo", note: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia", status: "Prueba", note: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis", status: "Activo", note: "Embudo de reservas" },
  { name: "NovaFit", status: "Onboarding", note: "Definir tono del agente" }
];

function Badge(props: { status: Row["status"] }) {
  const map: Record<Row["status"], string> = {
    Activo: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30",
    Onboarding: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30",
    Prueba: "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30"
  };
  return <span className={"px-2 py-0.5 text-xs rounded-full " + map[props.status]}>{props.status}</span>;
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-4">
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl border border-slate-500/50 bg-slate-700/50 p-4 shadow-sm">
              <p className="text-xs md:text-sm opacity-80">{k.label}</p>
              <p className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">{k.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-500/50 bg-slate-700/50">
            <div className="px-5 pt-4 pb-2 border-b border-slate-500/30 flex items-center justify-between">
              <h2 className="text-sm font-medium">Embudo de ventas</h2>
              <span className="text-xs opacity-80">Vista básica</span>
            </div>
            <div className="p-6">
              <div className="h-48 rounded-xl border border-slate-500/30 bg-slate-800/50 flex items-center justify-center text-slate-300">
                Próximamente gráfico de embudo
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-500/50 bg-slate-700/50">
            <div className="px-5 pt-4 pb-2 border-b border-slate-500/30 flex items-center justify-between">
              <h2 className="text-sm font-medium">Clientes recientes</h2>
              <Link href="/clientes" className="text-xs md:text-sm rounded-lg border border-slate-400/50 bg-slate-600/40 px-2.5 py-1.5 hover:bg-slate-600/60">
                Ver todos →
              </Link>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs opacity-80">
                      <th className="py-2 font-normal">Cliente</th>
                      <th className="py-2 font-normal">Estado</th>
                      <th className="py-2 font-normal">Notas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-500/30">
                    {RECENT.map((c) => (
                      <tr key={c.name} className="hover:bg-slate-600/30">
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
        </section>

        <div className="h-8" />
      </main>
    </div>
  );
}
