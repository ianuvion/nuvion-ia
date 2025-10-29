'use client';

import React from 'react';

const KEY = 'nuvion_logo_dataurl';

export default function LogoPicker() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<string>('');

  React.useEffect(() => {
    try {
      setPreview(localStorage.getItem(KEY));
    } catch {}
  }, []);

  const onFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setMsg('Por favor subí una imagen válida (PNG/JPG).');
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setMsg('El archivo supera 1.5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      try {
        localStorage.setItem(KEY, dataUrl);
        setPreview(dataUrl);
        setMsg('Logo guardado localmente ✔');
      } catch {
        setMsg('No se pudo guardar el logo.');
      }
    };
    reader.readAsDataURL(file);
  };

  const clear = () => {
    localStorage.removeItem(KEY);
    setPreview(null);
    setMsg('Logo restaurado al original.');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <img
          src={preview || '/icon.png'}
          alt="Logo actual"
          className="h-20 w-20 rounded-xl shadow ring-1 ring-black/5"
        />
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <p className="mb-2">Subí una imagen (PNG 512×512 recomendado).</p>
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Elegir archivo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                }}
              />
            </label>
            <button
              onClick={clear}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900/40"
            >
              Restaurar original
            </button>
          </div>
          {msg && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{msg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
