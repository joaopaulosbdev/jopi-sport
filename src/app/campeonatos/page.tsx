'use client';

import React from 'react';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { useStore } from '@/contexts/StoreContext';
import { Trophy, ChevronRight, Zap } from 'lucide-react';

export default function CampeonatosPage() {
  const { categories } = useStore();
  const championships = categories.filter((c) => c.type === 'championship');
  const southAmerica = championships.filter((c) => c.continent === 'América do Sul');
  const europe = championships.filter((c) => c.continent === 'Europa');
  const others = championships.filter((c) => c.continent !== 'América do Sul' && c.continent !== 'Europa');

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#c6c9ac] uppercase mb-8">
          <Link href="/" className="hover:text-[#d2f100] transition-colors">Início</Link>
          <span>/</span>
          <span className="text-[#d2f100]">Clubes & Campeonatos</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-[#333537]">
          <div className="inline-flex items-center gap-2 bg-[#1e2021] border border-[#d2f100]/40 text-[#d2f100] px-3 py-1 text-xs font-mono font-bold uppercase mb-3">
            <Zap size={14} className="fill-[#d2f100]" />
            LIGAS & TORNEIOS OFICIAIS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-headline-md leading-tight">
            CAMPEONATOS & CLUBES
          </h1>
          <p className="text-xs sm:text-sm text-[#c6c9ac] mt-2 max-w-2xl font-mono">
            Escolha sua liga favorita e confira os mantos oficiais dos maiores clubes do futebol brasileiro e internacional.
          </p>
        </div>

        {/* América do Sul */}
        {southAmerica.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#333537]">
              <span className="w-2.5 h-5 bg-[#d2f100]" />
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-headline-sm">
                Futebol Sul-Americano
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {southAmerica.map((category) => (
                <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
              ))}
            </div>
          </section>
        )}

        {/* Europa */}
        {europe.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#333537]">
              <span className="w-2.5 h-5 bg-[#d2f100]" />
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-headline-sm">
                Futebol Europeu & UCL
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {europe.map((category) => (
                <CategoryCard key={category.id} category={category} basePath="/campeonatos" />
              ))}
            </div>
          </section>
        )}

        {/* Outros */}
        {others.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#333537]">
              <span className="w-2.5 h-5 bg-[#d2f100]" />
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-headline-sm">
                Outros Campeonatos
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
