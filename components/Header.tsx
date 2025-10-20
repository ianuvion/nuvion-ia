"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const nav = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/clientes", label: "Clientes" },
  { href: "/tareas", label: "Tareas" },
  { href: "/configuracion", label: "Configuración" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gray-900" />
          <span className="text-sm font-semibold tracking-wide">Nuvion IA</span>
        </Link>
        <nav className="flex items-center gap-2">
          <SignedIn>
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "rounded-md px-3 py-2 text-sm font-medium transition",
                        active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>
        </nav>
        <div className="flex items-center gap-2">
          <SignedIn>
            <UserButton appearance={{ elements: { userButtonTrigger: "rounded-md border" } }} afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Iniciar sesión
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
