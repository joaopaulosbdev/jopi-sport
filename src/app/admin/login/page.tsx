'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import BrandLogo from '@/components/BrandLogo';
import { ShieldCheck, Lock, ArrowRight, Zap } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useStore();
  const router = useRouter();

  if (isAdmin) {
    router.push('/admin');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/admin');
    } else {
      setError('Senha incorreta! Dica: utilize "admin"');
    }
  };

  const handleQuickDemoLogin = () => {
    login('admin');
    router.push('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#1e2021] border border-[#333537] p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 overflow-hidden mx-auto mb-3 shadow-[0_0_15px_rgba(255,217,0,0.3)]">
            <BrandLogo variant="icon" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center leading-none mb-1">
            <span className="text-2xl font-black uppercase tracking-tight text-white font-headline-sm">
              JOPI
            </span>
            <span className="text-2xl font-black uppercase tracking-tight text-[#FFD900] ml-1.5 font-headline-sm">
              SPORT SHOP
            </span>
          </div>
          <h1 className="text-base font-bold uppercase text-white font-mono">Painel Administrativo</h1>
          <p className="text-xs text-[#c6c9ac] mt-1 font-mono">
            Gerencie produtos, categorias e configurações da loja
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#93000a]/20 border border-[#ffb4ab] text-[#ffdad6] text-xs font-mono font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#c6c9ac] mb-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha de administrador"
                className="w-full bg-[#0c0e10] border border-[#333537] focus:border-[#FFD900] px-4 py-3 text-xs font-mono text-white focus:outline-none"
              />
              <Lock size={15} className="absolute right-3 top-3.5 text-[#c6c9ac]" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FFD900] hover:bg-white text-[#121415] hover:text-black font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(255, 217, 0,0.3)] flex items-center justify-center gap-2"
          >
            <span>Acessar Painel</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="pt-4 border-t border-[#333537]/60 text-center">
          <button
            onClick={handleQuickDemoLogin}
            className="text-xs font-mono text-[#FFD900] hover:underline"
          >
            ⚡ Acesso Rápido com Senha Padrão (&quot;admin&quot;)
          </button>
        </div>
      </div>
    </div>
  );
}
