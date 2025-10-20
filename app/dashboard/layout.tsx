import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";

export const metadata = {
  title: "Dashboard | Nuvion IA",
  description: "Panel de control — Nuvion IA",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        {/* Barra superior */}
        <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
          <div className="flex items-center gap-3">
            {/* LOGO NUVION */}
            <Link href="/">
              <Image
                src="/icon.png"
                alt="Nuvion IA"
                width={36}
                height={36}
                className="rounded-xl"
              />
            </Link>
            <h1 className="text-lg font-semibold text-[#0A2342]">Nuvion IA</h1>
          </div>

          {/* Botón ejemplo lado derecho */}
          <div>
            <button className="bg-[#0A2342] text-white px-4 py-1.5 rounded-xl hover:bg-[#133b70] transition">
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
