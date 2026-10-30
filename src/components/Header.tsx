'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  MessageCircle,
  Truck,
  Flame,
  Globe2,
  Trophy,
  History,
  Sparkles
} from 'lucide-react';

export default function Header() {
  const { storeConfig, cartCount, cartTotal, searchQuery, setSearchQuery, categories } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [championshipsDropdown, setChampionshipsDropdown] = useState(false);
  const [nationalDropdown, setNationalDropdown] = useState(false);
  const pathname = usePathname();

  const championships = categories.filter((c) => c.type === 'championship');
  const nationalTeams = categories.filter((c) => c.type === 'national');

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport! Gostaria de atendimento sobre as camisas do catálogo.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#121415]/95 backdrop-blur-xl border-b border-[#333537]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      {/* Top Banner Ticker - Stitch Volt Edition */}
      <div className="bg-[#0c0e10] py-1.5 px-4 lg:px-12 border-b border-[#333537]/40 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-label-sm text-[#c6c9ac] uppercase tracking-widest text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#d2f100] animate-pulse"></span>
            <span className="hidden sm:inline font-bold">Transmissão Oficial Volt Drop</span>
          </div>

          <div className="font-label-sm text-[11px] uppercase font-bold text-[#d2f100] tracking-wider truncate px-2 text-center">
            FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 249 | CUPOM <span className="bg-[#d2f100] text-[#191e00] px-1.5 py-0.5 font-black text-[10px]">VOLT10</span>
          </div>

          <div className="hidden md:flex items-center gap-4 font-label-sm text-[11px] text-[#c6c9ac]">
            <button 
              onClick={handleWhatsAppContact}
              className="hover:text-[#d2f100] transition-colors uppercase font-bold flex items-center gap-1"
            >
              <MessageCircle size={12} className="text-[#d2f100]" />
              Suporte WhatsApp
            </button>
            <span className="text-[#47464a]">|</span>
            <span className="text-[#c6c9ac]">100% GARANTIA DE ENTREGA</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo - High Performance Pitch Volt */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-[#d2f100] flex items-center justify-center font-black text-[#121415] text-xl tracking-tighter shadow-[0_0_15px_rgba(210,241,0,0.4)] group-hover:bg-white transition-all">
            ⚡
          </div>
          <div className="flex flex-col">
            <div className="flex items-center leading-none">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-headline-sm">
                JOPI
              </span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#d2f100] ml-1.5 font-headline-sm">
                SPORT
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-0.5 w-3 bg-[#d2f100]" />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#c6c9ac]">
                VOLT DROP CULTURE
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider text-[#c6c9ac]">
          <Link 
            href="/" 
            className={`transition-colors py-1 ${pathname === '/' ? 'text-[#d2f100] border-b-2 border-[#d2f100]' : 'hover:text-white'}`}
          >
            Início
          </Link>
          <Link 
            href="/lancamentos" 
            className={`transition-colors py-1 flex items-center gap-1 ${pathname === '/lancamentos' ? 'text-[#d2f100] border-b-2 border-[#d2f100]' : 'hover:text-white'}`}
          >
            <Sparkles size={13} className="text-[#d2f100]" />
            Lançamentos
          </Link>

          {/* Campeonatos / Nacionais Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setChampionshipsDropdown(true)}
            onMouseLeave={() => setChampionshipsDropdown(false)}
          >
            <Link 
              href="/campeonatos"
              className={`flex items-center gap-1 py-1 transition-colors ${pathname.startsWith('/campeonatos') ? 'text-[#d2f100] border-b-2 border-[#d2f100]' : 'hover:text-white'}`}
            >
              <span>Clubes</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${championshipsDropdown ? 'rotate-180 text-[#d2f100]' : ''}`} />
            </Link>

            {championshipsDropdown && (
              <div className="absolute top-full left-0 w-64 bg-[#1e2021] border border-[#333537] p-2 shadow-2xl z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#d2f100] tracking-widest border-b border-[#333537]/60">
                  Ligas e Torneios
                </div>
                <div className="py-1">
                  {championships.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/campeonatos/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-xs text-[#e2e2e4] hover:bg-[#282a2c] hover:text-[#d2f100] transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-[#c6c9ac]">➔</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Seleções Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setNationalDropdown(true)}
            onMouseLeave={() => setNationalDropdown(false)}
          >
            <Link 
              href="/selecoes"
              className={`flex items-center gap-1 py-1 transition-colors ${pathname.startsWith('/selecoes') ? 'text-[#d2f100] border-b-2 border-[#d2f100]' : 'hover:text-white'}`}
            >
              <Globe2 size={13} className="text-[#c6c9ac]" />
              <span>Seleções</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${nationalDropdown ? 'rotate-180 text-[#d2f100]' : ''}`} />
            </Link>

            {nationalDropdown && (
              <div className="absolute top-full left-0 w-64 bg-[#1e2021] border border-[#333537] p-2 shadow-2xl z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#d2f100] tracking-widest border-b border-[#333537]/60">
                  Seleções Mundiais
                </div>
                <div className="py-1 max-h-80 overflow-y-auto">
                  {nationalTeams.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/selecoes/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 text-xs text-[#e2e2e4] hover:bg-[#282a2c] hover:text-[#d2f100] transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-[#c6c9ac]">➔</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/promocoes" 
            className={`transition-colors py-1 flex items-center gap-1 ${pathname === '/promocoes' ? 'text-[#d2f100] border-b-2 border-[#d2f100]' : 'hover:text-white'}`}
          >
            <Flame size={13} className="text-[#ffb4ab]" />
            Ofertas
          </Link>
        </nav>

        {/* Central Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
          <div className="w-full flex items-center bg-[#1e2021] border border-[#333537] focus-within:border-[#d2f100] transition-all px-3 py-1.5">
            <Search size={16} className="text-[#c6c9ac] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar manto, clube..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-[#c6c9ac]/60 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-[#c6c9ac] hover:text-[#d2f100] ml-1"
              >
                ✕
              </button>
            ) : (
              <span className="text-[10px] font-mono bg-[#282a2c] px-1.5 py-0.5 text-[#c6c9ac] border border-[#333537]">
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <Link
            href="/carrinho"
            className="relative flex items-center gap-2.5 bg-[#d2f100] text-[#121415] hover:bg-white hover:text-black font-bold uppercase tracking-wider px-4 py-2.5 transition-all shadow-[0_0_15px_rgba(210,241,0,0.3)]"
          >
            <ShoppingBag size={18} className="stroke-[2.5]" />
            <span className="hidden sm:inline text-xs font-black">Sacola</span>
            <span className="bg-[#121415] text-[#d2f100] text-[11px] font-black px-1.5 py-0.5 min-w-[20px] text-center">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white bg-[#1e2021] border border-[#333537] hover:border-[#d2f100] transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="w-full flex items-center bg-[#1e2021] border border-[#333537] focus-within:border-[#d2f100] px-3 py-2">
          <Search size={16} className="text-[#c6c9ac] mr-2" />
          <input
            type="text"
            placeholder="Buscar manto, clube ou seleção..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-[#c6c9ac]/60 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#c6c9ac] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121415] border-b border-[#333537] px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-bold uppercase tracking-wider">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#1e2021] border border-[#333537] text-white hover:text-[#d2f100]"
            >
              ⚡ Início
            </Link>
            <Link
              href="/lancamentos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#1e2021] border border-[#333537] text-white hover:text-[#d2f100]"
            >
              ✨ Lançamentos 24/25
            </Link>
            <Link
              href="/campeonatos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#1e2021] border border-[#333537] text-white hover:text-[#d2f100]"
            >
              🏆 Clubes & Ligas
            </Link>
            <Link
              href="/selecoes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#1e2021] border border-[#333537] text-white hover:text-[#d2f100]"
            >
              🌍 Seleções Nacionais
            </Link>
            <Link
              href="/promocoes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 bg-[#1e2021] border border-[#333537] text-[#ffb4ab] hover:text-[#d2f100]"
            >
              🔥 Ofertas Relâmpago
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppContact();
              }}
              className="w-full text-left px-3 py-2 bg-[#d2f100] text-[#121415] font-black uppercase flex items-center justify-between"
            >
              <span>Falar no WhatsApp</span>
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
