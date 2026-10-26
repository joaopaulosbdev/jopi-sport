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
  CheckCircle2
} from 'lucide-react';

export default function HeroSection() {
  const { storeConfig } = useStore();

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport Shop! Gostaria de consultar o catálogo e pedir uma camisa!';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div>
      {/* Promotional Hero Banner */}
      <section className="relative bg-black text-white overflow-hidden border-b border-neutral-800">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FFD900 0, #FFD900 2px, transparent 0, transparent 40px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-3.5 py-1 rounded font-black text-xs uppercase tracking-wider shadow-md">
                <Flame size={14} className="fill-black" />
                <span>SUPER OFERTAS DA SEMANA DO FUTEBOL</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter leading-none uppercase">
                O SEU MANTO <br />
                <span className="text-[#FFD900] underline decoration-[#FFD900]/40">
                  COM PREÇO DE CRAQUE
                </span>
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                As melhores camisas de time do Brasileirão, ligas européias e seleções mundiais. 
                Versão Torcedor e Versão Jogador, com pronta entrega ou encomenda e personalização direto no WhatsApp.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/campeonatos"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#FFD900] hover:bg-[#E6C300] text-black font-black text-sm uppercase tracking-wider rounded-lg transition transform hover:-translate-y-0.5 shadow-lg shadow-[#FFD900]/20 flex items-center justify-center gap-2"
                >
                  <Trophy size={16} />
                  <span>VER CAMPEONATOS</span>
                </Link>

                <Link
                  href="/selecoes"
                  className="w-full sm:w-auto px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 border-2 border-[#FFD900] text-[#FFD900] font-black text-sm uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Globe2 size={16} />
                  <span>VER SELEÇÕES</span>
                </Link>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-sm rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="text-[#FFD900]" />
                  <span>PEDIR NO WHATSAPP</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#FFD900]" /> Escudo Bordado ou Termocolado
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#FFD900]" /> Tecido DryFit Respirável
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#FFD900]" /> Opção Pronta Entrega
                </span>
              </div>
            </div>

            {/* Right Promo Box */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-neutral-900 to-black border-2 border-[#FFD900] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                
                <div className="absolute -top-3.5 right-6 bg-[#FFD900] text-black text-[11px] font-black uppercase px-3.5 py-0.5 rounded shadow">
                  EXCLUSIVO NO ZAP
                </div>

                <div className="text-center pb-6 border-b border-neutral-800">
                  <span className="text-xs font-black tracking-widest text-[#FFD900] uppercase block">
                    COMBO TORCEDOR
                  </span>
                  <div className="text-3xl sm:text-4xl font-black italic tracking-tight text-white mt-1">
                    LEVE 2 CAMISAS
                  </div>
                  <div className="text-base font-extrabold text-[#FFD900] mt-1">
                    + FRETE GRÁTIS PARA TODO BRASIL
                  </div>
                </div>

                <div className="py-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <span>Clubes Nacionais (Brasileirão)</span>
                    <span className="text-[#FFD900]">A partir de R$ 139,90</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <span>Premier League &amp; Europa</span>
                    <span className="text-[#FFD900]">A partir de R$ 179,90</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    <span>Seleções Mundiais</span>
                    <span className="text-[#FFD900]">A partir de R$ 169,90</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full py-3.5 bg-[#FFD900] hover:bg-[#E6C300] text-black font-black text-sm uppercase rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>GARANTIR MINHAS CAMISAS</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Benefits Bar */}
      <section className="bg-white border-b border-neutral-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFD900] flex items-center justify-center shrink-0">
                <Truck size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Frete Grátis</h4>
                <p className="text-[11px] text-neutral-500 font-medium">A partir de 2 camisas no pedido</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFD900] flex items-center justify-center shrink-0">
                <CreditCard size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Pix com Desconto</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Aprovação e envio imediato</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFD900] flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Qualidade 1:1</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Bordados e acabamentos premium</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-2">
              <div className="w-10 h-10 rounded-full bg-black text-[#FFD900] flex items-center justify-center shrink-0">
                <RotateCcw size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-black">Garantia Total</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Troca e suporte via WhatsApp</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
