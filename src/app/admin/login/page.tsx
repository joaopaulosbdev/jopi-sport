'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import BrandLogo from '@/components/BrandLogo';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { signInWithGoogleFirebase } from '@/lib/firebase';

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function AdminLoginPage() {
  const { loginWithGoogle, isAdmin } = useStore();
  const router = useRouter();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, router]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithGoogleFirebase();

      if (!result.success || !result.user) {
        setError(result.error || 'Falha na autenticacao com Google.');
        setLoading(false);
        return;
      }

      const authResult = loginWithGoogle({
        email: result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL,
        loginMethod: 'google',
      });

      if (authResult.success) {
        router.push('/admin');
      } else {
        setError(authResult.error || 'Acesso negado. E-mail nao autorizado.');
      }
    } catch (err: unknown) {
      console.error('Erro ao autenticar com Google', err);
      setError('Erro ao iniciar autenticacao com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#0c0e10]">
      <div className="max-w-md w-full bg-[#181a1b] border-2 border-[#FFD900] p-6 sm:p-8 shadow-2xl space-y-6">

        {/* Brand Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 border-2 border-[#FFD900] bg-black p-2 flex items-center justify-center shadow-[0_0_20px_rgba(255,217,0,0.25)]">
            <BrandLogo variant="icon" className="w-full h-full object-contain" />
          </div>

          <div className="flex items-center justify-center leading-none mb-1">
            <span className="text-2xl font-black uppercase tracking-tight text-white">
              JOPI
            </span>
            <span className="text-2xl font-black uppercase tracking-tight text-[#FFD900] ml-1.5">
              SPORT SHOP
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#FFD900] text-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded mt-1">
            <ShieldCheck size={13} className="stroke-[2.5]" />
            <span>PAINEL ADMINISTRATIVO</span>
          </div>

          <p className="text-xs text-neutral-400 mt-2 font-medium">
            Acesso restrito ao administrador
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-bold flex items-start gap-2 rounded">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Login Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-4 bg-white hover:bg-neutral-100 disabled:opacity-50 text-neutral-900 font-black text-xs uppercase tracking-wider rounded transition-all shadow-lg flex items-center justify-center gap-3 border border-neutral-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <GoogleIcon className="w-5 h-5 shrink-0" />
            )}
            <span>{loading ? 'AUTENTICANDO...' : 'ENTRAR COM GOOGLE'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
