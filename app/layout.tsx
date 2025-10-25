// app/layout.tsx

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import React from 'react';

export const metadata: Metadata = {
  title: 'Nuvion IA',
  description: 'Dashboard y herramientas de Nuvion IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-900 text-slate-100 min-h-screen">
        {/* ✅ Navbar visible en todo el sitio */}
        <Navbar />

        {/* ✅ Contenido principal (cada página) */}
        <div className="pt-16 px-4">{children}</div>
      </body>
    </html>
  );
}
