'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  MessageCircle, 
  Phone,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function Footer() {
  const { storeConfig, categories, isAdmin } = useStore();

  const championships = categories.filter((c) => c.type === 'championship');
  const nationalTeams = categories.filter((c) => c.type === 'national');

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport Shop! Vim pelo site e gostaria de saber mais informações.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="bg-black text-white border-t-4 border-[#FFD900]">
      {/* Floating WhatsApp Action Button */}
      <button
        onClick={handleWhatsAppContact}
        className="fixed bottom-5 right-5 z-50 bg-[#FFD900] hover:bg-[#E6C300] text-black px-4 py-3 rounded-full shadow-2xl shadow-black/50 flex items-center gap-2.5 font-black text-xs uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 group border-2 border-black"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle size={22} className="fill-black text-black group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Compre pelo WhatsApp</span>
      </button>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center leading-none">
                <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-[#FFD900]">
                  JOPI
                </span>
                <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white ml-1.5">
                  SPORT SHOP
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFD900] block mt-1">
                CAMISAS DE TIME &amp; CLUBES
              </span>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              Camisas dos maiores clubes do futebol brasileiro, ligas européias e seleções mundiais. Opções de personalização de nome e número com atendimento humano no WhatsApp.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-2 bg-neutral-900 border border-[#FFD900]/40 text-[#FFD900] px-3.5 py-2 rounded-lg text-xs font-black uppercase hover:bg-neutral-800 transition"
              >
                <Phone size={13} />
                <span>{storeConfig.whatsappNumber}</span>
              </button>
            </div>
          </div>

          {/* Campeonatos */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-[#FFD900] mb-4 pb-1 border-b border-neutral-800 inline-block">
              CAMPEONATOS
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {championships.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/campeonatos/${c.slug}`} className="hover:text-[#FFD900] transition flex items-center gap-1.5 font-medium">
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/campeonatos" className="text-[#FFD900] font-black uppercase hover:underline text-[11px]">
                  Ver todos os campeonatos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Seleções */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-[#FFD900] mb-4 pb-1 border-b border-neutral-800 inline-block">
              SELEÇÕES
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {nationalTeams.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/selecoes/${s.slug}`} className="hover:text-[#FFD900] transition flex items-center gap-1.5 font-medium">
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/selecoes" className="text-[#FFD900] font-black uppercase hover:underline text-[11px]">
                  Ver todas as seleções →
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento & Painel Admin Exclusivo no Rodapé */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-[#FFD900] mb-4 pb-1 border-b border-neutral-800 inline-block">
              ATENDIMENTO
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/carrinho" className="hover:text-[#FFD900] transition font-medium">
                  Meu Carrinho de Compras
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="hover:text-[#FFD900] transition font-medium">
                  Ofertas da Semana
                </Link>
              </li>
              <li>
                <Link href="/lancamentos" className="hover:text-[#FFD900] transition font-medium">
                  Lançamentos
                </Link>
              </li>
              <li>
                <button onClick={handleWhatsAppContact} className="hover:text-[#FFD900] transition font-medium text-left">
                  Tirar dúvidas no WhatsApp
                </button>
              </li>
              
              {/* Botão Admin no rodapé apenas */}
              <li className="pt-4 border-t border-neutral-800 mt-3">
                <Link
                  href={isAdmin ? "/admin" : "/admin/login"}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[#FFD900] text-[11px] font-black uppercase tracking-wider border border-neutral-800 transition"
                >
                  <Lock size={12} />
                  <span>{isAdmin ? "Painel do Administrador" : "Acesso Admin"}</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-neutral-900 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Jopi Sport Shop - Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#FFD900] font-bold">PAGAMENTO:</span>
            <span>Pix</span>
            <span>•</span>
            <span>Cartão de Crédito</span>
            <span>•</span>
            <span>Boleto Bancário</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
