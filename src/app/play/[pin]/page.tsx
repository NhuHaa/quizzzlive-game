'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AudioControl from '@/components/common/AudioControl';
import LanguageToggle from '@/components/common/LanguageToggle';
import ThinkingDuckLogo from '@/components/common/ThinkingDuckLogo';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import QuestionInput from '@/components/player/QuestionInput';
import PlayerLobby from '@/components/player/PlayerLobby';
import PlayerAnsweredView from '@/components/player/PlayerAnsweredView';
import PlayerResultView from '@/components/player/PlayerResultView';
import AvatarPickerModal from '@/components/player/AvatarPickerModal';
import { joinGameSession, submitPlayerAnswer, getSessionCurrentQuestion } from '@/lib/actions/game';
import {
  Player,
  PublicQuestion,
  AnswerSubmissionResult,
  NewQuestionPayload,
  TimesUpPayload,
  GameOverPayload
} from '@/types';
import { Sparkles, ArrowRight, Loader2, Trophy, Award, MoreHorizontal, Eye, EyeOff } from 'lucide-react';

interface PlayPageProps {
  params: Promise<{ pin: string }>;
}

const AVATARS = ['🦊', '🐯', '🐼', '🦁', '🚀', '⚡', '🦄', '🎮', '🦉', '🐱'];

