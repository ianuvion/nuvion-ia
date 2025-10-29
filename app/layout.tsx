import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./providers/ThemeProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Plataforma de inteligencia artificial conversacional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
        <ThemeProvider>
          {/* NAVBAR */}
          <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <img src="/icon.png" alt="Nuvion IA" className="h-8 w-8" />
                <span className="font-semibold text-lg">Nuvion IA</span>
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="/">Inicio</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/clientes">Clientes</Link>
                <Link href="/reportes">Reportes</Link>
                <Link href="/contacto">Contacto</Link>
                <Link href="/configuracion">Configuración</Link>
              </div>
            </nav>
          </header>

          {/* CONTENIDO PRINCIPAL */}
          <main className="pb-16">{children}</main>

          {/* FOOTER */}
          <footer className="fixed bottom-0 left-0 w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl flex justify-center gap-6 py-2 text-sm">
              <Link href="/" className="hover:text-blue-600">Inicio</Link>
              <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link href="/clientes" className="hover:text-blue-600">Clientes</Link>
              <Link href="/configuracion" className="hover:text-blue-600">Configuración</Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
