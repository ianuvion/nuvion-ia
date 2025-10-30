export const dynamic = 'force-dynamic';
export const revalidate = 0;

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Dashboard Nuvion IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
