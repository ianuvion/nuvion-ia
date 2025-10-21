"use client";

import Link from "next/link";
import {
  Funnel, FunnelChart, LabelList, Tooltip, ResponsiveContainer,
} from "recharts";

const kpis = [
  { label: "Clientes", value: 5 },
  { label: "Activos", value: 2 },
  { label: "Onboarding", value: 2 },
  { label: "En Prueba", value: 1 }, // ← mayúscula inicial
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
    Activo: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-500/30",
    Onboarding: "bg-amber-400/10 text-amber-300 ring-1 ring-amber-500/30",
    Prueba: "bg-sky-400/10 text-sky-300 ring-1 ring-sky-500/30",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs rounded-full ${styles[status] ?? "bg-slate-400/10 text-slate-300 ring-1 ring-slate-600/30"}`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      {/* Header compacto con logo clickeable */}
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
            aria-label="Ir al inicio"
          >
            {/* Si ya tenés un componente <Logo />, podés usarlo acá */}
            <img
              src="/logo-nuvion-metal.png"
              alt="Nuvion IA"
              className="h-6 w-auto"
            />
            <span className="sr-only">Inicio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link href="/dashboard" className="hover:text-white">Inicio</Link>
            <Link href="/clientes" className="hover:text-white">Clientes</Link>
            <Link href="/reportes" className="hover:text-white">Reportes</Link>
            <Link href="/configuracion" className="hover:text-white">Configuración</Link>
            <Link href="/contacto" className="hover:text-white">Contacto</Link>
          </nav>

          <Link
            href="/api/auth/signout"
            className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800/60"
          >
            Cerrar sesión
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4">
        {/* KPIs — sin fondos blancos */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 pt-6">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
            >
              <p className="text-xs md:text-sm text-slate-400">{k.label}</p>
              <p className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">{k.value}</p>
            </div>
          ))}
        </section>

        {/* Embudo + Tabla — menos espacio vertical */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Embudo */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="px-5 pt-4 pb-2 border-b border-slate-800/80">
              <h2 className="text-sm font-medium text-slate-200">Embudo de ventas</h2>
            </div>
            <div className="h-[320px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      color: "#e2e8f0",
                    }}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                    fill="#60a5fa"
                    stroke="#1d4ed8"
                  >
                    <LabelList
                      position="inside"
                      fill="#0b1220"
                      stroke="none"
                      dataKey="value"
                    />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card Clientes Recientes */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="px-5 pt-4 pb-2 border-b border-slate-800/80 flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-200">Clientes recientes</h2>
              <Link
                href="/clientes"
                className="text-xs md:text-sm inline-flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/50 px-2.5 py-1.5 text-slate-200 hover:bg-slate-700/60 hover:shadow transition"
              >
                Ver todos <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-400">
                      <th className="py-2 font-normal">Cliente</th>
                      <th className="py-2 font-normal">Estado</th>
                      <th className="py-2 font-normal">Notas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {recentClients.map((c) => (
                      <tr key={c.name} className="hover:bg-slate-800/40">
                        <td className="py-3 pr-3">{c.name}</td>
                        <td className="py-3 pr-3">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="py-3">{c.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Footer compacto */}
        <div className="h-10" />
      </main>
    </div>
  );
}
