import React, { useState, useEffect } from 'react';
import { generateDeepLearningPrompt } from '../services/geminiService';

/**
 * TRISULAPROMPT - AIWorkspace Component v2.5 (Patched Engine)
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Split-Screen Layout (AI Co-Pilot Chat + Live Canvas Auto-Append & Export Engine)
 */

export default function AIWorkspace({ activeDocument, onBackToDashboard, onUpdateDocument }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
  
  // Default fallback data jika belum ada dokumen aktif
  const defaultDoc = {
    id: 'doc-default',
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

  const currentDoc = activeDocument || defaultDoc;
  
  // State lokal untuk kanvas real-time agar bisa bertambah secara dinamis
  const [docContent, setDocContent] = useState(currentDoc.content);
  
  // Update state lokal jika activeDocument berubah dari luar
  useEffect(() => {
    if (activeDocument && activeDocument.content) {
      setDocContent(activeDocument.content);
    }
  }, [activeDocument]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo Bapak/Ibu Guru! Saya **Deep Learning Engine v2.5**. Dokumen Anda siap ditinjau. Kirim instruksi seperti "Tambahkan LKPD" atau "Buat Asesmen" untuk menyempurnakan dokumen di kanvas kanan!'
    }
  ]);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Helper Generator LKPD / Penambahan Konten Nyata
  const generateLKPDBlock = (userInstruction) => {
    const isLKPD = userInstruction.toLowerCase().includes('lkpd') || userInstruction.toLowerCase().includes('lembar kerja');
    
    if (isLKPD) {
      return `\n\n---
\n## III. LEMBAR KERJA PESERTA DIDIK (LKPD) - DOKUMEN TAMBAHAN AI
**Mata Pelajaran**: ${currentDoc.subject || 'IPAS'} | **Fase/Kelas**: ${currentDoc.phase || 'Fase C'}
**Topik**: ${currentDoc.topic || 'Aktivitas Berbasis Kelompok'}

### 👥 Nama Kelompok: ____________________
**Anggota**: 1. ___________ 2. ___________ 3. ___________ 4. ___________

#### A. TANTANGAN MINDFUL & MEANINGFUL (15 Menit)
1. Amatilah lingkungan di sekitar sekolah/kelas Anda selama 3 menit secara hening.
2. Catat 2 hal menarik yang kelompok Anda temukan terkait materi ${currentDoc.topic || 'pembelajaran'}.

#### B. AKTIVITAS JOYFUL LEARNING (KOLABORATIF)
- **Tugas Utama**: Buatlah bagan / skema sederhana berdasarkan analisis kelompok Anda!
- **Diskusi**: Jawablah pertanyaan pemantik berikut: "Mengapa menjaga keseimbangan komponen ini sangat penting bagi kehidupan sehari-hari?"

#### C. RUBRIK PENILAIAN SINGKAT
- **Sangat Baik (4)**: Menyajikan analisis lengkap, rapi, dan semua anggota aktif.
- **Baik (3)**: Menyajikan analisis cukup lengkap dengan kerjasama tim yang baik.
- **Perlu Bimbingan (1-2)**: Memerlukan pendampingan guru dalam menyelesaikan tugas.`;
    } else {
      return `\n\n---
\n## IV. CATATAN & SUPLENEN REVISI AI
**Instruksi Diterapkan**: "${userInstruction}"
- **Penguatan Mindful**: Guru memberikan jeda berpikir 2 menit sebelum siswa menjawab pertanyaan.
- **Penguatan Meaningful**: Menghubungkan contoh kasus langsung dengan lingkungan tempat tinggal siswa.
- **Penguatan Joyful**: Menggunakan kuis tebak kata interaktif di pertengahan sesi.`;
    }
  };

  // Handler kirim instruksi ke AI Co-Pilot
  const handleSendMessage = async (overridePrompt) => {
    const textToSend = overridePrompt || inputInstruction;
    if (!textToSend.trim() || isGenerating) return;

    setInputInstruction('');
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setIsGenerating(true);

    try {
      // Panggil generator prompt jika diperlukan
      generateDeepLearningPrompt({
        subject: currentDoc.subject,
        phase: currentDoc.phase,
        topic: currentDoc.topic,
        instruction: textToSend
      });

      // Simulasikan pemrosesan sintesis berkedalaman
      setTimeout(() => {
        const newAddition = generateLKPDBlock(textToSend);
        const updatedFullContent = docContent + newAddition;

        // 1. Update Kanvas Kanan secara Real-time
        setDocContent(updatedFullContent);

        // 2. Callback ke Parent (jika ada) untuk update state global
        if (onUpdateDocument) {
          onUpdateDocument({
            ...currentDoc,
            content: updatedFullContent
          });
        }

        // 3. Beri balasan lengkap di Bubble Chat
        const aiResponseText = `✨ **[SINTESIS DEEP LEARNING SELESAI]**\n\nSaya telah menyusun draf baru berdasarkan instruksi: "${textToSend}".\n\n**Isi Tambahan yang Disuntikkan ke Kanvas Kanan:**${newAddition}`;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: aiResponseText
          }
        ]);

        setIsGenerating(false);
        showToast('⚡ Kanvas Kanan Berhasil Diperbarui oleh AI!');
      }, 1000);

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

  const handleDownloadWord = () => {
    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.6; padding: 20px; color: #1e293b; }
          h1 { color: #0B192C; border-bottom: 2px solid #D4AF37; padding-bottom: 5px; }
          h2 { color: #1E3A8A; margin-top: 20px; border-bottom: 1px solid #cbd5e1; }
          h3 { color: #D4AF37; margin-top: 15px; }
          ul, ol { margin-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${docTitle}</h1>
        <p><strong>Mata Pelajaran:</strong> ${currentDoc.subject || '-'} | <strong>Fase:</strong> ${currentDoc.phase || '-'}</p>
        <hr/>
        <div>${docContent.replace(/\n/g, '<br/>')}</div>
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

  const handleDownloadTxt = () => {
    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const rawContent = `${docTitle}\nMata Pelajaran: ${currentDoc.subject} | Phase: ${currentDoc.phase}\n\n=========================================\n\n${docContent}`;

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
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors text-xs cursor-pointer"
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
              <span className="animate-spin">⏳</span> AI sedang merancang & menyuntikkan dokumen...
            </div>
          )}
        </div>

        {/* Quick Action Bar & Chat Input */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => handleSendMessage('Tolong tambahkan 1 Lembar Kerja Peserta Didik (LKPD) kelompok untuk kelas ini.')}
              className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer"
            >
              📝 + Tambah LKPD Kelompok
            </button>
            <button
              onClick={() => handleSendMessage('Tolong tambahkan Asesmen Formatif & Rubrik Penilaian.')}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer"
            >
              🎯 + Asesmen & Rubrik
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputInstruction}
              onChange={(e) => setInputInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik instruksi, misal: 'Tambahkan LKPD SD'..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isGenerating}
              className="p-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
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
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
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
              <span className="text-[10px] text-emerald-400 font-semibold">● Auto-Synced</span>
            </div>
            <h2 className="text-base font-extrabold text-white">{currentDoc.title}</h2>
          </div>

          {/* Render real-time active document content */}
          <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-xl leading-relaxed whitespace-pre-wrap font-sans text-slate-200 shadow-inner">
            {docContent}
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
