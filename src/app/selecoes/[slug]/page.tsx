'use client';

import React, { use } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { nationalTeams } from '@/data/categories';
import { ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SelecaoSlugPage({ params }: Props) {
  const { slug } = use(params);
  const { products, storeConfig } = useStore();

  const category = nationalTeams.find((c) => c.slug === slug);
  const categoryProducts = products.filter(
    (p) => p.subcategory.toLowerCase() === slug.toLowerCase() || p.team.toLowerCase() === category?.name.toLowerCase()
  );

  const handleWhatsAppCustom = () => {
    const selName = category ? category.name : slug;
    const text = `Olá Jopi Sport Shop! Gostaria de consultar ou pedir camisas da seleção de *${selName}*.`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!category) {
    return (
      <div className="bg-[#F4F5F7] min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center max-w-md w-full">
          <span className="text-5xl block mb-3">🌍</span>
          <h1 className="text-xl font-black uppercase text-black mb-1">Seleção não encontrada</h1>
          <p className="text-xs text-neutral-500 mb-6">Não localizamos a seleção solicitada.</p>
          <Link
            href="/selecoes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-[#FFD900] text-xs font-black uppercase"
          >
            <ArrowLeft size={15} /> Voltar para Seleções
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F5F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-neutral-500 mb-6">
          <Link href="/" className="hover:text-black transition">Início</Link>
          <ChevronRight size={13} />
          <Link href="/selecoes" className="hover:text-black transition uppercase">Seleções</Link>
          <ChevronRight size={13} />
          <span className="text-black uppercase font-black">{category.name}</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-black rounded-2xl p-6 sm:p-8 text-white mb-8 border-2 border-[#FFD900] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-4xl shrink-0">
              {category.icon}
            </div>
            <div>
              <div className="text-[10px] uppercase font-black text-[#FFD900] tracking-widest mb-0.5">
                Seleção Nacional • {category.continent}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">{category.name}</h1>
              <p className="text-neutral-400 text-xs mt-0.5 font-medium">
                Mantos oficiais titulares, reservas e edições especiais
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppCustom}
            className="self-start md:self-auto px-5 py-3 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] text-black text-xs font-black uppercase flex items-center gap-2 shadow transition"
          >
            <MessageCircle size={15} className="fill-black" />
            <span>Consultar Outro Modelo no Zap</span>
          </button>
        </div>

        {/* Products */}
        {categoryProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-200">
              <span className="text-xs font-black uppercase text-black">
                {categoryProducts.length} Camisa(s) Disponível(is)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <span className="text-5xl block mb-3">👕</span>
            <h2 className="text-base font-black uppercase text-black mb-1">Novas camisas chegando!</h2>
            <p className="text-xs text-neutral-500 mb-6 font-medium">
              Ainda não cadastramos camisas para {category.name} nesta lista, mas você pode pedir diretamente no WhatsApp!
            </p>
            <button
              onClick={handleWhatsAppCustom}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFD900] text-black text-xs font-black uppercase hover:bg-[#E6C300] transition"
            >
              <MessageCircle size={15} className="fill-black" /> Pedir Camisa no WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
