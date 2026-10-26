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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Painel do Administrador</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cadastre novas camisas, fotos, valores e gerencie sua loja
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-10 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                autoFocus
              />
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-lg"
          >
            <span>Entrar no Painel</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Quick Button */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-2">Acesso rápido para demonstração:</p>
          <button
            onClick={handleQuickDemoLogin}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl transition"
          >
            <Sparkles size={14} /> Entrar com senha padrão (&ldquo;admin&rdquo;)
          </button>
        </div>
      </div>
    </div>
  );
}
