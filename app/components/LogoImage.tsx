'use client';

import React from 'react';

const STORAGE_KEY = 'nuvion_logo_dataurl';

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
      const stored = localStorage.getItem(STORAGE_KEY);
      setSrc(stored || '/icon.png');
    } catch {
      setSrc('/icon.png');
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setSrc(e.newValue || '/icon.png');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!src) return null;
  return <img src={src} alt={alt} className={className} />;
}
