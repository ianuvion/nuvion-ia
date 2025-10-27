'use client';

import ThemeSwitcher from '@/app/components/ThemeSwitcher';

export default function AparienciaPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Configuración de Apariencia</h1>
      <ThemeSwitcher />
    </main>
  );
}
