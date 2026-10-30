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
  Ruler, 
  ArrowLeft, 
  Sparkles,
  Zap,
  CheckCircle2,
  Lock
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
        <div className="bg-[#1e2021] border border-[#333537] p-12 max-w-lg mx-auto shadow-2xl">
          <h1 className="text-2xl font-bold uppercase text-white font-headline-md mb-2">
            Manto não encontrado
          </h1>
          <p className="text-xs text-[#c6c9ac] mb-6">
            O manto que você procura pode ter esgotado ou sido movido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD900] text-[#121415] text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow"
          >
            <ArrowLeft size={16} /> Voltar para o Início
          </Link>
        </div>
      </div>
    );
  }

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
    const versionLabel = product.version === 'jogador' ? 'Match Issue (Jogador)' : 'Torcedor Oficial';
    const deliveryLabel = product.isReadyDelivery ? 'Pronta Entrega' : 'Sob Encomenda';
    let text = `Olá Jopi Sport! Gostaria de comprar o seguinte manto:\n\n*${product.name}*\nTime: ${product.team}\nVersão: ${versionLabel}\nDisponibilidade: ${deliveryLabel}\nTamanho: ${selectedSize}`;

    if (customName.trim() || customNumber.trim()) {
      text += `\nPersonalização: ${customName.toUpperCase()} Nº ${customNumber}`;
    }
    if (includePatch) {
      text += `\nPatch Oficial de Manga: Sim (+R$ ${(product.patchPrice || 15).toFixed(2)})`;
    }

    text += `\n\nValor Total: R$ ${totalPrice.toFixed(2)}\n\nComo procedo com o pagamento e envio?`;

    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const fallbackImage = 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80';
  const displayImage = imageError || !product.images?.[activeImageIndex] ? fallbackImage : product.images[activeImageIndex];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#c6c9ac] uppercase mb-8">
          <Link href="/" className="hover:text-[#FFD900] transition-colors">Início</Link>
          <span>/</span>
          <Link href="/campeonatos" className="hover:text-[#FFD900] transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-[#FFD900] truncate max-w-xs sm:max-w-sm">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="relative aspect-[4/5] bg-[#0c0e10] border border-[#333537] overflow-hidden shadow-2xl">
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {discount > 0 && (
                  <span className="bg-[#FFD900] text-[#121415] text-xs font-black uppercase px-2.5 py-1 tracking-wider shadow">
                    -{discount}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-[#121415] text-[#FFD900] border border-[#FFD900] text-xs font-black uppercase px-2.5 py-1 tracking-wider">
                    DROP 2024/25
                  </span>
                )}
                <span className="bg-[#1e2021] text-white border border-[#333537] text-[10px] font-mono uppercase px-2 py-0.5">
                  {product.version === 'jogador' ? 'ED. MATCH ISSUE' : 'ED. TORCEDOR'}
                </span>
              </div>

              {/* Ready Delivery Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="flex items-center gap-1.5 bg-[#0c0e10]/90 border border-[#333537] text-[#FFD900] text-xs font-bold uppercase px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#FFD900] animate-pulse" />
                  {product.isReadyDelivery ? 'Pronta Entrega' : 'Sob Encomenda'}
                </span>
              </div>

              <img
                src={displayImage}
                alt={product.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>

            {/* Thumbnail selector if multiple images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 aspect-square bg-[#0c0e10] border transition-all overflow-hidden shrink-0 ${
                      activeImageIndex === idx ? 'border-[#FFD900] shadow-[0_0_10px_rgba(255, 217, 0,0.4)]' : 'border-[#333537] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Garment Specs */}
            <div className="bg-[#1e2021] border border-[#333537] p-6 space-y-4">
              <h3 className="font-headline-sm text-lg uppercase text-white font-bold flex items-center gap-2">
                <span className="w-2 h-4 bg-[#FFD900]" />
                Especificações do Manto
              </h3>
              <p className="text-xs sm:text-sm text-[#c6c9ac] leading-relaxed">
                {product.description || 'Manto confeccionado com tecido de alta tecnologia dry-fit para máxima ventilação, leveza e durabilidade. Escudo e detalhes com acabamento de precisão.'}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#333537]/50 text-xs font-mono">
                <div>
                  <span className="text-[#c6c9ac] block text-[10px] uppercase">Gênero:</span>
                  <span className="text-white font-bold">Unissex Adulto</span>
                </div>
                <div>
                  <span className="text-[#c6c9ac] block text-[10px] uppercase">Tecnologia:</span>
                  <span className="text-white font-bold">AeroDry Pro</span>
                </div>
                <div>
                  <span className="text-[#c6c9ac] block text-[10px] uppercase">Composição:</span>
                  <span className="text-white font-bold">100% Poliéster</span>
                </div>
                <div>
                  <span className="text-[#c6c9ac] block text-[10px] uppercase">Origem:</span>
                  <span className="text-white font-bold">Importado Match</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Purchasing & Personalization */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-[#333537] pb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFD900] uppercase tracking-wider">
                <span>{product.team}</span>
                <span>•</span>
                <span>{product.season || '2024/25'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white font-headline-md leading-tight">
                {product.name}
              </h1>

              {/* Price block */}
              <div className="pt-2">
                {product.originalPrice && (
                  <div className="text-xs text-[#c6c9ac] line-through font-mono">
                    De R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </div>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="text-[#FFD900] font-headline-sm text-4xl font-black">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs font-mono text-white bg-[#1e2021] border border-[#333537] px-2 py-0.5 uppercase">
                    5% OFF NO PIX: R$ {(totalPrice * 0.95).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="text-xs text-[#c6c9ac] font-mono pt-1">
                  ou parcele em até <strong className="text-white">12x de R$ {(totalPrice / 12).toFixed(2).replace('.', ',')}</strong>
                </div>
              </div>
            </div>

            {/* Sizing Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white uppercase font-bold">Selecione o Tamanho:</span>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="text-[#FFD900] hover:underline flex items-center gap-1 uppercase font-bold"
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
                    className={`h-12 text-sm font-mono font-bold transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? 'bg-[#FFD900] text-[#121415] shadow-[0_0_12px_rgba(255, 217, 0,0.35)]'
                        : 'bg-[#1e2021] text-white border border-[#333537] hover:border-[#FFD900]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Jersey Personalization Module (Stitch Hallmark Feature) */}
            <div className="bg-[#1e2021] border border-[#333537] p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FFD900]" />
                  <span className="text-xs font-mono font-black uppercase text-white tracking-wider">
                    Personalização Profissional (+R$ 20,00)
                  </span>
                </div>
                {(customName.trim() || customNumber.trim()) && (
                  <button
                    onClick={() => {
                      setCustomName('');
                      setCustomNumber('');
                    }}
                    className="text-[10px] font-mono text-[#ffb4ab] hover:underline uppercase"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Real-time Kit Back Preview */}
              <div className="bg-[#0c0e10] border border-[#333537] p-4 text-center space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#c6c9ac]">PRÉVIA DAS COSTAS:</div>
                <div className="font-headline-sm text-xl uppercase tracking-widest text-[#FFD900]">
                  {customName.trim() ? customName.toUpperCase() : 'SEU NOME'}
                </div>
                <div className="font-headline-sm text-5xl font-black text-white">
                  {customNumber.trim() ? customNumber : '10'}
                </div>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#c6c9ac] mb-1">
                    Nome na Camisa
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    placeholder="Ex: SILVA"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#FFD900] px-3 py-2 text-xs font-mono uppercase text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#c6c9ac] mb-1">
                    Número (Até 2 dígitos)
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="Ex: 9"
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#FFD900] px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Patch option */}
              <label className="flex items-center gap-3 pt-2 cursor-pointer border-t border-[#333537]/60">
                <input
                  type="checkbox"
                  checked={includePatch}
                  onChange={(e) => setIncludePatch(e.target.checked)}
                  className="w-4 h-4 accent-[#FFD900]"
                />
                <span className="text-xs font-mono text-[#e2e2e4]">
                  Incluir Patch Oficial de Manga (+R$ 15,00)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255, 217, 0,0.3)] ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#FFD900] hover:bg-white text-[#121415] hover:text-black'
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} className="stroke-[3]" />
                    <span>Adicionado à Sacola!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} className="stroke-[2.5]" />
                    <span>Adicionar à Sacola</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="w-full py-3.5 bg-[#1e2021] hover:bg-[#282a2c] text-white hover:text-[#FFD900] border border-[#333537] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={18} className="text-[#FFD900]" />
                <span>Comprar Direto no WhatsApp</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="bg-[#121415] border border-[#333537] p-4 grid grid-cols-2 gap-3 text-xs font-mono text-[#c6c9ac]">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#FFD900] shrink-0" />
                <span>Envio em 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#FFD900] shrink-0" />
                <span>Garantia Total</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Sizing Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2021] border border-[#333537] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#333537]">
              <h3 className="font-headline-sm text-lg font-bold uppercase text-white">
                Tabela de Medidas (Cm)
              </h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-[#c6c9ac] hover:text-white text-lg font-mono font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left text-[#c6c9ac]">
                <thead className="bg-[#0c0e10] text-[#FFD900] uppercase">
                  <tr>
                    <th className="p-2 border border-[#333537]">Tamanho</th>
                    <th className="p-2 border border-[#333537]">Largura (Tórax)</th>
                    <th className="p-2 border border-[#333537]">Comprimento</th>
                    <th className="p-2 border border-[#333537]">Peso Sugerido</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-[#333537] font-bold text-white">P</td>
                    <td className="p-2 border border-[#333537]">50 - 52 cm</td>
                    <td className="p-2 border border-[#333537]">70 - 72 cm</td>
                    <td className="p-2 border border-[#333537]">55 - 68 kg</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#333537] font-bold text-white">M</td>
                    <td className="p-2 border border-[#333537]">53 - 55 cm</td>
                    <td className="p-2 border border-[#333537]">73 - 75 cm</td>
                    <td className="p-2 border border-[#333537]">68 - 78 kg</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#333537] font-bold text-white">G</td>
                    <td className="p-2 border border-[#333537]">56 - 58 cm</td>
                    <td className="p-2 border border-[#333537]">76 - 78 cm</td>
                    <td className="p-2 border border-[#333537]">78 - 88 kg</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#333537] font-bold text-white">GG</td>
                    <td className="p-2 border border-[#333537]">59 - 61 cm</td>
                    <td className="p-2 border border-[#333537]">79 - 81 cm</td>
                    <td className="p-2 border border-[#333537]">88 - 98 kg</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#333537] font-bold text-white">XG</td>
                    <td className="p-2 border border-[#333537]">62 - 64 cm</td>
                    <td className="p-2 border border-[#333537]">82 - 84 cm</td>
                    <td className="p-2 border border-[#333537]">98 - 110 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#c6c9ac]">
              * As medidas podem variar até 2cm para mais ou para menos. Em caso de dúvida, sugerimos pedir um tamanho maior.
            </p>

            <button
              onClick={() => setShowSizeModal(false)}
              className="w-full py-2.5 bg-[#FFD900] text-[#121415] font-black uppercase text-xs"
            >
              Fechar Tabela
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
