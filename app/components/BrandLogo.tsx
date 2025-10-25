'use client';

import { useEffect, useState } from 'react';

const LS_KEY = 'brand.logoUrl';
const CK_KEY = 'brand_logo';

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[-.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)')
  );
  return m ? decodeURIComponent(m[1]) : null;
}

/**
 * Muestra el logo actual (persistido en localStorage/cookie) y se actualiza
 * en vivo cuando se cambia desde la pantalla de Brand.
 */
export default function BrandLogo({
  defaultSrc = '/logo.svg',
  alt = 'Nuvion IA',
  className = 'h-8 w-auto object-contain',
}: {
  defaultSrc?: string;
  alt?: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string>(defaultSrc);

  // Inicializa desde localStorage/cookie y se suscribe a cambios
  useEffect(() => {
    // Estado inicial
    let v: string | null = null;
    try {
      v = localStorage.getItem(LS_KEY);
    } catch {}
    if (!v) v = getCookie(CK_KEY);
    setSrc(v || defaultSrc);

    // Escucha de cambios entre pestañas (storage)
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) {
        const nv = e.newValue || '';
        setSrc(nv || defaultSrc);
      }
    };
    window.addEventListener('storage', onStorage);

    // Revalidar al volver a la pestaña (puede haber cambiado cookie)
    const onVis = () => {
      if (document.visibilityState === 'visible') {
        const ck = getCookie(CK_KEY);
        try {
          const ls = localStorage.getItem(LS_KEY);
          setSrc((ck || ls || defaultSrc) as string);
        } catch {
          setSrc(ck || defaultSrc);
        }
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [defaultSrc]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
