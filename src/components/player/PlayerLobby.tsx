'use client';

import React from 'react';
import { Sparkles, Wifi, ShieldCheck } from 'lucide-react';
import { Player } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PlayerLobbyProps {
  player: Player;
  pin: string;
}

export default function PlayerLobby({ player, pin }: PlayerLobbyProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-full min-h-[calc(100dvh-3rem)] flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#112017] via-[#1a3324] to-[#0d1811] text-[#f4f7f5] text-center overflow-x-hidden relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#152a1e] border border-[#2b543b] text-xs text-[#d4e7db] font-mono shadow-sm">
          PIN: <span className="text-yellow-300 font-bold">{pin}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shadow-sm">
          <Wifi className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.onlineStatus}</span>
        </div>
      </div>

      {/* Main Avatar & Welcome */}
      <div className="my-auto py-8 sm:py-12 flex flex-col items-center relative z-10">
        <div className="relative mb-5">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-1 shadow-2xl shadow-emerald-900/40 animate-pulse">
            <div className="w-full h-full rounded-[22px] bg-[#0c1811] border border-[#2b543b] flex items-center justify-center text-5xl sm:text-6xl">
              {player.avatar || '🦊'}
            </div>
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-xl bg-emerald-500 text-white shadow-lg">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 tracking-tight">
          {player.nickname}
        </h1>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b3425] border border-[#2e573e] text-emerald-300 text-xs sm:text-sm font-bold mb-4 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>{t.inRoomBadge}</span>
        </div>

        <p className="text-[#a3cbb1] text-xs sm:text-sm max-w-xs leading-relaxed px-2">
          {t.lookAtHostScreen}
        </p>
      </div>

      {/* Footer Info */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#152a1e]/90 border border-[#2b543b] text-xs text-[#a3cbb1] max-w-sm mx-auto w-full shadow-lg relative z-10">
        {t.speedTip}
      </div>
    </div>
  );
}

