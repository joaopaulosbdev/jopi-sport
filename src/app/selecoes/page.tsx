'use client';

import React from 'react';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { nationalTeams } from '@/data/categories';
import { Globe2, ChevronRight } from 'lucide-react';

export default function SelecoesPage() {
  const southAmerica = nationalTeams.filter((c) => c.continent === 'América do Sul');
  const europe = nationalTeams.filter((c) => c.continent === 'Europa');
  const others = nationalTeams.filter((c) => c.continent !== 'América do Sul' && c.continent !== 'Europa');

  return (
    <div className="bg-[#F4F5F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-neutral-500 mb-6">
          <Link href="/" className="hover:text-black transition">Início</Link>
          <ChevronRight size={13} />
          <span className="text-black uppercase">Seleções</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-3 py-0.5 rounded text-xs font-black uppercase mb-2">
            <Globe2 size={13} /> Seleções Mundiais &amp; Copas do Mundo
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
            SELEÇÕES DO MUNDO
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl font-medium">
            Mantos lendários e novos lançamentos das maiores seleções de futebol do planeta.
          </p>
        </div>

        {/* América do Sul */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
            <span className="w-2.5 h-5 bg-[#FFD900] rounded-sm" />
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
              SELEÇÕES SUL-AMERICANAS
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {southAmerica.map((category) => (
              <CategoryCard key={category.id} category={category} basePath="/selecoes" />
            ))}
          </div>
        </section>

        {/* Europa */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
            <span className="w-2.5 h-5 bg-black rounded-sm" />
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
              SELEÇÕES EUROPÉIAS
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {europe.map((category) => (
              <CategoryCard key={category.id} category={category} basePath="/selecoes" />
            ))}
          </div>
        </section>

        {/* Outros */}
        {others.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
              <span className="w-2.5 h-5 bg-[#FFD900] rounded-sm" />
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black">
                OUTROS CONTINENTES
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {others.map((category) => (
                <CategoryCard key={category.id} category={category} basePath="/selecoes" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
