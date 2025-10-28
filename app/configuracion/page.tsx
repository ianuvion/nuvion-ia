import Link from "next/link";

export const metadata = { title: "Configuración — General" };

export default function ConfigGeneralPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Configuración</h1>
        <div className="flex gap-2">
          <Link href="/dashboard" className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">
            ← Volver al Dashboard
          </Link>
          <Link href="/" className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">Inicio</Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <span className="rounded-lg border bg-slate-100 px-3 py-1.5 dark:bg-slate-800">General</span>
        <Link href="/configuracion/apariencia" className="rounded-lg border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">
          Apariencia
        </Link>
      </div>

      {/* Bloque LOGO */}
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-2">Logo</h2>
        <p className="text-sm text-slate-500 mb-4">
          Cargá el logo que se muestra en la cabecera y la página de inicio.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/configuracion/apariencia"
            className="rounded-lg px-3 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          >
            Ir a Apariencia (colores/tema)
          </Link>
          <Link
            href="/contacto"
            className="rounded-lg border px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Cambiar logo (enviar archivo)
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          * Si preferís, pasame el PNG/SVG y yo te lo ubico en <code>/public/icon.png</code>.
        </p>
      </section>
    </main>
  );
}
