'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBrandLogoUrl, setBrandLogoUrl, clearBrandLogo } from '../../lib/brand';

export default function ConfiguracionGeneral() {
  const [currentLogo, setCurrentLogo] = useState('/icon.png');
  const [message, setMessage] = useState('');

  // 🔹 Cuando la página carga, obtiene el logo guardado (si hay)
  useEffect(() => {
    const logo = getBrandLogoUrl();
    setCurrentLogo(logo);
  }, []);

  // 🔹 Cuando el usuario elige un archivo
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Subida del archivo a tu API
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: file,
      headers: {
        'x-filename': file.name,
      },
    });

    const data = await res.json();

    if (!res.ok || !data?.url) {
      setMessage('❌ Error al subir el logo.');
      return;
    }

    // 🔹 Guarda el logo en el navegador y actualiza el Navbar automáticamente
    setBrandLogoUrl(data.url);
    setCurrentLogo(data.url);
    setMessage('✅ Logo actualizado con éxito.');
  }

  // 🔹 Volver al logo por defecto
  function handleReset() {
    clearBrandLogo();
    setCurrentLogo('/icon.png');
    setMessage('🔄 Logo restaurado al valor por defecto.');
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold text-white">Configuración General</h1>

      {/* Vista previa del logo actual */}
      <div className="flex items-center gap-4">
        <Image
          src={currentLogo}
          alt="Logo actual"
          width={64}
          height={64}
          className="rounded-md border border-neutral-700"
          unoptimized
        />
        <div className="text-sm text-gray-400 break-all">
          <p>Logo en uso:</p>
          <p>{currentLogo}</p>
        </div>
      </div>

      {/* Subir nuevo logo */}
      <div className="space-y-3">
        <label className="text-gray-300 text-sm font-medium">
          Subí un nuevo logo (PNG, JPG o SVG – máx. 2 MB)
        </label>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 border border-gray-600 rounded-md p-2 cursor-pointer bg-gray-800 hover:bg-gray-700"
        />
      </div>

      {/* Mensaje de estado */}
      {message && (
        <p className="text-sm text-emerald-400 font-medium">{message}</p>
      )}

      {/* Botón para restaurar */}
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm rounded-md"
      >
        Usar logo por defecto
      </button>
    </div>
  );
}
