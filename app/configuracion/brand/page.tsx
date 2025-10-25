'use client';

import { useState } from 'react';

export default function BrandPage() {
  const [currentLogo, setCurrentLogo] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('brand.logoUrl') : null
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    setOkMsg(null);
    try {
      // enviamos binario en el body y el nombre por header
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': file.name,
          'content-type': file.type || 'application/octet-stream',
        },
        body: await file.arrayBuffer(),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(
          data?.message || 'No se pudo subir el archivo a S3 (revisá las credenciales/política).'
        );
      }

      // Guardamos en localStorage para que persista entre recargas
      localStorage.setItem('brand.logoUrl', data.url);
      setCurrentLogo(data.url);

      // Notificamos a otros componentes (Navbar) que cambió el logo
      window.dispatchEvent(new StorageEvent('storage', { key: 'brand.logoUrl', newValue: data.url }));

      setOkMsg('¡Logo actualizado!');
    } catch (e: any) {
      setError(e?.message || 'Error al subir');
    } finally {
      setBusy(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.currentTarget.value = '';
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Configuración de Marca</h1>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">Logo actual</h2>

        <div className="mb-6">
          <div className="w-40 h-40 bg-slate-900 border border-slate-700 rounded-lg grid place-items-center overflow-hidden">
            {currentLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentLogo} alt="Logo actual" className="max-w-full max-h-full object-contain" />
            ) : (
              <span className="text-slate-400 text-sm">Sin logo</span>
            )}
          </div>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center"
        >
          <p className="mb-2">Arrastrá y soltá tu imagen aquí (PNG/JPG)</p>
          <label className="inline-block px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 cursor-pointer">
            elegila desde tu equipo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
              disabled={busy}
            />
          </label>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Sugerencia: 512×512 px, formato PNG con fondo transparente.
        </p>

        {busy && <p className="mt-4 text-slate-300">Subiendo…</p>}
        {okMsg && <p className="mt-4 text-green-400">{okMsg}</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    </div>
  );
}
