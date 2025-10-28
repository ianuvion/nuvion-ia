export default function InicioPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Bienvenido a Nuvion IA</h1>
        <p className="opacity-80">
          Elegí una sección del menú para continuar o volvé al Dashboard.
        </p>
      </section>

      <div className="flex gap-3">
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
        >
          Ir al Dashboard
        </a>
        <a
          href="/reportes"
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
        >
          Ver Reportes
        </a>
        <a
          href="/clientes"
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
        >
          Clientes
        </a>
        <a
          href="/configuracion"
          className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
        >
          Configuración
        </a>
      </div>
    </main>
  );
}
