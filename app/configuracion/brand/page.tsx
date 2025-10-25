'use client';

import { useEffect, useState } from 'react';

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[-.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)')
  );
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

const LS_KEY = 'brand.logoUrl';
const CK_KEY = 'brand_logo';

// Config de validación
const MAX_MB = 2; // tamaño máx. 2MB
const ALLOWED = ['image/png', 'image/jpeg']; // PNG o JPG

export default function BrandPage() {
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  // Cargar logo al montar
  useEffect(() => {
    try {
      const ls = localStorage.getItem(LS_KEY);
      if (ls) {
        setCurrentLogo(ls);
        return;
      }
    } catch {}
    const ck = getCookie(CK_KEY);
    if (ck) setCurrentLogo(ck);
  }, []);

  function validate(file: File) {
    if (!ALLOWED.includes(file.type)) {
      throw new Error('Formato no permitido. Solo PNG o JPG.');
    }
    const maxBytes = MAX_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error(`El archivo supera ${MAX_MB}MB.`);
    }
  }

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    setOkMsg(null);
    try {
      validate(file);

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
        throw new Error(data?.message || 'No se pudo subir el archivo a S3.');
      }

      // Persistencia
      try { localStorage.setItem(LS_KEY, data.url); } catch {}
      setCookie(CK_KEY, data.url);

      setCurrentLogo(data.url);

      // Avisar a otros tabs/componentes
      try {
        window.dispatchEvent(
          new StorageEvent('storage', { key: LS_KEY, newValue: data.url })
        );
      } catch {}

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

  function removeLogo() {
    setError(null);
    setOkMsg(null);
    try { localStorage.removeItem(LS_KEY); } catch {}
    deleteCookie(CK_KEY);
    setCurrentLogo(null);
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: LS_KEY, newValue: null }));
    } catch {}
    setOkMsg('Logo eliminado.');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Configuración de Marca</h1>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Logo actual</h2>

          <button
            onClick={removeLogo}
            disabled={busy || !currentLogo}
            className="text-sm px-3 py-1.5 rounded-md border border-slate-600 hover:bg-slate-700 disabled:opacity-50"
            title="Eliminar logo"
          >
            Eliminar logo
          </button>
        </div>

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
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={onInputChange}
              disabled={busy}
            />
          </label>
          <p className="mt-2 text-xs text-slate-400">
            Máx. {MAX_MB}MB. Formatos permitidos: PNG o JPG.
          </p>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Sugerencia: 512×512 px, PNG con fondo transparente.
        </p>

        {busy && <p className="mt-4 text-slate-300">Subiendo…</p>}
        {okMsg && <p className="mt-4 text-green-400">{okMsg}</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>
    </div>
  );
}
