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
  ShieldCheck, 
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, storeConfig } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartao'>('Pix');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate WhatsApp message formatted cleanly
  const generateWhatsAppMessage = () => {
    let msg = `⚽ *NOVO PEDIDO - ${storeConfig.storeName}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (customerName.trim()) {
      msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    if (customerCity.trim()) {
      msg += `📍 *Cidade/UF:* ${customerCity.trim()}\n`;
    }
    if (customerAddress.trim()) {
      msg += `🏠 *Endereço:* ${customerAddress.trim()}\n`;
    }
    msg += `💳 *Forma de Pagamento:* ${paymentMethod}\n\n`;

    msg += `📦 *ITENS DO PEDIDO:*\n`;
    cart.forEach((item, index) => {
      msg += `\n${index + 1}. *${item.product.name}*\n`;
      msg += `   • Tamanho: *${item.size}*\n`;
      msg += `   • Quantidade: ${item.quantity}x\n`;
      if (item.customName || item.customNumber) {
        msg += `   • Personalização: ${item.customName || '-'} Nº ${item.customNumber || '-'}\n`;
      }
      if (item.includePatch) {
        msg += `   • Patch Oficial de Manga: Sim\n`;
      }
      msg += `   • Subtotal: R$ ${(item.unitPrice * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL DO PEDIDO: R$ ${cartTotal.toFixed(2)}*\n`;
    if (cart.length >= 2) {
      msg += `🎁 *FRETE:* Grátis (Promocional 2+ camisas)\n`;
    } else {
      msg += `🚚 *FRETE:* A calcular para minha região\n`;
    }

    if (notes.trim()) {
      msg += `\n📝 *Observações:* ${notes.trim()}\n`;
    }

    msg += `\nOlá! Gostaria de confirmar meu pedido e obter os dados para pagamento!`;
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingBag size={42} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Seu carrinho está vazio</h1>
        <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-md mx-auto">
          Explore as camisas dos maiores clubes e seleções do mundo e monte seu pedido!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/campeonatos"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition shadow-lg"
          >
            Ver Campeonatos
          </Link>
          <Link
            href="/selecoes"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition shadow-lg"
          >
            Ver Seleções
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Meu Carrinho de Compras
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {cart.reduce((total, i) => total + i.quantity, 0)} camisa(s) adicionada(s)
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition"
        >
          <Trash2 size={15} /> Limpar todo o carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-4 justify-between"
            >
              {/* Product Info */}
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                  {item.product.images && item.product.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">👕</span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      Tamanho: {item.size}
                    </span>
                    <span>•</span>
                    <span>{item.product.team}</span>
                  </div>

                  {/* Personalization notes */}
                  {(item.customName || item.customNumber) && (
                    <div className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg mt-2 inline-block font-semibold">
                      ✍️ {item.customName} Nº {item.customNumber}
                    </div>
                  )}
                  {item.includePatch && (
                    <div className="text-xs text-yellow-800 bg-yellow-50 px-2.5 py-1 rounded-lg mt-1 inline-block ml-1 font-semibold">
                      🏆 Patch de Manga
                    </div>
                  )}

                  <div className="mt-2 text-sm font-black text-slate-900">
                    R$ {item.unitPrice.toFixed(2)} cada
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-rose-600 transition p-1"
                  title="Remover item"
                >
                  <Trash2 size={16} />
                </button>

                <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-200 transition font-bold"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-xs font-black text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-200 transition font-bold"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-right font-black text-sm text-slate-900 sm:mt-2">
                  R$ {(item.unitPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          {/* Add more shirts prompt */}
          <Link
            href="/campeonatos"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition pt-2"
          >
            <ArrowLeft size={14} /> Adicionar mais mantos ao carrinho
          </Link>
        </div>

        {/* Right Column: Checkout Info & Direct WhatsApp Trigger */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <span>📋</span> Dados do Pedido
            </h2>

            {/* Customer Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Seu Nome Completo:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Eduardo da Silva"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Cidade / UF:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo / SP"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Forma de Pagamento:
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as 'Pix' | 'Cartao')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Pix">Pix (Aprovação imediata)</option>
                    <option value="Cartao">Cartão de Crédito</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Endereço de Entrega (Rua, Nº, Bairro, CEP):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Rua das Flores, 123 - Centro - CEP 01001-000"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Observações adicionais (opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Alguma dúvida, instrução especial ou modelo alternativo..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>

            {/* Total Calculation */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Subtotal dos produtos:</span>
                <span className="font-bold text-slate-900">R$ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Frete:</span>
                {cart.length >= 2 ? (
                  <span className="font-black text-emerald-600 uppercase">Grátis (Promocional)</span>
                ) : (
                  <span className="text-slate-500">Calculado no WhatsApp</span>
                )}
              </div>
              <div className="flex items-center justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Estimado:</span>
                <span className="text-2xl text-emerald-600">R$ {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/30 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle size={22} className="fill-white" />
              <span>Finalizar Pedido no WhatsApp</span>
            </button>

            {/* Copy text option */}
            <button
              onClick={handleCopyMessage}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Mensagem Copiada!' : 'Copiar Resumo do Pedido'}</span>
            </button>

            {/* Safety Notice */}
            <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                Compra direta e segura via WhatsApp oficial
              </p>
              <p>
                Ao clicar em finalizar, você será redirecionado para o WhatsApp com todos os detalhes do seu pedido prontos para envio.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
