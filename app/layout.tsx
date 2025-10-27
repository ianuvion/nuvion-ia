import './globals.css';
import ThemeProvider from './components/ThemeProvider';

export const metadata = {
  title: 'Nuvion IA',
  description: 'Plataforma Nuvion IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
