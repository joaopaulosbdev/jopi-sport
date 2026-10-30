'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  MessageCircle, 
  Phone,
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle,
  Truck
} from 'lucide-react';

export default function Footer() {
  const { storeConfig, categories, isAdmin } = useStore();

  const championships = categories.filter((c) => c.type === 'championship');
  const nationalTeams = categories.filter((c) => c.type === 'national');

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport! Vim pelo site e gostaria de tirar uma dúvida.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="bg-[#0c0e10] text-[#e2e2e4] border-t border-[#333537] mt-16">
      {/* Floating WhatsApp Action Button */}
      <button
        onClick={handleWhatsAppContact}
        className="fixed bottom-6 right-6 z-50 bg-[#d2f100] hover:bg-white text-[#121415] hover:text-black px-4 py-3 shadow-[0_0_25px_rgba(210,241,0,0.4)] flex items-center gap-2.5 font-black text-xs uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 group border border-[#121415]"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle size={22} className="fill-[#121415] text-[#121415] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Compre no WhatsApp</span>
      </button>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#d2f100] text-[#121415] flex items-center justify-center font-black text-lg">
                ⚡
              </div>
              <div className="flex items-center leading-none">
                <span className="text-2xl font-black uppercase text-white font-headline-sm">
                  JOPI
                </span>
                <span className="text-2xl font-black uppercase text-[#d2f100] ml-1.5 font-headline-sm">
                  SPORT
                </span>
              </div>
            </Link>

            <p className="text-[#c6c9ac] text-xs sm:text-sm leading-relaxed max-w-sm">
              Mantos oficiais dos maiores clubes do futebol brasileiro, ligas europeias e seleções mundiais. Personalização de nome e número com acabamento profissional e atendimento ágil no WhatsApp.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-2 bg-[#1e2021] border border-[#333537] hover:border-[#d2f100] text-[#d2f100] px-4 py-2 text-xs font-mono font-bold uppercase transition-colors"
              >
                <Phone size={13} />
                <span>{storeConfig.whatsappNumber}</span>
              </button>
            </div>
          </div>

          {/* Campeonatos */}
          <div>
            <h4 className="font-headline-sm text-xs uppercase tracking-wider text-[#d2f100] mb-4 pb-1 border-b border-[#333537] inline-block font-bold">
              CAMPEONATOS
            </h4>
            <ul className="space-y-2 text-xs text-[#c6c9ac]">
              {championships.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/campeonatos/${c.slug}`} className="hover:text-[#d2f100] transition-colors flex items-center gap-1.5">
                    <span>›</span>
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Seleções */}
          <div>
            <h4 className="font-headline-sm text-xs uppercase tracking-wider text-[#d2f100] mb-4 pb-1 border-b border-[#333537] inline-block font-bold">
              SELEÇÕES
            </h4>
            <ul className="space-y-2 text-xs text-[#c6c9ac]">
              {nationalTeams.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <Link href={`/selecoes/${n.slug}`} className="hover:text-[#d2f100] transition-colors flex items-center gap-1.5">
                    <span>›</span>
                    <span>{n.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atendimento & Segurança */}
          <div>
            <h4 className="font-headline-sm text-xs uppercase tracking-wider text-[#d2f100] mb-4 pb-1 border-b border-[#333537] inline-block font-bold">
              ATENDIMENTO
            </h4>
            <div className="space-y-3 text-xs text-[#c6c9ac]">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#d2f100]" />
                <span>Envio para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#d2f100]" />
                <span>Garantia de Entrega</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-[#d2f100]" />
                <span>Rastreio Correios</span>
              </div>
              <div className="pt-2">
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#c6c9ac]/70 hover:text-[#d2f100] transition-colors"
                >
                  <Lock size={11} />
                  <span>{isAdmin ? 'Painel Admin' : 'Acesso Lojista'}</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & badges */}
        <div className="border-t border-[#333537]/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#c6c9ac]">
          <div>
            © {new Date().getFullYear()} JOPI SPORT | VOLT DROP CULTURE. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="bg-[#1e2021] border border-[#333537] px-2 py-0.5 text-white">PIX</span>
            <span className="bg-[#1e2021] border border-[#333537] px-2 py-0.5 text-white">CARTÃO 12X</span>
            <span className="bg-[#1e2021] border border-[#333537] px-2 py-0.5 text-[#d2f100]">SSL 256-BIT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
