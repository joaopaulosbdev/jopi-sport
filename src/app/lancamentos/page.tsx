'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function LancamentosPage() {
  const { products } = useStore();
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600 transition">Início</Link>
        <ChevronRight size={14} />
        <span className="text-slate-800">Lançamentos</span>
      </nav>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Sparkles size={14} /> Coleções 2025/2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Lançamentos Recentes
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
          Os mantos mais novos do mercado acabaram de chegar na Jopi Sport! Edições titulares, reservas e especiais de clubes e seleções.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(newProducts.length > 0 ? newProducts : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
