"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

type Theme = "dark" | "semidark" | "light";
const THEME_KEY = "nuvion_theme";

function useTheme(): Theme {
  const [t, setT] = useState<Theme>("semidark");
  useEffect(() => {
    try {
      const saved = (localStorage.getItem(THEME_KEY) as Theme) || "semidark";
      setT(saved);
    } catch {}
  }, []);
  return t;
}

function bg(theme: Theme) {
  if (theme === "light") return "from-slate-100 via-slate-100 to-white text-slate-900";
  if (theme === "semidark") return "from-slate-700 via-slate-700 to-slate-600 text-slate-50";
  return "from-slate-800 via-slate-800 to-slate-700 text-slate-100";
}
function card(theme: Theme) {
  if (theme === "light") return "border-slate-300/60 bg-white/80";
  if (theme === "semidark") return "border-slate-400/50 bg-slate-600/40";
  return "border-slate-500/50 bg-slate-700/50";
}
function divider(theme: Theme) {
  return theme === "light" ? "border-slate-300/40" : "border-slate-500/30";
}

/* ===== Datos simulados por 30 días ===== */
const allDays = Array.from({ length: 30 }).map((_, i) => ({
  day: `D${i + 1}`,
  leads: Math.floor(20 + Math.random() * 50),
  demos: Math.floor(3 + Math.random() * 8),
  cierres: Math.floor(Math.random() * 4),
}));

/* ===== Util: exportar CSV ===== */
function downloadCsv(rows: Array<{ day: string; leads: number; demos: number; cierres: number }>, rango: number) {
  const headers = ["dia", "leads", "demos", "cierres"];
  const lines = [
    headers.join(","),
    ...rows.map((r) => [r.day, r.leads, r.demos, r.cierres].join(",")),
  ];
  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const today = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `reporte_${rango}d_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ReportesPage() {
  const theme = useTheme();
  const [range, setRange] = useState<7 | 14 | 30>(7);

  // últimos N días
  const data = useMemo(() => allDays.slice(-range), [range]);

  const totalLeads = data.reduce((a, b) => a + b.leads, 0);
  const totalDemos = data.reduce((a, b) => a + b.demos, 0);
  const totalCierres = data.reduce((a, b) => a + b.cierres, 0);
  const tasaCierre = totalDemos > 0 ? Math.round((totalCierres / totalDemos) * 100) : 0;

  return (
    <div className={"min-h-screen bg-gradient-to-b " + bg(theme)}>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-semibold">Reportes</h1>
            <p className="text-sm opacity-80">Rendimiento de campañas y conversiones.</p>
          </div>

          {/* Selector de rango + Exportar */}
          <div className="flex items-center gap-2">
            {[7, 14, 30].map((n) => (
              <button
                key={n}
                onClick={() => setRange(n as any)}
                className={`rounded-lg px-3 py-1.5 text-sm border transition ${
                  range === n
                    ? "bg-slate-500/40 border-slate-400/60 text-white"
                    : "border-slate-500/30 text-slate-300 hover:border-slate-400/50"
                }`}
              >
                Últimos {n} días
              </button>
            ))}

            <button
              onClick={() => downloadCsv(data, range)}
              className="rounded-lg px-3 py-1.5 text-sm border border-slate-400/60 bg-slate-600/40 hover:bg-slate-600/60 text-white"
            >
              Descargar CSV
            </button>
          </div>
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Leads ({range}d)</p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold">{totalLeads}</p>
          </div>
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Demos ({range}d)</p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold">{totalDemos}</p>
          </div>
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Cierres ({range}d)</p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold">{totalCierres}</p>
          </div>
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Tasa de cierre</p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold">{tasaCierre}%</p>
          </div>
        </section>

        {/* Gráficos */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads por día (Área) */}
          <div className={"rounded-2xl border " + card(theme)}>
            <div className={"px-5 pt-4 pb-2 border-b " + divider(theme)}>
              <h2 className="text-sm font-medium">Leads por día</h2>
            </div>
            <div className="h-[320px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid stroke="rgba(148,163,184,0.25)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="currentColor" opacity={0.7} />
                  <YAxis stroke="currentColor" opacity={0.7} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "light" ? "#ffffff" : "#334155",
                      border: "1px solid rgba(148,163,184,0.25)",
                      borderRadius: 12,
                      color: theme === "light" ? "#0f172a" : "#e5e7eb",
                    }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#2563eb" fill="#93c5fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demos y Cierres (Barras) */}
          <div className={"rounded-2xl border " + card(theme)}>
            <div className={"px-5 pt-4 pb-2 border-b " + divider(theme)}>
              <h2 className="text-sm font-medium">Demos y cierres por día</h2>
            </div>
            <div className="h-[320px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid stroke="rgba(148,163,184,0.25)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="currentColor" opacity={0.7} />
                  <YAxis stroke="currentColor" opacity={0.7} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "light" ? "#ffffff" : "#334155",
                      border: "1px solid rgba(148,163,184,0.25)",
                      borderRadius: 12,
                      color: theme === "light" ? "#0f172a" : "#e5e7eb",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="demos" name="Demos" fill="#60a5fa" />
                  <Bar dataKey="cierres" name="Cierres" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
