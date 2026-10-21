'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    if (!cleanPin) {
      setError(t.enterPinError);
      return;
    }
    if (cleanPin.length < 6) {
      setError(t.pinLengthError);
      return;
    }
    router.push(`/play/${cleanPin}`);
  };

  return (
    <div suppressHydrationWarning className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#112017] via-[#1a3324] to-[#0d1811] text-[#f4f7f5] selection:bg-[#B84E2E] selection:text-white overflow-x-hidden relative">
      {/* Lớp phủ hạt grain nhám sần sùi bề mặt (Paper / Film Grain Texture) */}
      <div suppressHydrationWarning className="fixed inset-0 pointer-events-none z-20 opacity-40 mix-blend-overlay grain-texture" aria-hidden="true" />

      <Navbar showHostLink={false} className="border-[#244230] bg-[#112017]/90 relative z-30" />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden z-10">
        {/* Ambient Glows: Ánh sáng Cam Đất Nung ấm áp & Xanh Rêu tinh tế */}
        <div className="absolute top-1/4 -right-16 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-gradient-to-br from-[#B84E2E]/20 via-[#C85D3B]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-gradient-to-tr from-emerald-600/15 via-white/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] bg-emerald-950/60 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center relative z-10 space-y-6 sm:space-y-8 my-auto">
          {/* Badge: Phong cách tối giản với điểm nhấn cam đất trầm */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1b3425]/90 border border-[#2e573e] text-[#d4e7db] text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-in fade-in shadow-lg">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#B84E2E] inline-block shadow-sm shadow-[#B84E2E]/40" />
            <span>{t.homeBadge}</span>
          </div>

          {/* Title: Trắng ngọc kết hợp dải gradient cam đất ấm mộc mạc */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
              {t.homeHeadline1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAD1C5] to-[#C85D3B]">
                {t.homeHeadline2}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#b4d1c0] mt-2.5 max-w-sm mx-auto font-medium">
              {t.homeSubtitle}
            </p>
          </div>

          {/* Join Game Box: Kính mờ xanh rêu cao cấp với viền sắc sảo */}
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#152a1e]/90 border border-[#2b543b]/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl space-y-4">
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-[#a3cbb1] mb-2">
                  {t.gamePinLabel}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/[^0-9]/g, ''));
                    setError(null);
                  }}
                  placeholder="000000"
                  className="w-full text-center text-3xl sm:text-4xl font-mono font-black tracking-widest py-3.5 px-4 rounded-2xl bg-[#0c1811] border-2 border-[#2b543b] focus:border-[#C85D3B] focus:ring-4 focus:ring-[#C85D3B]/20 text-[#F5DACD] placeholder:text-[#2b543b] outline-none transition shadow-inner"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-xs text-rose-400 font-semibold">{error}</p>
              )}

              {/* Nút bấm Cam Đất Nung (Burnt Clay / Terracotta) trầm ấm ít tươi chuẩn poster Behance */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#B84E2E] via-[#C85D3B] to-[#B84E2E] hover:from-[#A24225] hover:to-[#B84E2E] active:scale-98 text-white font-black text-lg shadow-xl shadow-black/50 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>{t.joinNowBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
