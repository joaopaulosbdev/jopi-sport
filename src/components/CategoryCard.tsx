'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { ArrowRight, Trophy, Globe2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  basePath: string;
}

export default function CategoryCard({ category, basePath }: CategoryCardProps) {
  return (
    <Link
      href={`${basePath}/${category.slug}`}
      className="group relative bg-[#1e2021] border border-[#333537] hover:border-[#FFD900] p-4 sm:p-5 shadow-lg hover:shadow-[0_0_20px_rgba(255, 217, 0,0.15)] transition-all flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        {category.imageUrl ? (
          <div className="w-12 h-12 border border-[#333537] bg-[#0c0e10] flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-[#0c0e10] text-[#FFD900] border border-[#333537] flex items-center justify-center font-bold text-sm uppercase group-hover:scale-105 transition-transform">
            {category.type === 'championship' ? <Trophy size={20} /> : <Globe2 size={20} />}
          </div>
        )}

        <span className="w-8 h-8 bg-[#121415] border border-[#333537] group-hover:bg-[#FFD900] group-hover:text-[#121415] text-[#c6c9ac] flex items-center justify-center transition-colors">
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      <div>
        <h3 className="font-headline-sm font-bold text-base sm:text-lg text-white group-hover:text-[#FFD900] uppercase tracking-wide transition-colors">
          {category.name}
        </h3>

        {category.country && (
          <p className="text-xs font-mono text-[#c6c9ac] mt-0.5">{category.country}</p>
        )}
        {category.continent && !category.country && (
          <p className="text-xs font-mono text-[#c6c9ac] mt-0.5">{category.continent}</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#333537]/60 flex items-center justify-between text-[11px] font-mono font-bold uppercase text-[#FFD900]">
        <span>EXPLORAR MANTOS</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
