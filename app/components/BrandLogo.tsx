"use client";

import Link from "next/link";
import Image from "next/image";

export default function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 select-none">
      {/* Aro/halo metálico + contenedor */}
      <div className="relative grid h-8 w-8 place-items-center rounded-xl
                      bg-gradient-to-b from-sky-300/25 to-indigo-900/20
                      p-0.5 ring-1 ring-white/15 shadow-md
                      transition group-hover:shadow-lg">

        {/* Placa interior (mejora contraste del PNG) */}
        <div className="flex h-full w-full items-center justify-center rounded-xl
                        bg-slate-900/30 ring-1 ring-black/30">
          <Image
            src="/icon.png"         // tu logo actual
            alt="Nuvion IA"
            width={22}
            height={22}
            className="rounded-lg"
            priority
          />
        </div>

        {/* Brillo suave en hover */}
        <span className="pointer-events-none absolute -inset-1 rounded-2xl
                         bg-gradient-to-r from-white/10 via-white/0 to-white/10
                         opacity-0 blur transition group-hover:opacity-40" />
      </div>

      {/* Texto de marca */}
      <span className="text-sm font-semibold tracking-tight text-slate-100">
        Nuvion IA
      </span>
    </Link>
  );
}
