'use client';

import React from 'react';

interface ThumbsUpDuckProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ThumbsUpDuck({ className = '', size = 'lg' }: ThumbsUpDuckProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32 sm:w-36 sm:h-36'
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 p-1 shadow-2xl shadow-amber-500/30 select-none ${sizeClasses} ${className}`}
      title="Đã Gửi Đáp Án Thành Công!"
    >
      <div className="w-full h-full rounded-full bg-[#122218] flex items-center justify-center overflow-hidden p-1.5 border-2 border-emerald-500/40">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Gradient lông vịt vàng bóng bẩy */}
            <linearGradient id="duckBodyGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>

            {/* Gradient mỏ vịt màu cam */}
            <linearGradient id="duckBeakGrad" x1="45" y1="45" x2="85" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>

            {/* Má hồng phấn dễ thương */}
            <radialGradient id="duckCheekGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
            </radialGradient>

            {/* Gradient tay thumbs up */}
            <linearGradient id="thumbGrad" x1="70" y1="35" x2="90" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="60%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>

          {/* Đầu & Thân tròn đầy đặn của chú vịt */}
          <ellipse cx="46" cy="54" rx="30" ry="28" fill="url(#duckBodyGrad)" />
          {/* Bóng đổ nhẹ dưới cằm */}
          <ellipse cx="46" cy="72" rx="19" ry="7" fill="#CA8A04" fillOpacity="0.25" />

          {/* Chỏm tóc xoăn tinh nghịch trên đỉnh đầu */}
          <path
            d="M43 27C41 18 34 17 30 19C36 23 39 27 41 29"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M46 26C49 16 56 15 60 18C55 22 51 26 49 29"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Má hồng phấn đáng yêu */}
          <circle cx="27" cy="58" r="5.5" fill="url(#duckCheekGrad)" />
          <circle cx="61" cy="58" r="5.5" fill="url(#duckCheekGrad)" />

          {/* Mắt trái: to tròn long lanh, hào hứng */}
          <ellipse cx="35" cy="44" rx="5.5" ry="6.5" fill="#0F172A" />
          <circle cx="33.5" cy="41.5" r="2.2" fill="#FFFFFF" />
          <circle cx="36.5" cy="45.5" r="1.1" fill="#FFFFFF" />

          {/* Mắt phải: nháy mắt cười tinh nghịch tự tin 😉 */}
          <path
            d="M51 44C53 38 61 38 63 44"
            stroke="#0F172A"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Lông mày nhướng cao phấn khởi */}
          <path d="M29 35C33 32 38 33 41 36" stroke="#713F12" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M51 36C54 33 59 32 63 35" stroke="#713F12" strokeWidth="2.2" strokeLinecap="round" />

          {/* Mỏ cam cười tươi rạng rỡ */}
          <path
            d="M41 51C41 47 51 45 61 47C70 49 73 53 71 57C68 62 53 64 43 60C41 58 41 54 41 51Z"
            fill="url(#duckBeakGrad)"
            stroke="#C2410C"
            strokeWidth="1.5"
          />
          <path d="M44 54C50 56 61 55 67 53" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cánh trái đặt ở hông */}
          <path
            d="M20 54C17 62 20 72 26 73C29 73 30 70 29 64C27 59 23 55 20 54Z"
            fill="url(#duckBodyGrad)"
            stroke="#CA8A04"
            strokeWidth="1.8"
          />

          {/* Cánh phải giơ ngón tay cái Thumbs Up 👍 */}
          {/* Cánh vươn lên */}
          <path
            d="M65 59C69 61 74 65 77 65C81 65 83 61 82 56C80 50 74 46 66 48"
            fill="url(#thumbGrad)"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Nắm cánh (Fist part of wing) */}
          <ellipse cx="78" cy="55" rx="6.5" ry="6" fill="url(#thumbGrad)" stroke="#CA8A04" strokeWidth="1.8" />
          
          {/* Ngón tay cái (Thumb) dựng đứng lên kiêu hãnh 👍 */}
          <path
            d="M74 54C74 47 74.5 39 77 36C79 33.5 82 34 83 36.5C84 39 83.5 45 83.5 52"
            fill="url(#thumbGrad)"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Khớp ngón tay cái và móng nhẹ */}
          <ellipse cx="79.5" cy="37" rx="2" ry="1.2" fill="#FEF08A" />

          {/* Ngôi sao lấp lánh ở đầu ngón tay cái (Success Sparkle ✨) */}
          <g className="animate-pulse">
            <path
              d="M87 32L88.5 27L90 32L95 33.5L90 35L88.5 40L87 35L82 33.5L87 32Z"
              fill="#FDE047"
              stroke="#EAB308"
              strokeWidth="0.8"
            />
            <circle cx="94" cy="24" r="1.5" fill="#FEF08A" />
            <circle cx="80" cy="25" r="1.2" fill="#FACC15" />
          </g>
        </svg>
      </div>
    </div>
  );
}
