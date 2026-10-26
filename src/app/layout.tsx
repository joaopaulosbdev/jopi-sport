import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/contexts/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Jopi Sport | Camisas de Time - Venda Direta no WhatsApp',
  description: 'Loja online de camisas de times do Brasileirão, Premier League, La Liga e Seleções Mundiais com personalização de nome e número. Peça pelo WhatsApp com facilidade!',
  keywords: 'camisas de time, futebol, brasileirão, seleções, premier league, la liga, comprar camisa de time whatsapp',
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
