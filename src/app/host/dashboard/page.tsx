'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Play,
  FileSpreadsheet,
  Trash2,
  HelpCircle,
  Sparkles,
  Download,
  Loader2,
  FolderOpen,
  Pencil,
  Search,
  FolderPlus,
  X,
  Tag
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import HostAuthGate from '@/components/host/HostAuthGate';
import ImportQuestionsModal from '@/components/host/ImportQuestionsModal';
import QuizEditorModal from '@/components/host/QuizEditorModal';
import { getQuizzes, deleteQuiz, getQuizWithQuestions } from '@/lib/actions/quiz';
import { createGameSession } from '@/lib/actions/game';
import { downloadSampleExcelTemplate } from '@/lib/excel/parseQuizFile';
import { exportQuizToExcel } from '@/lib/excel/exportQuizFile';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Quiz } from '@/types';

export default function HostDashboardPage() {
  const { t, lang } = useLanguage();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingSessionId, setCreatingSessionId] = useState<string | null>(null);
  const [exportingQuizId, setExportingQuizId] = useState<string | null>(null);

  // Search and Folder state
  const [searchQuery, setSearchQuery] = useState('');
  const [folders, setFolders] = useState<string[]>(['Công Nghệ', 'Sự Kiện']);
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');
  const [folderMap, setFolderMap] = useState<Record<string, string>>({});

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState<Quiz | null>(null);
  const [loadingEditId, setLoadingEditId] = useState<string | null>(null);

  const router = useRouter();

  // Load folders from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFolders = localStorage.getItem('quiz_host_folders');
      if (savedFolders) {
        try {
          setFolders(JSON.parse(savedFolders));
        } catch {
          // ignore
        }
      }
      const savedMap = localStorage.getItem('quiz_folder_assignments');
      if (savedMap) {
        try {
          setFolderMap(JSON.parse(savedMap));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const loadQuizzes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getQuizzes();
      if (res.success) {
        setQuizzes(res.quizzes);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  // Folder Actions
  const handleCreateFolder = () => {
    const name = window.prompt(t.newFolderPrompt);
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    if (folders.includes(cleanName)) {
      alert(lang === 'vi' ? 'Thư mục này đã tồn tại!' : 'Folder already exists!');
      return;
    }
    const nextFolders = [...folders, cleanName];
    setFolders(nextFolders);
    setSelectedFolder(cleanName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz_host_folders', JSON.stringify(nextFolders));
    }
  };

  const handleDeleteFolder = (folderName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t.confirmDeleteFolder)) {
      const nextFolders = folders.filter(f => f !== folderName);
      setFolders(nextFolders);
      if (selectedFolder === folderName) {
        setSelectedFolder('ALL');
      }
      const nextMap = { ...folderMap };
      Object.keys(nextMap).forEach(key => {
        if (nextMap[key] === folderName) delete nextMap[key];
      });
      setFolderMap(nextMap);
      if (typeof window !== 'undefined') {
        localStorage.setItem('quiz_host_folders', JSON.stringify(nextFolders));
        localStorage.setItem('quiz_folder_assignments', JSON.stringify(nextMap));
      }
    }
  };

  const handleAssignFolder = (quizId: string, folderName: string) => {
    const nextMap = { ...folderMap };
    if (!folderName) {
      delete nextMap[quizId];
    } else {
      nextMap[quizId] = folderName;
    }
    setFolderMap(nextMap);
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz_folder_assignments', JSON.stringify(nextMap));
    }
  };

  // Export Quiz to Excel
  const handleExportExcel = async (quiz: Quiz) => {
    setExportingQuizId(quiz.id);
    try {
      await exportQuizToExcel(quiz);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error exporting Excel';
      alert(msg);
    } finally {
      setExportingQuizId(null);
    }
  };

  const handleStartGame = async (quizId: string) => {
    setCreatingSessionId(quizId);
    try {
      const res = await createGameSession(quizId);
      if (res.success && res.session) {
        router.push(`/host/game/${res.session.pin}`);
      } else {
        alert(res.error || 'Không thể tạo phòng chơi');
      }
    } catch {
      alert('Lỗi khi kết nối máy chủ');
    } finally {
      setCreatingSessionId(null);
    }
  };

  const handleEditQuiz = async (quizId: string) => {
    setLoadingEditId(quizId);
    try {
      const res = await getQuizWithQuestions(quizId);
      if (res.success && res.quiz) {
        setQuizToEdit(res.quiz);
        setIsCreateModalOpen(true);
      } else {
        alert('Không thể tải dữ liệu bộ đề');
      }
    } catch {
      alert('Lỗi khi tải bộ đề');
    } finally {
      setLoadingEditId(null);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (confirm(t.confirmDeleteQuiz)) {
      await deleteQuiz(quizId);
      loadQuizzes();
    }
  };

  const handleLockDashboard = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('host_unlocked');
      window.location.reload();
    }
  };

  // Filter quizzes based on search query and selected folder
  const filteredQuizzes = quizzes.filter((quiz) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      quiz.title.toLowerCase().includes(q) ||
      (quiz.description && quiz.description.toLowerCase().includes(q));
    if (!matchesSearch) return false;

    if (selectedFolder === 'ALL') return true;
    return folderMap[quiz.id] === selectedFolder;
  });

  return (
    <HostAuthGate>
      <div className="relative min-h-[100dvh] flex flex-col bg-gradient-to-b from-[#112017] via-[#1A3324] to-[#0D1811] text-[#FAF8F5] selection:bg-[#B84E2E] selection:text-white overflow-x-hidden">
        {/* Paper Grain Texture Overlay */}
        <div className="grain-texture fixed inset-0 pointer-events-none z-30 opacity-35 mix-blend-overlay" />

        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none fixed top-0 right-1/4 w-[500px] h-[350px] bg-[#B84E2E]/10 rounded-full blur-[140px] z-0" />
        <div className="pointer-events-none fixed bottom-1/4 left-10 w-[450px] h-[350px] bg-[#1E4D32]/20 rounded-full blur-[130px] z-0" />

        {/* Navbar with Lock button and without live audio control */}
        <Navbar
          showHostLink={true}
          showAudioControl={false}
          showLockButton={true}
          onLock={handleLockDashboard}
        />

        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
          {/* Top Header & Toolbar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-6 border-b border-[#2B4B36]/80">
            <div>
              <div className="flex items-center gap-2 text-[#D4704E] text-xs font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4" />
                <span>{t.dashboardBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#FAF8F5] tracking-tight">{t.dashboardTitle}</h1>
              <p className="text-xs sm:text-sm text-[#A9BAAE] mt-1">
                {t.dashboardSubtitle}
              </p>
            </div>

            {/* Top Toolbar Actions - Căn chỉnh kích thước vừa vặn theo nội dung, không kéo dài */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              {/* 1. Download Excel Sample */}
              <button
                type="button"
                onClick={downloadSampleExcelTemplate}
                className="h-10 inline-flex items-center gap-2 px-3.5 sm:px-4 text-xs sm:text-sm font-bold text-[#B8E2C8] bg-[#182F22] hover:bg-[#203D2D] border border-[#2B4E38] rounded-xl transition cursor-pointer shadow-sm whitespace-nowrap"
                title="Tải bảng tính mẫu để nhập câu hỏi"
              >
                <Download className="w-4 h-4 text-[#7BD49F]" />
                <span>{t.downloadSampleBtn}</span>
              </button>

              {/* 2. Direct Import Excel / CSV to create Quiz */}
              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="h-10 inline-flex items-center gap-2 px-3.5 sm:px-4 text-xs sm:text-sm font-bold text-[#B8E2C8] bg-[#182F22] hover:bg-[#203D2D] border border-[#2B4E38] rounded-xl transition cursor-pointer shadow-sm whitespace-nowrap"
                title="Tải tệp Excel hoặc CSV từ máy tính để tự động tạo bộ đề"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#7BD49F]" />
                <span>{t.importExcelBtn}</span>
              </button>

              {/* 3. Create Quiz Button - Cam đất nung Behance */}
              <button
                type="button"
                onClick={() => {
                  setQuizToEdit(null);
                  setIsCreateModalOpen(true);
                }}
                className="h-10 inline-flex items-center gap-2 px-4 sm:px-5 rounded-xl bg-[#B84E2E] hover:bg-[#A34326] border border-[#CF603F] text-white font-black text-xs sm:text-sm shadow-lg shadow-[#B84E2E]/25 transition cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>{t.createQuizBtn}</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Folder Navigation */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#14261C]/90 p-3 sm:p-4 rounded-2xl border border-[#2B4B36] backdrop-blur-md shadow-xl">
            {/* Search Input - Có khoảng đệm pl-12 không để chữ đè lên icon */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#7F9E8B] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-10 py-2.5 rounded-xl bg-[#0D1811] border border-[#2B4B36] text-xs sm:text-sm text-[#FAF8F5] placeholder:text-[#688573] focus:border-[#B84E2E] focus:ring-1 focus:ring-[#B84E2E] outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7F9E8B] hover:text-[#FAF8F5] transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Folders Filter & Management - Chuẩn hóa chiều cao h-10 đồng nhất */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {/* All Folder Pill */}
              <button
                type="button"
                onClick={() => setSelectedFolder('ALL')}
                className={`h-10 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
                  selectedFolder === 'ALL'
                    ? 'bg-[#B84E2E] text-white shadow-md shadow-[#B84E2E]/25 border border-[#CF603F]'
                    : 'bg-[#182F22] text-[#B8D1C2] hover:bg-[#203D2D] border border-[#2B4E38]'
                }`}
              >
                <span>📁 {t.allFolders}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/35 font-extrabold">
                  {quizzes.length}
                </span>
              </button>

              {/* Custom Folders */}
              {folders.map((folder) => {
                const count = quizzes.filter(q => folderMap[q.id] === folder).length;
                const isSelected = selectedFolder === folder;
                return (
                  <div
                    key={folder}
                    className={`h-10 inline-flex items-center rounded-xl text-xs font-bold transition shrink-0 border ${
                      isSelected
                        ? 'bg-[#B84E2E] text-white shadow-md shadow-[#B84E2E]/25 border-[#CF603F]'
                        : 'bg-[#182F22] text-[#B8D1C2] hover:bg-[#203D2D] border-[#2B4E38]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedFolder(folder)}
                      className="px-3 h-full flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>📁 {folder}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/35 font-extrabold">
                        {count}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteFolder(folder, e)}
                      title={lang === 'vi' ? 'Xóa thư mục này' : 'Delete this folder'}
                      className="pr-2.5 pl-1 h-full flex items-center justify-center text-white/60 hover:text-white transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {/* Add Folder Button */}
              <button
                type="button"
                onClick={handleCreateFolder}
                className="h-10 px-3.5 rounded-xl text-xs font-bold bg-[#182F22] hover:bg-[#203D2D] text-[#E0A896] border border-[#523A33] transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
                title="Tạo thư mục mới để phân loại bộ đề"
              >
                <FolderPlus className="w-4 h-4 text-[#D4704E]" />
                <span>{t.createFolderBtn}</span>
              </button>
            </div>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-[#D4704E]">
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#B84E2E]" />
              <span className="text-sm text-[#A9BAAE]">{t.loadingQuizzes}</span>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredQuizzes.length === 0 && (
            <div className="p-10 sm:p-14 rounded-3xl bg-[#14261C]/90 border border-[#2B4B36] text-center max-w-lg mx-auto space-y-4 shadow-xl backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl bg-[#1B3526] border border-[#2D543D] text-[#D4704E] flex items-center justify-center mx-auto shadow-inner">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#FAF8F5]">
                  {quizzes.length === 0 ? t.noQuizzesTitle : (lang === 'vi' ? 'Không tìm thấy bộ đề phù hợp' : 'No matching quizzes')}
                </h3>
                <p className="text-xs sm:text-sm text-[#A9BAAE] mt-1">
                  {quizzes.length === 0
                    ? t.noQuizzesDesc
                    : (lang === 'vi' ? 'Thử tìm kiếm với từ khóa khác hoặc chuyển sang thư mục "Tất Cả".' : 'Try searching with different keywords or switch to "All".')}
                </p>
              </div>
              {quizzes.length === 0 && (
                <div className="flex items-center justify-center gap-3 pt-3 flex-wrap">
                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="h-10 inline-flex items-center gap-2 px-4 rounded-xl bg-[#182F22] hover:bg-[#203D2D] text-[#B8E2C8] font-bold text-xs sm:text-sm border border-[#2B4E38] transition cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#7BD49F]" />
                    <span>{t.importExcelBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuizToEdit(null);
                      setIsCreateModalOpen(true);
                    }}
                    className="h-10 inline-flex items-center gap-2 px-5 rounded-xl bg-[#B84E2E] hover:bg-[#A34326] border border-[#CF603F] text-white font-black text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-[#B84E2E]/25"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.createFirstQuiz}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quizzes Grid */}
          {!loading && filteredQuizzes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => {
                const questionCount = Array.isArray(quiz.questions)
                  ? (quiz.questions[0] as unknown as { count: number })?.count ?? quiz.questions.length
                  : 0;

                const assignedFolder = folderMap[quiz.id];

                return (
                  <div
                    key={quiz.id}
                    className="rounded-3xl bg-[#14261C]/90 border border-[#2B4B36] hover:border-[#3E6D4E] p-6 flex flex-col justify-between shadow-xl backdrop-blur-md transition-all hover:scale-[1.01]"
                  >
                    <div className="space-y-3">
                      {/* Top badges & actions */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1B3526] border border-[#2D543D] text-[#A6D1B5] text-xs font-bold">
                            <HelpCircle className="w-3.5 h-3.5 text-[#7BD49F]" />
                            <span>{questionCount} {t.questionsCount}</span>
                          </span>

                          {assignedFolder && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2D1B18] border border-[#52322B] text-[#F3C4BC] text-[11px] font-bold">
                              <span>📁 {assignedFolder}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Folder Selector Dropdown */}
                          <select
                            value={assignedFolder || ''}
                            onChange={(e) => handleAssignFolder(quiz.id, e.target.value)}
                            className="px-2.5 py-1 text-[11px] font-bold bg-[#0D1811] border border-[#2B4B36] rounded-lg text-[#FAF8F5] outline-none cursor-pointer"
                            title={t.moveToFolder}
                          >
                            <option value="">📁 {t.noFolder}</option>
                            {folders.map(f => (
                              <option key={f} value={f}>📁 {f}</option>
                            ))}
                          </select>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditQuiz(quiz.id)}
                            disabled={loadingEditId === quiz.id}
                            className="p-1.5 rounded-lg text-[#A9BAAE] hover:text-[#FAF8F5] hover:bg-[#1E3A2B] transition cursor-pointer"
                            title={t.editQuizTooltip}
                          >
                            {loadingEditId === quiz.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#D4704E]" />
                            ) : (
                              <Pencil className="w-4 h-4" />
                            )}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            className="p-1.5 rounded-lg text-[#A9BAAE] hover:text-rose-400 hover:bg-rose-500/15 transition cursor-pointer"
                            title={t.deleteQuizTooltip}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h2 className="text-xl font-black text-[#FAF8F5] leading-snug">{quiz.title}</h2>
                      <p className="text-xs text-[#A9BAAE] line-clamp-2 leading-relaxed">
                        {quiz.description || '—'}
                      </p>
                    </div>

                    {/* Bottom Action: Export Excel + Play Live */}
                    <div className="pt-5 mt-5 border-t border-[#2B4B36]/80 flex items-center gap-2.5">
                      {/* Export Excel Button */}
                      <button
                        type="button"
                        onClick={() => handleExportExcel(quiz)}
                        disabled={exportingQuizId === quiz.id}
                        className="h-10 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl text-xs font-bold text-[#B8E2C8] bg-[#182F22] hover:bg-[#203D2D] border border-[#2B4E38] transition cursor-pointer shrink-0"
                        title={lang === 'vi' ? 'Tải bộ câu hỏi về máy dưới dạng Excel (.xlsx)' : 'Export quiz questions to Excel (.xlsx)'}
                      >
                        {exportingQuizId === quiz.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5 text-[#7BD49F]" />
                        )}
                        <span>{t.exportExcelBtn}</span>
                      </button>

                      {/* Play Live Button - Cam đất nung Behance */}
                      <button
                        type="button"
                        onClick={() => handleStartGame(quiz.id)}
                        disabled={creatingSessionId === quiz.id}
                        className="h-10 flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-xl text-xs sm:text-sm font-black bg-[#B84E2E] hover:bg-[#A34326] border border-[#CF603F] text-white shadow-lg shadow-[#B84E2E]/25 disabled:opacity-50 transition cursor-pointer"
                      >
                        {creatingSessionId === quiz.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4 fill-current" />
                        )}
                        <span>{t.playLiveBtn}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* Modals */}
        <QuizEditorModal
          isOpen={isCreateModalOpen}
          quizToEdit={quizToEdit}
          onClose={() => {
            setIsCreateModalOpen(false);
            setQuizToEdit(null);
          }}
          onSuccess={loadQuizzes}
        />

        <ImportQuestionsModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onSuccess={loadQuizzes}
        />
      </div>
    </HostAuthGate>
  );
}
