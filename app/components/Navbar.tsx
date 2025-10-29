'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import ThemeSwitcher from './ThemeSwitcher'

/**
 * Navbar con links públicos y link "Configuración" sólo visible para admin.
 * Admin se detecta por cookie `admin=1`.
 */
export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const c = document.cookie
      .split(';')
      .map((v) => v.trim())
      .find((v) => v.startsWith('admin='))
    setIsAdmin(c === 'admin=1')
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo className="h-7 w-7" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">Nuvion IA</span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">Inicio</Link>
          <Link href="/dashboard" className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">Dashboard</Link>
          <Link href="/clientes" className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">Clientes</Link>
          <Link href="/reportes" className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">Reportes</Link>
          <Link href="/contacto" className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">Contacto</Link>
          {isAdmin && (
            <Link href="/configuracion" className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
              Configuración
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
