'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  basePath: string;
}

export default function CategoryCard({ category, basePath }: CategoryCardProps) {
  return (
    <Link
      href={`${basePath}/${category.slug}`}
      className="group relative bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full pointer-events-none group-hover:from-emerald-100 transition-colors" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </span>
          <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-500 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <h3 className="font-extrabold text-base sm:text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
          {category.name}
        </h3>

        {category.country && (
          <p className="text-xs text-slate-500 mt-0.5">{category.country}</p>
        )}
        {category.continent && !category.country && (
          <p className="text-xs text-slate-500 mt-0.5">{category.continent}</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
        <span>Explorar modelos</span>
        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
