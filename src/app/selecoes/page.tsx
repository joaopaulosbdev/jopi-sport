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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600 transition">Início</Link>
        <ChevronRight size={14} />
        <span className="text-slate-800">Seleções</span>
      </nav>

      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Globe2 size={14} /> Futebol Internacional &amp; Copas do Mundo
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Seleções do Mundo
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
          Vista a camisa do seu país favorito! Mantos clássicos e edições oficiais das maiores seleções de futebol do planeta.
        </p>
      </div>

      {/* América do Sul */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🌎</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Seleções Sul-Americanas
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {southAmerica.map((category) => (
            <CategoryCard key={category.id} category={category} basePath="/selecoes" />
          ))}
        </div>
      </section>

      {/* Europa */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🌍</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Seleções Européias
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {europe.map((category) => (
            <CategoryCard key={category.id} category={category} basePath="/selecoes" />
          ))}
        </div>
      </section>

      {/* Outros continentes */}
      {others.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🌏</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Outros Continentes
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {others.map((category) => (
              <CategoryCard key={category.id} category={category} basePath="/selecoes" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
