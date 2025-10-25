import LogoUploader from '@/app/components/LogoUploader';

export default function BrandPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-100 mb-2">Marca</h1>
      <p className="text-slate-300/90 mb-6">
        Subí el logo que se verá en la barra superior. Podés cambiarlo cuando quieras.
      </p>

      <LogoUploader onCompleted={() => { /* opcional: toast */ }} />

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-100 mb-2">¿Cómo funciona?</h2>
        <ol className="list-decimal pl-5 text-slate-300/90 space-y-1 text-sm">
          <li>Seleccionás un archivo de imagen (PNG/JPG/SVG).</li>
          <li>Se envía al endpoint <code className="text-slate-200">/api/upload</code>.</li>
          <li>Guardamos el link en tu navegador para que el Navbar lo use al instante.</li>
        </ol>
      </section>
    </main>
  );
}
