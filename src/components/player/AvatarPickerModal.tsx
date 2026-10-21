'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: string) => void;
  selectedAvatar: string;
}

const CATEGORIES = [
  {
    id: 'animals',
    nameVi: '🐾 Động Vật',
    nameEn: '🐾 Animals',
    icons: [
      '🦊', '🐯', '🐼', '🦁', '🦉', '🐱', '🐶', '🐻', '🐨', '🐸',
      '🐵', '🐙', '🐬', '🦄', '🦖', '🐝', '🦋', '🐢', '🐧', '🦩',
      '🦈', '🐺', '🦚', '🐲'
    ]
  },
  {
    id: 'tech',
    nameVi: '🚀 Công Nghệ & Vũ Trụ',
    nameEn: '🚀 Sci-Fi & Tech',
    icons: [
      '🚀', '⚡', '🛸', '🤖', '💻', '🔬', '🔭', '💡',
      '🛰️', '🧬', '⚙️', '🔮', '👾', '🕹️', '🔋', '📡'
    ]
  },
  {
    id: 'games',
    nameVi: '🎯 Giải Trí & Thể Thao',
    nameEn: '🎯 Games & Sports',
    icons: [
      '🎮', '🎯', '🎲', '🏆', '🥇', '🎪', '🎨', '🎭',
      '🎸', '🎧', '🎬', '🛹', '⚽', '🏀', '🏎️', '🥊'
    ]
  },
  {
    id: 'vibes',
    nameVi: '🔥 Năng Lượng & Biểu Cảm',
    nameEn: '🔥 Vibes & Energy',
    icons: [
      '🔥', '💥', '⭐', '🌟', '🌈', '👑', '💎', '🍀',
      '🍕', '🍔', '🍩', '🥑', '🧁', '🍿', '🍦', '☕'
    ]
  }
];

export default function AvatarPickerModal({
  isOpen,
  onClose,
  onSelect,
  selectedAvatar
}: AvatarPickerModalProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('animals');

  if (!isOpen) return null;

  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#122218] border border-[#2b543b] shadow-2xl p-5 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {lang === 'vi' ? 'Thư Viện Linh Vật & Biểu Tượng' : 'Avatar & Emoji Library'}
              </h3>
              <p className="text-xs text-[#a3cbb1]">
                {lang === 'vi' ? 'Chọn biểu tượng đại diện của bạn trong trận đấu' : 'Pick your mascot to represent you in the match'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#152a1e] text-[#a3cbb1] hover:text-white hover:bg-[#1c3626] border border-[#2b543b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto py-3 shrink-0 scrollbar-none border-b border-[#244230]">
          {CATEGORIES.map(cat => {
            const label = lang === 'vi' ? cat.nameVi : cat.nameEn;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/40 border border-emerald-400/40'
                    : 'bg-[#152a1e] text-[#a3cbb1] hover:text-white hover:bg-[#1c3626] border border-[#244230]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid of Avatars */}
        <div className="flex-1 overflow-y-auto py-4 pr-1">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {currentCategory.icons.map(icon => {
              const isSelected = selectedAvatar === icon;
              return (
                <button
                  key={icon}
                  type="button"
                  onClick={() => {
                    onSelect(icon);
                    onClose();
                  }}
                  className={`h-14 sm:h-16 rounded-2xl text-2xl sm:text-3xl flex items-center justify-center transition transform active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 ring-2 ring-emerald-300 scale-105 shadow-lg shadow-emerald-800/50'
                      : 'bg-[#152a1e] hover:bg-[#1c3626] border border-[#244230] hover:scale-105'
                  }`}
                >
                  {icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 shrink-0 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {lang === 'vi' ? 'Đang chọn:' : 'Selected:'} <span className="text-xl ml-1">{selectedAvatar}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
          >
            {lang === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
