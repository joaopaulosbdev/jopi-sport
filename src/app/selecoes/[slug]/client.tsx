'use client';

import React, { use, useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { ChevronRight, ArrowLeft, MessageCircle, Filter, X, Globe2 } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SelectionSlugPage({ params }: Props) {
  const { slug } = use(params);
  const { products, storeConfig, categories } = useStore();

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.subcategory.toLowerCase() === slug.toLowerCase());
  }, [products, slug]);

  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedVersion, setSelectedVersion] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('all');

  const availableSeasons = useMemo(() => {
    const seasons = new Set(categoryProducts.map((p) => p.season));
    return Array.from(seasons).sort();
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      if (selectedSeason !== 'all' && p.season !== selectedSeason) return false;
      if (selectedVersion !== 'all' && p.version !== selectedVersion) return false;
      if (selectedDelivery === 'ready' && !p.isReadyDelivery) return false;
      if (selectedDelivery === 'order' && p.isReadyDelivery) return false;
      return true;
    });
  }, [categoryProducts, selectedSeason, selectedVersion, selectedDelivery]);

  const hasActiveFilters = selectedSeason !== 'all' || selectedVersion !== 'all' || selectedDelivery !== 'all';

  const clearFilters = () => {
    setSelectedSeason('all');
    setSelectedVersion('all');
    setSelectedDelivery('all');
  };

  const handleWhatsAppCustom = () => {
    const selName = category ? category.name : slug;
    const text = `Olá Jopi Sport! Gostaria de consultar ou pedir camisas da seleção de *${selName}*.`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-[#1e2021] border border-[#333537] p-8 text-center max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 bg-[#0c0e10] border border-[#333537] text-[#FFD900] flex items-center justify-center mx-auto mb-3">
            <Globe2 size={32} />
          </div>
          <h1 className="text-xl font-bold uppercase text-white font-headline-sm mb-1">
            Seleção não encontrada
          </h1>
          <p className="text-xs text-[#c6c9ac] mb-6 font-mono">Não localizamos a seleção solicitada.</p>
          <Link
            href="/selecoes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD900] text-[#121415] text-xs font-black uppercase tracking-wider"
          >
            <ArrowLeft size={15} /> Voltar para Seleções
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#c6c9ac] uppercase mb-8">
          <Link href="/" className="hover:text-[#FFD900] transition-colors">Início</Link>
          <span>/</span>
          <Link href="/selecoes" className="hover:text-[#FFD900] transition-colors">Seleções</Link>
          <span>/</span>
          <span className="text-[#FFD900]">{category.name}</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-[#1e2021] border border-[#333537] p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 bg-[#0c0e10] border border-[#333537] flex items-center justify-center overflow-hidden shrink-0 p-1">
              {category.imageUrl ? (
                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-contain" />
              ) : (
                <Globe2 size={28} className="text-[#FFD900]" />
              )}
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-[#FFD900] tracking-widest mb-0.5">
                Seleção Nacional • {category.continent}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-headline-md">
                {category.name}
              </h1>
              <p className="text-[#c6c9ac] text-xs mt-0.5 font-mono">
                Mantos titulares, reservas e edições de Copa do Mundo
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppCustom}
            className="self-start md:self-auto px-5 py-3.5 bg-[#FFD900] hover:bg-white text-[#121415] hover:text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(255, 217, 0,0.3)] transition-all"
          >
            <MessageCircle size={16} />
            <span>Consultar Outro Modelo no Zap</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#1e2021] border border-[#333537] p-4 mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#333537]/60 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
              <Filter size={15} className="text-[#FFD900]" />
              <span>Filtrar Mantos ({filteredProducts.length} de {categoryProducts.length})</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-mono text-[#ffb4ab] hover:underline flex items-center gap-1 transition"
              >
                <X size={13} /> Limpar Filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Filter by Season */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#c6c9ac] mb-1">Temporada:</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#FFD900] text-xs font-mono text-white p-2 focus:outline-none"
              >
                <option value="all">Todas as Temporadas</option>
                {availableSeasons.map((season) => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* Filter by Version */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#c6c9ac] mb-1">Versão:</label>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#FFD900] text-xs font-mono text-white p-2 focus:outline-none"
              >
                <option value="all">Todas as Versões</option>
                <option value="torcedor">Torcedor Oficial</option>
                <option value="jogador">Jogador (Match Issue)</option>
              </select>
            </div>

            {/* Filter by Delivery */}
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#c6c9ac] mb-1">Disponibilidade:</label>
              <select
                value={selectedDelivery}
                onChange={(e) => setSelectedDelivery(e.target.value)}
                className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#FFD900] text-xs font-mono text-white p-2 focus:outline-none"
              >
                <option value="all">Todas as Opções</option>
                <option value="ready">⚡ Pronta Entrega</option>
                <option value="order">Sob Encomenda</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#1e2021] border border-[#333537] p-12 text-center max-w-lg mx-auto shadow-2xl">
            <h3 className="font-headline-sm text-lg font-bold uppercase text-white mb-2">
              Nenhuma camisa encontrada
            </h3>
            <p className="text-xs text-[#c6c9ac] mb-6 font-mono">
              Não encontramos nenhuma camisa com esses filtros. Peça sob encomenda no WhatsApp!
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#FFD900] text-[#121415] text-xs font-black uppercase tracking-wider"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