export default function PlayPage({ params }: PlayPageProps) {
  const { pin } = use(params);
  const router = useRouter();
  const supabase = createClient();
  const { t, lang } = useLanguage();

  // Player state
  const [player, setPlayer] = useState<Player | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦊');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Show Question and Answers on player view (Default: true)
  const [showQA, setShowQA] = useState(true);

  // Load showQA preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedShowQA = localStorage.getItem('player_show_qa');
      if (savedShowQA !== null) {
        setShowQA(savedShowQA === 'true');
      }
    }
  }, []);

  const toggleShowQA = () => {
    setShowQA(prev => {
      const nextVal = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('player_show_qa', String(nextVal));
      }
      return nextVal;
    });
  };

  // Game cycle state
  const [playerView, setPlayerView] = useState<
    'enter_nickname' | 'lobby' | 'get_ready' | 'answering' | 'answered' | 'result' | 'leaderboard' | 'game_over'
  >('enter_nickname');

  const [currentQuestion, setCurrentQuestion] = useState<PublicQuestion | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [submittedAnswer, setSubmittedAnswer] = useState<string>('');
  const [answerResult, setAnswerResult] = useState<AnswerSubmissionResult | null>(null);
  const [podiumRank, setPodiumRank] = useState<number | null>(null);

  // Handle Joining Room
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setJoinError(t.nicknameRequired);
      return;
    }

    setJoining(true);
    setJoinError(null);

    try {
      const res = await joinGameSession(pin, nickname.trim(), selectedAvatar);
      if (res.success && res.player && res.sessionId) {
        setPlayer(res.player);
        setSessionId(res.sessionId);
        setPlayerView('lobby');
      } else {
        setJoinError(res.error || t.joinRoomError);
      }
    } catch {
      setJoinError(t.serverError);
    } finally {
      setJoining(false);
    }
  };

  // Setup Realtime Broadcast Listener for this session
  useEffect(() => {
    if (!player || !sessionId) return;

    const channelName = `game_sessions:${pin}`;
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true },
        presence: {
          key: player.id
        }
      }
    });

    // 1. Listen for GAME_START
    channel.on('broadcast', { event: 'GAME_START' }, (payload) => {
      const data = payload.payload as { total_questions: number };
      setTotalQuestions(data.total_questions);
      setPlayerView(prev => (prev === 'lobby' ? 'get_ready' : prev));
    });

    // 2. Listen for NEW_QUESTION
    channel.on('broadcast', { event: 'NEW_QUESTION' }, (payload) => {
      const data = payload.payload as NewQuestionPayload;
      if (data && data.question) {
        setCurrentQuestion(data.question);
        setCurrentQuestionIndex(data.question_index);
        setTotalQuestions(data.total_questions);
        setSubmittedAnswer('');
        setAnswerResult(null);
        if (typeof data.show_qa === 'boolean') {
          setShowQA(data.show_qa);
        }
        setPlayerView('answering');
      }
    });

    // 2.1 Listen for Host toggling Show Q&A
    channel.on('broadcast', { event: 'TOGGLE_SHOW_QA' }, (payload) => {
      const data = payload.payload as { show_qa: boolean };
      if (data && typeof data.show_qa === 'boolean') {
        setShowQA(data.show_qa);
      }
    });

    // 3. Listen for TIMES_UP (triggers immediately when all players answer or time runs out!)
    channel.on('broadcast', { event: 'TIMES_UP' }, () => {
      setPlayerView('result');
    });

    // 4. Listen for SHOW_LEADERBOARD
    channel.on('broadcast', { event: 'SHOW_LEADERBOARD' }, () => {
      setPlayerView('leaderboard');
    });

    // 5. Listen for GAME_OVER
    channel.on('broadcast', { event: 'GAME_OVER' }, (payload) => {
      const data = payload.payload as GameOverPayload;
      if (data.podium) {
        const foundIndex = data.podium.findIndex(p => p.id === player.id);
        if (foundIndex !== -1) {
          setPodiumRank(foundIndex + 1);
        }
      }
      setPlayerView('game_over');
    });

    // 6. Robust Fallback: Listen for Postgres database changes on game_sessions
    channel.on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'game_sessions',
        filter: `id=eq.${sessionId}`
      },
      async (payload) => {
        const newSession = payload.new as { status: string; current_question_index: number };
        if (newSession.status === 'question') {
          const res = await getSessionCurrentQuestion(sessionId);
          if (res.success && res.question) {
            setCurrentQuestion(res.question);
            setCurrentQuestionIndex(res.questionIndex ?? newSession.current_question_index);
            setTotalQuestions(res.totalQuestions ?? 0);
            setPlayerView(prev => (prev === 'answered' ? 'answered' : 'answering'));
          }
        } else if (newSession.status === 'question_result') {
          setPlayerView('result');
        } else if (newSession.status === 'leaderboard') {
          setPlayerView('leaderboard');
        } else if (newSession.status === 'ended') {
          setPlayerView('game_over');
        }
      }
    );

    // Track presence
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          id: player.id,
          nickname: player.nickname,
          avatar: player.avatar
        });
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [player, sessionId, pin, supabase]);

  // Handle Player Submitting Answer
  const handleAnswer = async (ans: string) => {
    if (!player || !sessionId || !currentQuestion) return;

    setSubmittedAnswer(ans);
    setPlayerView('answered');

    // Inform Host via Broadcast immediately
    const channel = supabase.channel(`game_sessions:${pin}`);
    channel.send({
      type: 'broadcast',
      event: 'PLAYER_SUBMITTED',
      payload: {
        player_id: player.id,
        nickname: player.nickname
      }
    });

    // Execute server action scoring
    try {
      const result = await submitPlayerAnswer(
        sessionId,
        player.id,
        currentQuestion.id,
        ans
      );

      setAnswerResult(result);
      if (result.success && result.new_score !== undefined) {
        setPlayer(prev => prev ? { ...prev, score: result.new_score, streak: result.streak } : prev);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-[100dvh] w-full max-w-full flex flex-col bg-gradient-to-b from-[#112017] via-[#1a3324] to-[#0d1811] text-[#f4f7f5] select-none overflow-x-hidden relative">
      {/* Compact dedicated Player Game Header */}
      <header className="w-full max-w-full px-3 sm:px-4 h-12 flex items-center justify-between border-b border-[#244230] bg-[#112017]/95 backdrop-blur-md shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <ThinkingDuckLogo size="sm" />
          <span className="font-mono text-xs font-bold text-[#d4e7db]">
            PIN: <span className="text-yellow-300 font-extrabold">{pin}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Show Questions & Answers on Phone */}
          <button
            onClick={toggleShowQA}
            type="button"
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl border text-[11px] sm:text-xs font-bold transition cursor-pointer shadow-sm ${
              showQA
                ? 'bg-[#1d4a30] border-[#3e855a] text-[#d4e7db] hover:bg-[#255e3e]'
                : 'bg-[#152a1e] border-[#244230] text-[#a3cbb1] hover:text-[#d4e7db]'
            }`}
            title={t.showQATooltip}
          >
            {showQA ? (
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span className="hidden xs:inline">{t.showQALabel}:</span>
            <span
              className={`px-1 py-0.2 rounded text-[10px] font-black ${
                showQA ? 'bg-emerald-600 text-white' : 'bg-[#0c1811] text-[#a3cbb1]'
              }`}
            >
              {showQA ? t.showQAOn : t.showQAOff}
            </span>
          </button>

          <LanguageToggle variant="compact" />
          <AudioControl />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 w-full max-w-full min-h-0 relative z-10">
        {/* STEP 1: Enter Nickname & Pick Avatar */}
        {playerView === 'enter_nickname' && (
          <div className="w-full max-w-md p-5 sm:p-8 rounded-3xl bg-[#152a1e]/95 border border-[#2b543b] shadow-2xl backdrop-blur-xl animate-in zoom-in-95 my-auto">
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b3425] border border-[#2e573e] text-emerald-300 text-xs font-bold font-mono mb-2 shadow-sm">
                PIN: {pin}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{t.chooseNicknameTitle}</h1>
              <p className="text-xs text-[#a3cbb1] mt-1">{t.chooseNicknameDesc}</p>
            </div>

            {/* Avatar Selector */}
            <div className="mb-5">
              <label className="block text-xs uppercase font-extrabold tracking-wider text-[#a3cbb1] mb-2 text-center">
                {t.chooseAvatar}
              </label>
              <div className="flex flex-wrap justify-center gap-2">
                {AVATARS.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl text-xl sm:text-2xl flex items-center justify-center transition cursor-pointer ${
                      selectedAvatar === av
                        ? 'bg-emerald-600 scale-110 shadow-lg shadow-emerald-800/50 ring-2 ring-emerald-300'
                        : 'bg-[#152a1e] hover:bg-[#1c3626] border border-[#244230]'
                    }`}
                  >
                    {av}
                  </button>
                ))}

                {/* If selected avatar is not in quick list, show it */}
                {!AVATARS.includes(selectedAvatar) && (
                  <button
                    type="button"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl text-xl sm:text-2xl flex items-center justify-center bg-emerald-600 scale-110 shadow-lg shadow-emerald-800/50 ring-2 ring-emerald-300 transition"
                  >
                    {selectedAvatar}
                  </button>
                )}

                {/* More Avatars Button (...) */}
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  title={lang === 'vi' ? 'Thêm linh vật khác...' : 'More avatars...'}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 flex items-center justify-center transition cursor-pointer"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <AvatarPickerModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                onSelect={(av) => setSelectedAvatar(av)}
                selectedAvatar={selectedAvatar}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={18}
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder={t.nicknameInputPlaceholder}
                  className="w-full text-center text-lg sm:text-xl font-bold py-3.5 px-4 rounded-2xl bg-[#0c1811] border-2 border-[#2b543b] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white placeholder:text-[#3e855a] outline-none transition shadow-inner"
                  autoFocus
                />
              </div>

              {joinError && (
                <p className="text-xs text-rose-400 font-semibold text-center">{joinError}</p>
              )}

              <button
                type="submit"
                disabled={joining || !nickname.trim()}
                className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-green-500 active:scale-98 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-700/30 flex items-center justify-center gap-2 disabled:opacity-50 transition cursor-pointer"
              >
                {joining ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.joiningText}</span>
                  </>
                ) : (
                  <>
                    <span>{t.readyToJoinBtn}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: In Lobby Waiting */}
        {playerView === 'lobby' && player && (
          <PlayerLobby player={player} pin={pin} />
        )}

        {/* STEP 3: Get Ready Countdown - Khởi động trò chơi */}
        {playerView === 'get_ready' && (
          <div className="text-center space-y-4 animate-pulse my-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-900/40">
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">{t.getReadyTitle}</h2>
            <p className="text-[#a3cbb1] text-xs sm:text-sm">{t.questionComing}</p>
          </div>
        )}

        {/* STEP 4: Answering Active Question */}
        {playerView === 'answering' && currentQuestion && (
          <div className="w-full max-w-2xl flex-1 flex flex-col justify-between py-1 h-full min-h-0">
            <div className="flex items-center justify-between px-2 pb-1 shrink-0">
              <span className="text-xs font-mono text-emerald-300 font-bold">
                {t.questionWord} {currentQuestionIndex + 1} / {totalQuestions}
              </span>
              <span className="text-xs font-mono font-bold text-yellow-300">
                {player?.score ?? 0} {t.pointsWord}
              </span>
            </div>

            {/* If question has image */}
            {currentQuestion.media_url && (
              <div className="max-h-28 sm:max-h-40 mb-1 flex justify-center shrink-0">
                <img
                  src={currentQuestion.media_url}
                  alt="Question Image"
                  className="max-h-24 sm:max-h-36 rounded-xl object-contain border border-[#2b543b] shadow"
                />
              </div>
            )}

            {/* Question Prompt: When showQA is true (default), show prompt so players can read directly on phone */}
            {showQA ? (
              <div className="w-full my-1 sm:my-1.5 px-3.5 py-2.5 sm:py-3.5 rounded-2xl bg-[#152a1e]/95 border-2 border-[#2b543b] shadow-lg text-center shrink-0">
                <h2 className="text-sm sm:text-base md:text-lg font-black text-white leading-snug break-words">
                  {currentQuestion.prompt}
                </h2>
              </div>
            ) : (
              <div className="w-full my-1 p-2 rounded-xl bg-[#152a1e]/70 border border-[#244230] text-center text-xs text-[#a3cbb1] shrink-0">
                {t.lookAtHostForQuestion}
              </div>
            )}

            <div className="flex-1 flex flex-col w-full my-1 min-h-0">
              <QuestionInput
                question={currentQuestion}
                onAnswer={handleAnswer}
                showAnswerText={showQA}
              />
            </div>
          </div>
        )}

        {/* STEP 5: Answer Submitted (Waiting for others) */}
        {playerView === 'answered' && (
          <PlayerAnsweredView submittedAnswer={submittedAnswer} />
        )}

        {/* STEP 6: Result for Question */}
        {playerView === 'result' && (
          <PlayerResultView
            result={answerResult}
            totalScore={player?.score ?? 0}
          />
        )}

        {/* STEP 7: Leaderboard Intermission */}
        {playerView === 'leaderboard' && (
          <div className="text-center space-y-4 max-w-sm w-full px-2 my-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-300">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{t.leaderboardTitle}</h2>
            <p className="text-xs sm:text-sm text-[#a3cbb1]">
              {t.watchHostLeaderboard}
            </p>
            <div className="p-4 rounded-2xl bg-[#152a1e]/90 border border-[#2b543b] shadow-xl">
              <span className="text-xs text-[#a3cbb1] block mb-1">{t.currentScore}</span>
              <span className="font-mono font-black text-2xl sm:text-3xl text-yellow-300">
                {player?.score.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* STEP 8: Game Over Podium - Vinh danh trên điện thoại người chơi */}
        {playerView === 'game_over' && (
          <div className="text-center space-y-4 max-w-sm w-full px-2 animate-in zoom-in-95 my-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center mx-auto text-yellow-300 shadow-2xl">
              <Award className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">{t.gameOverTitle}</h1>
            {podiumRank ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#1b3425] border border-amber-500/50 shadow-xl">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block mb-1">
                  {t.congratsTop}
                </span>
                <p className="text-lg sm:text-xl font-black text-white">
                  {t.topPodiumMessage} <span className="text-yellow-300 font-mono">TOP {podiumRank}</span>!
                </p>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[#a3cbb1]">
                {t.greatJobPodium}
              </p>
            )}

            <div className="p-4 rounded-2xl bg-[#152a1e]/90 border border-[#2b543b] shadow-xl">
              <span className="text-xs text-[#a3cbb1] block mb-1">{t.finalScoreLabel}</span>
              <span className="font-mono font-black text-2xl sm:text-3xl text-yellow-300">
                {player?.score.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
