'use client';

import { useEffect } from 'react';

const LS_KEY = 'brand.color';
const CK_KEY = 'brand_color';
const DEFAULT_COLOR = '#22d3ee'; // cian (podés cambiarlo luego)

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[-.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)')
  );
  return m ? decodeURIComponent(m[1]) : null;
}

function setCssVar(color: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('--brand', color);
  // opcionales derivados (tonos)
  document.documentElement.style.setProperty('--brand-10', color + '1A'); // ~10% alpha
  document.documentElement.style.setProperty('--brand-20', color + '33'); // ~20% alpha
}

export default function BrandTheme() {
  useEffect(() => {
    // inicial: localStorage -> cookie -> default
    let color: string | null = null;
    try {
      color = localStorage.getItem(LS_KEY);
    } catch {}
    if (!color) color = getCookie(CK_KEY);
    setCssVar(color || DEFAULT_COLOR);

    // escuchar cambios entre pestañas
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) {
        setCssVar(e.newValue || DEFAULT_COLOR);
      }
    };
    window.addEventListener('storage', onStorage);

    // revalidar al volver a la pestaña (puede venir de cookie)
    const onVis = () => {
      if (document.visibilityState === 'visible') {
        try {
          const ls = localStorage.getItem(LS_KEY);
          setCssVar(ls || getCookie(CK_KEY) || DEFAULT_COLOR);
        } catch {
          setCssVar(getCookie(CK_KEY) || DEFAULT_COLOR);
        }
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return null; // solo efectos; no renderiza UI
}
