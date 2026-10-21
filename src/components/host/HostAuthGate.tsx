'use client';

import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from '@/components/common/LanguageToggle';

interface HostAuthGateProps {
  children: React.ReactNode;
}

export default function HostAuthGate({ children }: HostAuthGateProps) {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('host_unlocked');
      if (stored === '8451') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === '8451') {
      sessionStorage.setItem('host_unlocked', '8451');
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError(t.passwordError);
      setPassword('');
    }
  };

  // While checking sessionStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[100dvh] bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#112017] via-[#1A3324] to-[#0D1811] text-[#FAF8F5] overflow-hidden">
      {/* Paper Grain Texture Overlay */}
      <div className="grain-texture fixed inset-0 pointer-events-none z-30 opacity-35 mix-blend-overlay" />

      {/* Top right language switch */}
      <div className="absolute top-4 right-4 z-40">
        <LanguageToggle />
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B84E2E]/15 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 w-80 h-80 bg-[#1E4D32]/30 rounded-full blur-3xl z-0" />

      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#14261C]/95 border border-[#2B4B36] shadow-2xl backdrop-blur-xl relative z-10 animate-in zoom-in-95">
        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1B3526] border border-[#2D543D] text-[#D4704E] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-[#FAF8F5] tracking-tight">{t.adminArea}</h1>
          <p className="text-xs sm:text-sm text-[#A9BAAE]">
            {t.passwordPrompt}
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              maxLength={12}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder={t.passwordPlaceholder}
              className="w-full text-center text-2xl font-mono font-bold tracking-widest py-3.5 px-4 rounded-2xl bg-[#0D1811] border-2 border-[#2B4B36] focus:border-[#B84E2E] text-white placeholder:text-[#688573] outline-none transition"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7F9E8B] pointer-events-none">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-semibold text-center animate-shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!password.trim()}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#1D4A30] hover:bg-[#25603E] border border-[#3E855A] active:scale-98 text-white font-bold text-base shadow-md shadow-[#1D4A30]/30 flex items-center justify-center gap-2 disabled:opacity-50 transition cursor-pointer"
          >
            <span>{t.unlock}</span>
            <ArrowRight className="w-5 h-5 text-[#7BD49F]" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#2B4B36]/80 text-center">
          <span className="text-[11px] text-[#A9BAAE] inline-flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7BD49F]" />
            {t.securedSession}
          </span>
        </div>
      </div>
    </div>
  );
}
