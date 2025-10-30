"use client";

import Image from "next/image";

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/icon.png"        // logo metálico de Nuvion IA en /public
        alt="Nuvion IA"
        width={32}
        height={32}
        priority
      />
      <span className="font-semibold tracking-wide text-sm">Nuvion IA</span>
    </div>
  );
}
