import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuvion IA",
  description: "Automatización y agentes IA para escalar ventas",
  icons: {
    icon: "/icon-v2.png",
    shortcut: "/icon-v2.png",
    apple: "/icon-v2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
