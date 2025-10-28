"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Contenido principal */}
      <div className="flex-1">{children}</div>

      {/* Barra inferior */}
      <footer className="sticky bottom-0 z-20 border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            aria-current={pathname === "/dashboard" ? "page" : undefined}
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>

          {/* Acá podrías agregar más botones si querés */}
        </nav>
      </footer>
    </div>
  );
}
