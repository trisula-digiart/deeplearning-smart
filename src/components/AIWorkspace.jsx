import React, { useState } from 'react';

/**
 * TRISULAPROMPT - AI Workspace Component v2.5 (Fully Patched Export & Table Styler Engine)
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Features: Split-Screen Chat, Dynamic Auto-Append, Full Markdown/Table HTML Parser & Word/PDF Export Engine
 */

export default function AIWorkspace({ activeDoc, onSaveDoc, onBackToDashboard }) {
  // Local State Document & Chat
  const [docTitle, setDocTitle] = useState(
    activeDoc?.title || 'Modul Ajar Informatika - Tabel Input/Output & Flowchart'
  );
  const [docContent, setDocContent] = useState(
    activeDoc?.content ||
      `# MODUL AJAR DEEP LEARNING: INFORMATIKA FASE E (KELAS 10)

## I. INFORMASI UMUM
- **Mata Pelajaran**: Informatika
- **Fase / Kelas**: Fase E (Kelas 10)
- **Topik Utama**: Tabel Input/Output & Simbol Flowchart
- **Alokasi Waktu**: 2 JP x 45 Menit

---

## II. INTEGRASI 3 PILAR DEEP LEARNING

### 1. Mindful Learning (Penyadaran Diri)
- **Latihan Hening STOP**: Sebelum memulai pelajaran, murid diajak hening selama 3 menit untuk menyiapkan kestabilan mental & fokus belajar.
- **Refleksi Awal**: Murid mengisi jurnal singkat mengenai harapan dan tingkat kesiapan memahami materi.

### 2. Meaningful Learning (Keterhubungan Masalah Nyata)
- **Konteks Lokal**: Mengaitkan konsep Tabel Input/Output dengan masalah antrean di puskesmas/bank.
- **Tugas Terapan**: Murid menganalisis studi kasus lokal dan merancang solusi praktis.

---

## III. MATRIKS SIMBOL FLOWCHART & PEMROGRAMAN

| Simbol Flowchart | Nama Simbol | Fungsi & Deskripsi Utama |
| :--- | :--- | :--- |
| **Oval / Capsule** | Terminator | Menandai titik awal (Start) dan akhir (End) dari sebuah algoritma |
| **Jajaran Genjang** | Input / Output | Menerima masukan data atau menampilkan hasil keluaran |
| **Persegi Panjang** | Process | Menjalankan perhitungan atau proses instruksi logika |
| **Belah Ketupat** | Decision | Kondisi percabangan untuk mengambil keputusan (Ya / Tidak) |

---

## IV. LEMBAR KERJA PESERTA DIDIK (LKPD)

### 👥 Nama Kelompok: ____________________
**Anggota**: 1. _______________ 2. _______________ 3. _______________

#### A. TANTANGAN LOGIKA (15 Menit)
Lengkapi tabel analisis variabel input dan output berdasarkan kasus antrean bank di bawah ini:

| Nama Kasus | Input Data | Proses Utama | Expected Output |
| :--- | :--- | :--- | :--- |
| Antrean Teller | Nomor Tiket | Penganggilan urutan | Dipanggil ke Loket |
| Verifikasi Pin | 6 Digit PIN | Cek ke database | Akun Terverifikasi |`
  );

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo Bapak/Ibu Guru! Saya **Deep Learning Engine v2.5**. Dokumen Anda siap ditinjau. Kirim instruksi seperti "Tambahkan LKPD" atau "Buat Asesmen" untuk menyempurnakan dokumen di kanvas kanan!'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('Modul Ajar');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // ==========================================
  // ADVANCED MARKDOWN & TABLE TO HTML PARSER ENGINE
  // ==========================================
  const parseMarkdownToHTML = (markdown) => {
    if (!markdown) return '';

    let lines = markdown.split('\n');
    let htmlResult = [];
    let inTable = false;
    let tableBuffer = [];

    const renderTable = (rows) => {
      if (rows.length === 0) return '';
      let tableHtml = `<table style="width:100%; border-collapse:collapse; margin: 16px 0; font-size:12px;">`;
      
      rows.forEach((row, rowIndex) => {
        // Strip leading/trailing pipes and split by pipe
        let cleanRow = row.trim();
        if (cleanRow.startsWith('|')) cleanRow = cleanRow.substring(1);
        if (cleanRow.endsWith('|')) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
        
        // Skip delimiter row (| :--- | :--- |)
        if (cleanRow.includes('---')) return;

        let cells = cleanRow.split('|').map(c => c.trim());

        if (rowIndex === 0) {
          // Header Row
          tableHtml += `<tr style="background-color:#1E3A8A; color:#FFFFFF;">`;
          cells.forEach(cell => {
            let parsedCell = parseInlineMarkdown(cell);
            tableHtml += `<th style="border:1px solid #CBD5E1; padding:10px 12px; text-align:left; font-weight:bold;">${parsedCell}</th>`;
          });
          tableHtml += `</tr>`;
        } else {
          // Data Row
          let bg = rowIndex % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
          tableHtml += `<tr style="background-color:${bg}; color:#1E293B;">`;
          cells.forEach(cell => {
            let parsedCell = parseInlineMarkdown(cell);
            tableHtml += `<td style="border:1px solid #CBD5E1; padding:8px 12px;">${parsedCell}</td>`;
          });
          tableHtml += `</tr>`;
        }
      });

      tableHtml += `</table>`;
      return tableHtml;
    };

    const parseInlineMarkdown = (text) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Detect Table Line
      if (line.trim().startsWith('|')) {
        inTable = true;
        tableBuffer.push(line);
        continue;
      } else if (inTable) {
        // End of Table Block
        htmlResult.push(renderTable(tableBuffer));
        tableBuffer = [];
        inTable = false;
      }

      // Headers Parsing
      if (line.startsWith('# ')) {
        htmlResult.push(`<h1 style="color:#1E3A8A; border-bottom:2px solid #D4AF37; padding-bottom:6px; font-size:20px; font-weight:bold; margin-top:20px; margin-bottom:12px;">${parseInlineMarkdown(line.replace('# ', ''))}</h1>`);
      } else if (line.startsWith('## ')) {
        htmlResult.push(`<h2 style="color:#1E3A8A; border-bottom:1px solid #E2E8F0; padding-bottom:4px; font-size:16px; font-weight:bold; margin-top:18px; margin-bottom:10px;">${parseInlineMarkdown(line.replace('## ', ''))}</h2>`);
      } else if (line.startsWith('### ')) {
        htmlResult.push(`<h3 style="color:#2563EB; font-size:14px; font-weight:bold; margin-top:14px; margin-bottom:8px;">${parseInlineMarkdown(line.replace('### ', ''))}</h3>`);
      } else if (line.startsWith('#### ')) {
        htmlResult.push(`<h4 style="color:#D4AF37; font-size:13px; font-weight:bold; margin-top:12px; margin-bottom:6px;">${parseInlineMarkdown(line.replace('#### ', ''))}</h4>`);
      } else if (line.trim() === '---') {
        htmlResult.push(`<hr style="border:0; border-top:1px solid #CBD5E1; margin:16px 0;"/>`);
      } else if (line.trim().startsWith('- ')) {
        htmlResult.push(`<li style="margin-left:20px; margin-bottom:4px; color:#334155;">${parseInlineMarkdown(line.replace('- ', ''))}</li>`);
      } else if (line.trim().length > 0) {
        htmlResult.push(`<p style="margin-bottom:8px; color:#334155; line-height:1.6;">${parseInlineMarkdown(line)}</p>`);
      }
    }

    if (inTable) {
      htmlResult.push(renderTable(tableBuffer));
    }

    return htmlResult.join('');
  };

  // Send Prompt & Append Content
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsg = inputPrompt;
    setChatMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    setInputPrompt('');
    setIsProcessing(true);

    setTimeout(() => {
      let aiResponseText = '';
      let appendedContent = '';

      if (userMsg.toLowerCase().includes('lkpd')) {
        aiResponseText = 'Siap! LKPD Kelompok berbasis studi kasus telah ditambahkan ke kanvas!';
        appendedContent = `\n\n## IV. LEMBAR KERJA PESERTA DIDIK (LKPD)
### 👥 Nama Kelompok: ____________________
**Anggota**: 1. _______________ 2. _______________ 3. _______________

| No | Langkah Aktivitas | Catatan Analisis | Status |
| :---: | :--- | :--- | :---: |
| 1 | Identifikasi Masalah | Diskusikan alur antrean | Selesai |
| 2 | Buat Flowchart | Gambarkan simbol input & process | Draf |`;
      } else if (userMsg.toLowerCase().includes('asesmen') || userMsg.toLowerCase().includes('rubrik')) {
        aiResponseText = 'Asesmen Formatif & Rubrik Penilaian Analitis telah berhasil disuntikkan ke dokumen!';
        appendedContent = `\n\n## V. ASESMEN & RUBRIK PENILAIAN
### 📊 Rubrik Analitis Perancangan Flowchart

| Kriteria | Skor 1 (Perlu Bimbingan) | Skor 2 (Cukup) | Skor 3 (Baik) | Skor 4 (Sangat Baik) |
| :--- | :--- | :--- | :--- | :--- |
| **Pemahaman Simbol** | Salah memilih simbol | Hanya 1-2 simbol benar | Mayoritas simbol tepat | Seluruh simbol presisi & logis |
| **Kerjasama Kelompok** | Pasif | Cukup aktif | Aktif berdiskusi | Sangat solutif & memimpin |`;
      } else {
        aiResponseText = `Instruksi "${userMsg}" telah diproses dan diselaraskan ke dalam dokumen Kurikulum Merdeka Anda.`;
        appendedContent = `\n\n### Catatan Tambahan Pembelajaran\n- **Catatan Guru**: ${userMsg}`;
      }

      setDocContent((prev) => prev + appendedContent);
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: aiResponseText }
      ]);
      setIsProcessing(false);
      showToast('✨ Dokumen kanvas berhasil diperbarui otomatis!');
    }, 1200);
  };

  const handleSave = () => {
    if (onSaveDoc) {
      onSaveDoc({
        ...activeDoc,
        title: docTitle,
        content: docContent,
        updatedAt: 'Baru saja'
      });
    }
    showToast('💾 Dokumen berhasil disimpan!');
  };

  // EXPORT ENGINE FUNCTIONS
  const handleDownloadWord = () => {
    const rawTitle = docTitle || 'Modul_Ajar_Deep_Learning';
    const parsedHtmlBody = parseMarkdownToHTML(docContent);

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${rawTitle}</title>
        <style>
          body { font-family: 'Segoe UI', 'Arial', sans-serif; line-height: 1.6; padding: 30px; color: #1E293B; }
          h1 { color: #1E3A8A; border-bottom: 2px solid #D4AF37; padding-bottom: 6px; font-size: 22px; }
          h2 { color: #1E3A8A; border-bottom: 1px solid #CBD5E1; padding-bottom: 4px; margin-top: 20px; font-size: 18px; }
          h3 { color: #2563EB; margin-top: 15px; font-size: 15px; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
          th { background-color: #1E3A8A; color: #FFFFFF; border: 1px solid #CBD5E1; padding: 10px; text-align: left; }
          td { border: 1px solid #CBD5E1; padding: 8px; }
          ul, ol { margin-left: 20px; }
        </style>
      </head>
      <body>
        <h1 style="text-align: center; color: #1E3A8A;">${rawTitle}</h1>
        <p style="text-align: center; font-style: italic; color: #64748B;">Perangkat Ajar Kurikulum Merdeka - Berbasis 3 Pilar Deep Learning</p>
        <hr style="border:0; border-top: 2px solid #D4AF37; margin-bottom: 25px;"/>
        <div>${parsedHtmlBody}</div>
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
    showToast('✅ Berkas Word (.doc) rapi berhasil diunduh!');
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

      {/* HEADER BAR */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
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
              placeholder="Judul Dokumen..."
            />
            <div className="text-[10px] text-slate-400 flex items-center gap-2">
              <span className="text-[#D4AF37]">🤖 Ruang Bantu AI (Split Workspace)</span>
              <span>•</span>
              <span className="text-emerald-400">● Live Auto-Sync</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️ Cetak / Export Dokumen</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            💾 Simpan Dokumen
          </button>
        </div>
      </div>

      {/* SPLIT SCREEN WORKSPACE AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: CHAT CO-PILOT */}
        <div className="w-1/2 border-r border-slate-800 flex flex-col bg-slate-950/60">
          <div className="p-3 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🤖</span>
              <span className="text-xs font-bold text-slate-200">AI Co-Pilot Assistant</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              • Connected
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#D4AF37] text-black font-semibold rounded-br-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-slate-900 text-amber-400 border border-slate-800 p-3 rounded-2xl text-xs animate-pulse">
                  🤖 AI sedang meracik & menyuntikkan dokumen...
                </div>
              </div>
            )}
          </div>

          {/* QUICK PROMPT SUGGESTIONS */}
          <div className="p-2 bg-slate-900/80 border-t border-slate-800 flex gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setInputPrompt('Tolong tambahkan LKPD kelompok sederhana');
              }}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border border-amber-500/30 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer"
            >
              + Tambah LKPD Kelompok
            </button>
            <button
              onClick={() => {
                setInputPrompt('Tolong tambahkan Asesmen & Rubrik Analitis');
              }}
              className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer"
            >
              + Asesmen & Rubrik
            </button>
          </div>

          {/* INPUT FORM */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ketik instruksi, misal: 'Tambahkan LKPD SD'..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              Kirim
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: LIVE CANVAS PREVIEW (RENDERED BEAUTIFULLY) */}
        <div className="w-1/2 flex flex-col bg-slate-900/40">
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              {['Modul Ajar', 'CP', 'TP', 'ATP', 'KKTP', 'Prota', 'Prosem'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#D4AF37] text-black'
                      : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase">● Live Canvas Preview</span>
          </div>

          {/* RENDERED DOCUMENT VIEW */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-950/80">
            <div className="p-8 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 min-h-full">
              <div
                className="prose prose-slate max-w-none text-xs leading-relaxed"
                dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(docContent) }}
              />
            </div>
          </div>
        </div>

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
                    <div className="text-[10px] text-slate-400">Termasuk Tabel & Format Rapih Berwarna</div>
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
                    <div className="text-[10px] text-slate-400">Format cetak langsung dari browser</div>
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
