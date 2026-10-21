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
        className={`h-10 sm:h-10.5 w-auto inline-flex items-center gap-1.5 px-3 sm:px-3.5 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl border border-[#2B4E38] bg-[#182F22] hover:bg-[#203D2D] text-[#E5F2EA] transition shadow-sm cursor-pointer shrink-0 whitespace-nowrap ${className}`}
      >
        <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D4704E] shrink-0" />
        <span>{lang === 'vi' ? 'VI' : 'EN'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      type="button"
      title={lang === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
      className={`h-10 sm:h-10.5 w-auto inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl border border-[#2B4E38] bg-[#182F22] hover:bg-[#203D2D] text-[#E5F2EA] hover:text-white transition shadow-sm cursor-pointer whitespace-nowrap shrink-0 ${className}`}
    >
      <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#D4704E] shrink-0" />
      <span className={lang === 'vi' ? 'text-[#FAF8F5] font-extrabold tracking-wide' : 'text-[#84a390]'}>VI</span>
      <span className="text-[#3b634c]">/</span>
      <span className={lang === 'en' ? 'text-[#FAF8F5] font-extrabold tracking-wide' : 'text-[#84a390]'}>EN</span>
    </button>
  );
}
