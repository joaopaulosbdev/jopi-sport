'use client';

import React, { use, useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { ChevronRight, ArrowLeft, MessageCircle, Filter, X, Trophy } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ChampionshipSlugPage({ params }: Props) {
  const { slug } = use(params);
  const { products, storeConfig, categories } = useStore();

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.subcategory.toLowerCase() === slug.toLowerCase());
  }, [products, slug]);

  // Filters state
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedVersion, setSelectedVersion] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('all');

  // Extract unique filter options from the products in this category
  const availableTeams = useMemo(() => {
    const teams = new Set(categoryProducts.map((p) => p.team));
    return Array.from(teams).sort();
  }, [categoryProducts]);

  const availableSeasons = useMemo(() => {
    const seasons = new Set(categoryProducts.map((p) => p.season));
    return Array.from(seasons).sort();
  }, [categoryProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((p) => {
      if (selectedTeam !== 'all' && p.team !== selectedTeam) return false;
      if (selectedSeason !== 'all' && p.season !== selectedSeason) return false;
      if (selectedVersion !== 'all' && p.version !== selectedVersion) return false;
      if (selectedDelivery === 'ready' && !p.isReadyDelivery) return false;
      if (selectedDelivery === 'order' && p.isReadyDelivery) return false;
      return true;
    });
  }, [categoryProducts, selectedTeam, selectedSeason, selectedVersion, selectedDelivery]);

  const hasActiveFilters = selectedTeam !== 'all' || selectedSeason !== 'all' || selectedVersion !== 'all' || selectedDelivery !== 'all';

  const clearFilters = () => {
    setSelectedTeam('all');
    setSelectedSeason('all');
    setSelectedVersion('all');
    setSelectedDelivery('all');
  };

  const handleWhatsAppCustom = () => {
    const champName = category ? category.name : slug;
    const text = `Olá Jopi Sport Shop! Gostaria de consultar ou pedir camisas do campeonato ${champName}.`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!category) {
    return (
      <div className="bg-[#F4F5F7] min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3 text-black">
            <Trophy size={32} />
          </div>
          <h1 className="text-xl font-black uppercase text-black mb-1">Campeonato não encontrado</h1>
          <p className="text-xs text-neutral-500 mb-6 font-medium">Não localizamos a liga solicitada.</p>
          <Link
            href="/campeonatos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-[#FFD900] text-xs font-black uppercase"
          >
            <ArrowLeft size={15} /> Voltar para Campeonatos
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
          <Link href="/campeonatos" className="hover:text-black transition uppercase">Campeonatos</Link>
          <ChevronRight size={13} />
          <span className="text-black uppercase font-black">{category.name}</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-black rounded-2xl p-6 sm:p-8 text-white mb-8 border-2 border-[#FFD900] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0 p-1">
              {category.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover rounded" />
              ) : (
                <Trophy size={28} className="text-[#FFD900]" />
              )}
            </div>
            <div>
              <div className="text-[10px] uppercase font-black text-[#FFD900] tracking-widest mb-0.5">
                {category.country || category.continent}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">{category.name}</h1>
              <p className="text-neutral-400 text-xs mt-0.5 font-medium">
                Mantos titulares, reservas e edições especiais dos maiores clubes
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppCustom}
            className="self-start md:self-auto px-5 py-3 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] text-black text-xs font-black uppercase flex items-center gap-2 shadow transition"
          >
            <MessageCircle size={15} className="fill-black" />
            <span>Consultar Outro Time no Zap</span>
          </button>
        </div>

        {/* Filter Bar (Filtrar por Time, Ano/Temporada, Versão, Pronta Entrega) */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-8 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-black">
              <Filter size={15} className="text-[#FFD900]" />
              <span>Filtrar Camisas ({filteredProducts.length} de {categoryProducts.length})</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-neutral-500 hover:text-black flex items-center gap-1 transition"
              >
                <X size={13} /> Limpar Filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Filter by Team */}
            <div>
              <label className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                Filtrar por Time / Clube:
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              >
                <option value="all">Todos os Times ({categoryProducts.length})</option>
                {availableTeams.map((t) => (
                  <option key={t} value={t}>
                    {t} ({categoryProducts.filter((p) => p.team === t).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Season / Release Year */}
            <div>
              <label className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                Ano de Lançamento / Temporada:
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              >
                <option value="all">Todas as Temporadas</option>
                {availableSeasons.map((s) => (
                  <option key={s} value={s}>
                    Temporada {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Version */}
            <div>
              <label className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                Versão do Manto:
              </label>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              >
                <option value="all">Todas as Versões</option>
                <option value="torcedor">Versão Torcedor</option>
                <option value="jogador">Versão Jogador</option>
              </select>
            </div>

            {/* Filter by Ready Delivery */}
            <div>
              <label className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                Disponibilidade:
              </label>
              <select
                value={selectedDelivery}
                onChange={(e) => setSelectedDelivery(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
              >
                <option value="all">Todas</option>
                <option value="ready">Pronta Entrega Imediata</option>
                <option value="order">Sob Encomenda</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <h2 className="text-base font-black uppercase text-black mb-1">Nenhuma camisa com estes filtros</h2>
            <p className="text-xs text-neutral-500 mb-6 font-medium">
              Tente redefinir os filtros ou consulte nosso catálogo completo no WhatsApp!
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg bg-black text-white text-xs font-black uppercase"
              >
                Limpar Filtros
              </button>
              <button
                onClick={handleWhatsAppCustom}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFD900] text-black text-xs font-black uppercase"
              >
                <MessageCircle size={14} className="fill-black" /> Pedir no WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
