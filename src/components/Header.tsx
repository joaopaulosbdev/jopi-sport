'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import { championships, nationalTeams } from '@/data/categories';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Trophy, 
  Globe2, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall,
  ChevronDown
} from 'lucide-react';

export default function Header() {
  const { storeConfig, cartCount, isAdmin, logout, searchQuery, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [championshipsDropdown, setChampionshipsDropdown] = useState(false);
  const [nationalDropdown, setNationalDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-semibold tracking-wide flex items-center justify-center gap-2">
        <span>{storeConfig.bannerText}</span>
        <a 
          href={`https://wa.me/${storeConfig.whatsappNumber}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-xs transition"
        >
          <PhoneCall size={12} /> WhatsApp Oficial
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-yellow-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-xl">
                  ⚽
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                  JOPI<span className="text-emerald-400">SPORT</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-yellow-400">
                  Mantos &amp; Camisas
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-lg transition-colors hover:text-emerald-400 ${pathname === '/' ? 'text-emerald-400 font-semibold' : 'text-slate-200'}`}
              >
                Início
              </Link>

              {/* Campeonatos Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setChampionshipsDropdown(true)}
                onMouseLeave={() => setChampionshipsDropdown(false)}
              >
                <Link
                  href="/campeonatos"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-emerald-400 ${pathname.startsWith('/campeonatos') ? 'text-emerald-400 font-semibold' : 'text-slate-200'}`}
                >
                  <Trophy size={16} className="text-yellow-400" />
                  <span>Campeonatos</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${championshipsDropdown ? 'rotate-180' : ''}`} />
                </Link>

                {championshipsDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1.5">
                      Principais Ligas
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {championships.map((champ) => (
                        <Link
                          key={champ.id}
                          href={`/campeonatos/${champ.slug}`}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition"
                        >
                          <span className="text-base">{champ.icon}</span>
                          <span>{champ.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-800 mt-2 pt-2 px-3">
                      <Link href="/campeonatos" className="text-xs text-emerald-400 font-semibold hover:underline block py-1">
                        Ver todos os campeonatos →
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-emerald-400 ${pathname.startsWith('/selecoes') ? 'text-emerald-400 font-semibold' : 'text-slate-200'}`}
                >
                  <Globe2 size={16} className="text-blue-400" />
                  <span>Seleções</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${nationalDropdown ? 'rotate-180' : ''}`} />
                </Link>

                {nationalDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1.5">
                      Seleções Mundiais
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {nationalTeams.slice(0, 10).map((sel) => (
                        <Link
                          key={sel.id}
                          href={`/selecoes/${sel.slug}`}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition"
                        >
                          <span>{sel.icon}</span>
                          <span className="truncate">{sel.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-800 mt-2 pt-2 px-3">
                      <Link href="/selecoes" className="text-xs text-emerald-400 font-semibold hover:underline block py-1">
                        Ver todas as seleções →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/lancamentos" 
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-emerald-400 ${pathname === '/lancamentos' ? 'text-emerald-400 font-semibold' : 'text-slate-200'}`}
              >
                <Sparkles size={16} className="text-emerald-400" />
                <span>Lançamentos</span>
              </Link>

              <Link 
                href="/promocoes" 
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-yellow-400 ${pathname === '/promocoes' ? 'text-yellow-400 font-semibold' : 'text-slate-200'}`}
              >
                <Flame size={16} className="text-yellow-400" />
                <span>Ofertas</span>
              </Link>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-xl border border-slate-800 transition ${searchOpen ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'}`}
                aria-label="Buscar produtos"
              >
                <Search size={19} />
              </button>

              {/* Shopping Cart Button */}
              <Link
                href="/carrinho"
                className="relative p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 transition flex items-center justify-center"
                aria-label="Ver carrinho"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Admin Button */}
              {isAdmin ? (
                <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-600/40 rounded-xl px-2.5 py-1">
                  <Link
                    href="/admin"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <ShieldCheck size={14} /> Admin
                  </Link>
                  <button
                    onClick={logout}
                    className="text-[11px] text-red-400 hover:text-red-300 ml-1 pl-1 border-l border-emerald-800"
                    title="Sair do painel admin"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  className="hidden sm:flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded-lg hover:bg-slate-800 transition"
                  title="Acesso Administrador"
                >
                  <ShieldCheck size={16} />
                  <span>Admin</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          {searchOpen && (
            <div className="py-3 border-t border-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar time, camisa, campeonato ou seleção..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  autoFocus
                />
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
            >
              <span>🏠</span> Início
            </Link>

            {/* Mobile Campeonatos Accordion */}
            <div className="space-y-1">
              <Link
                href="/campeonatos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy size={18} className="text-yellow-400" />
                  <span>Campeonatos</span>
                </div>
                <span className="text-xs text-emerald-400">Ver todos</span>
              </Link>
              <div className="pl-6 grid grid-cols-2 gap-1">
                {championships.map((c) => (
                  <Link
                    key={c.id}
                    href={`/campeonatos/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 py-1.5 text-xs text-slate-300 hover:text-emerald-400"
                  >
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Seleções Accordion */}
            <div className="space-y-1 pt-2 border-t border-slate-800">
              <Link
                href="/selecoes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Globe2 size={18} className="text-blue-400" />
                  <span>Seleções</span>
                </div>
                <span className="text-xs text-emerald-400">Ver todas</span>
              </Link>
              <div className="pl-6 grid grid-cols-2 gap-1">
                {nationalTeams.slice(0, 8).map((s) => (
                  <Link
                    key={s.id}
                    href={`/selecoes/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 py-1.5 text-xs text-slate-300 hover:text-emerald-400"
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <Link
                href="/lancamentos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
              >
                <Sparkles size={18} className="text-emerald-400" />
                <span>Lançamentos 2025/26</span>
              </Link>
              <Link
                href="/promocoes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-yellow-400 hover:bg-slate-800 font-medium"
              >
                <Flame size={18} className="text-yellow-400" />
                <span>Ofertas Especiais</span>
              </Link>
              <Link
                href="/carrinho"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={18} />
                  <span>Meu Carrinho</span>
                </div>
                <span className="font-bold text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                  {cartCount} itens
                </span>
              </Link>
              <Link
                href={isAdmin ? "/admin" : "/admin/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white font-medium text-sm"
              >
                <ShieldCheck size={18} />
                <span>{isAdmin ? "Painel de Administração" : "Acesso Admin"}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
