'use client';

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Users, Play, Copy, Check, Sparkles, Volume2, Shuffle } from 'lucide-react';
import { Player } from '@/types';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface LobbyViewProps {
  pin: string;
  quizTitle: string;
  players: Player[];
  onStartGame: () => void;
  isStarting: boolean;
  logoUrl?: string;
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
  onToggleShuffleQuestions?: () => void;
  onToggleShuffleAnswers?: () => void;
}

export default function LobbyView({
  pin,
  quizTitle,
  players,
  onStartGame,
  isStarting,
  logoUrl,
  shuffleQuestions = false,
  shuffleAnswers = false,
  onToggleShuffleQuestions,
  onToggleShuffleAnswers
}: LobbyViewProps) {
  const { t, lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');
  const { playLobbyMusic, stopLobbyMusic } = useSoundEffects();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJoinUrl(`${window.location.origin}/play/${pin}`);
    }
  }, [pin]);

  // Start background groove
  useEffect(() => {
    playLobbyMusic();
    return () => {
      stopLobbyMusic();
    };
  }, [playLobbyMusic, stopLobbyMusic]);

  const handleCopy = () => {
    if (navigator.clipboard && joinUrl) {
      navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sm:p-8 text-white relative overflow-hidden">
      {/* Background glowing orbs: Xanh Rêu & Cam Đất */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#B84E2E]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Game Info & PIN Banner */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#152a1e]/90 backdrop-blur-xl border border-[#2b543b] p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-4">
          {logoUrl && (
            <div className="p-2 rounded-2xl bg-white/5 border border-[#2b543b] shadow-md">
              <img
                src={logoUrl}
                alt="Presentation Logo"
                className="h-14 max-w-[160px] object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase font-bold tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>{t.roomDirect}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{quizTitle}</h1>
            <p className="text-xs sm:text-sm text-[#b4d1c0] mt-0.5">
              {t.scanQrHelp}
            </p>
          </div>
        </div>

        {/* Big PIN Card */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0c1811] border border-[#2b543b] px-6 py-4 rounded-2xl shadow-inner">
          <div className="text-center sm:text-right">
            <span className="text-xs text-[#a3cbb1] font-bold uppercase tracking-wider block">
              {t.gamePinTitle}
            </span>
            <span className="text-4xl sm:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-100 select-all font-mono">
              {pin}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-300 hover:text-white transition cursor-pointer shadow-sm"
            title={t.copyLinkTooltip}
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content Area: QR Code & Live Player Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6 my-8 flex-1 items-start">
        {/* Left Column: QR Code & Link */}
        <div className="lg:col-span-1 bg-[#152a1e]/90 backdrop-blur-xl border border-[#2b543b] p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl">
          <div className="p-4 bg-white rounded-2xl shadow-xl mb-4">
            {joinUrl && (
              <QRCodeSVG
                value={joinUrl}
                size={180}
                level="M"
                includeMargin={false}
              />
            )}
          </div>
          <p className="text-xs font-semibold text-[#d4e7db] mb-1">{t.scanCameraHelp}</p>
          <p className="text-[11px] text-[#a3cbb1] break-all font-mono">{joinUrl}</p>
        </div>

        {/* Right Column: Player Count & Player Nickname Cards */}
        <div className="lg:col-span-3 bg-[#152a1e]/90 backdrop-blur-xl border border-[#2b543b] p-6 rounded-3xl flex flex-col min-h-[360px] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#244230] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t.playersInRoom}</h2>
                <p className="text-xs text-[#a3cbb1]">{t.playersAutoUpdate}</p>
              </div>
            </div>

            <div className="px-4 py-1.5 rounded-full bg-[#1b3425] border border-[#2e573e] text-emerald-300 font-extrabold text-sm sm:text-base shadow-sm">
              {players.length} {t.playersCount}
            </div>
          </div>

          {/* Players Grid */}
          {players.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mb-4 animate-pulse">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-lg font-bold text-white">{t.waitingPlayers}</p>
              <p className="text-xs text-[#a3cbb1] max-w-sm mt-1">
                {t.openToJoin} <span className="text-emerald-400 font-mono font-semibold">/play/{pin}</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto max-h-[380px] pr-2">
              {players.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#0c1811] border border-[#2b543b] shadow-md animate-in zoom-in-95 duration-200"
                >
                  <span className="text-2xl sm:text-3xl">{p.avatar || '🦊'}</span>
                  <div className="overflow-hidden">
                    <p className="font-extrabold text-sm sm:text-base text-slate-100 truncate">
                      {p.nickname}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold">{t.readyBadge}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Bar: Start Game CTA & Quick Settings */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#152a1e]/95 backdrop-blur-xl border border-[#2b543b] p-4 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-xs text-[#a3cbb1] flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{t.lobbyMusicNotice}</span>
          </div>

          {/* Quick Shuffle Toggles */}
          {onToggleShuffleQuestions && (
            <button
              onClick={onToggleShuffleQuestions}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm cursor-pointer ${
                shuffleQuestions
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                  : 'bg-[#0c1811] border-[#2b543b] text-[#a3cbb1] hover:text-slate-200'
              }`}
              title={t.shuffleQuestionsTooltip}
            >
              <Shuffle className={`w-3.5 h-3.5 ${shuffleQuestions ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{t.shuffleQuestionsLabel}:</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${shuffleQuestions ? 'bg-emerald-600 text-white' : 'bg-[#1b3425] text-[#a3cbb1]'}`}>
                {shuffleQuestions ? t.autoNextOn : t.autoNextOff}
              </span>
            </button>
          )}

          {onToggleShuffleAnswers && (
            <button
              onClick={onToggleShuffleAnswers}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm cursor-pointer ${
                shuffleAnswers
                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-300 hover:bg-teal-500/30'
                  : 'bg-[#0c1811] border-[#2b543b] text-[#a3cbb1] hover:text-slate-200'
              }`}
              title={t.shuffleAnswersTooltip}
            >
              <Shuffle className={`w-3.5 h-3.5 ${shuffleAnswers ? 'text-teal-400' : 'text-slate-400'}`} />
              <span>{t.shuffleAnswersLabel}:</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${shuffleAnswers ? 'bg-teal-600 text-white' : 'bg-[#1b3425] text-[#a3cbb1]'}`}>
                {shuffleAnswers ? t.autoNextOn : t.autoNextOff}
              </span>
            </button>
          )}
        </div>

        <button
          onClick={onStartGame}
          disabled={players.length === 0 || isStarting}
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-black text-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-green-500 active:scale-95 text-white shadow-xl shadow-emerald-700/30 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{isStarting ? t.startingBtn : t.startGameBtn}</span>
        </button>
      </div>
    </div>
  );
}
