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
  ArrowRight,
  Flame,
  Sparkles,
  Zap
} from 'lucide-react';

const popularClubs = [
  { name: 'Flamengo', slug: 'brasileirao', search: 'Flamengo' },
  { name: 'Palmeiras', slug: 'brasileirao', search: 'Palmeiras' },
  { name: 'Corinthians', slug: 'brasileirao', search: 'Corinthians' },
  { name: 'São Paulo', slug: 'brasileirao', search: 'São Paulo' },
  { name: 'Real Madrid', slug: 'la-liga', search: 'Real Madrid' },
  { name: 'Barcelona', slug: 'la-liga', search: 'Barcelona' },
  { name: 'Man. City', slug: 'premier-league', search: 'Manchester City' },
  { name: 'Brasil', slug: 'brasil', isNational: true, search: 'Brasil' },
  { name: 'Argentina', slug: 'argentina', isNational: true, search: 'Argentina' },
];

export default function HeroSection() {
  const { storeConfig, setSearchQuery } = useStore();

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport! Gostaria de consultar o catálogo e pedir uma camisa!';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* High-Voltage Hero Banner - Stitch Pitch Volt */}
      <section className="relative bg-[#121415] text-white overflow-hidden border-b border-[#333537]/80">
        
        {/* Subtle Pitch Floor Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e2021]/60 via-[#121415] to-[#0c0e10] pointer-events-none" />
        
        {/* Diagonal high-contrast grid lines */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #d2f100 0, #d2f100 1px, transparent 0, transparent 40px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#1e2021] border border-[#d2f100]/40 text-[#d2f100] px-3.5 py-1 text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(210,241,0,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#d2f100] animate-ping" />
                <span className="font-mono">NOVO DROP EXCLUSIVO 2025/26</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none font-headline-lg">
                  VISTA A PAIXÃO. <br />
                  <span className="text-[#d2f100] drop-shadow-[0_0_20px_rgba(210,241,0,0.3)]">
                    SINTA A VOLTAGEM.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[#c6c9ac] max-w-xl mx-auto lg:mx-0 font-body-md pt-2">
                  Mantos oficiais, edições limitadas de colecionador e clássicos retrô com tecnologia de alta performance e pronta entrega para todo o Brasil.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/lancamentos"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#d2f100] hover:bg-white text-[#121415] hover:text-black font-black uppercase text-sm tracking-wider px-8 py-3.5 transition-all shadow-[0_0_25px_rgba(210,241,0,0.35)]"
                >
                  <Zap size={18} className="fill-[#121415]" />
                  <span>Explorar Drop</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/campeonatos"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e2021] hover:bg-[#282a2c] text-white hover:text-[#d2f100] border border-[#333537] font-bold uppercase text-sm tracking-wider px-6 py-3.5 transition-colors"
                >
                  <Trophy size={16} />
                  <span>Ver Catálogo</span>
                </Link>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-[#c6c9ac] hover:text-[#d2f100] font-bold text-xs uppercase tracking-wider py-2 transition-colors"
                >
                  <MessageCircle size={15} className="text-[#d2f100]" />
                  <span>Atendimento WhatsApp</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#333537]/50 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col text-left">
                  <span className="text-[#d2f100] font-headline-sm font-black text-xl">100%</span>
                  <span className="text-[10px] text-[#c6c9ac] uppercase font-bold tracking-wider">Qualidade Premium</span>
                </div>
                <div className="flex flex-col text-left border-l border-[#333537]/60 pl-3">
                  <span className="text-white font-headline-sm font-black text-xl">24H</span>
                  <span className="text-[10px] text-[#c6c9ac] uppercase font-bold tracking-wider">Envio Expresso</span>
                </div>
                <div className="flex flex-col text-left border-l border-[#333537]/60 pl-3">
                  <span className="text-[#d2f100] font-headline-sm font-black text-xl">PIX</span>
                  <span className="text-[10px] text-[#c6c9ac] uppercase font-bold tracking-wider">5% Desconto</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md bg-[#1e2021] border border-[#333537] p-4 shadow-2xl">
                
                {/* Glow badge */}
                <div className="absolute -top-3 -right-3 bg-[#d2f100] text-[#121415] text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-[0_0_15px_rgba(210,241,0,0.5)]">
                  DROP DA SEMANA
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-[#0c0e10] border border-[#333537]/60 group">
                  <img
                    src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80"
                    alt="Manto Titular Oficial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  
                  {/* Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-transparent to-transparent opacity-80" />

                  {/* Jersey Info Floating Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#121415]/95 border border-[#333537] p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-[#d2f100] uppercase font-bold tracking-wider">
                        EDIÇÃO MATCH PRO
                      </div>
                      <div className="text-white font-headline-sm text-base font-bold uppercase truncate">
                        Flamengo Titular 2025/26
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#c6c9ac] line-through text-[10px]">R$ 229,90</div>
                      <div className="text-[#d2f100] font-headline-sm font-bold text-lg">R$ 159,90</div>
                    </div>
                  </div>
                </div>

                {/* Sub-bar stats */}
                <div className="flex items-center justify-between text-[11px] text-[#c6c9ac] font-bold uppercase tracking-wider pt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d2f100]" />
                    Pronta Entrega
                  </span>
                  <span>Personalização Grátis</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Quick Clubs Strip */}
        <div className="border-t border-[#333537]/60 bg-[#0c0e10]/90 py-2.5 px-4 lg:px-12 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-black uppercase text-[#d2f100] tracking-wider shrink-0 mr-2 flex items-center gap-1">
              <Flame size={13} />
              EM ALTA:
            </span>
            {popularClubs.map((club) => (
              <button
                key={club.name}
                onClick={() => setSearchQuery(club.search)}
                className="text-[11px] font-bold text-[#c6c9ac] hover:text-[#d2f100] hover:border-[#d2f100] bg-[#1e2021] border border-[#333537] px-3 py-1 transition-all"
              >
                {club.name}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Trust Badges Bar */}
      <section className="bg-[#1e2021] border-b border-[#333537] py-6 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0c0e10] border border-[#333537] text-[#d2f100] flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-white tracking-wider">Frete Grátis</div>
              <div className="text-[11px] text-[#c6c9ac]">A partir de R$ 249</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0c0e10] border border-[#333537] text-[#d2f100] flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-white tracking-wider">Parcele em até 12x</div>
              <div className="text-[11px] text-[#c6c9ac]">Ou 5% de desconto no PIX</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0c0e10] border border-[#333537] text-[#d2f100] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-white tracking-wider">Compra Segura</div>
              <div className="text-[11px] text-[#c6c9ac]">Rastreamento Correios</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0c0e10] border border-[#333537] text-[#d2f100] flex items-center justify-center shrink-0">
              <MessageCircle size={20} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-white tracking-wider">Suporte 24/7</div>
              <div className="text-[11px] text-[#c6c9ac]">Atendimento no WhatsApp</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
