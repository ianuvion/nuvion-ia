// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuvion IA',
  description: 'Plataforma Nuvion IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Boot del tema antes de hidratar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var t = localStorage.getItem('brandTheme') || 'semi-dark'; 
    // Guardamos el valor en data-theme para que tus estilos puedan leerlo
    document.documentElement.dataset.theme = t;
    // Si usás Tailwind con modo 'class', esto activa/desactiva el dark
    document.documentElement.classList.toggle('dark', t !== 'light');
  } catch (e) {}
})();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0b1220] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
