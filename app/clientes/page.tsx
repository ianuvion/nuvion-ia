"use client";

import React, { useEffect, useMemo, useState } from "react";

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
function inputBase(theme: Theme) {
  if (theme === "light") return "border-slate-300/60 bg-white/70 text-slate-900 placeholder:text-slate-500";
  if (theme === "semidark") return "border-slate-400/40 bg-slate-600/30 text-slate-50 placeholder:text-slate-200";
  return "border-slate-500/40 bg-slate-700/30 text-slate-100 placeholder:text-slate-300";
}

type Client = { name: string; status: "Activo" | "Onboarding" | "Prueba"; note: string };

const ALL: Client[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", note: "Conectar WhatsApp API oficial" },
  { name: "Power Tech", status: "Activo", note: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia", status: "Prueba", note: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis", status: "Activo", note: "Embudo de reservas" },
  { name: "NovaFit", status: "Onboarding", note: "Definir tono del agente" },
];

function Badge({ status }: { status: Client["status"] }) {
  const map: Record<Client["status"], string> = {
    Activo: "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/40 shadow",
    Onboarding: "bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/40 shadow",
    Prueba: "bg-sky-500/15 text-sky-100 ring-1 ring-sky-400/40 shadow",
  };
  return <span className={"px-2 py-0.5 text-xs rounded-full " + map[status]}>{status}</span>;
}

export default function ClientesPage() {
  const theme = useTheme();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | Client["status"]>("");

  const data = useMemo(() => {
    return ALL.filter((c) => {
      const matchesText = c.name.toLowerCase().includes(q.toLowerCase()) || c.note.toLowerCase().includes(q.toLowerCase());
      const matchesStatus = status ? c.status === status : true;
      return matchesText && matchesStatus;
    });
  }, [q, status]);

  return (
    <div className={"min-h-screen bg-gradient-to-b " + bg(theme)}>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold">Clientes</h1>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o nota..."
              className={"w-64 rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-300 " + inputBase(theme)}
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className={"rounded-lg border px-3 py-2 text-sm outline-none " + inputBase(theme)}
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Prueba">Prueba</option>
            </select>
            <button className="rounded-lg border border-slate-300/50 bg-slate-500/40 px-3 py-2 text-sm hover:bg-slate-500/60">
              + Nuevo
            </button>
          </div>
        </div>

        <div className={"rounded-2xl border " + card(theme)}>
          <div className={"px-5 pt-4 pb-2 border-b " + divider(theme)}>
            <p className="text-sm font-medium">Listado</p>
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
                  {data.map((c) => (
                    <tr key={c.name} className="hover:bg-slate-600/30">
                      <td className="py-3 pr-3">{c.name}</td>
                      <td className="py-3 pr-3"><Badge status={c.status} /></td>
                      <td className="py-3">{c.note}</td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-6 text-center opacity-75">Sin resultados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
