import React, { useState } from 'react';

/**
 * TRISULAPROMPT - Notion Studio Component v2.5
 * AI-Powered Markdown & WYSIWYG Editor untuk Penyuntingan Perangkat Ajar
 */

export default function NotionStudio({ activeDoc, onSaveDoc, onBackToDashboard }) {
  // Local State Konten Editor
  const [docTitle, setDocTitle] = useState(
    activeDoc?.title || 'Modul Ajar Bahasa Indonesia - Fase B (Kelas 3)'
  );
  const [content, setContent] = useState(
    activeDoc?.content ||
      `# MODUL AJAR DEEP LEARNING: BAHASA INDONESIA FASE B

## I. INFORMASI UMUM
- **Mata Pelajaran**: Bahasa Indonesia
- **Fase / Kelas**: Fase B (Kelas 3)
- **Topik Utama**: Membaca & Memahami Isu Lingkungan
- **Alokasi Waktu**: 2 JP x 35 Menit

---

## II. INTEGRASI 3 PILAR DEEP LEARNING

### 1. Mindful Learning (Penyadaran Diri)
- **Latihan Hening STOP**: Sebelum pembelajaran dimulai, murid diajak hening selama 3 menit untuk menyiapkan fokus mental dan emosi.
- **Refleksi Awal**: Murid mengisi jurnal singkat mengenai harapan pembelajaran hari ini.

### 2. Meaningful Learning (Keterhubungan Masalah Nyata)
- **Konteks Lokal**: Membahas isu sampah dan kebersihan lingkungan sekolah.
- **Problem Solving**: Murid menganalisis teks narasi lingkungan dan merancang aksi nyata pemilahan sampah.

### 3. Joyful Learning (Kolaboratif & Menggembirakan)
- **Game Unplugged**: Detektif Kata Lingkungan (Aktivitas kelompok).
- **Apresiasi Sebaya**: Sesi apresiasi menggunakan kartu ucapan terima kasih antar teman kelompok.`
  );

  const [activeViewMode, setActiveViewMode] = useState('split'); // 'editor' | 'preview' | 'split'
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // AI Toolbar Quick Helpers (PUEBI Fix, Expand, Simplify)
  const handleAiPuebiFix = () => {
    setIsAiProcessing(true);
    showToast('🤖 AI sedang merapikan tata bahasa & PUEBI...');
    setTimeout(() => {
      // Simulasi Auto-fix PUEBI
      const fixed = content
        .replace(/di /g, 'di-')
        .replace(/di-sekolah/g, 'di sekolah')
        .replace(/di-lakukan/g, 'dilakukan');
      setContent(fixed);
      setIsAiProcessing(false);
      showToast('✨ PUEBI & Tata Bahasa berhasil dirapikan!');
    }, 1000);
  };

  const handleAiExpandText = () => {
    setIsAiProcessing(true);
    showToast('🤖 AI sedang memperdalam deskripsi kegiatan pembelajaran...');
    setTimeout(() => {
      const expanded =
        content +
        `\n\n### 4. Asesmen Berkelanjutan (Tambahan AI)
- **Asesmen Formatif**: Rubrik observasi unjuk kerja saat diskusi kelompok.
- **Asesmen Sumatif**: Penilaian lembar kerja peserta didik (LKPD) mandiri.`;
      setContent(expanded);
      setIsAiProcessing(false);
      showToast('⚡ Konten berhasil diperdalam oleh AI!');
    }, 1200);
  };

  const handleSave = () => {
    if (onSaveDoc) {
      onSaveDoc({
        ...activeDoc,
        title: docTitle,
        content: content,
        updatedAt: 'Baru saja'
      });
    }
    showToast('💾 Dokumen berhasil disimpan ke Project Hub!');
  };

  return (
    <div className="h-full flex flex-col bg-[#0F172A]/80 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#D4AF37] text-black font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs border border-amber-300 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* HEADER TOOLBAR NOTION STUDIO */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Title Input & Navigation */}
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
            >
              ← Kembali
            </button>
          )}
          <div className="flex-1">
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full bg-transparent font-extrabold text-sm md:text-base text-white focus:outline-none focus:border-b focus:border-[#D4AF37] pb-0.5"
              placeholder="Judul Perangkat Ajar..."
            />
            <div className="text-[10px] text-slate-400 flex items-center gap-2">
              <span className="text-[#D4AF37]">📝 Notion Studio Editor</span>
              <span>•</span>
              <span>Markdown Supported</span>
            </div>
          </div>
        </div>

        {/* AI Magic Action Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={handleAiPuebiFix}
            disabled={isAiProcessing}
            className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>✨ AI Rapikan PUEBI</span>
          </button>

          <button
            onClick={handleAiExpandText}
            disabled={isAiProcessing}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border border-amber-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>⚡ AI Diperdalam</span>
          </button>

          {/* View Mode Switches */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shrink-0">
            {['editor', 'split', 'preview'].map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveViewMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
                  activeViewMode === mode
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all shrink-0"
          >
            💾 Simpan Dokumen
          </button>
        </div>

      </div>

      {/* EDITOR & PREVIEW WORKSPACE AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: TEXTAREA MARKDOWN EDITOR */}
        {(activeViewMode === 'editor' || activeViewMode === 'split') && (
          <div
            className={`h-full p-4 flex flex-col bg-slate-950/60 border-r border-slate-800/80 ${
              activeViewMode === 'split' ? 'w-1/2' : 'w-full'
            }`}
          >
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center justify-between">
              <span>RAW MARKDOWN INPUT</span>
              <span>{content.length} Karakter</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis atau tempel kode Markdown perangkat ajar Anda di sini..."
              className="flex-1 w-full bg-slate-900/90 text-slate-100 p-4 rounded-2xl font-mono text-xs leading-relaxed focus:outline-none focus:border-[#D4AF37] border border-slate-800 resize-none selection:bg-[#D4AF37] selection:text-black"
            />
          </div>
        )}

        {/* RIGHT: WYSIWYG LIVE PREVIEW */}
        {(activeViewMode === 'preview' || activeViewMode === 'split') && (
          <div
            className={`h-full p-6 overflow-y-auto bg-slate-900/40 ${
              activeViewMode === 'split' ? 'w-1/2' : 'w-full'
            }`}
          >
            <div className="text-[10px] font-bold text-[#D4AF37] uppercase mb-3 flex items-center justify-between">
              <span>LIVE WYSIWYG DOCUMENT PREVIEW</span>
              <span className="text-emerald-400">● Synchronized</span>
            </div>

            <div className="p-8 bg-[#0F172A] border border-slate-800 rounded-3xl shadow-xl text-xs text-slate-200 leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
              {content}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
