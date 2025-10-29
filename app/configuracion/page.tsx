import LogoPicker from '../components/LogoPicker';
import LogoImage from '../components/LogoImage';

export default function ConfiguracionPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Configuración general</h1>

      {/* Logo local */}
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="mb-4 text-xl font-semibold">Logo de la plataforma (local)</h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Subí un logo desde tu computadora. Se guardará localmente en este navegador.
        </p>
        <LogoPicker />
      </section>

      {/* Logo global */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="mb-4 text-xl font-semibold">Logo global (GitHub)</h2>
        <div className="flex items-center gap-16">
          <LogoImage className="h-20 w-20 rounded-xl shadow" />
          <div className="text-sm leading-6 text-slate-700 dark:text-slate-300">
            <p className="mb-3">
              Para cambiar el logo global, reemplazá el archivo{' '}
              <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-900">/public/icon.png</code>{' '}
              en GitHub (recomendado PNG 512×512).
            </p>
            <a
              href="https://github.com/ianuvion/nuvion-ia/tree/main/public"
              target="_blank"
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Abrir carpeta /public en GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
