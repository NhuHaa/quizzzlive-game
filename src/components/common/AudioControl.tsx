'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sliders } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function AudioControl() {
  const { volume, isMuted, changeVolume, toggleMute } = useSoundEffects();
  const [showSlider, setShowSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSlider(false);
      }
    };
    if (showSlider) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSlider]);

  const currentPercent = isMuted ? 0 : Math.round(volume * 100);

  return (
    <div ref={containerRef} className="relative flex items-center gap-2 sm:gap-2.5">
      {/* Nút bật/tắt tiếng nhanh */}
      <button
        type="button"
        onClick={toggleMute}
        title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
        className={`p-2.5 sm:p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-center ${
          isMuted
            ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 hover:bg-rose-500/25'
            : 'bg-[#162a1f]/90 hover:bg-[#1e382b] border-[#2b4c37] text-[#d4e7db] hover:text-white shadow-sm'
        }`}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-5 h-5 text-rose-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-[#D4704E]" />
        )}
      </button>

      {/* Nút mở thanh gạt âm lượng */}
      <button
        type="button"
        onClick={() => setShowSlider(!showSlider)}
        title="Điều chỉnh âm lượng"
        className={`p-2.5 sm:p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-center ${
          showSlider
            ? 'bg-[#B84E2E]/25 border-[#B84E2E] text-[#F5DACD] ring-2 ring-[#B84E2E]/20'
            : 'bg-[#162a1f]/90 hover:bg-[#1e382b] border-[#2b4c37] text-[#d4e7db] hover:text-white shadow-sm'
        }`}
      >
        <Sliders className="w-5 h-5" />
      </button>

      {/* Bảng điều khiển âm lượng nổi */}
      {showSlider && (
        <div className="absolute top-full right-0 mt-3 p-4 bg-[#14231a] backdrop-blur-2xl border-2 border-[#2b4c37] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col gap-3 w-64 sm:w-72 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#d4e7db]">
            <span className="flex items-center gap-1.5">
              <span>Âm lượng trò chơi</span>
            </span>
            <span className="font-mono text-[#D4704E] font-black text-sm">{currentPercent}%</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1 rounded-xl hover:bg-[#1e382b] text-[#84a390] hover:text-white transition shrink-0 cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-rose-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-[#D4704E]" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="volume-slider flex-1 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
