"use client";

type Lead = {
  id: string;
  nombre: string;
  canal: "WhatsApp" | "Instagram" | "Facebook" | "Web";
  estado: "Nuevo" | "En curso" | "Ganado" | "Perdido";
  fecha: string;
};

const kpis = [
  { label: "Leads del día", value: 18 },
  { label: "En curso", value: 42 },
  { label: "Ganados (30d)", value: 27 },
  { label: "Tasa de respuesta", value: "92%" },
];

const leads: Lead[] = [
  { id: "LD-001", nombre: "María López", canal: "WhatsApp", estado: "Nuevo", fecha: "2025-10-20 10:22" },
  { id: "LD-002", nombre: "Juan Pérez", canal: "Instagram", estado: "En curso", fecha: "2025-10-20 09:50" },
  { id: "LD-003", nombre: "RC Plenitud", canal: "Facebook", estado: "Ganado", fecha: "2025-10-19 18:05" },
  { id: "LD-004", nombre: "Power Techo", canal: "Web", estado: "En curso", fecha: "2025-10-19 16:21" },
  { id: "LD-005", nombre: "Ana Suárez", canal: "WhatsApp", estado: "Perdido", fecha: "2025-10-19 12:09" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Resumen</h1>
        <p className="text-sm text-gray-500">Estado general de Nuvion IA</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">{kpi.label}</div>
            <div className="mt-2 text-2xl font-semibold">{kpi.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-medium">Últimos leads</h2>
          <a
            href="/clientes"
            className="text-sm rounded-lg border px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            Ver todos
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Canal</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, idx) => (
                <tr key={l.id} className={idx % 2 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{l.id}</td>
                  <td className="px-4 py-3">{l.nombre}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                      {l.canal}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-xs " +
                        (l.estado === "Nuevo"
                          ? "bg-blue-50 text-blue-700"
                          : l.estado === "En curso"
                          ? "bg-amber-50 text-amber-700"
                          : l.estado === "Ganado"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700")
                      }
                    >
                      {l.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{l.fecha}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href="#"
                        className="rounded-lg border px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Abrir conversación de ${l.nombre} (demo)`);
                        }}
                      >
                        Abrir
                      </a>
                      <a
                        href="#"
                        className="rounded-lg border px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Marcar lead ${l.id} como Ganado (demo)`);
                        }}
                      >
                        Ganado
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
