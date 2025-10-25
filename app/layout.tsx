// app/layout.tsx

// 🔒 Fuerza rendering dinámico en todo el árbol (evita SSG/ISR y timeouts de build)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Nuvion IA',
  description: 'Plataforma de automatización con IA',
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
