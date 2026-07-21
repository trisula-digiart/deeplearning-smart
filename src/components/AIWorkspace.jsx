import React, { useState } from 'react';

/**
 * TRISULAPROMPT - AI Workspace Component v2.5
 * Interactive Split-Screen Editor untuk Perangkat Ajar Deep Learning
 */

const DEFAULT_MOCK_DOCUMENT = {
  title: "Modul Ajar Informatika - Algoritma Pemrograman",
  subject: "Informatika",
  phase: "Fase E (Kelas 10)",
  topic: "Algoritma Pemrograman & Flowchart",
  summary: "Perangkat ajar berbasis 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) dirancang khusus untuk meningkatkan pemahaman kontekstual dan keterlibatan aktif siswa.",
  components: [
    {
      id: "comp-1",
      section: "1. Identitas & Informasi Umum",
      content: `• Mata Pelajaran: Informatika
• Fase / Kelas: Fase E (Kelas 10 SMA/SMK)
• Alokasi Waktu: 2 JP (2 x 45 Menit)
• Target Peserta Didik: Reguler / Tipikal
• Model Pembelajaran: Problem-Based Learning (PBL) terintegrasi 3 Pilar Deep Learning`
    },
    {
      id: "comp-2",
      section: "2. Capaian & Tujuan Pembelajaran (TP)",
      content: `• Capaian Pembelajaran (CP): Peserta didik mampu merancang dan menganalisis struktur algoritma standar untuk memecahkan masalah komputasional.
• Tujuan Pembelajaran (TP 1.1): Memahami alur logika penulisan algoritma pseudo-code dan flowchart.
• Indikator KKTP: Siswa mampu mendesain diagram alir (flowchart) kasus transaksi e-commerce dengan tingkat akurasi minimal 85%.`
    },
    {
      id: "comp-3",
      section: "3. Kegiatan Pembelajaran (3 Pilar Deep Learning)",
      content: `• Mindful Learning (15 Menit): Sesi "Hening Sejenak" & Refleksi Awal. Guru memantik kesadaran siswa tentang bagaimana aplikasi seperti Shopee/GoJek mengambil keputusan menggunakan algoritma.
• Meaningful Learning (50 Menit): Menganalisis studi kasus nyata "Sistem Antrean Rumah Sakit". Siswa bekerja dalam kelompok merancang flowchart penyelesaian masalah.
• Joyful Learning (25 Menit): Gamifikasi "BONGKAR LOGIKA". Antarkelompok saling menukar flowchart untuk menemukan bug logika dengan antusias.`
    },
    {
      id: "comp-4",
      section: "4. Rencana Asesmen & Evaluasi",
      content: `• Asesmen Diagnostik: Kuis singkat logika berpikir via Google Form / Kahoot.
• Asesmen Formatif: Lembar Observasi Kolaborasi Kelompok & Penilaian Antar-Teman.
• Asesmen Sumatif: Tugas Praktik Merancang Flowchart Solusi Lingkungan Sekolah.`
    }
  ]
};

export default function AIWorkspace({ activeDocument = null, onBackToDashboard }) {
  const docData = activeDocument || DEFAULT_MOCK_DOCUMENT;
  const [selectedSection, setSelectedSection] = useState(docData.components[0]?.id || 'comp-1');
  const [docState, setDocState] = useState(docData);
  const [copiedSection, setCopiedSection] = useState(null);

  // Active component content finder
  const activeComp = docState.components.find((c) => c.id === selectedSection) || docState.components[0];

  // Handle Edit Content
  const handleContentChange = (newContent) => {
    setDocState((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.id === selectedSection ? { ...c, content: newContent } : c
      )
    }));
  };

  // Copy Content to Clipboard
  const handleCopySection = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0B192C] text-slate-100 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl">
      
      {/* Top Navigation Bar */}
      <div className="px-6 py-4 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
            >
              ← Kembali
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                {docState.subject}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {docState.phase}
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-100 mt-1">{docState.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopySection(JSON.stringify(docState, null, 2), 'all')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
          >
            {copiedSection === 'all' ? '✓ Copied Full JSON' : '📋 Copy JSON'}
          </button>
        </div>
      </div>

      {/* Split-Screen Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Section Selector */}
        <div className="w-1/3 min-w-[280px] max-w-[360px] border-r border-slate-800 bg-[#0F172A]/50 p-4 space-y-3 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
            Struktur Dokumen
          </div>

          <div className="space-y-2">
            {docState.components.map((comp) => {
              const isSelected = comp.id === selectedSection;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedSection(comp.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white shadow-md'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">{comp.section}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {comp.content}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-300 mt-4">
            💡 <strong>Pilar Deep Learning Active:</strong> Selalu pastikan kegiatan pembelajaran mencakup aspek Mindful, Meaningful, dan Joyful.
          </div>
        </div>

        {/* RIGHT PANEL: Live Markdown / Text Editor */}
        <div className="flex-1 flex flex-col bg-[#0B192C] overflow-hidden">
          {activeComp ? (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-[#D4AF37]">
                  {activeComp.section}
                </h3>
                <button
                  onClick={() => handleCopySection(activeComp.content, activeComp.id)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
                >
                  {copiedSection === activeComp.id ? '✓ Tersalin' : '📄 Salin Bagian Ini'}
                </button>
              </div>

              <textarea
                value={activeComp.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="flex-1 w-full bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-[#D4AF37] resize-none font-mono leading-relaxed"
                placeholder="Tuliskan detail dokumen di sini..."
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
              Pilih bagian di sebelah kiri untuk mulai menyunting.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
