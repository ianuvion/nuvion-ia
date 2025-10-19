import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Topbar */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">N</div>
            <div className="leading-tight">
              <div className="font-semibold">NUVION IA</div>
              <div className="text-xs text-gray-500">Panel de implementación</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">Beta</div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside>
          <nav className="sticky top-20 flex flex-col gap-1">
            {[
              { label: "Inicio", href: "/dashboard" },
      { label: "Clientes", href: "/clientes" },
      { label: "Agentes IA", href: "#" },
      { label: "Plantillas", href: "#" },
      { label: "Flujos", href: "#" },
      { label: "Integraciones", href: "#" },
      { label: "Configuración", href: "#" },
    ].map((item, i) => (
      <Link
        key={item.label}
        href={item.href}
        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-gray-100 ${
          i === 0
            ? "bg-gray-900 text-white hover:bg-gray-900"
            : "text-gray-700"
        }`}
      >
        {item.label}
      </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <section className="flex flex-col gap-6">{children}</section>
      </main>

      <footer className="max-w-[1200px] mx-auto px-4 pb-10 text-xs text-gray-500">
        © {new Date().getFullYear()} NUVION IA — Dashboard
      </footer>
    </div>
  );
}
