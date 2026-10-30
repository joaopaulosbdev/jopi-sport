import type { Metadata } from 'next';
import { Oswald, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/contexts/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JOPI SPORT | VOLT DROP - Mantos Oficiais de Futebol',
  description: 'Mantos oficiais de futebol, edições limitadas e clássicos retrô. Brasileirão, Premier League, La Liga e Seleções com frete grátis e compra expressa.',
  keywords: 'camisas de futebol, mantos oficiais, jopi sport, volt fc, brasileirão, seleções, premier league, la liga, camisas de time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${oswald.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#121415] text-[#e2e2e4] font-space-grotesk antialiased selection:bg-[#FFD900] selection:text-[#121415]">
        <StoreProvider>
          <Header />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
