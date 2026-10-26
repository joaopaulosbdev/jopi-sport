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
  Trophy, 
  Globe2, 
  Flame, 
  Sparkles, 
  ChevronDown,
  MessageCircle,
  Truck
} from 'lucide-react';

export default function Header() {
  const { storeConfig, cartCount, searchQuery, setSearchQuery, categories } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [championshipsDropdown, setChampionshipsDropdown] = useState(false);
  const [nationalDropdown, setNationalDropdown] = useState(false);
  const pathname = usePathname();

  const championships = categories.filter((c) => c.type === 'championship');
  const nationalTeams = categories.filter((c) => c.type === 'national');

  const handleWhatsAppContact = () => {
    const text = 'Olá Jopi Sport Shop! Gostaria de tirar uma dúvida sobre as camisas.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-black">
      {/* Top Banner Ticker */}
      <div className="bg-[#FFD900] text-black text-xs font-black tracking-wider uppercase py-1.5 px-4 text-center border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <Truck size={14} className="stroke-[2.5]" />
            <span>FRETE GRÁTIS A PARTIR DE 2 CAMISAS</span>
          </div>

          <div className="flex-1 text-center font-extrabold text-xs sm:text-[11px] truncate px-2">
            {storeConfig.bannerText}
          </div>

          <button
            onClick={handleWhatsAppContact}
            className="hidden md:flex items-center gap-1.5 bg-black text-[#FFD900] hover:bg-neutral-900 px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wide transition"
          >
            <MessageCircle size={12} className="fill-[#FFD900]" />
            <span>Atendimento WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Brand Logo - NO 'OFICIAL' */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-[#FFD900]">
                  JOPI
                </span>
                <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white ml-1.5">
                  SPORT SHOP
                </span>
              </div>
              <span className="text-[9px] font-extrabold tracking-[0.25em] uppercase text-neutral-400 mt-0.5">
                CAMISAS DE TIME
              </span>
            </div>
          </Link>

          {/* Central Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="w-full flex items-center bg-white rounded-lg overflow-hidden border-2 border-transparent focus-within:border-[#FFD900] transition shadow-inner">
              <input
                type="text"
                placeholder="O que você procura? Ex: Flamengo, Real Madrid, Brasil..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs font-bold text-neutral-400 hover:text-black"
                >
                  ✕
                </button>
              )}
              <button
                className="bg-[#FFD900] hover:bg-[#E6C300] text-black px-5 py-2.5 font-black text-sm flex items-center justify-center transition border-l border-neutral-200"
                aria-label="Buscar"
              >
                <Search size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Tools - WhatsApp & Cart only (Admin button is strictly in the Footer!) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={handleWhatsAppContact}
              className="hidden sm:flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[#FFD900] px-3 py-2 rounded-lg text-xs font-extrabold transition group"
            >
              <div className="w-2 h-2 rounded-full bg-[#FFD900] animate-ping" />
              <MessageCircle size={16} className="fill-[#FFD900] text-black" />
              <div className="text-left leading-tight hidden lg:block">
                <span className="text-[10px] text-neutral-400 block font-normal">Dúvidas?</span>
                <span className="text-white group-hover:text-[#FFD900] transition">Compre no Zap</span>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/carrinho"
              className="relative flex items-center gap-2 bg-[#FFD900] hover:bg-[#E6C300] text-black font-black text-xs sm:text-sm px-3 sm:px-4 py-2.5 rounded-lg transition shadow-md group"
            >
              <ShoppingBag size={18} className="stroke-[2.5]" />
              <span className="hidden sm:inline uppercase">Meu Carrinho</span>
              <span className="bg-black text-[#FFD900] font-black text-xs px-2 py-0.5 rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#FFD900] transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="flex items-center bg-white rounded-lg overflow-hidden border border-neutral-700">
            <input
              type="text"
              placeholder="Buscar camisas, times, seleções..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none"
            />
            <button className="bg-[#FFD900] text-black px-4 py-2 text-xs font-black">
              <Search size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Department Bar */}
      <nav className="bg-neutral-950 border-t border-neutral-800 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 lg:gap-2 text-xs font-extrabold uppercase tracking-wide">
            
            <Link
              href="/"
              className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                pathname === '/'
                  ? 'border-[#FFD900] text-[#FFD900]'
                  : 'border-transparent text-neutral-300 hover:text-[#FFD900]'
              }`}
            >
              <span>INÍCIO</span>
            </Link>

            {/* Campeonatos Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setChampionshipsDropdown(true)}
              onMouseLeave={() => setChampionshipsDropdown(false)}
            >
              <Link
                href="/campeonatos"
                className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                  pathname.startsWith('/campeonatos')
                    ? 'border-[#FFD900] text-[#FFD900]'
                    : 'border-transparent text-neutral-300 hover:text-[#FFD900]'
                }`}
              >
                <Trophy size={14} className="text-[#FFD900]" />
                <span>CAMPEONATOS</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${championshipsDropdown ? 'rotate-180' : ''}`} />
              </Link>

              {championshipsDropdown && (
                <div className="absolute top-full left-0 w-72 bg-black border border-neutral-800 rounded-b-xl shadow-2xl p-2 z-50">
                  <div className="text-[10px] font-black tracking-widest text-[#FFD900] uppercase px-3 py-1.5 border-b border-neutral-800">
                    LIGAS PRINCIPAIS
                  </div>
                  <div className="grid grid-cols-1 gap-0.5 pt-1 max-h-80 overflow-y-auto">
                    {championships.map((c) => (
                      <Link
                        key={c.id}
                        href={`/campeonatos/${c.slug}`}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-200 hover:bg-neutral-900 hover:text-[#FFD900] rounded transition"
                      >
                        {c.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.imageUrl} alt={c.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center font-bold text-[#FFD900]">
                            {c.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t border-neutral-800 mt-1">
                    <Link
                      href="/campeonatos"
                      className="block text-center text-xs font-black text-black bg-[#FFD900] hover:bg-[#E6C300] py-1.5 rounded uppercase transition"
                    >
                      Ver Todos os Campeonatos
                    </Link>
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
                className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                  pathname.startsWith('/selecoes')
                    ? 'border-[#FFD900] text-[#FFD900]'
                    : 'border-transparent text-neutral-300 hover:text-[#FFD900]'
                }`}
              >
                <Globe2 size={14} className="text-[#FFD900]" />
                <span>SELEÇÕES</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${nationalDropdown ? 'rotate-180' : ''}`} />
              </Link>

              {nationalDropdown && (
                <div className="absolute top-full left-0 w-72 bg-black border border-neutral-800 rounded-b-xl shadow-2xl p-2 z-50">
                  <div className="text-[10px] font-black tracking-widest text-[#FFD900] uppercase px-3 py-1.5 border-b border-neutral-800">
                    SELEÇÕES DO MUNDO
                  </div>
                  <div className="grid grid-cols-2 gap-0.5 pt-1 max-h-80 overflow-y-auto">
                    {nationalTeams.map((s) => (
                      <Link
                        key={s.id}
                        href={`/selecoes/${s.slug}`}
                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-200 hover:bg-neutral-900 hover:text-[#FFD900] rounded transition"
                      >
                        {s.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.imageUrl} alt={s.name} className="w-4 h-4 rounded-full object-cover shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full bg-neutral-800 text-[9px] flex items-center justify-center font-bold text-[#FFD900]">
                            {s.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span className="truncate">{s.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t border-neutral-800 mt-1">
                    <Link
                      href="/selecoes"
                      className="block text-center text-xs font-black text-black bg-[#FFD900] hover:bg-[#E6C300] py-1.5 rounded uppercase transition"
                    >
                      Ver Todas as Seleções
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/campeonatos/brasileirao"
              className="px-3 py-3 border-b-2 border-transparent text-neutral-300 hover:text-[#FFD900] transition"
            >
              BRASILEIRÃO
            </Link>

            <Link
              href="/campeonatos/premier-league"
              className="px-3 py-3 border-b-2 border-transparent text-neutral-300 hover:text-[#FFD900] transition"
            >
              PREMIER LEAGUE
            </Link>

            <Link
              href="/campeonatos/la-liga"
              className="px-3 py-3 border-b-2 border-transparent text-neutral-300 hover:text-[#FFD900] transition"
            >
              LA LIGA
            </Link>

            <Link
              href="/lancamentos"
              className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                pathname === '/lancamentos'
                  ? 'border-[#FFD900] text-[#FFD900]'
                  : 'border-transparent text-neutral-300 hover:text-[#FFD900]'
              }`}
            >
              <Sparkles size={13} className="text-[#FFD900]" />
              <span>LANÇAMENTOS</span>
            </Link>

            <Link
              href="/promocoes"
              className="ml-auto px-3 py-3 text-black bg-[#FFD900] hover:bg-[#E6C300] font-black flex items-center gap-1.5 transition rounded-t-sm"
            >
              <Flame size={14} className="fill-black" />
              <span>OFERTAS DA SEMANA</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-800 p-4 space-y-3 animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-white hover:text-[#FFD900]"
          >
            Início
          </Link>
          
          <div className="py-2 border-y border-neutral-800 space-y-1">
            <Link
              href="/campeonatos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-black text-[#FFD900]"
            >
              <span>Campeonatos Principais</span>
              <span className="text-xs">Ver todos →</span>
            </Link>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {championships.slice(0, 6).map((c) => (
                <Link
                  key={c.id}
                  href={`/campeonatos/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-neutral-300 hover:text-[#FFD900] py-1 flex items-center gap-1.5"
                >
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="py-2 border-b border-neutral-800 space-y-1">
            <Link
              href="/selecoes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-black text-[#FFD900]"
            >
              <span>Seleções Mundiais</span>
              <span className="text-xs">Ver todas →</span>
            </Link>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {nationalTeams.slice(0, 6).map((s) => (
                <Link
                  key={s.id}
                  href={`/selecoes/${s.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-neutral-300 hover:text-[#FFD900] py-1 flex items-center gap-1.5"
                >
                  <span>{s.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-1 space-y-2">
            <Link
              href="/lancamentos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-white hover:text-[#FFD900]"
            >
              Lançamentos
            </Link>
            <Link
              href="/promocoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-black text-[#FFD900]"
            >
              Ofertas Especiais
            </Link>
            <Link
              href="/carrinho"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 bg-[#FFD900] text-black font-black rounded-lg"
            >
              <span>Meu Carrinho ({cartCount})</span>
              <span>Finalizar →</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppContact();
              }}
              className="w-full text-center py-2.5 border border-[#FFD900] text-[#FFD900] font-black text-xs rounded-lg uppercase"
            >
              Falar com Vendedor no WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
