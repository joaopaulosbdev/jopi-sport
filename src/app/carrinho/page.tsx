'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ArrowLeft, 
  Truck, 
  Copy, 
  Check,
  Zap,
  Tag
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, storeConfig } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartao'>('Pix');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [copied, setCopied] = useState(false);

  const freeShippingThreshold = 249;
  const freeShippingReached = cartTotal >= freeShippingThreshold || cart.length >= 2;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const discountAmount = couponApplied ? cartTotal * 0.1 : (paymentMethod === 'Pix' ? cartTotal * 0.05 : 0);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'VOLT10') {
      setCouponApplied(true);
    } else {
      alert('Cupom inválido. Experimente usar: VOLT10');
    }
  };

  const generateWhatsAppMessage = () => {
    let msg = `*NOVO PEDIDO - ${storeConfig.storeName.toUpperCase()}*\n`;
    msg += `-------------------------------------\n\n`;

    if (customerName.trim()) {
      msg += `Cliente: ${customerName.trim()}\n`;
    }
    if (customerCity.trim()) {
      msg += `Cidade/UF: ${customerCity.trim()}\n`;
    }
    if (customerAddress.trim()) {
      msg += `Endereço: ${customerAddress.trim()}\n`;
    }
    msg += `Pagamento: ${paymentMethod}${couponApplied ? ' (Cupom VOLT10 aplicado)' : ''}\n\n`;

    msg += `ITENS NA SACOLA:\n`;
    cart.forEach((item, index) => {
      const versionLabel = item.product.version === 'jogador' ? 'Match Issue' : 'Torcedor';
      msg += `\n${index + 1}. *${item.product.name}*\n`;
      msg += `   - Tam: ${item.size} | Qtd: ${item.quantity}x\n`;
      msg += `   - Versão: ${versionLabel}\n`;
      if (item.customName || item.customNumber) {
        msg += `   - Personalização: ${item.customName || '-'} Nº ${item.customNumber || '-'}\n`;
      }
      if (item.includePatch) {
        msg += `   - Patch Oficial de Manga: Sim\n`;
      }
      msg += `   - Subtotal: R$ ${(item.unitPrice * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n-------------------------------------\n`;
    msg += `*TOTAL FINAL: R$ ${finalTotal.toFixed(2)}*\n`;
    msg += `Frete: ${freeShippingReached ? 'GRÁTIS' : 'A calcular'}\n`;
    msg += `\nOlá! Quero confirmar meu pedido e prosseguir com o pagamento.`;
    return msg;
  };

  const handleCheckoutWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-12 py-16 text-center">
        <div className="bg-[#1e2021] border border-[#333537] p-12 max-w-lg mx-auto shadow-2xl">
          <div className="w-16 h-16 bg-[#0c0e10] border border-[#333537] text-[#d2f100] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-2xl font-bold uppercase text-white font-headline-md mb-2">
            Sua sacola está vazia
          </h1>
          <p className="text-sm text-[#c6c9ac] mb-8">
            Você ainda não adicionou nenhum manto à sua sacola. Explore os últimos lançamentos do drop!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#d2f100] text-[#121415] hover:bg-white font-black uppercase text-xs tracking-wider px-8 py-3.5 shadow-[0_0_20px_rgba(210,241,0,0.3)] transition-all"
          >
            <span>Explorar Mantos</span>
            <Zap size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-12 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#333537]">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 bg-[#1e2021] border border-[#333537] text-[#c6c9ac] hover:text-[#d2f100] transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-headline-md">
              MINHA SACOLA ({cart.length})
            </h1>
            <p className="text-xs text-[#c6c9ac] font-mono">
              Revise seus itens e finalize com atendimento direto
            </p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-mono uppercase text-[#ffb4ab] hover:underline flex items-center gap-1"
        >
          <Trash2 size={13} />
          <span>Esvaziar Sacola</span>
        </button>
      </div>

      {/* Free Shipping Progress Tracker */}
      <div className="bg-[#1e2021] border border-[#333537] p-4 mb-8">
        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase mb-2">
          <span className="flex items-center gap-2 text-white">
            <Truck size={16} className="text-[#d2f100]" />
            {freeShippingReached ? (
              <span className="text-[#d2f100]">PARABÉNS! VOCÊ ATINGIU O FRETE GRÁTIS</span>
            ) : (
              <span>FALTAM R$ {(freeShippingThreshold - cartTotal).toFixed(2).replace('.', ',')} PARA FRETE GRÁTIS</span>
            )}
          </span>
          <span className="text-[#d2f100]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#0c0e10] h-2 overflow-hidden border border-[#333537]">
          <div 
            className="bg-[#d2f100] h-full transition-all duration-500 shadow-[0_0_10px_rgba(210,241,0,0.6)]" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-[#1e2021] border border-[#333537] p-4 sm:p-5 flex gap-4 sm:gap-6 shadow-md"
            >
              {/* Thumbnail */}
              <div className="w-20 sm:w-24 aspect-[4/5] bg-[#0c0e10] border border-[#333537] overflow-hidden shrink-0">
                <img
                  src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80'}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold uppercase text-white">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#c6c9ac] hover:text-[#ffb4ab] transition-colors p-1"
                      title="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#c6c9ac] uppercase pt-1">
                    <span className="bg-[#0c0e10] border border-[#333537] px-2 py-0.5 text-white">
                      Tam: <strong className="text-[#d2f100]">{item.size}</strong>
                    </span>
                    <span className="bg-[#0c0e10] border border-[#333537] px-2 py-0.5">
                      {item.product.version === 'jogador' ? 'Match Issue' : 'Torcedor'}
                    </span>
                  </div>

                  {/* Personalization if any */}
                  {(item.customName || item.customNumber) && (
                    <div className="mt-2 text-[11px] font-mono bg-[#121415] border border-[#333537] px-2.5 py-1 text-[#d2f100]">
                      ⚡ Personalização: <strong>{item.customName || ''} #{item.customNumber || ''}</strong>
                    </div>
                  )}
                  {item.includePatch && (
                    <div className="mt-1 text-[11px] font-mono text-[#c6c9ac]">
                      + Patch Oficial de Manga
                    </div>
                  )}
                </div>

                {/* Quantity & Unit Price */}
                <div className="flex items-center justify-between pt-3 border-t border-[#333537]/50 mt-3">
                  <div className="flex items-center border border-[#333537] bg-[#0c0e10]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#c6c9ac] hover:text-white"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#c6c9ac] hover:text-white"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-[#d2f100] font-headline-sm text-xl font-bold">
                      R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Delivery & Checkout Form */}
          <div className="bg-[#1e2021] border border-[#333537] p-6 space-y-4 mt-6">
            <h3 className="font-headline-sm text-lg uppercase text-white font-bold flex items-center gap-2">
              <span className="w-2 h-4 bg-[#d2f100]" />
              Dados para Entrega (Opcional)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#c6c9ac] mb-1">Seu Nome</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#d2f100] px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#c6c9ac] mb-1">Cidade / UF</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo / SP"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#d2f100] px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#c6c9ac] mb-1">Endereço com CEP</label>
              <input
                type="text"
                placeholder="Rua, número, bairro e CEP"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#d2f100] px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2">
              <label className="block text-[11px] font-mono uppercase text-[#c6c9ac] mb-2">Forma de Pagamento</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Pix')}
                  className={`p-3 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'Pix'
                      ? 'bg-[#d2f100] text-[#121415] shadow-[0_0_12px_rgba(210,241,0,0.3)]'
                      : 'bg-[#0c0e10] text-[#c6c9ac] border border-[#333537] hover:border-[#d2f100]'
                  }`}
                >
                  <span>PIX (5% OFF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cartao')}
                  className={`p-3 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'Cartao'
                      ? 'bg-[#d2f100] text-[#121415] shadow-[0_0_12px_rgba(210,241,0,0.3)]'
                      : 'bg-[#0c0e10] text-[#c6c9ac] border border-[#333537] hover:border-[#d2f100]'
                  }`}
                >
                  <span>CARTÃO (ATÉ 12X)</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#1e2021] border border-[#333537] p-6 space-y-6 sticky top-28 shadow-2xl">
            <h3 className="font-headline-sm text-xl uppercase text-white font-bold pb-3 border-b border-[#333537]">
              Resumo do Pedido
            </h3>

            {/* Coupon field */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="CUPOM (Ex: VOLT10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-[#0c0e10] border border-[#333537] focus:border-[#d2f100] px-3 py-2 text-xs font-mono uppercase text-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#282a2c] hover:bg-[#d2f100] text-white hover:text-[#121415] px-4 py-2 text-xs font-mono font-bold uppercase transition-colors"
              >
                Aplicar
              </button>
            </form>
            {couponApplied && (
              <div className="text-[11px] font-mono text-[#d2f100] flex items-center gap-1">
                <Check size={13} />
                Cupom VOLT10 aplicado: 10% de desconto!
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-2 text-xs font-mono text-[#c6c9ac]">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((acc, i) => acc + i.quantity, 0)} itens):</span>
                <span className="text-white">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#d2f100]">
                  <span>Desconto ({couponApplied ? 'Cupom 10%' : 'PIX 5%'}):</span>
                  <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frete:</span>
                <span className={freeShippingReached ? 'text-[#d2f100] font-bold' : 'text-white'}>
                  {freeShippingReached ? 'GRÁTIS' : 'A calcular'}
                </span>
              </div>

              <div className="border-t border-[#333537] pt-3 flex justify-between items-baseline">
                <span className="font-headline-sm text-base text-white font-bold uppercase">Total:</span>
                <span className="text-[#d2f100] font-headline-sm text-3xl font-black">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#d2f100] hover:bg-white text-[#121415] hover:text-black py-4 font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(210,241,0,0.35)]"
              >
                <MessageCircle size={18} className="fill-[#121415]" />
                <span>Finalizar no WhatsApp</span>
              </button>

              <button
                onClick={handleCopyMessage}
                className="w-full flex items-center justify-center gap-2 bg-[#121415] hover:bg-[#282a2c] text-[#c6c9ac] hover:text-white border border-[#333537] py-3 text-xs font-mono font-bold uppercase transition-colors"
              >
                {copied ? <Check size={14} className="text-[#d2f100]" /> : <Copy size={14} />}
                <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Resumo do Pedido'}</span>
              </button>
            </div>

            {/* Security note */}
            <div className="text-[10px] font-mono text-[#c6c9ac]/70 text-center pt-2">
              🔒 Atendimento humano e seguro. Seus dados são usados apenas para envio do pedido.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
