'use client';

import React, { use } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { championships } from '@/data/categories';
import { ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ChampionshipSlugPage({ params }: Props) {
  const { slug } = use(params);
  const { products, storeConfig } = useStore();

  const category = championships.find((c) => c.slug === slug);
  const categoryProducts = products.filter(
    (p) => p.subcategory.toLowerCase() === slug.toLowerCase()
  );

  const handleWhatsAppCustom = () => {
    const champName = category ? category.name : slug;
    const text = `Olá! Gostaria de consultar modelos e encomendas de camisas do campeonato *${champName}*.`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">🏆</span>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Campeonato não encontrado</h1>
        <p className="text-sm text-slate-500 mb-6">
          Não localizamos o campeonato solicitado.
        </p>
        <Link
          href="/campeonatos"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          <ArrowLeft size={16} /> Voltar para Campeonatos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600 transition">Início</Link>
        <ChevronRight size={14} />
        <Link href="/campeonatos" className="hover:text-emerald-600 transition">Campeonatos</Link>
        <ChevronRight size={14} />
        <span className="text-slate-800">{category.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl border border-white/20 shrink-0">
            {category.icon}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-1">
              {category.country || category.continent}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">{category.name}</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Camisas oficiais, titulares, reservas e especiais dos clubes participantes
            </p>
          </div>
        </div>

        <button
          onClick={handleWhatsAppCustom}
          className="self-start md:self-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition"
        >
          <MessageCircle size={16} />
          <span>Consultar outro time</span>
        </button>
      </div>

      {/* Products list */}
      {categoryProducts.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Camisas Disponíveis ({categoryProducts.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <span className="text-5xl block mb-4">👕</span>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Novas camisas chegando!</h2>
          <p className="text-sm text-slate-500 mb-6">
            Ainda não cadastramos camisas para {category.name} nesta lista, mas você pode pedir diretamente no WhatsApp!
          </p>
          <button
            onClick={handleWhatsAppCustom}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition"
          >
            <MessageCircle size={16} /> Pedir Camisa no WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
