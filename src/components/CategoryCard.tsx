'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  basePath: string;
}

export default function CategoryCard({ category, basePath }: CategoryCardProps) {
  return (
    <Link
      href={`${basePath}/${category.slug}`}
      className="group relative bg-white border border-neutral-200 hover:border-black rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </span>
        <span className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#FFD900] text-black flex items-center justify-center transition-colors">
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      <div>
        <h3 className="font-black text-sm sm:text-base text-neutral-900 group-hover:text-black uppercase tracking-tight">
          {category.name}
        </h3>

        {category.country && (
          <p className="text-xs text-neutral-500 font-medium mt-0.5">{category.country}</p>
        )}
        {category.continent && !category.country && (
          <p className="text-xs text-neutral-500 font-medium mt-0.5">{category.continent}</p>
        )}
      </div>

      <div className="mt-4 pt-2.5 border-t border-neutral-100 flex items-center text-[11px] font-black uppercase text-[#B29200] group-hover:text-black transition-colors">
        <span>VER MANTOS</span>
        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
