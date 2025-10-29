// app/configuracion/page.tsx
export default function ConfigGeneralPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="mb-4 text-xl font-semibold">Logo de la plataforma</h2>

        <div className="flex items-center gap-16">
          <div className="flex flex-col items-center">
            <img
              src="/icon.png"
              alt="Logo actual"
              className="h-20 w-20 rounded-xl shadow"
            />
            <p className="mt-2 text-xs text-slate-500">/public/icon.png</p>
          </div>

          <div className="max-w-xl text-sm leading-6 text-slate-700 dark:text-slate-300">
            <p className="mb-3">
              Para cambiar el logo, reemplazá el archivo{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                /public/icon.png
              </code>{" "}
              en GitHub (PNG cuadrado, recomendado 512×512).
            </p>
            <a
              href="https://github.com/ianuvion/nuvion-ia/tree/main/public"
              target="_blank"
              className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Abrir carpeta <code className="ml-1">/public</code> en GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
