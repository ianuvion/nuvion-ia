// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Dashboard y herramientas de Nuvion IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* NAVBAR global con logo metálico */}
        <Navbar />

        {/* Contenido principal de cada página */}
        <main>{children}</main>
      </body>
    </html>
  );
}
