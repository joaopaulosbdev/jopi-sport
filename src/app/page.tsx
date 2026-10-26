'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { useStore } from '@/contexts/StoreContext';
import { championships, nationalTeams } from '@/data/categories';
import { 
  Trophy, 
  Globe2, 
  Sparkles, 
  Flame, 
  MessageCircle, 
  ArrowRight,
  FilterX,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  const { products, searchQuery, setSearchQuery, storeConfig } = useStore();

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

  const featuredProducts = products.filter((p) => p.featured);
  const newProducts = products.filter((p) => p.isNew);
  const promoProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

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
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 pl-4">
              Encontramos {filteredProducts.length} modelo(s) disponível(is)
            </p>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-neutral-700 bg-neutral-200 hover:bg-neutral-300 px-3.5 py-2 rounded-lg transition"
          >
            <FilterX size={15} /> Limpar filtro
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
            <span className="text-5xl block mb-4">🔍</span>
            <h2 className="text-lg font-black uppercase text-neutral-900 mb-1">Nenhum resultado encontrado</h2>
            <p className="text-xs text-neutral-500 mb-6">
              Não encontramos nenhuma camisa com o termo &ldquo;{searchQuery}&rdquo;. Peça sob encomenda no WhatsApp!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-lg bg-black text-white text-xs font-black uppercase hover:bg-neutral-800 transition"
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
      {/* Hero Section */}
      <HeroSection />

      {/* Destaques da Rodada (Netshoes Section Shelf) */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                <span>MAIS VENDIDOS DA SEMANA</span>
                <span className="hidden sm:inline bg-black text-[#FFD900] text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  TOP PICKS
                </span>
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1 pl-4">
              Os mantos oficiais mais procurados pelos torcedores em todo o Brasil
            </p>
          </div>
          
          <Link
            href="/lancamentos"
            className="text-xs font-black uppercase text-black hover:text-[#B29200] flex items-center gap-1 transition"
          >
            <span>Ver todos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Netshoes-Style Promotional Banner Grid */}
      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-black text-white rounded-2xl p-6 sm:p-8 flex items-center justify-between border-2 border-[#FFD900] relative overflow-hidden">
            <div className="space-y-2 z-10">
              <span className="bg-[#FFD900] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded inline-block">
                BRASILEIRÃO 2025/26
              </span>
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">
                MANTOS NACIONAIS
              </h3>
              <p className="text-xs text-neutral-300 max-w-xs">
                Flamengo, Palmeiras, Corinthians, São Paulo, Vasco e muito mais com personalização.
              </p>
              <Link
                href="/campeonatos/brasileirao"
                className="inline-flex items-center gap-2 text-xs font-black uppercase text-black bg-[#FFD900] hover:bg-[#E6C300] px-4 py-2 rounded-lg transition"
              >
                <span>CONFERIR CLUBES</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="text-7xl opacity-20 pointer-events-none select-none">
              🇧🇷
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex items-center justify-between border border-neutral-800 relative overflow-hidden">
            <div className="space-y-2 z-10">
              <span className="bg-[#FFD900] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded inline-block">
                FUTEBOL EUROPEU
              </span>
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">
                GIGANTES DO MUNDO
              </h3>
              <p className="text-xs text-neutral-300 max-w-xs">
                Real Madrid, Barcelona, Manchester City, Liverpool, Bayern e Champions League.
              </p>
              <Link
                href="/campeonatos/premier-league"
                className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#FFD900] border border-[#FFD900] hover:bg-[#FFD900] hover:text-black px-4 py-2 rounded-lg transition"
              >
                <span>VER CAMISAS EUROPÉIAS</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="text-7xl opacity-20 pointer-events-none select-none">
              ⭐
            </div>
          </div>

        </div>
      </section>

      {/* Principais Campeonatos Shelf */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900">
                CAMPEONATOS &amp; LIGAS
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1 pl-4">
              Navegue pelas principais competições do futebol mundial
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
                    COPAS DO MUNDO
                  </span>
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 pl-4">
                Vista o manto do seu país com qualidade e orgulho de torcedor
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

      {/* Ofertas Imperdíveis Shelf */}
      {promoProducts.length > 0 && (
        <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 flex items-center gap-2">
                  <span>LIQUIDA &amp; OFERTAS DA SEMANA</span>
                  <Flame size={20} className="text-[#FFD900] fill-[#FFD900]" />
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 pl-4">
                Mantos oficiais com descontos por tempo limitado
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

      {/* Lançamentos 2025/2026 Shelf */}
      {newProducts.length > 0 && (
        <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 border-t border-neutral-200">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-black rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900">
                  COLEÇÃO 2025/2026
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 pl-4">
                Recém-chegados na Jopi Sport Shop com acabamento premium
              </p>
            </div>
            
            <Link
              href="/lancamentos"
              className="text-xs font-black uppercase text-black hover:text-[#B29200] flex items-center gap-1 transition"
            >
              <span>Ver lançamentos</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {newProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Netshoes-Style Big High-Impact WhatsApp Banner */}
      <section className="bg-black text-white py-14 border-t-2 border-[#FFD900]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-4 py-1 rounded font-black text-xs uppercase tracking-wider">
            ATENDIMENTO PERSONALIZADO VIA WHATSAPP
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight leading-tight">
            NÃO ENCONTROU O SEU TIME? <br />
            <span className="text-[#FFD900]">PEÇA SOB ENCOMENDA NO ZAP</span>
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Temos acesso a mais de 600 modelos de camisas: edições retrô clássicas, manga longa, kits infantis, jaquetas corta-vento e tamanhos até 3XG.
          </p>

          <div className="pt-2">
            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD900] hover:bg-[#E6C300] text-black font-black uppercase tracking-wider rounded-lg shadow-xl text-sm sm:text-base transition transform hover:scale-105 active:scale-95"
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
