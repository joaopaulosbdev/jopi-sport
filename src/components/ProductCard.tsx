'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { MessageCircle, ShoppingBag, Check, Star, ArrowRight } from 'lucide-react';

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
    const text = `Olá Jopi Sport Shop! Gostaria de comprar o seguinte manto:\n\n👕 *${product.name}*\n🏷️ Time: ${product.team}\n📏 Tamanho: *${selectedSize}*\n💰 Valor: *R$ ${product.price.toFixed(2)}*\n\nComo faço para finalizar o pedido?`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const typeLabels: Record<string, string> = {
    home: 'Titular',
    away: 'Reserva',
    third: '3º Uniforme',
    special: 'Especial',
  };

  return (
    <div className="group relative bg-white rounded-xl border border-neutral-200 hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Image Area */}
      <div>
        <Link href={`/produto/${product.id}`} className="relative block aspect-square bg-[#F8F9FA] overflow-hidden p-4">
          
          {/* Badge overlays (Netshoes style high-contrast pills) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <span className="bg-black text-[#FFD900] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                -{discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#FFD900] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                LANÇAMENTO
              </span>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="bg-neutral-100 text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-300">
              {typeLabels[product.type] || product.type}
            </span>
          </div>

          {/* Product Image */}
          {product.images && product.images.length > 0 && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-4 rounded-lg">
              <span className="text-5xl mb-2">👕</span>
              <span className="text-xs font-black tracking-wider uppercase text-[#FFD900] text-center">
                {product.team}
              </span>
              <span className="text-[10px] text-neutral-400">Coleção {product.season}</span>
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-[#FFD900] text-black font-black text-xs uppercase px-3.5 py-1 rounded shadow">
                ESGOTADO NO MOMENTO
              </span>
            </div>
          )}
        </Link>

        {/* Content Section */}
        <div className="p-4">
          
          {/* Subtitle & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-neutral-700">
              {product.team}
            </span>
            <div className="flex items-center gap-1 text-[#FFD900]">
              <Star size={11} className="fill-[#FFD900]" />
              <span className="text-[10px] font-bold text-neutral-700">4.9 (42)</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/produto/${product.id}`} className="block">
            <h3 className="font-bold text-neutral-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-[#E6C300] transition h-10">
              {product.name}
            </h3>
          </Link>

          {/* Pricing (Netshoes signature style) */}
          <div className="mt-2 pt-2 border-t border-neutral-100">
            {product.originalPrice ? (
              <div className="text-[11px] text-neutral-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </div>
            ) : (
              <div className="text-[11px] text-transparent select-none">-</div>
            )}
            
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-black tracking-tight">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-extrabold uppercase text-[#008A3E] bg-[#E8F8EE] px-1.5 py-0.5 rounded">
                no Pix
              </span>
            </div>

            <p className="text-[10px] text-neutral-500 font-medium">
              ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
            </p>
          </div>

          {/* Size Pills */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3">
              <div className="text-[10px] font-extrabold uppercase text-neutral-500 mb-1">
                Tamanho: <span className="text-black font-black">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(sz);
                    }}
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded border transition ${
                      selectedSize === sz
                        ? 'bg-black text-[#FFD900] border-black'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Action Buttons (Netshoes Style High Contrast Yellow Button) */}
      <div className="p-4 pt-0 flex items-center gap-2">
        <button
          type="button"
          onClick={handleWhatsAppBuy}
          disabled={!product.inStock}
          className="flex-1 bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] disabled:opacity-40 text-black text-xs font-black uppercase py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow transition"
          title="Comprar no WhatsApp"
        >
          <MessageCircle size={15} className="fill-black text-black" />
          <span>COMPRAR NO ZAP</span>
        </button>

        <button
          type="button"
          onClick={handleQuickAddToCart}
          disabled={!product.inStock}
          className={`p-2.5 rounded-lg border-2 transition flex items-center justify-center ${
            added
              ? 'bg-black border-black text-[#FFD900]'
              : 'border-neutral-300 hover:border-black text-black bg-white hover:bg-neutral-50'
          }`}
          title="Adicionar ao carrinho"
        >
          {added ? <Check size={16} className="stroke-[3]" /> : <ShoppingBag size={16} />}
        </button>
      </div>

    </div>
  );
}
