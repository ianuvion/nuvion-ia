// app/layout.tsx

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';
import BrandTheme from './components/BrandTheme';

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
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          {/* Aplica variable CSS --brand (color de marca) */}
          <BrandTheme />

          {/* Barra superior */}
          <Navbar />

          {/* Contenido de cada página */}
          <div className="pt-16 px-4">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
