'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  ShoppingBag, 
  MessageCircle, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Ruler,
  ArrowLeft,
  CheckCircle2,
  Clock
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
        <h1 className="text-2xl font-black uppercase text-neutral-900 mb-2">Camisa não encontrada</h1>
        <p className="text-xs sm:text-sm text-neutral-500 mb-6">
          O produto que você procura pode ter sido esgotado ou removido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-[#FFD900] text-xs font-black uppercase hover:bg-neutral-800 transition"
        >
          <ArrowLeft size={16} /> Voltar para a Página Inicial
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
    const versionLabel = product.version === 'jogador' ? 'Versão Jogador' : 'Versão Torcedor';
    const deliveryLabel = product.isReadyDelivery ? 'Pronta Entrega' : 'Sob Encomenda';
    let text = `Olá Jopi Sport Shop! Gostaria de comprar o seguinte manto:\n\n*${product.name}*\nTime: ${product.team}\nVersão: ${versionLabel}\nDisponibilidade: ${deliveryLabel}\nTamanho: ${selectedSize}`;

    if (customName.trim() || customNumber.trim()) {
      text += `\nPersonalização: ${customName.toUpperCase()} Nº ${customNumber}`;
    }
    if (includePatch) {
      text += `\nPatch Oficial de Manga: Sim (+R$ ${(product.patchPrice || 15).toFixed(2)})`;
    }

    text += `\n\nValor Total: R$ ${totalPrice.toFixed(2)}\n\nComo procedo com o pagamento via Pix e entrega?`;

    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-[#F4F5F7] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-neutral-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-black transition">Início</Link>
          <ChevronRight size={13} />
          <Link
            href={product.category === 'national' ? '/selecoes' : '/campeonatos'}
            className="hover:text-black transition uppercase"
          >
            {product.category === 'national' ? 'Seleções' : 'Campeonatos'}
          </Link>
          <ChevronRight size={13} />
          <Link
            href={product.category === 'national' ? `/selecoes/${product.subcategory}` : `/campeonatos/${product.subcategory}`}
            className="hover:text-black transition uppercase"
          >
            {product.subcategory}
          </Link>
          <ChevronRight size={13} />
          <span className="text-black font-extrabold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Product Box Container */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            
            {/* Left Column: Gallery & Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F8F9FA] border border-neutral-200 flex items-center justify-center p-6">
                {product.images && product.images.length > 0 && !imageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 rounded-lg">
                    <span className="text-xl font-black uppercase text-[#FFD900] text-center tracking-wide">
                      {product.team}
                    </span>
                    <span className="text-xs text-neutral-400 mt-1 font-bold">Temporada {product.season}</span>
                  </div>
                )}

                {/* Badge Overlays (Dynamic, following registration) */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {discount > 0 && (
                    <span className="bg-black text-[#FFD900] text-xs font-black uppercase px-2.5 py-1 rounded shadow">
                      -{discount}% OFF
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#FFD900] text-black text-xs font-black uppercase px-2.5 py-1 rounded shadow">
                      LANÇAMENTO
                    </span>
                  )}
                  <span className={`text-xs font-black uppercase px-2.5 py-1 rounded shadow ${
                    product.isReadyDelivery 
                      ? 'bg-[#E8F8EE] text-[#008A3E] border border-[#008A3E]/30' 
                      : 'bg-neutral-100 text-neutral-700 border border-neutral-300'
                  }`}>
                    {product.isReadyDelivery ? 'PRONTA ENTREGA' : 'SOB ENCOMENDA'}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className={`text-xs font-black uppercase px-2.5 py-1 rounded shadow ${
                    product.version === 'jogador'
                      ? 'bg-black text-[#FFD900]'
                      : 'bg-neutral-200 text-neutral-800'
                  }`}>
                    {product.version === 'jogador' ? 'VERSÃO JOGADOR' : 'VERSÃO TORCEDOR'}
                  </span>
                </div>

                {/* Live Personalization Watermark Preview */}
                {(customName.trim() || customNumber.trim()) && (
                  <div className="absolute bottom-4 right-4 bg-black/90 text-white p-3.5 rounded-xl text-center border-2 border-[#FFD900] shadow-2xl">
                    <span className="text-[10px] text-[#FFD900] font-black block uppercase tracking-widest">
                      PREVIEW DA PERSONALIZAÇÃO
                    </span>
                    <div className="font-black text-sm uppercase tracking-wider text-white mt-0.5">
                      {customName || 'SEU NOME'}
                    </div>
                    <div className="font-black text-3xl text-[#FFD900] font-mono leading-none mt-1">
                      {customNumber || '10'}
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveImageIndex(index);
                        setImageError(false);
                      }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        activeImageIndex === index ? 'border-black' : 'border-neutral-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-100 text-center">
                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-neutral-200">
                  <ShieldCheck size={20} className="mx-auto text-black mb-1" />
                  <span className="text-[11px] font-black text-black uppercase block">Qualidade 1:1</span>
                  <span className="text-[10px] text-neutral-500">Bordados e Costuras</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-neutral-200">
                  <Truck size={20} className="mx-auto text-black mb-1" />
                  <span className="text-[11px] font-black text-black uppercase block">Frete Grátis</span>
                  <span className="text-[10px] text-neutral-500">A partir de 2 peças</span>
                </div>
                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-neutral-200">
                  <RotateCcw size={20} className="mx-auto text-black mb-1" />
                  <span className="text-[11px] font-black text-black uppercase block">Garantia 7 Dias</span>
                  <span className="text-[10px] text-neutral-500">Troca sem burocracia</span>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Configuration */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase text-neutral-500 mb-1">
                  <span className="text-black font-extrabold">{product.team}</span>
                  <span>•</span>
                  <span>Temporada {product.season}</span>
                  <span>•</span>
                  <span className="text-black">{product.version === 'jogador' ? 'Versão Jogador' : 'Versão Torcedor'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price Block */}
              <div className="bg-[#F8F9FA] border-2 border-neutral-200 rounded-xl p-5">
                {product.originalPrice && (
                  <div className="text-xs text-neutral-400 line-through">
                    De: R$ {(product.originalPrice + customizationFee + patchFee).toFixed(2)}
                  </div>
                )}
                
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-black uppercase text-[#008A3E] bg-[#E8F8EE] px-2 py-0.5 rounded">
                    no Pix
                  </span>
                </div>

                <p className="text-xs text-neutral-600 font-bold mt-1">
                  ou até 3x de R$ {(totalPrice / 3).toFixed(2)} sem juros no Pix ou Cartão
                </p>

                <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-bold">
                  <span className="text-black flex items-center gap-1.5">
                    <Truck size={15} className="text-[#FFD900] stroke-[2.5]" />
                    <span>Envio para todo o Brasil</span>
                  </span>
                  <span className={`font-black uppercase flex items-center gap-1 ${
                    product.isReadyDelivery ? 'text-[#008A3E]' : 'text-neutral-700'
                  }`}>
                    {product.isReadyDelivery ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Pronta Entrega</span>
                      </>
                    ) : (
                      <>
                        <Clock size={14} />
                        <span>Sob Encomenda</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-wider text-black">
                    1. SELECIONE O TAMANHO: <span className="text-neutral-500 font-bold">{selectedSize}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSizeModal(true)}
                    className="text-xs font-black uppercase text-black hover:text-[#B29200] flex items-center gap-1 underline"
                  >
                    <Ruler size={13} /> Guia de Medidas
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg font-black text-sm border-2 transition ${
                        selectedSize === size
                          ? 'border-black bg-black text-[#FFD900] shadow-md'
                          : 'border-neutral-300 bg-white text-neutral-800 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalization: Name and Number */}
              <div className="bg-[#F8F9FA] border border-neutral-300 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-black">
                    2. PERSONALIZAR NOME E NÚMERO (+R$ {(product.customizationPrice || 20).toFixed(2)})
                  </label>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase bg-neutral-200 px-1.5 py-0.5 rounded">
                    Opcional
                  </span>
                </div>

                <p className="text-xs text-neutral-500 font-medium">
                  Estampa com fonte e numeração padrão do time.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="NOME (EX: SEU NOME OU JOGADOR)"
                      value={customName}
                      maxLength={14}
                      onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs font-black text-black placeholder-neutral-400 focus:outline-none focus:border-black uppercase"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nº"
                      value={customNumber}
                      maxLength={2}
                      onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs font-black text-center text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Sleeve Patch Option */}
              <div className="bg-white border border-neutral-300 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase text-black">
                    Patch Oficial de Manga
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-medium">
                    +R$ {(product.patchPrice || 15).toFixed(2)} (Ex: Champions League, Libertadores, Brasileirão)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePatch}
                    onChange={(e) => setIncludePatch(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleWhatsAppBuy}
                  disabled={!product.inStock}
                  className="w-full py-4 px-6 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] disabled:opacity-40 text-black font-black text-base uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={22} className="fill-black text-black" />
                  <span>COMPRAR AGORA NO WHATSAPP</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-lg font-black text-xs uppercase tracking-wider border-2 flex items-center justify-center gap-2 transition ${
                    added
                      ? 'bg-black border-black text-[#FFD900]'
                      : 'bg-white border-black text-black hover:bg-neutral-100'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={18} className="stroke-[3]" />
                      <span>ADICIONADO AO SEU CARRINHO!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>ADICIONAR AO CARRINHO</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="font-black text-xs uppercase tracking-wider text-black mb-2">
                  DETALHES DO PRODUTO
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="text-black" />
                <h3 className="font-black text-base uppercase text-black">Tabela de Medidas (cm)</h3>
              </div>
              <button
                onClick={() => setShowSizeModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-black hover:bg-neutral-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-[#F8F9FA] font-black text-black uppercase text-[11px]">
                    <th className="p-3">Tamanho</th>
                    <th className="p-3">Largura</th>
                    <th className="p-3">Comprimento</th>
                    <th className="p-3">Altura Recomendada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  <tr>
                    <td className="p-3 font-black text-black">P</td>
                    <td className="p-3">50 cm</td>
                    <td className="p-3">70 cm</td>
                    <td className="p-3">1,60m - 1,70m</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-black">M</td>
                    <td className="p-3">52 cm</td>
                    <td className="p-3">72 cm</td>
                    <td className="p-3">1,70m - 1,75m</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-black">G</td>
                    <td className="p-3">55 cm</td>
                    <td className="p-3">75 cm</td>
                    <td className="p-3">1,75m - 1,80m</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-black">GG</td>
                    <td className="p-3">58 cm</td>
                    <td className="p-3">78 cm</td>
                    <td className="p-3">1,80m - 1,88m</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-black text-black">XG</td>
                    <td className="p-3">62 cm</td>
                    <td className="p-3">81 cm</td>
                    <td className="p-3">1,85m - 1,95m</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-neutral-500 mt-4 font-medium">
              * Dica: Compare as medidas com uma camisa que você já usa habitualmente para garantir o caimento ideal.
            </p>

            <button
              onClick={() => setShowSizeModal(false)}
              className="mt-6 w-full py-3 bg-black text-[#FFD900] rounded-lg text-xs font-black uppercase hover:bg-neutral-800 transition"
            >
              Fechar Guia
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
