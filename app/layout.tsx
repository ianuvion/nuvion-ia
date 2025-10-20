import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "IA aplicada a ventas y CRM para negocios.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
