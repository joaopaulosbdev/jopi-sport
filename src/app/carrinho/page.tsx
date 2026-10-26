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
  ClipboardList
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, storeConfig } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartao'>('Pix');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

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
    msg += `Forma de Pagamento: ${paymentMethod}\n\n`;

    msg += `ITENS DO PEDIDO:\n`;
    cart.forEach((item, index) => {
      const versionLabel = item.product.version === 'jogador' ? 'Versão Jogador' : 'Versão Torcedor';
      const deliveryLabel = item.product.isReadyDelivery ? 'Pronta Entrega' : 'Sob Encomenda';

      msg += `\n${index + 1}. *${item.product.name}*\n`;
      msg += `   - Tamanho: ${item.size}\n`;
      msg += `   - Quantidade: ${item.quantity}x\n`;
      msg += `   - Tipo: ${versionLabel} | ${deliveryLabel}\n`;
      if (item.customName || item.customNumber) {
        msg += `   - Personalização: ${item.customName || '-'} Nº ${item.customNumber || '-'}\n`;
      }
      if (item.includePatch) {
        msg += `   - Patch Oficial de Manga: Sim\n`;
      }
      msg += `   - Subtotal: R$ ${(item.unitPrice * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n-------------------------------------\n`;
    msg += `*TOTAL DO PEDIDO: R$ ${cartTotal.toFixed(2)}*\n`;
    if (cart.length >= 2) {
      msg += `Frete: Grátis (Promocional 2+ camisas)\n`;
    } else {
      msg += `Frete: A calcular para minha região\n`;
    }

    if (notes.trim()) {
      msg += `\nObservações: ${notes.trim()}\n`;
    }

    msg += `\nOlá! Gostaria de confirmar meu pedido e obter a chave Pix para pagamento.`;
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
      <div className="bg-[#F4F5F7] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center max-w-md w-full shadow-sm">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-5 text-black">
            <ShoppingBag size={36} />
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase text-black mb-1">Seu carrinho está vazio</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mb-6 font-medium">
            Aproveite nossa coleção e monte seu pedido com frete grátis a partir de 2 camisas!
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/campeonatos"
              className="py-3 px-6 rounded-lg bg-black text-[#FFD900] font-black text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
            >
              VER CAMPEONATOS
            </Link>
            <Link
              href="/selecoes"
              className="py-3 px-6 rounded-lg bg-[#FFD900] text-black font-black text-xs uppercase tracking-wider hover:bg-[#E6C300] transition"
            >
              VER SELEÇÕES
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F5F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#FFD900] rounded-sm" />
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
                MEU CARRINHO DE COMPRAS
              </h1>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5 pl-4 font-medium">
              {cart.reduce((total, i) => total + i.quantity, 0)} camisa(s) selecionada(s)
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-bold text-neutral-500 hover:text-black flex items-center gap-1.5 transition"
          >
            <Trash2 size={14} /> Esvaziar carrinho
          </button>
        </div>

        {/* Free Shipping Strip */}
        <div className="bg-[#FFFBE6] border border-[#FFD900] rounded-xl p-3.5 mb-6 flex items-center justify-between text-xs font-bold text-black">
          <div className="flex items-center gap-2">
            <Truck size={18} className="text-black" />
            <span>
              {cart.length >= 2 ? (
                <strong className="text-black uppercase">VOCÊ GANHOU FRETE GRÁTIS NESTE PEDIDO!</strong>
              ) : (
                <span>Adicione mais 1 camisa ao carrinho e <strong>GANHE FRETE GRÁTIS</strong>!</span>
              )}
            </span>
          </div>
          <span className="bg-black text-[#FFD900] text-[10px] font-black px-2 py-0.5 rounded">
            {cart.length >= 2 ? 'QUALIFICADO' : 'FALTA 1'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-7 space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-[#F8F9FA] rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-neutral-200">
                    {item.product.images && item.product.images.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold uppercase text-black">Manto</span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-sm text-black leading-snug uppercase">
                      {item.product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-neutral-600">
                      <span className="font-extrabold text-black bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                        Tam: {item.size}
                      </span>
                      <span>•</span>
                      <span>{item.product.team}</span>
                      <span>•</span>
                      <span className="font-bold text-neutral-700">
                        {item.product.version === 'jogador' ? 'Versão Jogador' : 'Versão Torcedor'}
                      </span>
                      <span>•</span>
                      <span className={item.product.isReadyDelivery ? 'text-[#008A3E] font-bold' : 'text-neutral-600'}>
                        {item.product.isReadyDelivery ? 'Pronta Entrega' : 'Sob Encomenda'}
                      </span>
                    </div>

                    {(item.customName || item.customNumber) && (
                      <div className="text-[11px] text-black bg-[#FFFBE6] border border-[#FFD900]/40 px-2 py-0.5 rounded mt-1.5 inline-block font-bold">
                        Personalização: {item.customName} Nº {item.customNumber}
                      </div>
                    )}
                    {item.includePatch && (
                      <div className="text-[11px] text-black bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded mt-1.5 inline-block ml-1 font-bold">
                        Patch Oficial
                      </div>
                    )}

                    <div className="mt-2 text-sm font-black text-black">
                      R$ {item.unitPrice.toFixed(2)} cada
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-400 hover:text-black transition"
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1 border border-neutral-200">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-white rounded flex items-center justify-center text-black hover:bg-neutral-200 transition font-bold"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-xs font-black text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-white rounded flex items-center justify-center text-black hover:bg-neutral-200 transition font-bold"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="font-black text-base text-black">
                    R$ {(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/campeonatos"
              className="inline-flex items-center gap-2 text-xs font-black uppercase text-black hover:text-[#B29200] pt-2"
            >
              <ArrowLeft size={14} /> Continuar Comprando Mais Camisas
            </Link>
          </div>

          {/* Right Column: Order Summary & WhatsApp Checkout */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-black uppercase text-black pb-3 border-b border-neutral-100 flex items-center gap-2">
                <ClipboardList size={18} />
                <span>Resumo do Pedido</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Nome Completo:
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome para o envio..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                      Cidade / UF:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: São Paulo / SP"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                      Forma de Pagamento:
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black font-bold"
                    >
                      <option value="Pix">Pix (Aprovação rápida)</option>
                      <option value="Cartao">Cartão de Crédito</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Endereço de Entrega (Rua, Nº, Bairro, CEP):
                  </label>
                  <input
                    type="text"
                    placeholder="Rua, Número, Bairro e CEP..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Observações adicionais (opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Embalagem para presente, etc..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black font-medium"
                  />
                </div>
              </div>

              {/* Subtotals & Total */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal das Camisas:</span>
                  <span className="font-bold text-black">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Frete para sua Região:</span>
                  {cart.length >= 2 ? (
                    <span className="font-black text-[#008A3E] uppercase">GRÁTIS (2+ PEÇAS)</span>
                  ) : (
                    <span className="text-neutral-500 font-bold">A calcular no WhatsApp</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-base font-black text-black pt-2 border-t border-neutral-100">
                  <span>TOTAL ESTIMADO:</span>
                  <span className="text-2xl text-black">R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-4 px-6 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
              >
                <MessageCircle size={20} className="fill-black" />
                <span>FINALIZAR PEDIDO NO WHATSAPP</span>
              </button>

              <button
                onClick={handleCopyMessage}
                className="w-full py-2.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-black text-xs font-black uppercase flex items-center justify-center gap-1.5 transition"
              >
                {copied ? <Check size={14} className="text-[#008A3E]" /> : <Copy size={14} />}
                <span>{copied ? 'MENSAGEM COPIADA!' : 'COPIAR RESUMO DO PEDIDO'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
