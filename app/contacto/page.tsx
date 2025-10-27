'use client';

import React from 'react';

type FormState = {
  nombre: string;
  email: string;
  mensaje: string;
};
type UiState = { status: 'idle' | 'sending' | 'ok' | 'error'; msg?: string };

export default function ContactoPage() {
  const [form, setForm] = React.useState<FormState>({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [ui, setUi] = React.useState<UiState>({ status: 'idle' });

  function onChange<T extends keyof FormState>(k: T, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validaciones simples en cliente
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      setUi({ status: 'error', msg: 'Completá todos los campos.' });
      return;
    }
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!emailOk) {
      setUi({ status: 'error', msg: 'Ingresá un email válido.' });
      return;
    }

    setUi({ status: 'sending' });

    // (Placeholder) Simulamos envío OK.
    await new Promise((r) => setTimeout(r, 800));

    // Si tenés un endpoint real, acá harías el fetch:
    // const res = await fetch('/api/contacto', { method:'POST', body: JSON.stringify(form) })

    setUi({ status: 'ok', msg: '¡Mensaje enviado! Te respondemos a la brevedad.' });
    setForm({ nombre: '', email: '', mensaje: '' });
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Contacto</h1>

      <p className="text-gray-300 mb-8">
        Dejanos tu consulta y te respondemos. También podés escribirnos a{' '}
        <a className="text-indigo-400 underline" href="mailto:hola@nuvion-ia.com">
          hola@nuvion-ia.com
        </a>.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm text-gray-300" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            value={form.nombre}
            onChange={(e) => onChange('nombre', e.target.value)}
            className="w-full rounded-md bg-[#0f1729] border border-[#233043] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full rounded-md bg-[#0f1729] border border-[#233043] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="tu@correo.com"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300" htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows={6}
            value={form.mensaje}
            onChange={(e) => onChange('mensaje', e.target.value)}
            className="w-full rounded-md bg-[#0f1729] border border-[#233043] px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Contanos en qué te ayudamos…"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={ui.status === 'sending'}
            className="rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 px-5 py-2 font-medium"
          >
            {ui.status === 'sending' ? 'Enviando…' : 'Enviar'}
          </button>

          {ui.status === 'ok' && (
            <span className="text-emerald-300 text-sm">{ui.msg}</span>
          )}
          {ui.status === 'error' && (
            <span className="text-red-300 text-sm">{ui.msg}</span>
          )}
        </div>
      </form>
    </main>
  );
}
