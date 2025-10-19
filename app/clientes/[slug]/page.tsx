import { notFound } from "next/navigation";

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

export default function ClientePage({ params }: { params: { slug: string } }) {
  const cliente = CLIENTES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!cliente) return notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{cliente.name}</h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Estado:</strong> {cliente.status}
        </p>
        <p>
          <strong>Notas:</strong> {cliente.notes}
        </p>
      </div>
    </div>
  );
}
