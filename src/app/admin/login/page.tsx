'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import { ShieldCheck, Lock, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="bg-[#F4F5F7] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border-2 border-black p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black text-[#FFD900] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <div className="flex items-center justify-center leading-none mb-1">
            <span className="text-xl font-black italic tracking-tighter text-black">
              JOPI
            </span>
            <span className="text-xl font-black italic tracking-tighter text-[#B29200] ml-1">
              SPORT SHOP
            </span>
          </div>
          <h1 className="text-lg font-black uppercase text-black">Painel Administrativo</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Cadastre nomes, fotos, valores e gerencie sua loja
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-300 text-red-800 text-xs font-bold rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase text-black block mb-1">
              Senha de Acesso:
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Digite a senha..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-4 py-3 pl-10 text-sm text-black focus:outline-none focus:border-black"
                autoFocus
              />
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-lg bg-black text-[#FFD900] hover:bg-neutral-800 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
          >
            <span>ENTRAR NO PAINEL</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500 mb-2 font-medium">Acesso rápido para demonstração:</p>
          <button
            onClick={handleQuickDemoLogin}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black bg-[#FFD900] hover:bg-[#E6C300] px-4 py-2 rounded-lg transition"
          >
            <Sparkles size={14} /> Entrar com senha padrão (&ldquo;admin&rdquo;)
          </button>
        </div>
      </div>
    </div>
  );
}
