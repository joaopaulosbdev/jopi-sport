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
  Shirt,
  PackageCheck
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

  // Filter shelf products based on active tab
  const shelfProducts = products.filter((p) => {
    if (activeTab === 'brasileirao') return p.subcategory.toLowerCase() === 'brasileirao';
    if (activeTab === 'europe') return p.category === 'championship' && p.subcategory.toLowerCase() !== 'brasileirao';
    if (activeTab === 'national') return p.category === 'national';
    if (activeTab === 'ready') return p.isReadyDelivery;
    return true;
  });

  const featuredProducts = products.filter((p) => p.featured);
  const newProducts = products.filter((p) => p.isNew);
  const promoProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);
  const readyDeliveryProducts = products.filter((p) => p.isReadyDelivery);

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport Shop! Vim pelo site e gostaria de saber as novidades e catálogo completo das camisas!';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // If user searched for something
  if (searchQuery.trim()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900">
                RESULTADOS PARA &ldquo;<span className="text-[#B29200]">{searchQuery}</span>&rdquo;
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 pl-4 font-medium">
              Encontramos {filteredProducts.length} modelo(s) disponível(is)
            </p>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-neutral-700 bg-neutral-200 hover:bg-neutral-300 px-3.5 py-2 rounded-lg transition"
          >
            <FilterX size={15} /> Limpar busca
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-400">
              <Search size={24} />
            </div>
            <h2 className="text-lg font-black uppercase text-neutral-900 mb-1">Nenhum resultado encontrado</h2>
            <p className="text-xs text-neutral-500 mb-6 font-medium">
              Não encontramos nenhuma camisa com o termo &ldquo;{searchQuery}&rdquo;. Peça sob encomenda no WhatsApp!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-lg bg-black text-[#FFD900] text-xs font-black uppercase hover:bg-neutral-800 transition"
              >
                Ver Todas as Camisas
              </button>
              <button
                onClick={handleWhatsAppContact}
                className="px-5 py-2.5 rounded-lg bg-[#FFD900] text-black text-xs font-black uppercase hover:bg-[#E6C300] transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} className="fill-black" /> Pedir no WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#F4F5F7]">
      {/* FutFanatics Hero Section with Club Crests & Trust Badges */}
      <HeroSection />

      {/* Main Interactive Showcase with Tabs (FutFanatics Style) */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* FutFanatics Section Header with Sports Slash */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-neutral-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                <span>DESTAQUES DA TEMPORADA</span>
                <span className="bg-black text-[#FFD900] text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  2025/26
                </span>
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1 pl-4 font-medium">
              Os mantos mais desejados pelos torcedores em todo o Brasil
            </p>
          </div>

          {/* FutFanatics Shelf Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition shrink-0 ${
                activeTab === 'all'
                  ? 'bg-black text-[#FFD900]'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('brasileirao')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition shrink-0 ${
                activeTab === 'brasileirao'
                  ? 'bg-black text-[#FFD900]'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Brasileirão
            </button>
            <button
              onClick={() => setActiveTab('europe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition shrink-0 ${
                activeTab === 'europe'
                  ? 'bg-black text-[#FFD900]'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Futebol Europeu
            </button>
            <button
              onClick={() => setActiveTab('national')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition shrink-0 ${
                activeTab === 'national'
                  ? 'bg-black text-[#FFD900]'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Seleções
            </button>
            <button
              onClick={() => setActiveTab('ready')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition shrink-0 ${
                activeTab === 'ready'
                  ? 'bg-[#FFD900] text-black font-black'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Pronta Entrega
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {shelfProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {shelfProducts.length > 8 && (
          <div className="text-center mt-8">
            <Link
              href="/campeonatos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-neutral-800 text-[#FFD900] font-black text-xs uppercase tracking-wider rounded-lg transition"
            >
              <span>Ver Mais Camisas no Catálogo</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>

      {/* FutFanatics 2-Banner Split */}
      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Banner 1: Versões Torcedor vs Jogador */}
          <div className="bg-black text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#FFD900] relative overflow-hidden group">
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #FFD900 0, #FFD900 2px, transparent 0, transparent 24px)',
              }}
            />
            <div className="space-y-2 z-10">
              <span className="bg-[#FFD900] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded inline-block">
                VERSÕES EXCLUSIVAS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
                TORCEDOR OU JOGADOR?
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm font-medium leading-relaxed">
                Opção Torcedor com caimento padrão e escudo bordado, ou Versão Jogador com caimento atlético e escudo termocolado.
              </p>
            </div>
            <div className="pt-5 z-10">
              <Link
                href="/campeonatos"
                className="inline-flex items-center gap-2 text-xs font-black uppercase text-black bg-[#FFD900] hover:bg-[#E6C300] px-4 py-2.5 rounded-lg transition shadow"
              >
                <span>ESCOLHER MEU MODELO</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Banner 2: Personalização com Nome & Número */}
          <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-neutral-800 relative overflow-hidden group">
            <div className="space-y-2 z-10">
              <span className="bg-neutral-800 text-[#FFD900] border border-[#FFD900]/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded inline-block">
                PERSONALIZAÇÃO OFICIAL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
                SEU NOME NO MANTO
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm font-medium leading-relaxed">
                Adicione seu nome e número favoritos com a fonte oficial do clube ou seleções direto pelo WhatsApp.
              </p>
            </div>
            <div className="pt-5 z-10">
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#FFD900] border-2 border-[#FFD900] hover:bg-[#FFD900] hover:text-black px-4 py-2 rounded-lg transition"
              >
                <MessageCircle size={15} className="fill-current" />
                <span>PERSONALIZAR NO ZAP</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Principais Campeonatos Shelf */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-300">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900">
                CAMPEONATOS &amp; LIGAS PRINCIPAIS
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1 pl-4 font-medium">
              Navegue pelas maiores competições do futebol nacional e internacional
            </p>
          </div>
          
          <Link
            href="/campeonatos"
            className="text-xs font-black uppercase text-black hover:text-[#B29200] flex items-center gap-1 transition"
          >
            <span>Ver todos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {championships.map((category) => (
            <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
          ))}
        </div>
      </section>

      {/* Seleções Mundiais Shelf */}
      <section className="py-10 sm:py-14 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-black rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                  <span>SELEÇÕES DO MUNDO</span>
                  <span className="bg-[#FFD900] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    MUNDIAIS
                  </span>
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 pl-4 font-medium">
                Vista as cores do seu país com o máximo de conforto e fidelidade
              </p>
            </div>
            
            <Link
              href="/selecoes"
              className="text-xs font-black uppercase text-black hover:text-[#B29200] flex items-center gap-1 transition"
            >
              <span>Ver todas</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {nationalTeams.slice(0, 8).map((category) => (
              <CategoryCard key={category.id} category={category} basePath="/selecoes" />
            ))}
          </div>
        </div>
      </section>

      {/* Pronta Entrega Shelf */}
      {readyDeliveryProducts.length > 0 && (
        <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#008A3E] rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                  <span>PRONTA ENTREGA // ENVIO RÁPIDO</span>
                  <span className="bg-[#E8F8EE] text-[#008A3E] border border-[#008A3E]/30 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    ESTOQUE NO BRASIL
                  </span>
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 pl-4 font-medium">
                Mantos já disponíveis para envio imediato sem espera de importação
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {readyDeliveryProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Ofertas Imperdíveis Shelf */}
      {promoProducts.length > 0 && (
        <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 border-t border-neutral-300">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                  <span>LIQUIDA &amp; OFERTAS DA SEMANA</span>
                  <Flame size={20} className="text-[#FFD900] fill-[#FFD900]" />
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 pl-4 font-medium">
                Mantos com descontos especiais por tempo limitado
              </p>
            </div>
            
            <Link
              href="/promocoes"
              className="text-xs font-black uppercase text-black hover:text-[#B29200] flex items-center gap-1 transition"
            >
              <span>Ver todas as ofertas</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {promoProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp Custom Order Banner */}
      <section className="bg-black text-white py-14 border-t-4 border-[#FFD900]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-4 py-1 rounded font-black text-xs uppercase tracking-wider">
            ATENDIMENTO PERSONALIZADO VIA WHATSAPP
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight leading-tight">
            NÃO ENCONTROU O SEU TIME? <br />
            <span className="text-[#FFD900]">PEÇA SOB ENCOMENDA NO ZAP</span>
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Temos acesso a centenas de modelos de camisas: edições retrô clássicas, manga longa, kits infantis e tamanhos especiais até 4XG.
          </p>

          <div className="pt-2">
            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] text-black font-black uppercase tracking-wider rounded-lg shadow-xl text-sm sm:text-base transition transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={22} className="fill-black" />
              <span>CONSULTAR MODELO NO WHATSAPP</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
