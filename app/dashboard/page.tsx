// app/dashboard/page.tsx

type KPI = { label: string; value: string };
type Cliente = { name: string; status: "Onboarding" | "Activo" | "Prueba"; notes: string };

const KPIS: KPI[] = [
  { label: "Clientes activos", value: "12" },
  { label: "Agentes desplegados", value: "7" },
  { label: "Conversaciones hoy", value: "432" },
  { label: "Tasa de cierre", value: "18%" },
];

const CLIENTES: Cliente[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", notes: "Conectar WhatsApp API oficial" },
  { name: "Power Techo",         status: "Activo",     notes: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia",  status: "Prueba",     notes: "A/B script de ventas" },
];

function Card(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl shadow-sm border border-gray-200 bg-white p-5 ${props.className ?? ""}`}>
      {props.children}
    </div>
  );
}

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <Card>
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenido, Ariel 👋</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Vista rápida del negocio. Próximo micro-paso: checklist + botones de acción.
        </p>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <Card key={k.label}>
            <div className="text-sm text-gray-500">{k.label}</div>
            <div className="text-2xl font-semibold mt-1">{k.value}</div>
          </Card>
        ))}
      </div>

      {/* Clientes recientes + Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Clientes recientes</h3>
            <a className="text-sm px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50" href="#">
              Ver todos
            </a>
          </div>

          <div className="divide-y">
            {CLIENTES.map((c) => (
              <div key={c.name} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.notes}</div>
                </div>
                <span className="text-xs rounded-full border px-2 py-0.5 bg-gray-50 border-gray-200 text-gray-700">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-medium mb-3">Checklist de lanzamiento</h3>
          <ol className="list-decimal ml-5 space-y-2 text-sm">
            <li>Crear carpeta del cliente en Drive</li>
            <li>Enviar <span className="font-medium">Formulario de Inicio</span></li>
            <li>Conectar canales (WA/IG/FB)</li>
            <li>Desplegar agente y test</li>
            <li>Activar cobro mensual</li>
          </ol>

          <a href="#" className="mt-4 block text-center rounded-xl border border-black bg-black text-white py-2 hover:opacity-90">
            Abrir Formulario
          </a>
        </Card>
      </div>
    </div>
  );
}
