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
    <div className="bg-[#F4F5F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs font-bold text-neutral-500 mb-6">
          <Link href="/" className="hover:text-black transition">Início</Link>
          <ChevronRight size={13} />
          <span className="text-black uppercase">Lançamentos</span>
        </nav>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-3 py-0.5 rounded text-xs font-black uppercase mb-2">
            <Sparkles size={13} /> Lançamentos
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
            ÚLTIMOS LANÇAMENTOS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl font-medium">
            Confira as novidades recém-chegadas na Jopi Sport Shop!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {(newProducts.length > 0 ? newProducts : products).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
