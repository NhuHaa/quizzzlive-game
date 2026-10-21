'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import ThumbsUpDuck from '@/components/common/ThumbsUpDuck';

interface PlayerAnsweredViewProps {
  submittedAnswer: string;
}

export default function PlayerAnsweredView({ submittedAnswer }: PlayerAnsweredViewProps) {
  const { t, lang } = useLanguage();

  return (
    <div className="w-full max-w-full min-h-[calc(100dvh-3rem)] flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#112017] via-[#1a3324] to-[#0d1811] text-[#f4f7f5] text-center overflow-x-hidden relative">
      <div />

      {/* Center state */}
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto w-full relative z-10">
        {/* Mascot Vịt Vàng Giơ Ngón Tay Thumbs-Up Thay Cho Check Circle Xanh */}
        <div className="mb-5 animate-bounce">
          <ThumbsUpDuck size="lg" />
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white mb-2">
          {t.answeredTitle}
        </h2>

        <p className="text-xs sm:text-sm text-[#b4d1c0] mb-5">
          {t.yourAnswer} <span className="font-bold text-yellow-300 font-mono text-sm sm:text-base px-2.5 py-0.5 rounded-lg bg-[#0c1811] border border-[#2b543b]">{submittedAnswer}</span>
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#152a1e] border border-[#2b543b] text-xs text-[#a3cbb1] shadow-md">
          <Clock className="w-3.5 h-3.5 animate-spin text-amber-400" />
          <span>{t.waitingOthers}</span>
        </div>
      </div>

      <div className="p-3 sm:p-4 rounded-2xl bg-[#152a1e]/90 border border-[#2b543b] text-xs text-[#a3cbb1] max-w-sm mx-auto w-full shadow-lg relative z-10">
        {lang === 'vi' ? 'Kết quả chấm điểm sẽ xuất hiện ngay khi tất cả người chơi hoàn thành!' : 'Round scores will be revealed as soon as everyone answers!'}
      </div>
    </div>
  );
}

