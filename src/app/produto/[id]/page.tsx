'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  ShoppingBag, 
  MessageCircle, 
  ChevronRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Ruler,
  HelpCircle
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const { products, addToCart, storeConfig } = useStore();

  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || 'M');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [includePatch, setIncludePatch] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">👕</span>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Camisa não encontrada</h1>
        <p className="text-sm text-slate-500 mb-6">
          O produto que você procura pode ter sido esgotado ou removido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    );
  }

  // Calculate final unit price including options
  const customizationFee = (customName.trim() || customNumber.trim())
    ? product.customizationPrice || 20
    : 0;
  const patchFee = includePatch ? product.patchPrice || 15 : 0;
  const totalPrice = product.price + customizationFee + patchFee;

  const handleAddToCart = () => {
    addToCart({
      product,
      size: selectedSize,
      quantity: 1,
      customName: customName.trim(),
      customNumber: customNumber.trim(),
      includePatch,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleWhatsAppBuy = () => {
    let text = `Olá! Gostaria de comprar o seguinte manto:\n\n👕 *${product.name}*\n🏷️ Time: ${product.team}\n📏 Tamanho: *${selectedSize}*`;

    if (customName.trim() || customNumber.trim()) {
      text += `\n✍️ *Personalização:* ${customName.toUpperCase()} Nº ${customNumber}`;
    }
    if (includePatch) {
      text += `\n🏆 *Patch Oficial de Manga:* Sim (+R$ ${(product.patchPrice || 15).toFixed(2)})`;
    }

    text += `\n\n💰 *Valor Total: R$ ${totalPrice.toFixed(2)}*\n\nComo procedo com o pagamento e envio?`;

    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-emerald-600 transition">Início</Link>
        <ChevronRight size={14} />
        <Link
          href={product.category === 'national' ? '/selecoes' : '/campeonatos'}
          className="hover:text-emerald-600 transition"
        >
          {product.category === 'national' ? 'Seleções' : 'Campeonatos'}
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-800 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Main Grid: Images & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Column: Media Gallery & Mockup Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center">
            {product.images && product.images.length > 0 && !imageError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6">
                <span className="text-8xl mb-4">👕</span>
                <span className="text-xl font-black uppercase text-yellow-400 text-center tracking-wide">
                  {product.team}
                </span>
                <span className="text-sm text-slate-300 mt-1">Coleção {product.season}</span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-emerald-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles size={12} /> Lançamento
                </span>
              )}
              {discount > 0 && (
                <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Live Personalization Watermark Preview */}
            {(customName.trim() || customNumber.trim()) && (
              <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white p-3 rounded-2xl text-center shadow-2xl">
                <span className="text-[10px] text-yellow-400 font-bold block uppercase tracking-widest">
                  Preview Personalização
                </span>
                <div className="font-black text-sm uppercase tracking-wider text-slate-100 mt-0.5">
                  {customName || 'SEU NOME'}
                </div>
                <div className="font-black text-2xl text-emerald-400 font-mono">
                  {customNumber || '10'}
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail row if multiple images exist */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveImageIndex(index);
                    setImageError(false);
                  }}
                  className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === index ? 'border-emerald-500 scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
            <div className="bg-white p-3 rounded-2xl border border-slate-200">
              <ShieldCheck size={20} className="mx-auto text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 block">Padrão Oficial</span>
              <span className="text-[10px] text-slate-400">Escudo e logos 1:1</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200">
              <Truck size={20} className="mx-auto text-yellow-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 block">Envio Rastreado</span>
              <span className="text-[10px] text-slate-400">Entrega rápida</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200">
              <RotateCcw size={20} className="mx-auto text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 block">Troca Fácil</span>
              <span className="text-[10px] text-slate-400">7 dias de garantia</span>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Customization & WhatsApp Buy Action */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <span>{product.team}</span>
              <span>•</span>
              <span>Temporada {product.season}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price Area */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-black text-emerald-700">
                  R$ {totalPrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    R$ {(product.originalPrice + customizationFee + patchFee).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                💳 Em até 3x de R$ {(totalPrice / 3).toFixed(2)} sem juros no Pix ou cartão
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-full">
              {product.inStock ? 'Em Estoque' : 'Sob Encomenda'}
            </span>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                1. Escolha o Tamanho: <span className="text-emerald-600">{selectedSize}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowSizeModal(true)}
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <Ruler size={13} /> Tabela de Medidas
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl font-black text-sm border-2 transition ${
                    selectedSize === size
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Creative Feature: Name & Number Personalization */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <span>✍️</span> 2. Personalizar Nome e Número (+R$ {(product.customizationPrice || 20).toFixed(2)})
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Opcional</span>
            </div>

            <p className="text-xs text-slate-500">
              Coloque seu nome e o número de sua preferência ou de algum craque histórico.
            </p>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Ex: NEYMAR JR"
                  value={customName}
                  maxLength={14}
                  onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 uppercase"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nº (Ex: 10)"
                  value={customNumber}
                  maxLength={2}
                  onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-black text-center text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Sleeve Patch Option */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Adicionar Patch de Manga Oficial
                </h4>
                <p className="text-[11px] text-slate-400">
                  +R$ {(product.patchPrice || 15).toFixed(2)} (Ex: Champions League, Libertadores ou Brasileirão)
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includePatch}
                onChange={(e) => setIncludePatch(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            {/* Primary: Direct WhatsApp Purchase */}
            <button
              onClick={handleWhatsAppBuy}
              disabled={!product.inStock}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle size={22} className="fill-white" />
              <span>Comprar Agora no WhatsApp</span>
            </button>

            {/* Secondary: Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm border-2 flex items-center justify-center gap-2 transition ${
                added
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'bg-white border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Adicionado ao Carrinho!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Adicionar ao Carrinho</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="font-extrabold text-sm text-slate-900 mb-2">Descrição do Produto</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

        </div>

      </div>

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="text-emerald-600" />
                <h3 className="font-black text-lg text-slate-900">Tabela de Medidas (cm)</h3>
              </div>
              <button
                onClick={() => setShowSizeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-700">
                    <th className="p-2.5">Tamanho</th>
                    <th className="p-2.5">Largura (Peito)</th>
                    <th className="p-2.5">Comprimento</th>
                    <th className="p-2.5">Altura Recomendada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-2.5 font-black text-slate-800">P</td>
                    <td className="p-2.5">50 cm</td>
                    <td className="p-2.5">70 cm</td>
                    <td className="p-2.5">1,60m - 1,70m</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-slate-800">M</td>
                    <td className="p-2.5">52 cm</td>
                    <td className="p-2.5">72 cm</td>
                    <td className="p-2.5">1,70m - 1,75m</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-slate-800">G</td>
                    <td className="p-2.5">55 cm</td>
                    <td className="p-2.5">75 cm</td>
                    <td className="p-2.5">1,75m - 1,80m</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-slate-800">GG</td>
                    <td className="p-2.5">58 cm</td>
                    <td className="p-2.5">78 cm</td>
                    <td className="p-2.5">1,80m - 1,88m</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-black text-slate-800">XG</td>
                    <td className="p-2.5">62 cm</td>
                    <td className="p-2.5">81 cm</td>
                    <td className="p-2.5">1,85m - 1,95m</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              * Dica: Meça uma camisa que você já usa e compare com a largura e altura da tabela para escolher o tamanho ideal.
            </p>

            <button
              onClick={() => setShowSizeModal(false)}
              className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
            >
              Entendi, Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
