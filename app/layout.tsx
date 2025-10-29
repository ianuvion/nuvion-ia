import "./globals.css";

export const metadata = {
  title: "Nuvion IA",
  description: "Dashboard Nuvion IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
