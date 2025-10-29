import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Dashboard Nuvion IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
