'use client';

import React from 'react';

interface ThinkingDuckLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThinkingDuckLogo({ className = '', size = 'md' }: ThinkingDuckLogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-tr from-[#B84E2E] via-amber-400 to-[#D4704E] p-0.5 shadow-md shadow-black/40 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-200 select-none ${sizeClasses} ${className}`}
      title="QuizLive - Chú Vịt Đang Suy Nghĩ"
    >
      <div className="w-full h-full rounded-[14px] bg-[#122218] flex items-center justify-center overflow-hidden p-0.5">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Gradient lông vịt vàng bóng bẩy */}
            <linearGradient id="duckGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>

            {/* Gradient mỏ vịt màu cam */}
            <linearGradient id="beakGrad" x1="45" y1="45" x2="85" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>

            {/* Má hồng phấn */}
            <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Đầu & Thân tròn đầy đặn của chú vịt */}
          <ellipse cx="48" cy="54" rx="31" ry="29" fill="url(#duckGrad)" />
          {/* Bóng đổ nhẹ dưới cằm */}
          <ellipse cx="48" cy="72" rx="20" ry="8" fill="#CA8A04" fillOpacity="0.3" />

          {/* Chỏm tóc đáng yêu trên đỉnh đầu */}
          <path
            d="M45 27C43 18 36 17 32 19C38 23 41 27 43 29"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M48 26C51 16 58 15 62 18C57 22 53 26 51 29"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Má hồng dễ thương */}
          <circle cx="28" cy="58" r="6" fill="url(#cheekGrad)" />

          {/* Mắt trái (to tròn, con ngươi liếc lên trên suy nghĩ) */}
          <ellipse cx="36" cy="44" rx="5.5" ry="6.5" fill="#0F172A" />
          <circle cx="34" cy="41.5" r="2.2" fill="#FFFFFF" />

          {/* Mắt phải (to tròn, cùng liếc lên chéo) */}
          <ellipse cx="56" cy="43" rx="6" ry="7" fill="#0F172A" />
          <circle cx="54" cy="40.5" r="2.4" fill="#FFFFFF" />

          {/* Đôi lông mày đang nhíu lại suy nghĩ 🤔 */}
          <path d="M30 35C33 33 38 35 41 37" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52 37C55 35 60 33 63 35" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />

          {/* Mỏ cam chu tròn suy ngẫm */}
          <path
            d="M44 52C44 48 53 46 63 48C72 49 76 54 74 58C71 63 56 65 46 61C44 59 44 55 44 52Z"
            fill="url(#beakGrad)"
            stroke="#C2410C"
            strokeWidth="1.5"
          />
          <path d="M47 54C53 55 64 54 70 53" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bàn tay / Cánh vịt chống cằm suy nghĩ (Thinking Gesture) */}
          <path
            d="M23 66C26 77 38 79 43 75C46 70 47 64 43 58C39 56 35 60 33 63"
            fill="url(#duckGrad)"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          {/* Ngón cánh nhỏ nâng dưới cằm mỏ */}
          <ellipse cx="44" cy="62" rx="4.5" ry="3.5" transform="rotate(-20 44 62)" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />

          {/* Ý tưởng phát sáng / Tia suy nghĩ trên đầu */}
          <g>
            <circle cx="73" cy="28" r="2" fill="#38BDF8" className="animate-pulse" />
            <circle cx="80" cy="20" r="3.5" fill="#60A5FA" className="animate-pulse" />
            {/* Dấu chấm hỏi ý tưởng màu vàng kim */}
            <path
              d="M80 9C80 6.5 83.5 5.5 85.5 7.5C87 9 86.5 11 84.5 12C83.5 13 83 14 83 15.5M83 18V18.5"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
