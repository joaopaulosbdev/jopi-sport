'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/contexts/StoreContext';
import { Flame, ChevronRight } from 'lucide-react';

export default function PromocoesPage() {
  const { products } = useStore();
  const promoProducts = products.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600 transition">Início</Link>
        <ChevronRight size={14} />
        <span className="text-slate-800">Promoções</span>
      </nav>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
          <Flame size={14} /> Ofertas e Queima de Estoque
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Promoções Especiais
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
          Camisas com preços promocionais para você torcer com estilo sem pesar no bolso!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(promoProducts.length > 0 ? promoProducts : products.slice(0, 8)).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
