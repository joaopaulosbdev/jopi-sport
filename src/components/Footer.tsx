'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/contexts/StoreContext';
import { championships, nationalTeams } from '@/data/categories';
import { 
  MessageCircle, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Phone,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const { storeConfig } = useStore();

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport! Vim pelo site e gostaria de saber mais informações.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Floating WhatsApp Action Button */}
      <button
        onClick={handleWhatsAppContact}
        className="fixed bottom-5 right-5 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-500/50 flex items-center gap-2 font-black transition-all transform hover:scale-110 active:scale-95 group"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle size={24} className="fill-white group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-sm font-extrabold">Fale no WhatsApp</span>
      </button>

      {/* Trust Info strip */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Envio para Todo Brasil</h4>
                <p className="text-xs text-slate-400 mt-0.5">Frete seguro com código de rastreamento Correios</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-yellow-500/10 text-yellow-400 rounded-xl">
                <CreditCard size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Pagamento Facilitado</h4>
                <p className="text-xs text-slate-400 mt-0.5">Pix com aprovação imediata ou cartão</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Qualidade Garantida</h4>
                <p className="text-xs text-slate-400 mt-0.5">Camisas com bordados e tecidos oficiais 1:1</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <RotateCcw size={22} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-100">Garantia e Suporte</h4>
                <p className="text-xs text-slate-400 mt-0.5">Atendimento rápido e direto no WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-lg">
                  ⚽
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight">
                JOPI<span className="text-emerald-400">SPORT</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Sua loja especializada em mantos de futebol. Camisas clássicas, titulares, reservas e edições especiais das maiores ligas do planeta.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-bold transition"
              >
                <Phone size={14} />
                <span>{storeConfig.whatsappNumber}</span>
              </button>

              {storeConfig.instagram && (
                <a
                  href={`https://instagram.com/${storeConfig.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Campeonatos */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Campeonatos
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {championships.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/campeonatos/${c.slug}`} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/campeonatos" className="text-emerald-400 text-xs font-bold hover:underline block pt-1">
                  Ver todos os campeonatos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Seleções */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Seleções
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {nationalTeams.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/selecoes/${s.slug}`} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/selecoes" className="text-emerald-400 text-xs font-bold hover:underline block pt-1">
                  Ver todas as seleções →
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Rápidos / Ajuda */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Atendimento
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/carrinho" className="hover:text-emerald-400 transition">
                  Carrinho de Compras
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="hover:text-yellow-400 transition">
                  Ofertas da Semana
                </Link>
              </li>
              <li>
                <Link href="/lancamentos" className="hover:text-emerald-400 transition">
                  Lançamentos 2025/26
                </Link>
              </li>
              <li>
                <button onClick={handleWhatsAppContact} className="hover:text-emerald-400 transition text-left">
                  Tirar dúvidas no WhatsApp
                </button>
              </li>
              <li className="pt-2">
                <Link href="/admin/login" className="text-xs text-slate-400 hover:text-slate-300 font-medium">
                  🔒 Acesso Restrito Admin
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {storeConfig.storeName} - Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito para os apaixonados por futebol ⚽
          </p>
        </div>
      </div>
    </footer>
  );
}
