export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar"; // ← import directo, sin next/dynamic

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
