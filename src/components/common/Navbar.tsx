'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Lock } from 'lucide-react';
import AudioControl from './AudioControl';
import LanguageToggle from './LanguageToggle';
import ThinkingDuckLogo from './ThinkingDuckLogo';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface NavbarProps {
  showHostLink?: boolean;
  showAudioControl?: boolean;
  showLockButton?: boolean;
  onLock?: () => void;
  className?: string;
}

export default function Navbar({
  showHostLink = false,
  showAudioControl = true,
  showLockButton = false,
  onLock,
  className = 'border-slate-800/80 bg-slate-950/90'
}: NavbarProps) {
  const { t } = useLanguage();

  return (
    <header className={`w-full border-b backdrop-blur-md sticky top-0 z-40 max-w-full transition-colors ${className}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo: Chú vịt vàng đang suy nghĩ */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <ThinkingDuckLogo size="md" />
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-[#EAD1C5] to-[#D4704E] bg-clip-text text-transparent">
              {t.gameTitle}
            </span>
            <span className="hidden md:inline text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 ml-2 rounded-md bg-[#234230] text-[#a3cbb1] border border-[#345e46]">
              {t.serverless}
            </span>
          </div>
        </Link>

        {/* Navigation & Controls: Cách đều mép ngoài thoải mái */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <LanguageToggle />

          {showHostLink && (
            <Link
              href="/host/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600/20 text-indigo-300 hover:text-white border border-indigo-500/30 hover:bg-indigo-600/30 transition shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.hostDashboard}</span>
            </Link>
          )}

          {showLockButton && onLock && (
            <button
              type="button"
              onClick={onLock}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-rose-500/10 text-rose-300 hover:text-rose-200 border border-rose-500/30 hover:bg-rose-500/20 transition cursor-pointer"
              title={t.lock}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t.lock}</span>
            </button>
          )}

          {showAudioControl && <AudioControl />}
        </div>
      </div>
    </header>
  );
}
