import dynamic from 'next/dynamic';
const SalesFunnel = dynamic(() => import('./components/SalesFunnel'), {
  ssr: false,
});
type Cliente = {
  name: string;
  status: 'Onboarding' | 'Activo' | 'Prueba';
  notes: string;
};

const CLIENTES: Cliente[] = [
  { name: 'RC Plenitud Seguros', status: 'Onboarding', notes: 'Conectar WhatsApp API oficial' },
  { name: 'Power Techo', status: 'Activo', notes: 'Optimizar flujo de seguimiento' },
  { name: 'Lava Autos Venecia', status: 'Prueba', notes: 'A/B de script de ventas' },
  { name: 'La Fonda de Don Luis', status: 'Activo', notes: 'Embudo de reservas' },
  { name: 'NovaFit', status: 'Onboarding', notes: 'Definir tono del agente' },
];

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const total = CLIENTES.length;
  const activos = CLIENTES.filter((c) => c.status === 'Activo').length;
  const onboarding = CLIENTES.filter((c) => c.status === 'Onboarding').length;
  const prueba = CLIENTES.filter((c) => c.status === 'Prueba').length;

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Clientes" value={total} />
        <StatCard title="Activos" value={activos} />
        <StatCard title="Onboarding" value={onboarding} />
        <StatCard title="En prueba" value={prueba} />
      </section>

      {/* Embudo arriba */}
      <section>
        <SalesFunnel />
      </section>

      {/* Lista de clientes */}
      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Clientes recientes</h2>
          <a
            href="/clientes"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Ver todos →
          </a>
        </div>

        <div className="px-5 py-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-3 pr-3 font-medium">Cliente</th>
                  <th className="py-3 pr-3 font-medium">Estado</th>
                  <th className="py-3 pr-3 font-medium">Notas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {CLIENTES.map((c) => (
                  <tr key={c.name}>
                    <td className="py-3 pr-3 text-gray-900">{c.name}</td>
                    <td className="py-3 pr-3">
                      <span
                        className={[
                          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                          c.status === 'Activo'
                            ? 'bg-green-100 text-green-700'
                            : c.status === 'Onboarding'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700',
                        ].join(' ')}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-gray-700">{c.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
