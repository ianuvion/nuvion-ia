'use client';

import { useEffect, useRef, useState } from 'react';

type UploadState = 'idle' | 'uploading' | 'done' | 'error';

export default function LogoUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadState>('idle');
  const [message, setMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cargar el logo guardado si existe (usado por el Navbar)
  useEffect(() => {
    const saved = localStorage.getItem('nuvion_logo_url');
    if (saved) setPreview(saved);
  }, []);

  // Validaciones
  const MAX_MB = 2;
  const ALLOWED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

  function validate(file: File) {
    if (!ALLOWED.includes(file.type)) {
      throw new Error('Formato inválido. Usa PNG, JPG, WEBP o SVG.');
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      throw new Error(`Archivo muy grande. Máximo ${MAX_MB}MB.`);
    }
  }

  async function uploadFile(file: File) {
    validate(file);
    setStatus('uploading');
    setMessage('Subiendo logo…');

    // Usamos FormData -> el endpoint /api/upload acepta FormData y binario
    const form = new FormData();
    form.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    if (!res.ok || !data?.ok || !data?.url) {
      throw new Error(data?.message || 'Error al subir el logo');
    }

    // Guardamos la URL para que el Navbar la tome automáticamente
    localStorage.setItem('nuvion_logo_url', data.url);
    setPreview(data.url);
    setStatus('done');
    setMessage('Logo actualizado con éxito ✅');
  }

  async function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadFile(file);
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Error al subir');
    } finally {
      // limpiar input para permitir re-subir el mismo nombre si hace falta
      e.currentTarget.value = '';
    }
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    (async () => {
      try {
        await uploadFile(file);
      } catch (err: any) {
        setStatus('error');
        setMessage(err?.message || 'Error al subir');
      }
    })();
  }

  function onDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function clearLogo() {
    localStorage.removeItem('nuvion_logo_url');
    setPreview(null);
    setStatus('idle');
    setMessage('Logo restablecido. Se usará /icon.png por defecto.');
  }

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-white">Marca · Logo</h1>
        <p className="text-slate-300">
          Subí un logo cuadrado (recomendado 256×256). Formatos: PNG, JPG, WEBP o SVG (máx. {MAX_MB}MB).
        </p>
      </header>

      {/* Vista previa */}
      <div className="flex items-center gap-5">
        <div className="size-16 rounded-lg ring-1 ring-white/10 overflow-hidden bg-slate-700/40 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {preview ? (
            <img src={preview} alt="Logo actual" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-slate-300">Sin logo</span>
          )}
        </div>
        <div className="text-sm text-slate-300">
          <div className="font-medium text-slate-100">{preview ? 'Logo en uso' : 'Logo por defecto'}</div>
          <div className="truncate max-w-[520px] text-slate-400">{preview ?? '/icon.png'}</div>
        </div>
      </div>

      {/* Zona de subida */}
      <label
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="block cursor-pointer rounded-xl border border-dashed border-slate-600/60 bg-slate-800/40 p-6 text-center hover:bg-slate-800/60 transition"
      >
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED.join(',')}
          className="hidden"
          onChange={onInputChange}
        />
        <div className="space-y-2">
          <div className="text-slate-100 font-medium">Arrastrá tu logo aquí o hacé clic para elegir</div>
          <div className="text-xs text-slate-400">Se subirá a tu S3 y el Navbar se actualizará automáticamente.</div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={openPicker}
            disabled={status === 'uploading'}
            className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white text-sm disabled:opacity-60"
          >
            {status === 'uploading' ? 'Subiendo…' : 'Elegir archivo'}
          </button>
        </div>
      </label>

      {/* Acciones / estado */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={clearLogo}
          className="rounded-lg border border-slate-600/60 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700/50"
        >
          Usar logo por defecto
        </button>

        {status === 'uploading' && <span className="text-sm text-sky-300">Subiendo…</span>}
        {status === 'done' && <span className="text-sm text-emerald-300">{message}</span>}
        {status === 'error' && <span className="text-sm text-rose-300">{message}</span>}
        {status === 'idle' && message && <span className="text-sm text-slate-300">{message}</span>}
      </div>
    </section>
  );
}
