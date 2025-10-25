'use client';

import LogoUploader from '../../components/LogoUploader';

export default function BrandConfigPage() {
  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Configuración de Marca
      </h1>

      {/* Componente para subir el logo */}
      <LogoUploader />

      {/* Sección adicional para futuras configuraciones */}
      <p className="text-slate-300 mt-6">
        Podés actualizar tu logo o agregar más opciones de marca acá.
      </p>
    </main>
  );
}
