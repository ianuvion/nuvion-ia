"use client";

import Link from "next/link";
import {
  Funnel, FunnelChart, LabelList, Tooltip, ResponsiveContainer,
} from "recharts";

const kpis = [
  { label: "Clientes", value: 5 },
  { label: "Activos", value: 2 },
  { label: "Onboarding", value: 2 },
  { label: "En Prueba", value: 1 },
];

const funnelData = [
  { name: "Leads", value: 1200 },
  { name: "Contactados", value: 800 },
  { name: "Demos", value: 420 },
  { name: "Cierres", value: 160 },
];

const recentClients = [
  { name: "RC Plenitud Seguros", status: "Onboarding", note: "Conectar WhatsApp API oficial" },
  { name: "Power Tech", status: "Activo", note: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia", status: "Prueba", note: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis", status: "Activo", note: "Embudo de reservas" },
  { name: "NovaFit", status: "Onboarding", note: "Definir tono del agente" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Activo: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30",
    Onboarding: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30",
    Prueba: "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30",
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${styles[status] ?? "bg-slate-400/10 text-slate-200 ring-1 ring-slate-500/30"}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    // Fondo un poco más claro que antes
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 text-slate-100">
      {/* --- SIN HEADER LOCAL (usamos el del layout) --- */}

      <main className="mx-auto max-w-7xl px-4">
        {/* Etiqueta mínima para verificar versión visual */}
        <p className="pt-4 text-[11px] text-slate-300/70">Tema: Dark Suave v2</p>

        {/* KPIs */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-slate-500/40 bg-slate-700/50 p-4 shadow-sm"
            >
              <p className="text-xs md:text-sm text-slate-200">{k.label}</p>
              <p className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">{k.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Embudo */}
          <div className="rounded-2xl border border-slate-500/40 bg-slate-700/50">
            <div className="px-5 pt-4 pb-2 border-b border-slate-500/30">
              <h2 className="text-sm font-medium text-slate-50">Embudo de ventas</h2>
            </div>
            <div className="h-[320px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(51,65,85)", // slate-700 aprox
                      border: "1px solid rgba(148,163,184,0.25)",
                      borderRadius: "12px",
                      color: "rgb(241,245,249)",
                    }}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                    fill="#bfdbfe"   // más claro
                    stroke="#2563eb"
                  >
                    <LabelList position="inside" fill="#0b1220" stroke="none" dataKey="value" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clientes recientes */}
          <div className="rounded-2xl border border-slate-500/40 bg-slate-700/50">
            <div className="px-5 pt-4 pb-2 border-b border-slate-500/30 flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-50">Clientes recientes</h2>
              <Link
                href="/clientes"
                className="text-xs md:text-sm inline-flex items-center gap-1 rounded-lg border border-slate-400/60 bg-slate-600/40 px-2.5 py-1.5 text-slate-50 hover:bg-slate-600/60 hover:shadow transition"
              >
                Ver todos <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-200">
                      <th className="py-2 font-normal">Cliente</th>
                      <th className="py-2 font-normal">Estado</th>
                      <th className="py-2 font-normal">Notas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-500/30">
                    {recentClients.map((c) => (
                      <tr key={c.name} className="hover:bg-slate-600/30">
                        <td className="py-3 pr-3">{c.name}</td>
                        <td className="py-3 pr-3">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="py-3 text-slate-50">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <div className="h-10" />
      </main>
    </div>
  );
}
