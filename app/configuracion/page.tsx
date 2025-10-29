import LogoPicker from '../components/LogoPicker';
import LogoImage from '../components/LogoImage';

export default function ConfigGeneralPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
        Configuración
      </h1>

      {/* Logo local */}
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Logo de la plataforma (local)
        </h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Subí un logo desde tu computadora. Se guardará solo en este navegador.
          Para cambiarlo globalmente para todos, usá la opción de GitHub abajo.
        </p>

        {/* Componente de subida local */}
        <LogoPicker />
      </section>

      {/* Logo global */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Logo global (GitHub)
        </h2>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Vista previa del logo actual */}
          <div className="flex flex-col items-center">
            <LogoImage className="h-20 w-20 rounded-xl shadow" />
            <p className="mt-2 text-xs text-slate-500">/public/icon.png</p>
          </div>

          {/* Instrucciones GitHub */}
          <div className="max-w-xl text-sm leading-6 text-slate-700 dark:text-slate-300">
            <p className="mb-3">
              Para cambiar el logo global, reemplazá el archivo{' '}
              <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-900">
                /public/icon.png
              </code>{' '}
              en GitHub (PNG cuadrado, recomendado 512×512).
            </p>

            <a
              href="https://github.com/ianuvion/nuvion-ia/tree/main/public"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Abrir carpeta /public en GitHub
            </a>

            <ul className="mt-3 list-disc pl-5 text-xs text-slate-500 dark:text-slate-400">
              <li>“Add file” → “Upload files”</li>
              <li>Subí tu imagen como <strong>icon.png</strong> (reemplaza la existente)</li>
              <li>“Commit changes” → Vercel hace el deploy automáticamente</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
