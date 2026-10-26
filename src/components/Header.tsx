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
  Truck,
  CheckCircle2,
  PackageCheck
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
    const text = 'Olá Jopi Sport Shop! Gostaria de tirar uma dúvida sobre as camisas do catálogo.';
    const cleanNumber = storeConfig.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 shadow-xl bg-black border-b border-neutral-900">
      {/* Top Banner Ticker - FutFanatics Style */}
      <div className="bg-[#FFD900] text-black text-xs font-black tracking-wider uppercase py-1.5 px-4 text-center border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-black">
            <Truck size={14} className="stroke-[2.5]" />
            <span>FRETE GRÁTIS A PARTIR DE 2 CAMISAS</span>
          </div>

          <div className="flex-1 text-center font-black text-xs sm:text-[11px] truncate px-2 tracking-wide">
            {storeConfig.bannerText}
          </div>

          <button
            onClick={handleWhatsAppContact}
            className="hidden md:flex items-center gap-1.5 bg-black text-[#FFD900] hover:bg-neutral-900 px-3 py-0.5 rounded text-[11px] font-black uppercase tracking-wide transition shadow-sm"
          >
            <MessageCircle size={12} className="fill-[#FFD900]" />
            <span>Atendimento WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar - FutFanatics Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Brand Logo - FutFanatics athletic style (Strictly NO 'oficial') */}
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
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1 w-4 bg-[#FFD900] rounded-sm" />
                <span className="text-[9px] font-black tracking-[0.25em] uppercase text-neutral-300">
                  A LOJA DO TORCEDOR
                </span>
              </div>
            </div>
          </Link>

          {/* Central Search Bar - FutFanatics Style with high-contrast yellow button */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="w-full flex items-center bg-white rounded-lg overflow-hidden border-2 border-transparent focus-within:border-[#FFD900] transition shadow-inner">
              <input
                type="text"
                placeholder="O que você está procurando? Ex: Flamengo, Real Madrid, Brasil..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 text-xs font-black text-neutral-400 hover:text-black transition"
                  title="Limpar busca"
                >
                  ✕
                </button>
              )}
              <button
                className="bg-[#FFD900] hover:bg-[#E6C300] active:bg-[#CCAC00] text-black px-6 py-2.5 font-black text-sm flex items-center justify-center transition border-l border-neutral-200"
                aria-label="Buscar produto"
              >
                <Search size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Tools - WhatsApp & Cart only (Admin link is strictly in the Footer!) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* WhatsApp Support shortcut */}
            <button
              onClick={handleWhatsAppContact}
              className="hidden lg:flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[#FFD900] px-3.5 py-2 rounded-lg text-xs font-black transition group"
            >
              <div className="relative">
                <MessageCircle size={18} className="fill-[#FFD900] text-black" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] text-neutral-400 block font-bold uppercase">Atendimento</span>
                <span className="text-white group-hover:text-[#FFD900] transition font-black">Tire Dúvidas</span>
              </div>
            </button>

            {/* FutFanatics-style Shopping Cart Button with counter and subtotal */}
            <Link
              href="/carrinho"
              className="relative flex items-center gap-2.5 bg-[#FFD900] hover:bg-[#E6C300] text-black font-black text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-lg transition shadow-md group"
            >
              <div className="relative">
                <ShoppingBag size={20} className="stroke-[2.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-black text-[#FFD900] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFD900]">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <span className="text-[10px] font-extrabold uppercase text-neutral-800 block">Meu Carrinho</span>
                <span className="text-xs font-black text-black">
                  {cartCount > 0 ? `R$ ${cartTotal.toFixed(2)}` : 'Vazio'}
                </span>
              </div>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#FFD900] transition"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 md:hidden">
          <div className="flex items-center bg-white rounded-lg overflow-hidden border border-neutral-700">
            <input
              type="text"
              placeholder="Buscar camisas, times, seleções..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2 text-xs font-black text-neutral-400"
              >
                ✕
              </button>
            )}
            <button className="bg-[#FFD900] text-black px-4 py-2 text-xs font-black">
              <Search size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Department Bar - FutFanatics Style */}
      <nav className="bg-neutral-950 border-t border-neutral-800 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 lg:gap-2 text-xs font-black uppercase tracking-wider">
            
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

            {/* Brasileirão Direct Link */}
            <Link
              href="/campeonatos/brasileirao"
              className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                pathname === '/campeonatos/brasileirao'
                  ? 'border-[#FFD900] text-[#FFD900]'
                  : 'border-transparent text-neutral-300 hover:text-[#FFD900]'
              }`}
            >
              <span>BRASILEIRÃO</span>
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
                  pathname.startsWith('/campeonatos') && pathname !== '/campeonatos/brasileirao'
                    ? 'border-[#FFD900] text-[#FFD900]'
                    : 'border-transparent text-neutral-300 hover:text-[#FFD900]'
                }`}
              >
                <Trophy size={14} className="text-[#FFD900]" />
                <span>INTERNACIONAIS</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${championshipsDropdown ? 'rotate-180' : ''}`} />
              </Link>

              {championshipsDropdown && (
                <div className="absolute top-full left-0 w-80 bg-black border border-neutral-800 rounded-b-xl shadow-2xl p-2 z-50">
                  <div className="text-[10px] font-black tracking-widest text-[#FFD900] uppercase px-3 py-2 border-b border-neutral-800">
                    LIGAS &amp; COMPETIÇÕES
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
                          <span className="w-5 h-5 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center font-black text-[#FFD900]">
                            {c.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span className="font-bold">{c.name}</span>
                        {c.country && (
                          <span className="text-[10px] text-neutral-500 ml-auto">{c.country}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t border-neutral-800 mt-1">
                    <Link
                      href="/campeonatos"
                      className="block text-center text-xs font-black text-black bg-[#FFD900] hover:bg-[#E6C300] py-2 rounded uppercase transition"
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
                <div className="absolute top-full left-0 w-80 bg-black border border-neutral-800 rounded-b-xl shadow-2xl p-2 z-50">
                  <div className="text-[10px] font-black tracking-widest text-[#FFD900] uppercase px-3 py-2 border-b border-neutral-800">
                    SELEÇÕES DO MUNDO
                  </div>
                  <div className="grid grid-cols-2 gap-1 pt-1 max-h-80 overflow-y-auto p-1">
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
                          <span className="w-4 h-4 rounded-full bg-neutral-800 text-[9px] flex items-center justify-center font-black text-[#FFD900]">
                            {s.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span className="truncate font-bold">{s.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t border-neutral-800 mt-1">
                    <Link
                      href="/selecoes"
                      className="block text-center text-xs font-black text-black bg-[#FFD900] hover:bg-[#E6C300] py-2 rounded uppercase transition"
                    >
                      Ver Todas as Seleções
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Lançamentos */}
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

            {/* FutFanatics-style Ofertas / Outlet Button */}
            <Link
              href="/promocoes"
              className="ml-auto px-4 py-2.5 text-black bg-[#FFD900] hover:bg-[#E6C300] font-black flex items-center gap-1.5 transition rounded shadow-sm"
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
            className="block py-2 text-sm font-black text-white hover:text-[#FFD900]"
          >
            Início
          </Link>

          <Link
            href="/campeonatos/brasileirao"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-black text-white hover:text-[#FFD900]"
          >
            Brasileirão
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
                  className="text-xs text-neutral-300 hover:text-[#FFD900] py-1 flex items-center gap-1.5 font-bold"
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
                  className="text-xs text-neutral-300 hover:text-[#FFD900] py-1 flex items-center gap-1.5 font-bold"
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
              className="block text-sm font-black text-white hover:text-[#FFD900]"
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
              className="flex items-center justify-between p-3 bg-[#FFD900] text-black font-black rounded-lg"
            >
              <span>Meu Carrinho ({cartCount})</span>
              <span>R$ {cartTotal.toFixed(2)} →</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppContact();
              }}
              className="w-full text-center py-2.5 border-2 border-[#FFD900] text-[#FFD900] font-black text-xs rounded-lg uppercase"
            >
              Falar com Atendente no WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
