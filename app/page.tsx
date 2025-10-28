import Image from "next/image";

export const metadata = {
  title: "Nuvion IA",
  description: "Impulsá tus ventas con IA conversacional",
};

export default function HomePage() {
  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-[#0b2a58] to-[#081c3a]">
      {/* Glow suave detrás del logo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,200,255,.35), rgba(0,200,255,.12) 55%, rgba(0,0,0,0) 70%)",
        }}
      />

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-20 text-center">
        <div className="relative">
          <Image
            src="/icon.png"
            alt="Nuvion IA"
            width={200}
            height={200}
            priority
            className="drop-shadow-[0_0_25px_rgba(0,200,255,0.55)]"
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Impulsá tus ventas con IA conversacional
        </h1>
        <p className="max-w-2xl text-lg text-white/80">
          Bandeja unificada, automatizaciones y reportes en tiempo real.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/dashboard"
            className="rounded-xl bg-cyan-500 px-5 py-3 font-medium text-white hover:bg-cyan-400"
          >
            Ir al panel
          </a>
          <a
            href="/clientes"
            className="rounded-xl border border-white/20 px-5 py-3 font-medium text-white/90 hover:bg-white/10"
          >
            Ver clientes
          </a>
        </div>
      </section>
    </main>
  );
}
