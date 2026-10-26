'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  Trophy, 
  Globe2, 
  MessageCircle, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  RotateCcw,
  ArrowRight,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

// Popular clubs for the FutFanatics quick navigation strip
const popularClubs = [
  { name: 'Flamengo', slug: 'brasileirao', search: 'Flamengo', color: '#C22A22' },
  { name: 'Palmeiras', slug: 'brasileirao', search: 'Palmeiras', color: '#006437' },
  { name: 'Corinthians', slug: 'brasileirao', search: 'Corinthians', color: '#111111' },
  { name: 'São Paulo', slug: 'brasileirao', search: 'São Paulo', color: '#B30000' },
  { name: 'Real Madrid', slug: 'la-liga', search: 'Real Madrid', color: '#1B365D' },
  { name: 'Barcelona', slug: 'la-liga', search: 'Barcelona', color: '#A50044' },
  { name: 'Man. City', slug: 'premier-league', search: 'Manchester City', color: '#6CABDD' },
  { name: 'Brasil', slug: 'brasil', isNational: true, search: 'Brasil', color: '#FFDF00' },
  { name: 'Argentina', slug: 'argentina', isNational: true, search: 'Argentina', color: '#74ACDF' },
];

export default function HeroSection() {
  const { storeConfig, setSearchQuery } = useStore();

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport Shop! Gostaria de consultar o catálogo e pedir uma camisa!';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div>
      {/* Promotional Athletic Hero Banner - FutFanatics Style */}
      <section className="relative bg-black text-white overflow-hidden border-b-2 border-neutral-800">
        {/* Athletic Diagonal Stripe Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FFD900 0, #FFD900 2px, transparent 0, transparent 36px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-3.5 py-1 rounded font-black text-xs uppercase tracking-wider shadow">
                <Flame size={14} className="fill-black" />
                <span>NOVA TEMPORADA 2025/26 // O SEU MANTO ESTÁ AQUI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase">
                VISTA O MANTO <br />
                <span className="text-[#FFD900] underline decoration-[#FFD900]/40">
                  DO SEU TIME DE CORAÇÃO
                </span>
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                As camisas mais procuradas do Brasileirão, futebol europeu e seleções mundiais. 
                Padrão tailandês 1:1, tecidos de alta tecnologia, opções Torcedor e Jogador com envio para todo o Brasil.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/campeonatos/brasileirao"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] text-black font-black text-sm uppercase tracking-wider rounded-lg transition transform hover:-translate-y-0.5 shadow-lg shadow-[#FFD900]/20 flex items-center justify-center gap-2"
                >
                  <Trophy size={16} />
                  <span>VER BRASILEIRÃO</span>
                </Link>

                <Link
                  href="/campeonatos"
                  className="w-full sm:w-auto px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 border-2 border-[#FFD900] text-[#FFD900] font-black text-sm uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Globe2 size={16} />
                  <span>INTERNACIONAIS</span>
                </Link>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-black text-sm uppercase rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="text-[#FFD900] fill-[#FFD900]" />
                  <span>PEDIR NO ZAP</span>
                </button>
              </div>

              {/* Fast trust highlights */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-black text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#FFD900]" /> Escudo Bordado ou Termocolado
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#FFD900]" /> Tecido DryFit Respirável
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#FFD900]" /> Opções Torcedor &amp; Jogador
                </span>
              </div>
            </div>

            {/* Right Promo Box - FutFanatics Style */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-neutral-900 to-black border-2 border-[#FFD900] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                
                <div className="absolute -top-3.5 right-6 bg-[#FFD900] text-black text-[11px] font-black uppercase px-3.5 py-0.5 rounded shadow">
                  EXCLUSIVO NO ZAP
                </div>

                <div className="text-center pb-5 border-b border-neutral-800">
                  <span className="text-xs font-black tracking-widest text-[#FFD900] uppercase block">
                    COMBO DO TORCEDOR
                  </span>
                  <div className="text-3xl sm:text-4xl font-black italic tracking-tight text-white mt-1">
                    LEVE 2 CAMISAS
                  </div>
                  <div className="text-sm font-black text-[#FFD900] mt-1">
                    + FRETE GRÁTIS PARA TODO O BRASIL
                  </div>
                </div>

                <div className="py-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <span>Clubes Nacionais (Brasileirão)</span>
                    <span className="text-[#FFD900] font-black">A partir de R$ 139,90</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <span>Europa &amp; Champions League</span>
                    <span className="text-[#FFD900] font-black">A partir de R$ 169,90</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <span>Seleções Mundiais</span>
                    <span className="text-[#FFD900] font-black">A partir de R$ 159,90</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full py-3.5 bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] text-black font-black text-sm uppercase rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>GARANTIR COMBO NO WHATSAPP</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FutFanatics "Navegue por Clubes" Strip */}
      <section className="bg-black border-b border-neutral-800 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-4 bg-[#FFD900] rounded-sm" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                NAVEGUE PELOS PRINCIPAIS CLUBES &amp; SELEÇÕES
              </h3>
            </div>
            <Link
              href="/campeonatos"
              className="text-[11px] font-black uppercase text-[#FFD900] hover:underline flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#FFD900]">
            {popularClubs.map((club) => (
              <button
                key={club.name}
                onClick={() => setSearchQuery(club.search)}
                className="group flex flex-col items-center gap-1.5 shrink-0 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#FFD900] rounded-xl px-4 py-2.5 transition min-w-[90px]"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white border-2 border-white/20 shadow group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: club.color }}
                >
                  {club.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[11px] font-black uppercase text-neutral-300 group-hover:text-[#FFD900] transition">
                  {club.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 FutFanatics Value Propositions / Trust Bar */}
      <section className="bg-white border-b border-neutral-200 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-11 h-11 rounded-lg bg-black text-[#FFD900] flex items-center justify-center shrink-0 border border-neutral-800">
                <Truck size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Frete Grátis</h4>
                <p className="text-[11px] text-neutral-500 font-medium">A partir de 2 camisas no pedido</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-11 h-11 rounded-lg bg-black text-[#FFD900] flex items-center justify-center shrink-0 border border-neutral-800">
                <CreditCard size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Desconto no Pix</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Aprovação imediata e envio ágil</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-11 h-11 rounded-lg bg-black text-[#FFD900] flex items-center justify-center shrink-0 border border-neutral-800">
                <ShieldCheck size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Padrão Tailandês 1:1</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Bordados e detalhes idênticos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-11 h-11 rounded-lg bg-black text-[#FFD900] flex items-center justify-center shrink-0 border border-neutral-800">
                <RotateCcw size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Troca Garantida</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Suporte humanizado no WhatsApp</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
