'use client';

import React from 'react';

const STORAGE_KEY = 'nuvion_logo_dataurl';

export default function LogoPicker() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setPreview(stored);
    } catch {
      //
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setMessage('Subí una imagen PNG o JPG.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      try {
        localStorage.setItem(STORAGE_KEY, dataUrl);
        setPreview(dataUrl);
        setMessage('✅ Logo guardado localmente.');
      } catch {
        setMessage('Error al guardar. Revisá permisos del navegador.');
      }
    };
    reader.readAsDataURL(file);
  };

  const restoreDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPreview(null);
    setMessage('Logo restaurado al original.');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={preview || '/icon.png'}
          alt="Logo actual"
          className="h-20 w-20 rounded-xl shadow ring-1 ring-black/5"
        />
        <div className="text-sm text-slate-700 dark:text-slate-300">
          <p className="mb-2">Subí una imagen (recomendado PNG 512×512)</p>
          <div className="flex gap-3">
            <label className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Elegir archivo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
            </label>
            <button
              onClick={restoreDefault}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/40"
            >
              Restaurar original
            </button>
          </div>
          {message && <p className="mt-2 text-xs text-slate-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
