"use client";

import React, { useEffect, useState } from "react";
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

const weekly = [
  { day: "Lun", leads: 42, demos: 6, cierres: 2 },
  { day: "Mar", leads: 55, demos: 7, cierres: 3 },
  { day: "Mié", leads: 48, demos: 5, cierres: 1 },
  { day: "Jue", leads: 66, demos: 8, cierres: 4 },
  { day: "Vie", leads: 38, demos: 5, cierres: 2 },
  { day: "Sáb", leads: 22, demos: 3, cierres: 1 },
  { day: "Dom", leads: 18, demos: 2, cierres: 0 },
];

export default function ReportesPage() {
  const theme = useTheme();

  const totalLeads = weekly.reduce((a, b) => a + b.leads, 0);
  const totalDemos = weekly.reduce((a, b) => a + b.demos, 0);
  const totalCierres = weekly.reduce((a, b) => a + b.cierres, 0);
  const tasaCierre = totalDemos > 0 ? Math.round((totalCierres / totalDemos) * 100) : 0;

  return (
    <div className={"min-h-screen bg-gradient-to-b " + bg(theme)}>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-xl font-semibold">Reportes</h1>
        <p className="text-sm opacity-80 mb-4">Resumen semanal de actividad y rendimiento.</p>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Leads (semana)</p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold">{totalLeads}</p>
          </div>
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Demos (semana)</p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold">{totalDemos}</p>
          </div>
          <div className={"rounded-2xl border p-4 " + card(theme)}>
            <p className="text-xs opacity-80">Cierres (semana)</p>
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
                <AreaChart data={weekly}>
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
                <BarChart data={weekly}>
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
