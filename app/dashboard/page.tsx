'use client';

import { useState } from 'react';

/** ====== Datos simulados ====== */
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

/** REEMPLAZÁ este link por el de tu PDF fijo del Formulario */
const FORM_URL = "#";

/** ====== UI helpers simples ====== */
function Card(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl shadow-sm border border-gray-200 bg-white p-5 ${props.className ?? ""}`}>
      {props.children}
    </div>
  );
}
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary' | 'ghost'}) {
  const { className = "", variant = 'ghost', ...rest } = props;
  const base = "rounded-xl px-4 py-2 border transition text-sm";
  const styles = variant === 'primary'
    ? "bg-black text-white border-black hover:opacity-90"
    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50";
  return <button className={`${base} ${styles} ${className}`} {...rest} />;
}

/** ====== Página ====== */
export default function DashboardHome() {
  const [todo, setTodo] = useState([
    { id: 1, text: "Crear carpeta del cliente en Drive", done: false },
    { id: 2, text: "Enviar Formulario de Inicio",        done: false },
    { id: 3, text: "Conectar canales (WA/IG/FB)",        done: false },
    { id: 4, text: "Desplegar agente y test",            done: false },
    { id: 5, text: "Activar cobro mensual",              done: false },
  ]);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [invite, setInvite] = useState({ name: "", email: "" });

  const toggleItem = (id: number) =>
    setTodo(t => t.map(i => i.id === id ? { ...i, done: !i.done } : i));

  const submitInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: acá después vamos a integrar con tu backend o Zapier
    alert(`Invitación enviada a ${invite.name} <${invite.email}>`);
    setInvite({ name: "", email: "" });
    setInviteOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado + acciones */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Bienvenido, Ariel 👋</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Vista rápida del negocio. Próximo paso: integrar acciones reales.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setInviteOpen(true)}>Invitar cliente</Button>
            <Button variant="primary">Crear agente IA</Button>
          </div>
        </div>
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
          <ul className="space-y-2">
            {todo.map(item => (
              <li key={item.id} className="flex items-start gap-2">
                <input
                  id={`t-${item.id}`}
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleItem(item.id)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor={`t-${item.id}`} className={`text-sm ${item.done ? "line-through text-gray-400" : ""}`}>
                  {item.text}
                </label>
              </li>
            ))}
          </ul>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block text-center rounded-xl border border-black bg-black text-white py-2 hover:opacity-90"
          >
            Abrir Formulario
          </a>
        </Card>
      </div>

      {/* Modal Invitar cliente (simple) */}
      {inviteOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Invitar cliente</h3>
              <button onClick={() => setInviteOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">Cerrar</button>
            </div>
            <form onSubmit={submitInvite} className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Nombre</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                  value={invite.name}
                  onChange={e => setInvite(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                  value={invite.email}
                  onChange={e => setInvite(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" onClick={() => setInviteOpen(false)}>Cancelar</Button>
                <Button type="submit" variant="primary">Enviar invitación</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
