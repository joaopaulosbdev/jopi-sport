'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { useStore } from '@/contexts/StoreContext';
import { 
  Trophy, 
  Globe2, 
  Flame, 
  MessageCircle, 
  ArrowRight, 
  FilterX, 
  Search, 
  Sparkles, 
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function Home() {
  const { products, searchQuery, setSearchQuery, storeConfig, categories } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'brasileirao' | 'europe' | 'national' | 'ready'>('all');

  const championships = categories.filter((c) => c.type === 'championship');
  const nationalTeams = categories.filter((c) => c.type === 'national');

  const filteredProducts = searchQuery.trim()
    ? products.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.team.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
        );
      })
    : [];

  const shelfProducts = products.filter((p) => {
    if (activeTab === 'brasileirao') return p.subcategory.toLowerCase() === 'brasileirao';
    if (activeTab === 'europe') return p.category === 'championship' && p.subcategory.toLowerCase() !== 'brasileirao';
    if (activeTab === 'national') return p.category === 'national';
    if (activeTab === 'ready') return p.isReadyDelivery;
    return true;
  });

  const featuredProducts = products.filter((p) => p.featured);
  const promoProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport! Gostaria de consultar o catálogo completo e tirar uma dúvida.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // If user searched for something
  if (searchQuery.trim()) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#333537]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900]" />
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-headline-sm">
                RESULTADOS PARA &ldquo;<span className="text-[#FFD900]">{searchQuery}</span>&rdquo;
              </h1>
            </div>
            <p className="text-xs text-[#c6c9ac] mt-1 pl-4 font-mono">
              Encontramos {filteredProducts.length} modelo(s) disponível(is)
            </p>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#121415] bg-[#FFD900] hover:bg-white px-4 py-2 transition-all shadow"
          >
            <FilterX size={15} /> Limpar busca
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#1e2021] border border-[#333537] p-12 text-center max-w-lg mx-auto shadow-2xl">
            <div className="w-12 h-12 bg-[#0c0e10] border border-[#333537] flex items-center justify-center mx-auto mb-3 text-[#FFD900]">
              <Search size={24} />
            </div>
            <h2 className="text-lg font-bold uppercase text-white font-headline-sm mb-1">
              Nenhum resultado encontrado
            </h2>
            <p className="text-xs text-[#c6c9ac] mb-6">
              Não encontramos nenhuma camisa com o termo &ldquo;{searchQuery}&rdquo;. Peça sob encomenda no WhatsApp!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2.5 bg-[#121415] border border-[#333537] text-white hover:text-[#FFD900] text-xs font-bold uppercase tracking-wider"
              >
                Ver todos os mantos
              </button>
              <button
                onClick={handleWhatsAppContact}
                className="px-4 py-2.5 bg-[#FFD900] text-[#121415] hover:bg-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} /> Pedir no WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Visual Category Tiles (Stitch Design DNA) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#333537]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#FFD900]" />
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-headline-md">
                CATEGORIAS EM ALTA
              </h2>
            </div>
            <p className="text-xs text-[#c6c9ac] mt-1 pl-4 font-mono">
              Selecione por campeonato ou confederação
            </p>
          </div>
          <Link
            href="/campeonatos"
            className="text-xs font-mono font-bold uppercase text-[#FFD900] hover:underline flex items-center gap-1"
          >
            <span>Ver Todas</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Brasileirão Card */}
          <Link
            href="/campeonatos/brasileirao"
            className="group relative h-48 sm:h-56 overflow-hidden bg-[#1e2021] border border-[#333537] hover:border-[#FFD900] transition-all p-6 flex flex-col justify-end shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-[#0c0e10]/60 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80"
              alt="Clubes Brasileiros"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#FFD900] tracking-widest">
                SÉRIE A 2025/26
              </span>
              <h3 className="text-xl font-bold uppercase text-white font-headline-sm">
                Clubes Brasileiros
              </h3>
              <p className="text-xs text-[#c6c9ac]">Flamengo, Palmeiras, Corinthians, São Paulo...</p>
            </div>
          </Link>

          {/* Gigantes Europeus */}
          <Link
            href="/campeonatos"
            className="group relative h-48 sm:h-56 overflow-hidden bg-[#1e2021] border border-[#333537] hover:border-[#FFD900] transition-all p-6 flex flex-col justify-end shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-[#0c0e10]/60 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
              alt="Gigantes Europeus"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#FFD900] tracking-widest">
                UCL & LIGAS
              </span>
              <h3 className="text-xl font-bold uppercase text-white font-headline-sm">
                Gigantes Europeus
              </h3>
              <p className="text-xs text-[#c6c9ac]">Real Madrid, Man. City, Barcelona, Arsenal...</p>
            </div>
          </Link>

          {/* Seleções Mundiais */}
          <Link
            href="/selecoes"
            className="group relative h-48 sm:h-56 overflow-hidden bg-[#1e2021] border border-[#333537] hover:border-[#FFD900] transition-all p-6 flex flex-col justify-end shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-[#0c0e10]/60 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80"
              alt="Seleções Mundiais"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#FFD900] tracking-widest">
                COPA DO MUNDO
              </span>
              <h3 className="text-xl font-bold uppercase text-white font-headline-sm">
                Seleções Mundiais
              </h3>
              <p className="text-xs text-[#c6c9ac]">Brasil, Argentina, França, Alemanha...</p>
            </div>
          </Link>

          {/* Lendas Retrô */}
          <Link
            href="/lancamentos"
            className="group relative h-48 sm:h-56 overflow-hidden bg-[#1e2021] border border-[#333537] hover:border-[#FFD900] transition-all p-6 flex flex-col justify-end shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-[#0c0e10]/60 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80"
              alt="Lendas Retrô"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#FFD900] tracking-widest">
                HISTÓRICOS
              </span>
              <h3 className="text-xl font-bold uppercase text-white font-headline-sm">
                Lendas & Retrô
              </h3>
              <p className="text-xs text-[#c6c9ac]">Mantos clássicos dos anos 90 e 2000</p>
            </div>
          </Link>

        </div>
      </section>

      {/* 3. Main Product Shelf with High-Tech Tab Filters */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#333537]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900]" />
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-headline-md">
                DESTAQUES DO DROP 24/25
              </h2>
            </div>
            <p className="text-xs text-[#c6c9ac] mt-1 pl-4 font-mono">
              Mantos mais vendidos e edições especiais
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                activeTab === 'all'
                  ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_10px_rgba(255, 217, 0,0.3)]'
                  : 'bg-[#1e2021] text-[#c6c9ac] hover:text-white border border-[#333537]'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('brasileirao')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                activeTab === 'brasileirao'
                  ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_10px_rgba(255, 217, 0,0.3)]'
                  : 'bg-[#1e2021] text-[#c6c9ac] hover:text-white border border-[#333537]'
              }`}
            >
              Brasileirão
            </button>
            <button
              onClick={() => setActiveTab('europe')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                activeTab === 'europe'
                  ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_10px_rgba(255, 217, 0,0.3)]'
                  : 'bg-[#1e2021] text-[#c6c9ac] hover:text-white border border-[#333537]'
              }`}
            >
              Europeus
            </button>
            <button
              onClick={() => setActiveTab('national')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                activeTab === 'national'
                  ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_10px_rgba(255, 217, 0,0.3)]'
                  : 'bg-[#1e2021] text-[#c6c9ac] hover:text-white border border-[#333537]'
              }`}
            >
              Seleções
            </button>
            <button
              onClick={() => setActiveTab('ready')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                activeTab === 'ready'
                  ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_10px_rgba(255, 217, 0,0.3)]'
                  : 'bg-[#1e2021] text-[#c6c9ac] hover:text-white border border-[#333537]'
              }`}
            >
              ⚡ Pronta Entrega
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shelfProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Special Personalization Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="relative bg-[#1e2021] border border-[#FFD900]/40 p-8 md:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD900]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono font-black uppercase text-[#FFD900] tracking-widest flex items-center gap-1.5">
                <Zap size={14} className="fill-[#FFD900]" />
                PERSONALIZAÇÃO PROFISSIONAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-headline-md leading-tight">
                COLOQUE SEU NOME E NÚMERO NO SEU MANTO
              </h2>
              <p className="text-sm text-[#c6c9ac] max-w-xl">
                Fontes originais das ligas (Premier League, La Liga e Brasileirão) com patches oficiais de campeão ou Champions League.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center justify-center gap-2 bg-[#FFD900] text-[#121415] hover:bg-white font-black uppercase text-xs tracking-wider px-6 py-4 shadow-[0_0_20px_rgba(255, 217, 0,0.3)] transition-all"
              >
                <MessageCircle size={18} />
                <span>Pedir Personalizada</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
