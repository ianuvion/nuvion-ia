"use client";

import Link from "next/link";
import { Funnel, FunnelChart, LabelList, Tooltip, ResponsiveContainer } from "recharts";

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
    <div className="min-h-scree
