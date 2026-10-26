'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { MessageCircle, ShoppingBag, Check, Sparkles, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, storeConfig } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `Olá! Gostaria de comprar o seguinte manto:\n\n👕 *${product.name}*\n🏷️ Time: ${product.team}\n📏 Tamanho: *${selectedSize}*\n💰 Valor: *R$ ${product.price.toFixed(2)}*\n\nEstá disponível a pronta entrega?`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const typeBadgeMap: Record<string, string> = {
    home: 'Titular',
    away: 'Reserva',
    third: 'Third Kit',
    special: 'Edição Especial',
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <Link href={`/produto/${product.id}`} className="relative block aspect-[4/3] bg-slate-100 overflow-hidden">
        {product.images && product.images.length > 0 && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4">
            <span className="text-5xl mb-2 filter drop-shadow-md">👕</span>
            <span className="text-xs font-bold tracking-wider uppercase text-yellow-400 text-center">
              {product.team}
            </span>
            <span className="text-[10px] text-slate-300">Coleção {product.season}</span>
          </div>
        )}

        {/* Badges Over Image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <Sparkles size={10} /> Novo
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
            {typeBadgeMap[product.type] || product.type}
          </span>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-rose-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg">
              Esgotado
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Team */}
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-slate-500 mb-1">
            <span>{product.team}</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              {product.season}
            </span>
          </div>

          {/* Title */}
          <Link href={`/produto/${product.id}`} className="block">
            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 hover:text-emerald-600 transition group-hover:text-emerald-700">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            em até 3x de R$ {(product.price / 3).toFixed(2)} sem juros no Pix
          </p>

          {/* Quick Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Tamanho:
              </span>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`text-xs px-2 py-0.5 rounded font-bold border transition ${
                      selectedSize === sz
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buttons / Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          {/* Quick WhatsApp Buy Button */}
          <button
            type="button"
            onClick={handleWhatsAppBuy}
            disabled={!product.inStock}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
            title="Comprar direto no WhatsApp"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </button>

          {/* Quick Add to Cart */}
          <button
            type="button"
            onClick={handleQuickAddToCart}
            disabled={!product.inStock}
            className={`p-2 rounded-xl border transition flex items-center justify-center ${
              added
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-950 bg-slate-50'
            }`}
            title="Adicionar ao Carrinho"
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>

          {/* View Details Link */}
          <Link
            href={`/produto/${product.id}`}
            className="p-2 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-950 bg-slate-50 transition flex items-center justify-center"
            title="Ver detalhes da camisa"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
