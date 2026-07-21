import React, { useState } from 'react';
import { generateDeepLearningPrompt } from '../services/geminiService';

/**
 * TRISULAPROMPT - AIWorkspace Component v2.5
 * Split-Screen Layout (AI Co-Pilot Chat + Live Canvas Preview & Export Engine Real)
 */

export default function AIWorkspace({ activeDocument, onBackToDashboard }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar'); // 'modul-ajar' | 'cp' | 'tp' | 'atp' | 'kktp' | 'prota' | 'prosem'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo Bapak/Ibu Guru! Saya **Deep Learning Engine v2.5**. Dokumen Anda siap ditinjau. Apa ada bagian dari Modul Ajar ini yang perlu kita pertajam berbasis 3 Pilar (Mindful, Meaningful, Joyful)?'
    }
  ]);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Default fallback data jika belum ada dokumen aktif
  const currentDoc = activeDocument || {
    title: 'Modul Ajar Bahasa Indonesia - Kelas 3',
    subject: 'Bahasa Indonesia',
    phase: 'Fase B (Kelas 3)',
    topic: 'Membaca & Memahami Isu Lingkungan',
    status: 'In Progress',
    content: `# MODUL AJAR DEEP LEARNING: BAHASA INDONESIA FASE B

## I. INFORMASI UMUM
- **Mata Pelajaran**: Bahasa Indonesia
- **Kelas / Semester**: Kelas 3 / Semester 1 (Ganjil)
- **Gaya Belajar Dominan**: Visual & Kinestetik Dominan
 
---

## II. TIGA PILAR DEEP LEARNING INTEGRATION

### 1. Mindful Learning (Penyadaran Diri)
- **Latihan STOP**: Sebelum pembelajaran dimulai, murid diajak hening selama 3 menit untuk menyiapkan fokus mental.
- **Refleksi Awal**: Murid menuliskan harapan dan tingkat kepercayaan diri dalam menguasai materi.

### 2. Meaningful Learning (Keterhubungan Masalah Nyata)
- **Konteks Lokal**: Membahas isu nyata "Minat baca rendah terhadap teks panjang & kesulitan membedakan fakta vs opini di medsos".
- **Problem Solving**: Murid merancang solusi terapan dari teks yang dipelajari.

### 3. Joyful Learning (Kolaboratif & Menggembirakan)
- **Game Unplugged**: Aktivitas kelompok interaktif berbasis tantangan logika teks.
- **Peer Feedback**: Saling memberikan umpan balik apresiatif antar kelompok.`
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Handler kirim instruksi ke AI Co-Pilot
  const handleSendMessage = async () => {
    if (!inputInstruction.trim() || isGenerating) return;

    const userText = inputInstruction;
    setInputInstruction('');
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setIsGenerating(true);

    try {
      const prompt = generateDeepLearningPrompt({
        subject: currentDoc.subject,
        phase: currentDoc.phase,
        topic: currentDoc.topic,
        instruction: userText
      });

      // Simulasi/Response sintesis AI
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: `[DEEP LEARNING SYNTHESIS COMPLETED]\n\nRevisi berbasis 3 Pilar telah diterapkan:\n1. **Mindful**: Aktivitas hening reflektif disesuaikan dengan ritme siswa.\n2. **Meaningful**: Penguatan studi kasus kontekstual pada menit ke-15.\n3. **Joyful**: Ditambahkan ice breaking interaktif berbasis tantangan kelompok.`
          }
        ]);
        setIsGenerating(false);
      }, 1200);
    } catch (err) {
      setIsGenerating(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: 'Maaf, terjadi kendala saat merespons. Silakan coba lagi.' }
      ]);
    }
  };

  // ==========================================
  // REAL EXPORT & DOWNLOAD ENGINE
  // ==========================================

  // 1. Download sebagai Berkas Word / Document (.doc)
  const handleDownloadWord = () => {
    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const rawContent = currentDoc.content || 'Isi dokumen kosong.';

    // Format HTML sederhana agar Microsoft Word / Google Docs dapat membacanya langsung
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; padding: 20px; }
          h1 { color: #0B192C; border-bottom: 2px solid #D4AF37; padding-bottom: 5px; }
          h2 { color: #1E3A8A; margin-top: 20px; }
          h3 { color: #D4AF37; }
          ul, ol { margin-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${docTitle}</h1>
        <p><strong>Mata Pelajaran:</strong> ${currentDoc.subject || '-'} | <strong>Fase:</strong> ${currentDoc.phase || '-'}</p>
        <hr/>
        <div>${rawContent.replace(/\n/g, '<br/>')}</div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setIsExportModalOpen(false);
    showToast('✅ Berkas Word (.doc) berhasil diunduh!');
  };

  // 2. Download sebagai File Text/Markdown (.txt)
  const handleDownloadTxt = () => {
    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const rawContent = `${docTitle}\nMata Pelajaran: ${currentDoc.subject} | Phase: ${currentDoc.phase}\n\n=========================================\n\n${currentDoc.content}`;

    const blob = new Blob([rawContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setIsExportModalOpen(false);
    showToast('✅ Berkas Dokumen (.txt) berhasil diunduh!');
  };

  // 3. Print / Save as PDF via Native Browser
  const handlePrintPDF = () => {
    setIsExportModalOpen(false);
    showToast('🖨️ Membuka jendela cetak / simpan PDF...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 relative">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#D4AF37] text-black font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs animate-bounce border border-amber-300">
          {toastMessage}
        </div>
      )}

      {/* LEFT PANEL: AI CO-PILOT CHAT */}
      <div className="w-full md:w-5/12 bg-[#0F172A]/90 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors text-xs"
              title="Kembali ke Dashboard"
            >
              ← Kembali
            </button>
            <div>
              <h3 className="font-bold text-xs text-slate-100 flex items-center gap-1.5">
                <span>🤖</span> AI Co-Pilot (Deep Learning v2.5)
              </h3>
              <p className="text-[10px] text-slate-400">Pilar: Mindful • Meaningful • Joyful</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            ● Connected
          </span>
        </div>

        {/* Chat Stream Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 font-bold text-indigo-300">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-2">
              <span className="animate-spin">⏳</span> AI sedang menyintesis revisi...
            </div>
          )}
        </div>

        {/* Quick Action Bar & Chat Input */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setInputInstruction('ACC & Lanjutkan dokumen ini.');
              }}
              className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-semibold transition-all"
            >
              ✓ ACC & Lanjutkan
            </button>
            <button
              onClick={() => {
                setInputInstruction('Tolong revisi dan perjelas bagian asesmen formatif.');
              }}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold transition-all"
            >
              ✏️ Minta Revisi
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputInstruction}
              onChange={(e) => setInputInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik instruksi atau penyesuaian dokumen..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={handleSendMessage}
              disabled={isGenerating}
              className="p-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              ✈️
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: LIVE CANVAS PREVIEW */}
      <div className="w-full md:w-7/12 bg-[#0F172A]/90 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Canvas Toolbar & Tabs */}
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/50">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'modul-ajar', label: 'Modul Ajar' },
              { id: 'cp', label: 'CP' },
              { id: 'tp', label: 'TP' },
              { id: 'atp', label: 'ATP' },
              { id: 'kktp', label: 'KKTP' },
              { id: 'prota', label: 'Prota' },
              { id: 'prosem', label: 'Prosem' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeSubTab === tab.id
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0"
          >
            <span>📥 Cetak / Export Dokumen</span>
          </button>
        </div>

        {/* Canvas Text Content */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-slate-200 bg-slate-950/40 space-y-4">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-[#D4AF37] font-bold border border-amber-500/20">
                ✨ LIVE CANVAS PREVIEW
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">● Ready to Export</span>
            </div>
            <h2 className="text-base font-extrabold text-white">{currentDoc.title}</h2>
          </div>

          {/* Render raw content */}
          <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl leading-relaxed whitespace-pre-wrap font-sans text-slate-300">
            {currentDoc.content}
          </div>
        </div>

      </div>

      {/* EXPORT CENTER MODAL REAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>📄</span> Export Center Dokumen
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Pilih format unduhan untuk perangkat ajar Anda.</p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-500 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadWord}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group"
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
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group"
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
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group"
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
                className="text-xs text-slate-400 hover:text-slate-200 underline"
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
