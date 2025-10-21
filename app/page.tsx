// app/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0b2340] to-[#081a2f] text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm/none tracking-widest uppercase text-sky-300/80 mb-4">
              Plataforma conversacional para ventas
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Nuvion <span className="text-sky-300">IA</span>
            </h1>
            <p className="mt-4 text-lg text-slate-200/90">
              Impulsá tus ventas con <span className="font-semibold">IA conversacional</span>,
              bandeja unificada y automatizaciones listas para usar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition"
              >
                Ir al panel
              </Link>

              <Link
                href="/clientes"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-slate-600/70 hover:border-slate-400 text-white transition"
              >
                Ver clientes
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-sky-500/60 text-sky-300 hover:bg-sky-900/30 transition"
              >
                Pedir demo
              </Link>
            </div>

            {/* Mini “confianza” */}
            <div className="mt-6 text-sm text-slate-300/80">
              Integrado con WhatsApp Business, Instagram y Facebook.
            </div>
          </div>

          {/* Lado derecho: tarjetas resumidas (ligeras) */}
          <div className="grid gap-4">
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur border border-white/10 shadow-lg">
              <h3 className="font-semibold">Bandeja unificada</h3>
              <p className="text-slate-300/90 mt-1">
                Centralizá conversaciones de <b>WhatsApp, Instagram y Facebook</b> en un solo lugar.
              </p>
            </div>
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur border border-white/10 shadow-lg">
              <h3 className="font-semibold">Automatizaciones</h3>
              <p className="text-slate-300/90 mt-1">
                Bots y <b>flujos automáticos</b> de atención, venta y seguimiento.
              </p>
            </div>
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur border border-white/10 shadow-lg">
              <h3 className="font-semibold">Reportes</h3>
              <p className="text-slate-300/90 mt-1">
                Rendimiento en tiempo real con <b>IA</b> y métricas accionables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Captura + Califica",
              d: "Tomá leads 24/7 y calificalos con IA antes de pasarlos al equipo.",
            },
            {
              t: "Seguimiento automático",
              d: "Recordatorios, re-contactos y nurturing sin esfuerzo.",
            },
            {
              t: "Integraciones",
              d: "Meta, WhatsApp Business, CRM y más con APIs simples.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-sky-400/50 transition"
            >
              <h4 className="font-semibold mb-1">{f.t}</h4>
              <p className="text-slate-300/90">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BARRA */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="rounded-2xl p-6 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 border border-sky-400/30">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">¿Listo para probar Nuvion IA?</h3>
              <p className="text-slate-200/90">Agendá una demo y te lo dejamos corriendo.</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://wa.me/541161517912?text=Hola%20quiero%20una%20demo%20de%20Nuvion%20IA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
              >
                WhatsApp demo
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-slate-500/60 hover:bg-slate-800/40 transition"
              >
                Formulario
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 py-10 text-slate-300/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Nuvion IA. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/clientes" className="hover:text-white">Clientes</Link>
            <Link href="/contacto" className="hover:text-white">Contacto</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
