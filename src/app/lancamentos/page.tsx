'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { Sparkles, Zap } from 'lucide-react';

export default function LancamentosPage() {
  const { products } = useStore();
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#c6c9ac] uppercase mb-8">
          <Link href="/" className="hover:text-[#FFD900] transition-colors">Início</Link>
          <span>/</span>
          <span className="text-[#FFD900]">Lançamentos</span>
        </nav>

        <div className="mb-10 pb-6 border-b border-[#333537]">
          <div className="inline-flex items-center gap-2 bg-[#1e2021] border border-[#FFD900]/40 text-[#FFD900] px-3 py-1 text-xs font-mono font-bold uppercase mb-3">
            <Zap size={14} className="fill-[#FFD900]" />
            NOVO DROP 2024/25
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-headline-md leading-tight">
            ÚLTIMOS LANÇAMENTOS
          </h1>
          <p className="text-xs sm:text-sm text-[#c6c9ac] mt-2 max-w-2xl font-mono">
            Confira as novidades recém-chegadas e drops exclusivos na JOPI SPORT!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(newProducts.length > 0 ? newProducts : products).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
