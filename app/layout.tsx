import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nuvion IA — Plataforma",
  description: "Automatización y ventas asistidas por IA.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  themeColor: "#0A2342", // azul corporativo
  openGraph: {
    title: "Nuvion IA — Plataforma",
    description: "Automatización y ventas asistidas por IA.",
    url: "https://nuvion-ia.vercel.app",
    siteName: "Nuvion IA",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Logo Nuvion IA",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Nuvion IA — Plataforma",
    description: "Automatización y ventas asistidas por IA.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
