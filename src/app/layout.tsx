import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/contexts/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Jopi Sport Shop | Camisas de Time Oficiais - Compre via WhatsApp',
  description: 'A maior variedade de camisas de time do Brasil e do mundo. Brasileirão, Premier League, La Liga e Seleções. Compre no WhatsApp na Jopi Sport Shop!',
  keywords: 'camisas de time, jopi sport shop, futebol, brasileirão, seleções, premier league, la liga, comprar camisa whatsapp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
