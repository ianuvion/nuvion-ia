import Link from "next/link";

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition"
    >
      {label}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Brand + Nav */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/icon.png"
                alt="Nuvion IA"
                className="h-7 w-7 rounded-md"
              />
              <span className="font-semibold tracking-tight">Nuvion IA</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              <NavLink href="/dashboard" label="Inicio" />
              <NavLink href="/clientes" label="Clientes" />
              <NavLink href="/reportes" label="Reportes" />
              <NavLink href="/configuracion" label="Configuración" />
              <NavLink href="/contacto" label="Contacto" />
            </nav>
          </div>

          {/* Actions (derecha) */}
          <div className="flex items-center gap-2">
            <Link
              href="/logout"
              className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-sm hover:bg-white/10 transition"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
