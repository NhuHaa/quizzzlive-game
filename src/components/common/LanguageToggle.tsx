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
        className={`h-11 sm:h-12 inline-flex items-center gap-2 px-3.5 text-xs sm:text-sm font-bold rounded-2xl border border-[#2B4E38] bg-[#182F22] hover:bg-[#203D2D] text-[#E5F2EA] transition shadow-sm cursor-pointer shrink-0 ${className}`}
      >
        <Globe className="w-5 h-5 text-[#D4704E] shrink-0" />
        <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      type="button"
      title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
      className={`h-11 sm:h-12 inline-flex items-center gap-2 px-4 sm:px-5 text-xs sm:text-sm font-bold rounded-2xl border border-[#2B4E38] bg-[#182F22] hover:bg-[#203D2D] text-[#E5F2EA] hover:text-white transition shadow-sm cursor-pointer whitespace-nowrap shrink-0 ${className}`}
    >
      <Globe className="w-5 h-5 text-[#D4704E] shrink-0" />
      <span className={lang === 'vi' ? 'text-[#FAF8F5] font-extrabold tracking-wide' : 'text-[#84a390]'}>VI</span>
      <span className="text-[#3b634c]">/</span>
      <span className={lang === 'en' ? 'text-[#FAF8F5] font-extrabold tracking-wide' : 'text-[#84a390]'}>EN</span>
    </button>
  );
}
