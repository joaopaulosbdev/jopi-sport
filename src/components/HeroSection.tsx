'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  Trophy, 
  Globe2, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Flame, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function HeroSection() {
  const { storeConfig } = useStore();

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport! Vim pelo site e gostaria de tirar uma dúvida sobre as camisas de time.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden py-12 md:py-20 border-b border-slate-800">
      {/* Decorative soccer grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 rounded-full px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Lançamentos Coleção 2025/2026 Já Disponíveis!</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              O Manto do Seu Time{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-yellow-400 bg-clip-text text-transparent">
                Com Qualidade de Torcedor Raiz
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Camisas dos maiores clubes do Brasileirão, ligas europeias e seleções mundiais. 
              Personalize com seu nome e número! <strong>Atendimento humano e compra ágil direto pelo WhatsApp</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                href="/campeonatos"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                <Trophy size={18} className="text-yellow-300" />
                <span>Ver Campeonatos</span>
              </Link>

              <Link
                href="/selecoes"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-extrabold text-sm sm:text-base border border-slate-700 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Globe2 size={18} className="text-blue-400" />
                <span>Ver Seleções</span>
              </Link>

              <button
                onClick={handleWhatsAppContact}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-sm border border-emerald-500/30 flex items-center justify-center gap-2 transition"
              >
                <MessageCircle size={18} className="text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Badges / Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 text-xs">
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                <span>Qualidade 1:1 Premium</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <Truck size={18} className="text-yellow-400 shrink-0" />
                <span>Envio para todo Brasil</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <Zap size={18} className="text-cyan-400 shrink-0" />
                <span>Personalize Nome &amp; Nº</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5">
                <Flame size={18} className="text-rose-400 shrink-0" />
                <span>Pagamento via Pix</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Box */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-slate-950 font-black text-xs uppercase px-4 py-1 rounded-bl-2xl">
                Mais Pedidos
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔥</span>
                <div>
                  <h3 className="font-extrabold text-lg text-white">Destaques da Rodada</h3>
                  <p className="text-xs text-slate-400">Garanta o manto antes que esgote</p>
                </div>
              </div>

              {/* Sample preview cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/50 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇧🇷</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Camisas do Brasileirão</h4>
                      <p className="text-[11px] text-slate-400">Flamengo, Palmeiras, Timão, SPFC...</p>
                    </div>
                  </div>
                  <Link href="/campeonatos/brasileirao" className="text-xs font-bold text-emerald-400 hover:underline">
                    Ver →
                  </Link>
                </div>

                <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/50 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Premier League &amp; Ligas Europeias</h4>
                      <p className="text-[11px] text-slate-400">City, Real Madrid, Barça, Liverpool...</p>
                    </div>
                  </div>
                  <Link href="/campeonatos/premier-league" className="text-xs font-bold text-emerald-400 hover:underline">
                    Ver →
                  </Link>
                </div>

                <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-xl p-3 hover:border-emerald-500/50 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Seleções Mundiais</h4>
                      <p className="text-[11px] text-slate-400">Brasil, Argentina, França, Portugal...</p>
                    </div>
                  </div>
                  <Link href="/selecoes" className="text-xs font-bold text-emerald-400 hover:underline">
                    Ver →
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-yellow-400" />
                  Compra 100% segura
                </span>
                <Link href="/promocoes" className="text-yellow-400 font-bold hover:underline">
                  Ver promoções da semana →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
