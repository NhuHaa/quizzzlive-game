'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Triangle, Diamond, Circle, Square, Check, X, Send } from 'lucide-react';
import { PublicQuestion } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface QuestionInputProps {
  question: PublicQuestion;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  showAnswerText?: boolean;
}

export default function QuestionInput({
  question,
  onAnswer,
  disabled = false,
  showAnswerText = true
}: QuestionInputProps) {
  const { lang } = useLanguage();
  const [blankInput, setBlankInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger mobile haptic feedback if supported
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(50);
      } catch {
        // Ignore if not allowed
      }
    }
  };

  const handleSelectAnswer = (ans: string) => {
    if (disabled) return;
    triggerHaptic();
    onAnswer(ans);
  };

  const handleSubmitBlank = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !blankInput.trim()) return;
    triggerHaptic();
    onAnswer(blankInput.trim());
  };

  // Auto focus for fill in the blank
  useEffect(() => {
    if (question.type === 'fill_in_the_blank') {
      setBlankInput('');
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [question]);

  // 1. Multiple Choice (4 colored shapes)
  if (question.type === 'multiple_choice') {
    const shapeConfigs = [
      {
        color: 'bg-red-600 hover:bg-red-500 active:bg-red-700 shadow-red-700/50',
        borderColor: 'border-red-400/40',
        icon: Triangle,
        label: 'A'
      },
      {
        color: 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-blue-700/50',
        borderColor: 'border-blue-400/40',
        icon: Diamond,
        label: 'B'
      },
      {
        color: 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-amber-600/50',
        borderColor: 'border-amber-300/40',
        icon: Circle,
        label: 'C'
      },
      {
        color: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-emerald-700/50',
        borderColor: 'border-emerald-400/40',
        icon: Square,
        label: 'D'
      }
    ];

    const optionsToRender = question.options && question.options.length > 0
      ? question.options
      : ['A', 'B', 'C', 'D'];

    return (
      <div className="w-full h-full flex-1 grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-4 select-none min-h-0">
        {optionsToRender.map((opt, idx) => {
          const config = shapeConfigs[idx % shapeConfigs.length];
          const Icon = config.icon;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectAnswer(opt)}
              className={`relative flex flex-col items-center justify-center p-2.5 sm:p-5 rounded-2xl border ${config.borderColor} ${config.color} text-white font-bold shadow-lg transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer h-full w-full min-h-[130px] sm:min-h-[170px] overflow-hidden`}
            >
              <div className={`rounded-full bg-black/20 flex items-center justify-center shrink-0 ${showAnswerText ? 'p-1.5 sm:p-2 mb-1 sm:mb-1.5' : 'p-4 sm:p-5'}`}>
                <Icon className={`${showAnswerText ? 'w-5 h-5 sm:w-7 sm:h-7' : 'w-10 h-10 sm:w-14 sm:h-14'} fill-current`} />
              </div>
              {showAnswerText ? (
                <span className="text-sm sm:text-base md:text-lg font-bold text-center leading-snug break-words max-h-full overflow-y-auto px-1">
                  {opt}
                </span>
              ) : (
                <span className="text-xs sm:text-sm font-mono font-black text-white/80 mt-1">
                  {config.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Pure True / False without mixed language
  if (question.type === 'true_false') {
    const displayTrue = lang === 'vi' ? 'Đúng' : 'True';
    const displayFalse = lang === 'vi' ? 'Sai' : 'False';

    const rawTrueOpt = question.options?.[0] || displayTrue;
    const rawFalseOpt = question.options?.[1] || displayFalse;

    return (
      <div className="w-full h-full flex-1 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 sm:grid-rows-1 gap-3 sm:gap-4 select-none min-h-0">
        {/* True Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleSelectAnswer(rawTrueOpt)}
          className="flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 active:scale-95 text-white font-black shadow-xl border border-emerald-400/30 transition disabled:opacity-50 cursor-pointer h-full w-full min-h-[130px] sm:min-h-[180px]"
        >
          <div className="p-3 sm:p-4 rounded-full bg-black/20 mb-2 shrink-0">
            <Check className="w-9 h-9 sm:w-12 sm:h-12 stroke-[3]" />
          </div>
          {showAnswerText && (
            <span className="text-2xl sm:text-3xl font-extrabold">{displayTrue}</span>
          )}
        </button>

        {/* False Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => handleSelectAnswer(rawFalseOpt)}
          className="flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl bg-red-600 hover:bg-red-500 active:bg-red-700 active:scale-95 text-white font-black shadow-xl border border-red-400/30 transition disabled:opacity-50 cursor-pointer h-full w-full min-h-[130px] sm:min-h-[180px]"
        >
          <div className="p-3 sm:p-4 rounded-full bg-black/20 mb-2 shrink-0">
            <X className="w-9 h-9 sm:w-12 sm:h-12 stroke-[3]" />
          </div>
          {showAnswerText && (
            <span className="text-2xl sm:text-3xl font-extrabold">{displayFalse}</span>
          )}
        </button>
      </div>
    );
  }

  // 3. Fill in the Blank (Large Input + Auto-focus + Submit)
  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 flex flex-col justify-center">
      <form onSubmit={handleSubmitBlank} className="space-y-4">
        <div className="bg-[#152a1e]/95 border-2 border-[#2b543b] rounded-2xl p-4 shadow-2xl backdrop-blur-md">
          <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
            {lang === 'vi' ? 'Nhập câu trả lời của bạn:' : 'Enter your answer:'}
          </label>
          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            value={blankInput}
            onChange={(e) => setBlankInput(e.target.value)}
            placeholder={lang === 'vi' ? 'Gõ từ khóa vào đây...' : 'Type answer here...'}
            className="w-full text-xl sm:text-2xl font-bold text-white bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#3e855a]"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        <button
          type="submit"
          disabled={disabled || !blankInput.trim()}
          className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-98 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-3 transition disabled:opacity-50 cursor-pointer"
        >
          <span>{lang === 'vi' ? 'Gửi câu trả lời' : 'Submit Answer'}</span>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
