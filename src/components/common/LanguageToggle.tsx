'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  variant?: 'pill' | 'compact';
}

export default function LanguageToggle({ className = '', variant = 'pill' }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={toggle}
        type="button"
        title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl border border-[#2b4c37] bg-[#162a1f]/80 hover:bg-[#1e382b] text-[#e2ede5] transition shadow-sm cursor-pointer ${className}`}
      >
        <Globe className="w-4 h-4 text-[#D4704E]" />
        <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      type="button"
      title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-2xl border border-[#2b4c37] bg-[#162a1f]/90 hover:bg-[#1e382b] text-[#e2ede5] hover:text-white transition shadow-sm cursor-pointer ${className}`}
    >
      <Globe className="w-4 h-4 text-[#D4704E] shrink-0" />
      <span className={lang === 'vi' ? 'text-[#F5DACD] font-extrabold tracking-wide' : 'text-[#84a390]'}>VI</span>
      <span className="text-[#3b634c]">/</span>
      <span className={lang === 'en' ? 'text-[#F5DACD] font-extrabold tracking-wide' : 'text-[#84a390]'}>EN</span>
    </button>
  );
}
