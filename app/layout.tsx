export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

// ⬇️ Carga el Navbar solo en el cliente (sin SSR)
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Dashboard Nuvion IA",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
