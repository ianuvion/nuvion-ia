// app/contacto/page.tsx
import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b2340] to-[#081a2f] text-white">
      <section className="max-w-3xl mx-auto px-4 pt-20 pb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">Agendá una demo</h1>
        <p className="mt-3 text-slate-200/90">
          Contanos sobre tu negocio y te configuramos Nuvion IA para probarlo en minutos.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl p-6 bg-white/5 border border-white/10">
          <a
            href="https://wa.me/541161517912?text=Hola%20quiero%20una%20demo%20de%20Nuvion%20IA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
          >
            Hablar por WhatsApp
          </a>

          <a
            href="mailto:ianuvion@gmail.com?subject=Demo%20Nuvion%20IA&body=Contame%20sobre%20tu%20negocio..."
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-slate-500/60 hover:bg-slate-800/40 transition"
          >
            Enviar email
          </a>
        </div>

        <div className="mt-6 text-slate-300/80">
          <Link href="/" className="hover:text-white">← Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}
