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
  containerMaxWidth?: string;
}

export default function Navbar({
  showHostLink = false,
  showAudioControl = true,
  showLockButton = false,
  onLock,
  className = 'border-[#233C2D]/80 bg-[#0E1A13]/90',
  containerMaxWidth = 'max-w-7xl'
}: NavbarProps) {
  const { t } = useLanguage();

  return (
    <header className={`w-full border-b backdrop-blur-md sticky top-0 z-40 transition-colors ${className}`}>
      <div className={`${containerMaxWidth} mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4`}>
        {/* Logo: Chú vịt vàng đang suy nghĩ - Canh thẳng lề trái */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <ThinkingDuckLogo size="md" />
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-[#EAD1C5] to-[#D4704E] bg-clip-text text-transparent">
              {t.gameTitle}
            </span>
            <span className="hidden md:inline text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 ml-2.5 rounded-lg bg-[#1B3526] text-[#A6D1B5] border border-[#2D543D]">
              {t.serverless}
            </span>
          </div>
        </Link>

        {/* Navigation & Controls: Căn thẳng lề phải, chiều cao h-11 sm:h-12 đồng bộ */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <LanguageToggle />

          {showHostLink && (
            <Link
              href="/host/dashboard"
              className="h-11 sm:h-12 inline-flex items-center gap-2 px-4 sm:px-5 text-xs sm:text-sm font-bold rounded-2xl bg-[#182F22] text-[#E5F2EA] hover:text-white border border-[#2B4E38] hover:bg-[#203D2D] transition shadow-sm whitespace-nowrap shrink-0"
            >
              <LayoutDashboard className="w-5 h-5 text-[#D4704E] shrink-0" />
              <span>{t.hostDashboard}</span>
            </Link>
          )}

          {showLockButton && onLock && (
            <button
              type="button"
              onClick={onLock}
              className="h-11 sm:h-12 inline-flex items-center gap-2 px-4 sm:px-5 text-xs sm:text-sm font-bold rounded-2xl bg-[#2D1B18] text-[#F3C4BC] hover:text-white border border-[#52322B] hover:bg-[#3B221E] transition cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              title={t.lock}
            >
              <Lock className="w-5 h-5 text-[#D4704E] shrink-0" />
              <span>{t.lock}</span>
            </button>
          )}

          {showAudioControl && <AudioControl />}
        </div>
      </div>
    </header>
  );
}
