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
  FilterX
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
    const text = 'Olá Jopi Sport! Vim pelo site e gostaria de saber as novidades e catálogo completo das camisas!';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // If user is searching
  if (searchQuery.trim()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Resultados para &ldquo;<span className="text-emerald-600">{searchQuery}</span>&rdquo;
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Encontramos {filteredProducts.length} camisa(s) disponível(is)
            </p>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded-xl transition"
          >
            <FilterX size={16} /> Limpar busca
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <span className="text-5xl block mb-4">🔍</span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Nenhuma camisa encontrada</h2>
            <p className="text-sm text-slate-500 mb-6">
              Não encontramos nenhuma camisa com o termo &ldquo;{searchQuery}&rdquo;. Peça sob encomenda no WhatsApp!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                Ver Todas as Camisas
              </button>
              <button
                onClick={handleWhatsAppContact}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-1.5"
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
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured / Destaques Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-1">
              <Sparkles size={14} /> Seleção Especial
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Mantos em Destaque
            </h2>
          </div>
          <Link
            href="/lancamentos"
            className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>Ver lançamentos</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Main Championships Section */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-600 mb-1">
                <Trophy size={14} /> Ligas Nacionais &amp; Internacionais
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Principais Campeonatos
              </h2>
            </div>
            <Link
              href="/campeonatos"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              <span>Ver todos</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {championships.map((category) => (
              <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
            ))}
          </div>
        </div>
      </section>

      {/* National Teams Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-1">
              <Globe2 size={14} /> Futebol Internacional
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Seleções Mundiais
            </h2>
          </div>
          <Link
            href="/selecoes"
            className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>Ver todas as seleções</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {nationalTeams.slice(0, 8).map((category) => (
            <CategoryCard key={category.id} category={category} basePath="/selecoes" />
          ))}
        </div>
      </section>

      {/* Promotions / Ofertas Section */}
      {promoProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-1">
                  <Flame size={14} /> Descontos Exclusivos
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Ofertas Imperdíveis
                </h2>
              </div>
              <Link
                href="/promocoes"
                className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
              >
                <span>Ver todas as promoções</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {promoProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Drops Section */}
      {newProducts.length > 0 && (
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-1">
                <Sparkles size={14} /> Coleções 2025/2026
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Últimos Lançamentos
              </h2>
            </div>
            <Link
              href="/lancamentos"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              <span>Ver mais</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp Conversion Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-14 sm:py-18">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide">
            💬 Atendimento Exclusivo no WhatsApp
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            Não encontrou a camisa que procura? Nós conseguimos para você!
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Trabalhamos com mais de 500 modelos sob encomenda: camisas retrô históricas, infantis, manga longa, kits completos e edições de goleiro.
          </p>

          <div className="pt-2">
            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 hover:bg-slate-100 font-black rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 text-base sm:text-lg"
            >
              <MessageCircle size={22} className="text-emerald-600 fill-emerald-600" />
              <span>Chamar Vendedor no WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
