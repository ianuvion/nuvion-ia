import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* fondo degradado + blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Plataforma lista para demo
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Nuvion IA
          <span className="block text-cyan-400">Impulsa tus ventas con IA</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
          CRM liviano + automatizaciones. Centralizá leads de Meta/IG/WhatsApp y
          acelerá el cierre con asistentes y workflows inteligentes.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-400 transition"
          >
            Ir al panel
          </Link>
          <Link
            href="/clientes"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
          >
            Ver clientes
          </Link>
        </div>
      </section>

      {/* Features simples */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Bandeja unificada",
            desc: "Leads de WhatsApp/Meta/IG en un solo lugar con contexto.",
          },
          {
            title: "Automatizaciones",
            desc: "Respuestas instantáneas, nurturing y asignación a agentes.",
          },
          {
            title: "Reportes",
            desc: "Embudo, tiempos de respuesta y rendimiento por campaña.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-slate-300">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer mínimo */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Nuvion IA — Todos los derechos reservados.
      </footer>
    </main>
  );
}
