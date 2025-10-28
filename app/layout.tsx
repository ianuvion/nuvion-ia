import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Plataforma de IA conversacional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
