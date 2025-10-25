'use client';

import LogoUploader from '../components/LogoUploader';

export default function ConfiguracionPage() {
  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Configuración General
      </h1>

      {/* Sección de subida de logo */}
      <LogoUploader />

      {/* Podés agregar más secciones abajo (por ejemplo datos de la empresa, colores, etc.) */}
    </main>
  );
}
