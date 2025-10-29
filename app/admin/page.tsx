'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Pantalla sencilla para entrar como admin con PIN.
 * Settea cookie `admin=1` por 8 horas.
 * Cambiá el PIN acá o en .env como NEXT_PUBLIC_ADMIN_PIN.
 */
export default function AdminPage() {
  const [pin, setPin] = useState('')
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get('next') || '/configuracion'

  const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '123456' // <- cambiá si querés

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      document.cookie = `admin=1; path=/; max-age=${60 * 60 * 8}; SameSite=Lax`
      router.push(next)
    } else {
      alert('PIN incorrecto')
    }
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-16">
      <h1 className="mb-4 text-2xl font-semibold">Acceso administrador</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Ingresá tu PIN"
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
