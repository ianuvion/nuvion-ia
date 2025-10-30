export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ThemeSwitcher from "@/app/components/ThemeSwitcher";

export default function AparienciaPage() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold">Apariencia</h1>
      <p className="text-sm opacity-80">
        Cambiá el tema. La preferencia queda guardada en este dispositivo.
      </p>
      <ThemeSwitcher />
    </main>
  );
}
