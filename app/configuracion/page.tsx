export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link'
import LogoUploader from '../components/LogoUploader'
import BrandLogo from '../components/BrandLogo'

/**
 * Página principal de Configuración (pestaña "General").
 * Sección técnica (GitHub) sólo visible para admin via flag.
 * Para clientes, queda sólo el uploader local (opcional).
 *
 * Si vas a entregar a cliente final, dejá IS_ADMIN = false.
 * Cuando trabajes vos, poné IS_ADMIN = true.
 */
const IS_ADMIN = true

export default function ConfigGeneralPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Configuración</h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="btn btn-secondary">
            ← Volver al Dashboard
          </Link>
          <Link href="/" className="btn btn-secondary">Inicio</Link>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <Link href="/configuracion" className="btn btn-secondary">General</Link>
        <Link href="/configuracion/apariencia" className="btn btn-secondary">Apariencia</Link>
      </div>

      {/* LOGO LOCAL (opcional – sólo afecta a este navegador) */}
      <section className="card mb-8 p-6 rounded-2xl">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Logo de la plataforma (local)</h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Subí un logo desde tu computadora. Se guardará sólo en este navegador para vista previa.
          Para cambiarlo globalmente para todos los usuarios, usá la opción de GitHub (sólo admin).
        </p>
        <LogoUploader />
      </section>

      {/* LOGO GLOBAL (sólo Admin) */}
      {IS_ADMIN && (
        <section className="card p-6 rounded-2xl">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Logo global (GitHub)</h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="flex min-w-[140px] flex-col items-center">
              <div className="rounded-xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
                <BrandLogo className="h-20 w-20" />
              </div>
              <p className="mt-2 text-xs text-slate-500">/public/icon.png</p>
            </div>

            <div className="max-w-xl text-sm leading-6 text-slate-700 dark:text-slate-300">
              <p className="mb-3">
                Para cambiar el logo global (que ven todos), reemplazá el archivo{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-900">/public/icon.png</code>{' '}
                en GitHub. PNG cuadrado recomendado 512×512.
              </p>
              <a
                href="https://github.com/ianuvion/nuvion-ia/tree/main/public"
                target="_blank"
                className="btn btn-primary"
              >
                Abrir carpeta /public en GitHub
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
