'use client';

import React from 'react';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { championships } from '@/data/categories';
import { Trophy, ChevronRight } from 'lucide-react';

export default function CampeonatosPage() {
  const southAmerica = championships.filter((c) => c.continent === 'América do Sul');
  const europe = championships.filter((c) => c.continent === 'Europa');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600 transition">Início</Link>
        <ChevronRight size={14} />
        <span className="text-slate-800">Campeonatos</span>
      </nav>

      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Trophy size={14} /> Ligas e Torneios de Clubes
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Campeonatos Principais
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
          Encontre os mantos dos maiores clubes do futebol brasileiro e internacional. Escolha sua liga favorita abaixo.
        </p>
      </div>

      {/* América do Sul */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🌎</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Futebol Sul-Americano
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {southAmerica.map((category) => (
            <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
          ))}
        </div>
      </section>

      {/* Europa */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🌍</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Futebol Europeu
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {europe.map((category) => (
            <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
          ))}
        </div>
      </section>
    </div>
  );
}
