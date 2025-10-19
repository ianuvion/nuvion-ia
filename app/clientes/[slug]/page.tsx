import { notFound } from "next/navigation";
import Link from "next/link";

type Cliente = {
  name: string;
  status: "Onboarding" | "Activo" | "Prueba";
  notes: string;
};

const CLIENTES: Cliente[] = [
  { name: "RC Plenitud Seguros", status: "Onboarding", notes: "Conectar WhatsApp API oficial" },
  { name: "Power Techo",         status: "Activo",     notes: "Optimizar flujo de seguimiento" },
  { name: "Lava Autos Venecia",  status: "Prueba",     notes: "A/B de script de ventas" },
  { name: "La Fonda de Don Luis",status: "Activo",     notes: "Embudo de reservas" },
  { name: "NovaFit",             status: "Onboarding", notes: "Definir tono del agente" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return CLIENTES.map((c) => ({ slug: slugify(c.name) }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cli = CLIENTES.find((c) => slugify(c.name) === params.slug);
  return { title: cli ? `${cli.name} • NUVION IA` : "Cliente • NUVION IA" };
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs rounded-full border px-2 py-0.5 bg-gray-50 border-gray-200 text-gray-700">
      {children}
    </span>
  );
}

export default function ClienteDetailPage({ params }: { params: { slug: string } }) {
  const cli = CLIENTES.find((c) => slugify(c.name) === params.slug);
  if (!cli) return notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{cli.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Ficha del cliente</p>
        </div>
        <Badge>{cli.status}</Badge>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-medium mb-2">Notas</h2>
        <p className="text-gray-700">{cli.notes}</p>
      </div>

      <div className="flex gap-2">
        <Link
          href="/clientes"
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          ← Volver a clientes
        </Link>
        <button className="rounded-xl bg-gray-900 text-white px-3 py-2 text-sm">
          Editar (placeholder)
        </button>
      </div>
    </div>
  );
}
