'use client';

import { useState, useRef } from 'react';

type Props = {
  onCompleted?: (url: string) => void;
};

export default function LogoUploader({ onCompleted }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleUpload(file: File) {
    setError(null);
    setUploading(true);
    setFileName(file.name);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': file.name,
          // No poner Content-Type manual en multipart: el browser lo arma
        },
        body: file,
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || 'Error al subir');
      }

      const link = data.url as string;
      setUrl(link);

      // Guardamos para que el Navbar lo use
      localStorage.setItem('nuvion_logo_url', link);

      onCompleted?.(link);
    } catch (e: any) {
      setError(e?.message || 'Error inesperado');
    } finally {
      setUploading(false);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleUpload(f);
  }

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4">
      <h3 className="text-slate-100 font-semibold mb-2">Subir nuevo logo</h3>
      <p className="text-sm text-slate-300/80 mb-3">
        Formatos permitidos: PNG / JPG / SVG — tamaño recomendado 256×256.
      </p>

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white text-sm disabled:opacity-60"
        >
          {uploading ? 'Subiendo…' : 'Elegir archivo'}
        </button>

        {fileName && !uploading && (
          <span className="text-slate-200 text-sm">{fileName}</span>
        )}
      </div>

      {error && (
        <p className="mt-3 text-red-300 text-sm">
          {error}
        </p>
      )}

      {url && (
        <div className="mt-4">
          <p className="text-sm text-emerald-300">¡Logo subido!</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-sky-300 underline break-all"
          >
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
