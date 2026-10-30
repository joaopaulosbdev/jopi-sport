'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { MessageCircle, ShoppingBag, Check, Zap } from 'lucide-react';

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
    const versionLabel = product.version === 'jogador' ? 'Versão Jogador' : 'Versão Torcedor';
    const deliveryLabel = product.isReadyDelivery ? 'Pronta Entrega' : 'Sob Encomenda';
    const text = `Olá Jopi Sport! Gostaria de comprar o seguinte manto:\n\n*${product.name}*\nTime: ${product.team}\nVersão: ${versionLabel}\nDisponibilidade: ${deliveryLabel}\nTamanho: ${selectedSize}\nValor: R$ ${product.price.toFixed(2)}\n\nComo faço para finalizar o pedido?`;
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80';
  const displayImage = imageError || !product.images?.[0] ? fallbackImage : product.images[0];

  return (
    <div className="group relative bg-[#1e2021] border border-[#333537] hover:border-[#FFD900] transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(255, 217, 0,0.15)]">
      
      {/* Top Image Area (4:5 Athletic Crop) */}
      <div>
        <Link href={`/produto/${product.id}`} className="relative block aspect-[4/5] bg-[#0c0e10] overflow-hidden border-b border-[#333537]/60">
          
          {/* Micro-Chips & Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {discount > 0 && (
              <span className="bg-[#FFD900] text-[#121415] text-[10px] font-black uppercase px-2 py-0.5 tracking-wider shadow">
                -{discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#121415] text-[#FFD900] border border-[#FFD900] text-[10px] font-black uppercase px-2 py-0.5 tracking-wider">
                DROP 24/25
              </span>
            )}
            {product.version === 'jogador' && (
              <span className="bg-[#333537] text-white text-[9px] font-mono uppercase px-1.5 py-0.5 tracking-widest border border-white/20">
                MATCH ISSUE
              </span>
            )}
          </div>

          {/* Availability Indicator */}
          <div className="absolute top-2.5 right-2.5 z-10">
            {product.isReadyDelivery ? (
              <span className="flex items-center gap-1.5 bg-[#0c0e10]/90 border border-[#333537] text-[#FFD900] text-[10px] font-bold uppercase px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD900] animate-pulse" />
                Pronta Entrega
              </span>
            ) : (
              <span className="bg-[#0c0e10]/90 border border-[#333537] text-[#c6c9ac] text-[10px] uppercase px-2 py-0.5">
                Sob Encomenda
              </span>
            )}
          </div>

          {/* Product Image */}
          <img
            src={displayImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />

          {/* Bottom Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2021] via-transparent to-transparent opacity-60" />
        </Link>

        {/* Content Area */}
        <div className="p-4 space-y-3">
          
          {/* Team / Subcategory */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#c6c9ac] uppercase tracking-wider">
            <span>{product.team}</span>
            <span>{product.season || '2024/25'}</span>
          </div>

          {/* Product Name */}
          <Link href={`/produto/${product.id}`} className="block group-hover:text-[#FFD900] transition-colors">
            <h3 className="text-white font-headline-sm text-lg font-bold uppercase leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Pricing */}
          <div className="pt-1">
            {product.originalPrice && (
              <div className="text-xs text-[#c6c9ac] line-through font-mono">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-[#FFD900] font-headline-sm text-2xl font-bold tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[10px] font-mono text-[#c6c9ac] uppercase">
                no PIX (-5%)
              </span>
            </div>
            <div className="text-[11px] text-[#c6c9ac] pt-0.5">
              ou até <span className="text-white font-bold">12x de R$ {(product.price / 12).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Size Selector Boxy Chips */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[10px] text-[#c6c9ac] font-mono uppercase mb-1.5">
              <span>Tamanho:</span>
              <span className="text-[#FFD900] font-bold">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                  className={`min-w-[34px] h-[30px] px-2 text-xs font-mono font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_8px_rgba(255, 217, 0,0.4)]'
                      : 'bg-[#121415] text-[#e2e2e4] border border-[#333537] hover:border-[#FFD900]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleQuickAddToCart}
          className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
            added
              ? 'bg-emerald-500 text-white'
              : 'bg-[#FFD900] hover:bg-white text-[#121415] hover:text-black shadow-[0_0_12px_rgba(255, 217, 0,0.2)]'
          }`}
        >
          {added ? (
            <>
              <Check size={14} className="stroke-[3]" />
              <span>Adicionado!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} className="stroke-[2.5]" />
              <span>Sacola</span>
            </>
          )}
        </button>

        <button
          onClick={handleWhatsAppBuy}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-[#121415] hover:bg-[#282a2c] text-white hover:text-[#FFD900] border border-[#333537] text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <MessageCircle size={14} className="text-[#FFD900]" />
          <span>Comprar</span>
        </button>
      </div>

    </div>
  );
}
