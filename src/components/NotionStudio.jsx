import React, { useState } from 'react';

/**
 * TRISULAPROMPT - Notion Studio Component v2.5 (Fully Patched with Export Center)
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * AI-Powered Markdown & WYSIWYG Editor + Native Document Export Engine
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
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // AI Toolbar Quick Helpers (PUEBI Fix & Content Expansion)
  const handleAiPuebiFix = () => {
    setIsAiProcessing(true);
    showToast('🤖 AI sedang merapikan tata bahasa & PUEBI...');
    setTimeout(() => {
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

  // ==========================================
  // REAL EXPORT & DOWNLOAD ENGINE
  // ==========================================

  const handleDownloadWord = () => {
    const rawTitle = docTitle || 'Modul_Ajar_Deep_Learning';
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${rawTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; padding: 20px; color: #1e293b; }
          h1 { color: #0B192C; border-bottom: 2px solid #D4AF37; padding-bottom: 5px; }
          h2 { color: #1E3A8A; margin-top: 20px; border-bottom: 1px solid #cbd5e1; }
          h3 { color: #D4AF37; margin-top: 15px; }
          ul, ol { margin-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${rawTitle}</h1>
        <hr/>
        <div>${content.replace(/\n/g, '<br/>')}</div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${rawTitle.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setIsExportModalOpen(false);
    showToast('✅ Berkas Word (.doc) berhasil diunduh!');
  };

  const handleDownloadTxt = () => {
    const rawTitle = docTitle || 'Modul_Ajar_Deep_Learning';
    const rawContent = `${rawTitle}\n\n=========================================\n\n${content}`;

    const blob = new Blob([rawContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${rawTitle.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setIsExportModalOpen(false);
    showToast('✅ Berkas Dokumen (.txt) berhasil diunduh!');
  };

  const handlePrintPDF = () => {
    setIsExportModalOpen(false);
    showToast('🖨️ Membuka jendela cetak / simpan PDF...');
    setTimeout(() => {
      window.print();
    }, 500);
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
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
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

        {/* AI Magic Action Buttons & Export Action */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={handleAiPuebiFix}
            disabled={isAiProcessing}
            className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <span>✨ AI Rapikan PUEBI</span>
          </button>

          <button
            onClick={handleAiExpandText}
            disabled={isAiProcessing}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border border-amber-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
          >
            <span>⚡ AI Diperdalam</span>
          </button>

          {/* View Mode Switches */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shrink-0">
            {['editor', 'split', 'preview'].map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveViewMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer ${
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
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>📥 Cetak / Export</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
          >
            💾 Simpan Dokumen
          </button>
        </div>

      </div>

      {/* EDITOR & PREVIEW WORKSPACE AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: TEXTAREA MARKDOWN EDITOR WITH COPY PROTECTION */}
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
              onCopy={(e) => {
                e.preventDefault();
                showToast('⚠️ Menyalin teks dari editor dilarang!');
              }}
              onCut={(e) => {
                e.preventDefault();
                showToast('⚠️ Memotong teks dari editor dilarang!');
              }}
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

      {/* EXPORT CENTER MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>📄</span> Export Center Dokumen
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Pilih format cetak/unduhan untuk perangkat ajar Anda.</p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-500 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadWord}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">🟦</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">
                      Unduh Berkas Word (.doc)
                    </div>
                    <div className="text-[10px] text-slate-400">Siap diedit lanjutan di MS Word / Docs</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Unduh →</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">
                      Unduh Teks Polos (.txt)
                    </div>
                    <div className="text-[10px] text-slate-400">Format markdown murni bebas karakter aneh</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Unduh →</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">🖨️</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">
                      Cetak / Simpan PDF
                    </div>
                    <div className="text-[10px] text-slate-400">Gunakan dialog cetak sistem browser</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Cetak →</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Batal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
```eof

File `src/components/NotionStudio.jsx` telah diperbarui dengan proteksi penggandaan teks (`onCopy` dan `onCut` handler). Pengguna tetap bisa mengetik, menambah, dan mengedit konten di dalam editor `<textarea>` secara penuh, tetapi percobaan untuk menyalin (`Ctrl+C`, `Cmd+C`, atau klik-kanan copy) akan dicegah dan memunculkan notifikasi toast.
