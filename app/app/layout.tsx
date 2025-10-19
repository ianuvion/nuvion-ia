export const metadata = {
  title: "Nuvion IA",
  description: "Starter Next.js + Clerk + Nuvion IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
