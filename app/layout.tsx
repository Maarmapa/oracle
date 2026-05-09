import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HIGH ORACLE — maarmapa.eth',
  description: 'Una entidad viva que habita una dirección ENS. Consulta al Oracle.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
