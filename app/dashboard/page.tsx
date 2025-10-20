'use client';

import Link from "next/link";
import { useMemo, useState } from "react";

type Cliente = {
  name: string;
  status: "Onboarding" | "Activo" | "Prueba";
  notes: string;
};

const CLIENTES: Cliente[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", notes: "Conectar WhatsApp API oficial" },
  { name: "Power Techo", status: "Activo", notes: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia", status: "Prueba", notes: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis", status: "Activo", notes: "Embudo de reservas" },
  { name: "NovaFit", status: "Onboarding", notes: "Definir tono del agente" },
];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");

export default function DashboardHome() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return CLIENTES.filter((c) =>
      (c.name + " " + c.notes).toLowerCase().includes(q)
    );
  }, [query]);

  const total = CLIENTES.length;
  const activos = CLIENTES.filter((c) => c.status === "Activo").length;
  const onboarding = CLIENTES.filter((c) => c.status === "Onboarding").length;
  const prueba = CLIENTES.filter((c) => c.status === "Prueba").length;

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Bienvenido, Ariel 👋</h1>
        <p className="text-sm text-gray-600">
          Resumen rápido de tu operación.
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Clientes" value={total} />
        <KPICard label="Activos" value={activos} />
        <KPICard label="Onboarding" value={onboarding} />
        <KPICard label="En prueba" value={prueba} />
      </section>

      {/* Tabla de clientes recientes */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Clientes recientes</h2>
          <Link
            href="/clientes"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Ver todos →
          </Link>
        </div>

        <div className="rounded-2xl border bg-white overflow-hidden">
          <div className="p-3 border-b">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o nota..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-medium px-4 py-2">Cliente</th>
                <th className="text-left font-medium px-4 py-2">Estado</th>
                <th className="text-left font-medium px-4 py-2">Notas</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.name} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      className="font-medium hover:underline"
                      href={`/clientes/${slugify(c.name)}`}
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${badgeColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function KPICard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function badgeColor(status: Cliente["status"]) {
  switch (status) {
    case "Activo":
      return "bg-green-100 text-green-700";
    case "Onboarding":
      return "bg-amber-100 text-amber-700";
    case "Prueba":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

