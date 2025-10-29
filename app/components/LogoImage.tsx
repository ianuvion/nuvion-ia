'use client';

import React from 'react';

const KEY = 'nuvion_logo_dataurl';

export default function LogoImage({
  className = 'h-8 w-8 rounded-md',
  alt = 'Nuvion IA',
}: {
  className?: string;
  alt?: string;
}) {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      setSrc(stored || '/icon.png');
    } catch {
      setSrc('/icon.png');
    }

    // sincroniza entre pestañas
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSrc(e.newValue || '/icon.png');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!src) return null;
  return <img src={src} alt={alt} className={className} />;
}
