'use client';

import { useEffect, useState, useCallback } from 'react';

const DEFAULT_LOGO = '/logo.svg'; // Si tenés otro logo por defecto en /public, cambialo acá

type UploadState =
  | { status: 'idle' }
  | { status: 'uploading'; filename: string }
  | { status: 'success'; url: string }
  | { status: 'error'; message: string };

export default function BrandPage() {
  const [currentLogo, setCurrentLogo] = useState<string>(DEFAULT_LOGO);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<UploadState>({ status: 'idle' });

  // Cargar logo guardado si existe
  useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('brandLogoUrl')
      : null;
    if (saved) setCurrentLogo(saved);
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    try {
      setState({ status: 'uploading', filename: file.name });

      const buffer = await file.arrayBuffer();
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'x-filename': file.name,
        },
        body: new Uint8Array(buffer),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        throw new Error(
          data?.message || 'No se pudo subir el archivo. Intenta nuevamente.'
        );
      }

      // Guardar y notificar al Navbar
      localStorage.setItem('brandLogoUrl', data.url);
      window.dispatchEvent(new Event('brandLogoUpdated'));

      setPreview(null);
      setCurrentLogo(data.url);
      setState({ status: 'success', url: data.url });
    } catch (err: any) {
      setState({
        status: 'error',
        message: err?.message || 'Error inesperado al subir el archivo',
      });
    }
  }, []);

  const onFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    await uploadFile(file);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    await uploadFile(file);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-white">Configuración de Marca</h1>

      <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-3 text-lg font-medium text-slate-200">Logo actual</h2>
        <div className="flex items-center gap-4">
          <img
            src={preview || currentLogo}
            alt="Logo actual"
            className="h-16 w-auto rounded-md border border-slate-800 bg-slate-800 object-contain p-2"
          />
          {state.status === 'uploading' && (
            <span className="text-sm text-slate-400">
              Subiendo <b>{state.filename}</b>…
            </span>
          )}
          {state.status === 'success' && (
            <span className="text-sm text-emerald-400">¡Logo actualizado!</span>
          )}
          {state.status === 'error' && (
            <span className="text-sm text-rose-400">{state.message}</span>
          )}
        </div>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="mt-6 rounded-md border-2 border-dashed border-slate-700 p-6 text-center text-slate-300 hover:border-slate-500"
        >
          Arrastrá y soltá tu imagen aquí (PNG/JPG) o
          <label className="ml-2 inline-block cursor-pointer text-sky-400 hover:underline">
            elegila desde tu equipo
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={onFileInput}
            />
          </label>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Sugerencia: 512×512 px, formato PNG con fondo transparente.
        </p>
      </section>
    </main>
  );
}
