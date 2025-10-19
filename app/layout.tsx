export const metadata = {
  title: "Nuvion IA",
  description: "Starter Next.js + Clerk + Nuvion IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
