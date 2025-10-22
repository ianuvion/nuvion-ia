"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

type Theme = "dark" | "semidark" | "light";
const THEME_KEY = "nuvion_theme";

function useTheme(): Theme {
  const [t, setT] = useState<Theme>("semidark");
  useEffect(() => {
    try {
      const v = (localStorage.getItem(THEME_KEY) as Theme | null) ?? "semidark";
      setT(v);
    } catch {
      setT("semidark");
    }
  }, []);
  return t;
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

  const bg =
    theme === "light"
      ? "from-slate-100 via-slate-100 to-white text-slate-900"
      : theme === "semidark"
      ? "from-slate-700 via-slate-700 to-slate-600 text-slate-50"
      : "from-slate-800 via-slate-800 to-slate-700 text-slate-100";

  const card =
    theme === "light"
      ? "border-slate-300/60 bg-white/80"
      : theme === "semidark"
      ? "border-slate-400/50 bg-slate-600/40"
      : "border-slate-500/50 bg-slate-700/50";

  const textSub =
    theme === "light" ? "text-slate-600" : "text-slate-300";

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bg}`}>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-xl font-semibold mb-1">Reportes</h1>
        <p className={`${textSub} mb-6`}>Resumen semanal de actividad y rendimiento comercial.</p>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Leads (semana)", value: weekly.reduce((a, b) => a + b.leads, 0) },
            { label: "Demos (semana)", value: weekly.reduce((a, b) => a + b.demos, 0) },
            { label: "Cierres (semana)", value: weekly.reduce((a, b) => a + b.cierres, 0) },
            { label: "Tasa cierre", value: `${Math.round((weekly.reduce((a, b) => a + b.cierres, 0) / Math.max(1, weekly.reduce((a, b) => a + b.demos, 0))) * 100)}%` },
          ].map((k) => (
            <div key={k.label} className={`rounded-2xl border ${card} p-4`}>
              <p className="text-xs md:text-sm opacity-80">{k.label}</p>
              <p className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">{k.value}</p>
            </div>
          ))}
        </section>

        {/* Gráficos */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads por día (área) */}
          <div className={`rounded-2xl border ${card}`}>
            <div className="px-5 pt-4 pb-2 border-b border-slate-500/20">
              <h2 className="text-sm font-medium">Leads por día</h2>
            </div>
            <div className="h-[320px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekly}>
                  <CartesianGrid stroke="rgba(148,163,184,0.2)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="currentColor" opacity={0.6} />
                  <YAxis stroke="currentColor" opacity={0.6} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "light" ? "#ffffff" : "#334155",
                      border: "1px solid rgba(148,163,184,0.25)",
                      borderRadius: 12,
                      color: theme === "light" ? "#0f172a" : "#e5e7eb",
                    }}
                  />
                  <Area type="monotone" dataKey="leads" fill="#93c5fd" stroke="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demos/Cierres (barras) */}
          <div className={`rounded-2xl border ${card}`}>
            <div className="px-5 pt-4 pb-2 border-b border-slate-500/20">
              <h2 className="text-sm font-medium">Demos y cierres por día</h2>
            </div>
            <div className="h-[320px] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekly}>
                  <CartesianGrid stroke="rgba(148,163,184,0.2)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="currentColor" opacity={0.6} />
                  <YAxis stroke="currentColor" opacity={0.6} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "light" ? "#ffffff" : "#334155",
                      border: "1px solid rgba(148,163,184,0.25)",
                      borderRadius: 12,
                      color: theme === "light" ? "#0f172a" : "#e5e7eb",
                    }}
                  />
                  <Bar dataKey="demos" fill="#60a5fa" />
                  <Bar dataKey="cierres" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
