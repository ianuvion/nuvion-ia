export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-950 to-black text-white flex flex-col items-center justify-center px-6 text-center">
      <img
        src="/icon.png"
        alt="Nuvion IA Logo"
        className="w-20 h-20 mb-6"
      />
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Nuvion IA
      </h1>
      <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mb-8">
        Impulsá tus ventas con inteligencia artificial conversacional.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
        >
          Ir al panel
        </a>
        <a
          href="/clientes"
          className="bg-transparent border border-blue-500 hover:bg-blue-800 text-blue-200 font-semibold py-3 px-6 rounded-lg transition"
        >
          Ver clientes
        </a>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
        <div className="bg-blue-950/40 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Bandeja unificada</h3>
          <p className="text-sm text-blue-200">
            Centralizá tus conversaciones de WhatsApp, Instagram y Facebook en un solo lugar.
          </p>
        </div>
        <div className="bg-blue-950/40 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Automatizaciones</h3>
          <p className="text-sm text-blue-200">
            Configurá flujos automáticos de atención, venta y seguimiento.
          </p>
        </div>
        <div className="bg-blue-950/40 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Reportes</h3>
          <p className="text-sm text-blue-200">
            Analizá el rendimiento de tu negocio en tiempo real con IA.
          </p>
        </div>
      </section>

      <footer className="mt-20 text-blue-300 text-sm opacity-75">
        © {new Date().getFullYear()} Nuvion IA. Todos los derechos reservados.
      </footer>
    </main>
  );
}
