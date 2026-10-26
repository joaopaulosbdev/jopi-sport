'use client';

import React from 'react';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { useStore } from '@/contexts/StoreContext';
import { Trophy, ChevronRight } from 'lucide-react';

export default function CampeonatosPage() {
  const { categories } = useStore();
  const championships = categories.filter((c) => c.type === 'championship');
  const southAmerica = championships.filter((c) => c.continent === 'América do Sul');
  const europe = championships.filter((c) => c.continent === 'Europa');
  const others = championships.filter((c) => c.continent !== 'América do Sul' && c.continent !== 'Europa');

  return (
    <div className="bg-[#F4F5F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-neutral-500 mb-6">
          <Link href="/" className="hover:text-black transition">Início</Link>
          <ChevronRight size={13} />
          <span className="text-black uppercase">Campeonatos</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-3 py-0.5 rounded text-xs font-black uppercase mb-2">
            <Trophy size={13} /> Ligas Nacionais e Internacionais
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
            CAMPEONATOS PRINCIPAIS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl font-medium">
            Escolha sua liga favorita e confira os mantos dos maiores clubes do futebol brasileiro e internacional.
          </p>
        </div>

        {/* América do Sul */}
        {southAmerica.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
              <span className="w-2.5 h-5 bg-[#FFD900] rounded-sm" />
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
                FUTEBOL SUL-AMERICANO
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {southAmerica.map((category) => (
                <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
              ))}
            </div>
          </section>
        )}

        {/* Europa */}
        {europe.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
              <span className="w-2.5 h-5 bg-black rounded-sm" />
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
                FUTEBOL EUROPEU
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {europe.map((category) => (
                <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
              ))}
            </div>
          </section>
        )}

        {/* Outros */}
        {others.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
              <span className="w-2.5 h-5 bg-[#FFD900] rounded-sm" />
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
                OUTRAS COMPETIÇÕES
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {others.map((category) => (
                <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
