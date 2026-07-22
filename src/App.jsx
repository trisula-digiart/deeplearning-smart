import React, { useState, useEffect } from 'react';

const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJJp3CVGiAEkCQ-6zDTgS1Rz2Fz2vQYCvpn_hB-JkN13q9aWQOAFfAtpWH3cHnby6LEg/exec";

const syncUserToGoogleSheets = async (userData, action = 'SYNC_USER') => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, user: userData })
    });
  } catch (err) {
    console.error('Failed to sync with Google Sheets:', err);
  }
};

const Icons = {
  Cpu: ({ className = "w-5 h-5 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Home: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Folder: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Bolt: ({ className = "w-4 h-4 text-amber-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4 text-rose-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Menu: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Search: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Coins: ({ className = "w-4 h-4 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  LogOut: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 013.222-.563c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
    </svg>
  ),
  User: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Building: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  CheckCircle: ({ className = "w-4 h-4 text-emerald-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Printer: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  FileText: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
};

function Navbar({
  isSidebarOpen = true,
  setIsSidebarOpen,
  toggleSidebar,
  searchQuery = '',
  setSearchQuery,
  onOpenWizard,
  handleOpenWizard,
  currentUser,
  onLogout,
  handleLogout,
  onRequestPaywall
}) {
  const isPremium = Boolean(currentUser?.is_premium);
  const creditCount = currentUser?.kredit_tersisa ?? 0;

  const triggerWizard = onOpenWizard || handleOpenWizard || (() => {});
  
  const triggerToggleSidebar = () => {
    if (setIsSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    } else if (toggleSidebar) {
      toggleSidebar();
    }
  };

  const triggerLogout = onLogout || handleLogout || (() => {
    try {
      localStorage.removeItem('trisula_user_session');
      window.location.reload();
    } catch (e) {
      console.error('Logout failed:', e);
    }
  });

  return (
    <header className="bg-[#0B1728]/95 border-b border-slate-800 px-3 sm:px-6 py-3 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between shadow-xl w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={triggerToggleSidebar}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition cursor-pointer border border-transparent hover:border-slate-700 active:scale-95"
          aria-label="Toggle Menu Sidebar"
          title="Buka / Tutup Navigasi"
        >
          <Icons.Menu className="w-5 h-5 text-slate-300" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-600 p-[1px] shadow-lg shadow-amber-500/10 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0B1728] rounded-[11px] flex items-center justify-center">
              <Icons.Cpu className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-xs sm:text-sm tracking-wide text-white leading-none">
              TRISULA SMART LEARNING ENGINE
            </h1>
            <span className="text-[10px] text-[#D4AF37] font-bold tracking-wider mt-1 uppercase">
              DEEP LEARNING ENGINE V3.0
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden lg:flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 w-48 xl:w-64 text-xs focus-within:border-[#D4AF37] transition-all">
          <Icons.Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Cari modul / topik..."
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={() => onRequestPaywall && onRequestPaywall('Silakan lakukan top up token atau tingkatkan paket lisensi Anda!')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
            isPremium
              ? 'bg-amber-500/10 border-[#D4AF37]/50 text-amber-300 hover:bg-amber-500/20'
              : creditCount > 0
              ? 'bg-slate-900 border-slate-700 text-amber-300 hover:border-[#D4AF37]'
              : 'bg-rose-950/50 border-rose-500/50 text-rose-300 hover:bg-rose-900/60 animate-pulse'
          }`}
          title="Klik untuk Top Up Kuota / Buka Akses"
        >
          <Icons.Coins className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="font-mono text-xs">
            {isPremium ? 'Unlimited Pro' : `${creditCount} Token`}
          </span>
        </button>

        <button
          onClick={triggerWizard}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 text-xs px-3.5 py-1.5 rounded-xl font-bold shadow-lg shadow-amber-500/15 transition-all active:scale-95 cursor-pointer shrink-0"
          title="Buat Perangkat Ajar Baru"
        >
          <Icons.Plus className="w-4 h-4 text-slate-950" />
          <span className="hidden sm:inline">+ Buat Perangkat</span>
        </button>

        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-[#D4AF37] text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-md uppercase shrink-0">
            {currentUser?.name ? currentUser.name.substring(0, 2) : 'GH'}
          </div>

          <div className="hidden md:block text-left text-xs leading-tight max-w-[120px] truncate">
            <span className="font-bold text-white block truncate">{currentUser?.name || 'Guru Hebat'}</span>
            <span className="text-[10px] text-slate-400 block truncate">{currentUser?.school || 'Sekolah'}</span>
          </div>

          <button
            onClick={triggerLogout}
            className="flex items-center gap-1.5 p-2 bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/50 text-rose-400 rounded-xl transition-all cursor-pointer shrink-0 ml-1 shadow-sm"
            title="Keluar / Logout dari Akun"
            aria-label="Logout"
          >
            <Icons.LogOut className="w-4 h-4 text-rose-400" />
            <span className="hidden xl:inline text-xs font-bold text-rose-300">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function DeepLearningWizard({ isOpen, onClose, onCreateDocument }) {
  const [subject, setSubject] = useState('IPA & Biologi');
  const [phase, setPhase] = useState('Fase E (Kelas 10 SMA)');
  const [topic, setTopic] = useState('Ekosistem & Keanekaragaman Hayati');
  const [hours, setHours] = useState('2 JP x 45 Menit');

  const [selectedComponents, setSelectedComponents] = useState({
    modulAjar: true,
    cp: true,
    tp: true,
    atp: true,
    kktp: true,
    prota: true,
    prosem: true
  });

  const [pillars, setPillars] = useState({
    mindful: true,
    meaningful: true,
    joyful: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const upperSub = subject.toUpperCase();

    let generatedContent = `# MODUL AJAR DEEP LEARNING: ${upperSub} ${phase.toUpperCase()}

## I. INFORMASI UMUM
- **Mata Pelajaran**: ${subject}
- **Fase / Kelas**: ${phase}
- **Topik Utama**: ${topic}
- **Alokasi Waktu**: ${hours}`;

    if (selectedComponents.cp) {
      generatedContent += `\n\n---\n## II. CAPAIAN PEMBELAJARAN (CP)\n### 📘 Analisis Capaian Pembelajaran Elemen (${upperSub})\nPeserta didik mampu menganalisis interaksi komponen ${topic}, memahami keterhubungan fenomena nyata, serta merancang solusi solutif secara kritis dan kolaboratif.`;
    }

    if (selectedComponents.tp) {
      generatedContent += `\n\n---\n## III. TUJUAN PEMBELAJARAN (TP)\n### 🎯 Poin Tujuan Pembelajaran ABCD (${upperSub})\n- **TP1**: Menganalisis konsep dasar ${topic}.\n- **TP2**: Menyusun model analisis terstruktur dan grafik pemrosesan data.\n- **TP3**: Mempresentasikan hasil analisis proyek kelompok secara kolaboratif.`;
    }

    if (selectedComponents.atp) {
      generatedContent += `\n\n---\n## IV. ALUR TUJUAN PEMBELAJARAN (ATP)\n### 🗺️ Pemetaan Runtutan ATP (${upperSub})\n| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |\n| :--- | :--- | :--- | :--- |\n| **ATP.01** | 2 JP | Mampu menganalisis konsep dasar ${topic} | Formatif Latihan Soal |\n| **ATP.02** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |`;
    }

    if (selectedComponents.kktp) {
      generatedContent += `\n\n---\n## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)\n### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (${upperSub})\n| Kriteria Penilaian | Belum Memenuhi (1) | Memenuhi (2-3) | Sangat Baik (4) |\n| :--- | :--- | :--- | :--- |\n| **Penerapan Konsep** | Salah mengidentifikasi komponen | Tepat mengidentifikasi 80% komponen | Tepat 100% & solutif |`;
    }

    if (selectedComponents.prota) {
      generatedContent += `\n\n---\n## VI. PROGRAM TAHUNAN (PROTA)\n### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (${upperSub})\n| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |\n| :--- | :--- | :--- | :--- |\n| **1** | ${topic} | 18 JP | Semester 1 |`;
    }

    if (selectedComponents.prosem) {
      generatedContent += `\n\n---\n## VII. PROGRAM SEMESTER (PROSEM)\n### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (${upperSub})\n| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **1** | ${topic} | 6 JP | x | x | | | | |`;
    }

    generatedContent += `\n\n---\n## VIII. INTEGRASI 3 PILAR DEEP LEARNING\n${pillars.mindful ? '- **Mindful Learning**: Siswa diajak melakukan sesi hening STOP 3 menit untuk membangun kesadaran belajar.\n' : ''}${pillars.meaningful ? '- **Meaningful Learning**: Menganalisis isu lingkungan/kasus nyata di sekitar lingkungan sekolah.\n' : ''}${pillars.joyful ? '- **Joyful Learning**: Kuis interaktif berbasis kelompok dan presentasi solutif.' : ''}`;

    const newDoc = {
      id: `doc_${Date.now()}`,
      title: `Modul Ajar ${subject} - ${topic}`,
      subject: subject,
      phase: phase,
      topic: topic,
      status: 'In Progress',
      content: generatedContent
    };

    onCreateDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-[#D4AF37] flex items-center gap-2">
            <span>✨</span> Wizard Generator Perangkat Ajar Deep Learning
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mata Pelajaran</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: IPA & Biologi"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Fase / Kelas</label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Fase A (Kelas 1-2 SD)">Fase A (Kelas 1-2 SD)</option>
              <option value="Fase B (Kelas 3-4 SD)">Fase B (Kelas 3-4 SD)</option>
              <option value="Fase C (Kelas 5-6 SD)">Fase C (Kelas 5-6 SD)</option>
              <option value="Fase D (Kelas 7-9 SMP)">Fase D (Kelas 7-9 SMP)</option>
              <option value="Fase E (Kelas 10 SMA)">Fase E (Kelas 10 SMA)</option>
              <option value="Fase F (Kelas 11-12 SMA)">Fase F (Kelas 11-12 SMA)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topik / Materi Utama</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Ekosistem & Keanekaragaman Hayati"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Alokasi Waktu</label>
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] mb-1.5">
              Pilihan Komponen Perangkat Ajar Wajib:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.modulAjar} onChange={(e) => setSelectedComponents({ ...selectedComponents, modulAjar: e.target.checked })} className="accent-[#D4AF37] rounded" />
                📘 Modul Ajar
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.cp} onChange={(e) => setSelectedComponents({ ...selectedComponents, cp: e.target.checked })} className="accent-[#D4AF37] rounded" />
                📘 CP (Capaian)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.tp} onChange={(e) => setSelectedComponents({ ...selectedComponents, tp: e.target.checked })} className="accent-[#D4AF37] rounded" />
                🎯 TP (Tujuan)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.atp} onChange={(e) => setSelectedComponents({ ...selectedComponents, atp: e.target.checked })} className="accent-[#D4AF37] rounded" />
                🗺️ ATP (Alur)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.kktp} onChange={(e) => setSelectedComponents({ ...selectedComponents, kktp: e.target.checked })} className="accent-[#D4AF37] rounded" />
                📊 KKTP & Rubrik
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.prota} onChange={(e) => setSelectedComponents({ ...selectedComponents, prota: e.target.checked })} className="accent-[#D4AF37] rounded" />
                🗓️ Prota
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.prosem} onChange={(e) => setSelectedComponents({ ...selectedComponents, prosem: e.target.checked })} className="accent-[#D4AF37] rounded" />
                📅 Prosem
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Integrasi 3 Pilar Deep Learning:</label>
            <div className="flex gap-4 text-xs text-slate-300 pt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pillars.mindful} onChange={(e) => setPillars({ ...pillars, mindful: e.target.checked })} className="accent-[#D4AF37] rounded" />
                🧠 Mindful
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pillars.meaningful} onChange={(e) => setPillars({ ...pillars, meaningful: e.target.checked })} className="accent-[#D4AF37] rounded" />
                🎯 Meaningful
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pillars.joyful} onChange={(e) => setPillars({ ...pillars, joyful: e.target.checked })} className="accent-[#D4AF37] rounded" />
                🚀 Joyful
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer">Batal</button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 cursor-pointer">✨ Buat Dokumen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginPage({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('guru');
  const [selectedPackage, setSelectedPackage] = useState('free');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Silakan isi alamat email dan kata sandi Anda!');
      return;
    }

    if (authMode === 'register' && !fullName) {
      setErrorMessage('Silakan isi Nama Lengkap Anda!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      let initialCredits = 1;
      let isPrem = false;

      if (authMode === 'register') {
        if (selectedPackage === 'monthly' || email.includes('admin') || email.includes('premium')) {
          isPrem = true;
          initialCredits = 250;
        } else if (selectedPackage === 'single') {
          isPrem = false;
          initialCredits = 5;
        } else {
          isPrem = false;
          initialCredits = 1;
        }
      } else {
        isPrem = selectedRole === 'admin' || email.includes('admin') || email.includes('premium');
        initialCredits = isPrem ? 250 : 5;
      }

      const userPayload = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: fullName || (email.includes('admin') ? 'Root Admin Trisula' : email.split('@')[0]),
        email: email,
        role: selectedRole,
        is_premium: isPrem,
        kredit_tersisa: initialCredits,
        doc_generated_count: 0,
        school: schoolName || 'SMA Negeri 1 Jakarta'
      };

      syncUserToGoogleSheets(userPayload, authMode === 'register' ? 'REGISTER' : 'LOGIN');

      if (onLoginSuccess) {
        onLoginSuccess(userPayload);
      } else {
        setSuccessMessage('Login berhasil! Mengalihkan ke Dashboard...');
      }
    }, 1000);
  };

  const handleDemoLogin = (type) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    let demoUser = {};

    if (type === 'guru_premium') {
      demoUser = {
        id: 'usr_premium_01',
        name: 'Budi Santoso, M.Pd.',
        email: 'budi.santoso@guru.sma.sch.id',
        role: 'guru',
        is_premium: true,
        kredit_tersisa: 250,
        doc_generated_count: 14,
        school: 'SMA Negeri 1 Jakarta'
      };
      setEmail('budi.santoso@guru.sma.sch.id');
      setPassword('demo1234');
      setSelectedRole('guru');
    } else if (type === 'eike2000' || type === 'guru_free') {
      demoUser = {
        id: 'usr_eike2000',
        name: 'Eike2000, S.Pd.',
        email: 'eike2000@sekolah.sch.id',
        role: 'guru',
        is_premium: false,
        kredit_tersisa: 5,
        doc_generated_count: 0,
        school: 'SMA Negeri 1 Jakarta'
      };
      setEmail('eike2000@sekolah.sch.id');
      setPassword('demo1234');
      setSelectedRole('guru');
    } else if (type === 'admin') {
      demoUser = {
        id: 'usr_admin_master',
        name: 'Root Admin Trisula',
        email: 'admin@trisula.ai',
        role: 'admin',
        is_premium: true,
        kredit_tersisa: 999999,
        doc_generated_count: 0,
        school: 'HQ Trisula Engine'
      };
      setEmail('admin@trisula.ai');
      setPassword('admin1234');
      setSelectedRole('admin');
    }

    setTimeout(() => {
      setIsLoading(false);
      syncUserToGoogleSheets(demoUser, 'LOGIN');
      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B192C] text-slate-100 font-sans flex items-center justify-center p-3 sm:p-6 relative overflow-x-hidden overflow-y-auto">
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#132338]/95 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-5 my-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 mb-1">
            <Icons.Cpu className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            TRISULA SMART LEARNING ENGINE
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed px-2">
            Engine evaluasi penilaian otomatis, Modul ajar, CP, TP, ATP, KKTP, Prota, Prosem & Portal B2B Sekolah
          </p>
        </div>

        <div className="bg-slate-900/80 p-1 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-semibold">
          {[
            { id: 'guru', label: 'Pengajar / Guru' },
            { id: 'siswa', label: 'Siswa / Peserta' },
            { id: 'admin', label: 'Administrator' }
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRole(r.id)}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                selectedRole === r.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span> {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
            <Icons.CheckCircle /> {successMessage}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-3.5">
          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap & Gelar</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.User />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Budi Santoso, M.Pd."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Sekolah / Instansi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Building />
                  </div>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Contoh: SMA Negeri 1 Jakarta"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D4AF37] mb-1.5 font-bold">
                  Pilih Paket Awal Pendaftaran:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'free', title: 'Gratis', desc: '1 Token Uji Coba' },
                    { id: 'single', title: '1 Modul', desc: '5 Token (Rp10rb)' },
                    { id: 'monthly', title: 'Bulanan', desc: 'Unlimited (Rp29rb)' }
                  ].map(pkg => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPackage === pkg.id 
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-md' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold text-xs text-amber-300">{pkg.title}</span>
                      <span className="text-[10px] text-slate-300 mt-1 leading-tight">{pkg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Email Terdaftar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Mail />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Kata Sandi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Lock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
          </div>

          {authMode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0 cursor-pointer"
                />
                Ingat Saya
              </label>
              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Lupa Sandi?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {authMode === 'login' ? 'Masuk Sekarang' : 'Daftar & Aktifkan Paket'}
                <Icons.ArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] text-center uppercase tracking-wider text-slate-400 font-semibold">
            ⚡ Pengujian Cepat Akun Demo
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('guru_premium')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-xl text-[10px] text-amber-300 font-semibold transition-all text-center cursor-pointer"
            >
              Guru Premium
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('eike2000')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-[10px] text-slate-200 font-semibold transition-all text-center cursor-pointer"
            >
              eike2000 (5 Token)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-[10px] text-cyan-300 font-semibold transition-all text-center cursor-pointer"
            >
              Root Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          {authMode === 'login' ? (
            <>
              Belum memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
              >
                Daftar Sekarang
              </button>
            </>
          ) : (
            <>
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
              >
                Masuk Kembali
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PaywallModal({ isOpen, onClose, userContext = {}, paywallReason = '' }) {
  if (!isOpen) return null;

  const userEmail = userContext.email || 'email@sekolah.sch.id';
  const ADMIN_WA_NUMBER = "6281298406844";

  const waMonthlyText = encodeURIComponent(
    `Halo Admin TRISULA SMART LEARNING ENGINE,\n\nSaya telah melakukan pembayaran untuk Paket Bulanan Rp29.000.\n\n📌 Email Terdaftar: ${userEmail}\n📌 Bukti Transfer: (Terlampir)\n\nMohon bantuannya untuk mengaktifkan akses akun saya. Terima kasih!`
  );

  const waSingleText = encodeURIComponent(
    `Halo Admin TRISULA SMART LEARNING ENGINE,\n\nSaya telah melakukan pembayaran untuk Paket 1 Modul Ajar Rp10.000.\n\n📌 Email Terdaftar: ${userEmail}\n📌 Bukti Transfer: (Terlampir)\n\nMohon bantuannya untuk menambahkan 1 kuota modul saya. Terima kasih!`
  );

  const waB2BText = encodeURIComponent(
    `Halo Admin TRISULA SMART LEARNING ENGINE,\n\nSaya tertarik mengajukan *Lisensi Sekolah / B2B* untuk instansi kami.\n\n📌 Email Terdaftar: ${userEmail}\n\nMohon info proposal dan kemitraan resmi. Terima kasih!`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B192C] border border-[#D4AF37] rounded-3xl max-w-xl w-full p-6 space-y-4 text-white shadow-2xl relative my-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="font-bold text-base text-[#D4AF37] flex items-center gap-2">
            <span>🔒</span> Buka Akses Feature / Top Up Kuota Modul
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer font-bold text-sm">✕</button>
        </div>
        
        {paywallReason && (
          <p className="text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl leading-relaxed">
            ⚠️ {paywallReason}
          </p>
        )}

        <div className="bg-slate-900/90 p-3.5 border border-slate-800 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-[#D4AF37] flex items-center gap-1.5">
            💳 Rekening Transfer & E-Wallet Resmi:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
              <span className="font-bold text-white block">🏦 Bank BCA</span>
              <span className="font-mono text-amber-300 text-xs font-bold block select-all">5765323549</span>
              <span className="block text-[10px] text-slate-400">a.n. iis istianawahid</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
              <span className="font-bold text-white block">💙 DANA</span>
              <span className="font-mono text-amber-300 text-xs font-bold block select-all">081519234087</span>
              <span className="block text-[10px] text-slate-400">a.n. iis istianawahid</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-slate-900 p-3.5 border border-amber-500/50 rounded-2xl space-y-2 flex flex-col justify-between hover:border-[#D4AF37] transition-all">
            <div className="space-y-1">
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-bold rounded-full uppercase">Paling Laris</span>
              <div className="font-bold text-xs text-amber-300 uppercase">Paket Bulanan</div>
              <div className="text-base font-black text-[#D4AF37]">Rp29.000 <span className="text-[9px] text-slate-400 font-normal">/ bln</span></div>
              <ul className="text-[10px] text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Unlimited 30 Hari</li>
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Bebas Generate</li>
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Bebas Cetak Word/PDF</li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${ADMIN_WA_NUMBER}?text=${waMonthlyText}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center py-2 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg cursor-pointer mt-2"
            >
              🟢 Beli via WA
            </a>
          </div>

          <div className="bg-slate-900 p-3.5 border border-indigo-500/40 rounded-2xl space-y-2 flex flex-col justify-between hover:border-indigo-400 transition-all">
            <div className="space-y-1">
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded-full uppercase">Eceran</span>
              <div className="font-bold text-xs text-indigo-300 uppercase">1 Modul Ajar</div>
              <div className="text-base font-black text-indigo-400">Rp10.000 <span className="text-[9px] text-slate-400 font-normal">/ modul</span></div>
              <ul className="text-[10px] text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Hak Akses 1 Modul</li>
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Bebas Generate & Cetak</li>
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Kuota Tanpa Hangus</li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${ADMIN_WA_NUMBER}?text=${waSingleText}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg cursor-pointer mt-2"
            >
              🟢 Beli via WA
            </a>
          </div>

          <div className="bg-slate-900 p-3.5 border border-cyan-500/40 rounded-2xl space-y-2 flex flex-col justify-between hover:border-cyan-400 transition-all">
            <div className="space-y-1">
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[9px] font-bold rounded-full uppercase">Instansi</span>
              <div className="font-bold text-xs text-cyan-300 uppercase">Lisensi Sekolah</div>
              <div className="text-base font-black text-cyan-400">B2B <span className="text-[9px] text-slate-400 font-normal">/ thn</span></div>
              <ul className="text-[10px] text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Akses Seluruh Guru</li>
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Faktur & Kwitansi</li>
                <li className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Portal Sekolah B2B</li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${ADMIN_WA_NUMBER}?text=${waB2BText}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-bold rounded-xl text-xs transition-colors shadow-lg cursor-pointer mt-2"
            >
              💬 Tanya Admin
            </a>
          </div>
        </div>

        <div className="text-center pt-1">
          <span className="text-[10px] text-slate-400">
            Email Anda (<strong className="text-slate-200">{userEmail}</strong>) akan otomatis dilampirkan saat pesan WhatsApp terbuka.
          </span>
        </div>
      </div>
    </div>
  );
}

function AIWorkspace({ activeDocument, onBackToDashboard, currentUser, onUpdateCurrentUser, onRequestPaywall }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const defaultDoc = {
    title: 'Modul Ajar IPA & Biologi - Ekosistem & Keanekaragaman Hayati',
    subject: 'IPA & Biologi',
    phase: 'Fase E (Kelas 10 SMA)',
    content: `# MODUL AJAR DEEP LEARNING: IPA & BIOLOGI FASE E (KELAS 10 SMA)

## I. INFORMASI UMUM
- **Mata Pelajaran**: IPA & Biologi
- **Fase / Kelas**: Fase E (Kelas 10 SMA)
- **Topik Utama**: Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan
- **Alokasi Waktu**: 2 JP x 45 Menit

---

## II. CAPAIAN PEMBELAJARAN (CP)
### 📘 Analisis Capaian Pembelajaran Elemen (IPA & BIOLOGI)
Peserta didik mampu menganalisis interaksi antar komponen ekosistem, memahami pentingnya keanekaragaman hayati lokal, serta merancang solusi kreatif atas perubahan lingkungan secara kritis dan kolaboratif.

---

## III. TUJUAN PEMBELAJARAN (TP)
### 🎯 Poin Tujuan Pembelajaran ABCD (IPA & BIOLOGI)
- **TP1**: Menganalisis struktur rantai makanan dan piramida energi ekosistem.
- **TP2**: Menyusun grafik fluktuasi populasi spesies lokal berdasarkan data sampel dilapangan.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP (IPA & BIOLOGI)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 2 JP | Mampu menganalisis interaksi trophic level | Formatif Latihan Soal |
| **ATP.10.2** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |`
  };

  const currentDocument = activeDocument || defaultDoc;
  const [docContent, setDocContent] = useState(currentDocument.content);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: `Halo Bapak/Ibu Guru! Saya Deep Learning Engine v3.0. Dokumen ${currentDocument.subject || 'Pembelajaran'} Anda siap disempurnakan dengan sintesis AI!` }
  ]);

  useEffect(() => {
    if (activeDocument && activeDocument.content) {
      setDocContent(activeDocument.content);
    }
  }, [activeDocument]);

  const canExport = Boolean(currentUser?.is_premium || (currentUser?.kredit_tersisa && currentUser.kredit_tersisa > 0));

  const handleSendMessage = (customPrompt) => {
    const textToSend = customPrompt || inputInstruction;
    if (!textToSend.trim()) return;

    setInputInstruction('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setIsGenerating(true);

    setTimeout(() => {
      const generatedAddition = `\n\n---\n## TANGGAPAN AI CO-PILOT\n- **Instruksi Diterapkan**: "${textToSend}"\n- **Pilar Mindful**: Sesi hening 3 menit awal.\n- **Pilar Meaningful**: Kasus riil ekosistem lokal.\n- **Pilar Joyful**: Kuis kelompok interaktif.`;
      setDocContent(prev => prev + generatedAddition);

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: `✨ **[SINTESIS DEEP LEARNING SELESAI]**\n\nSaya telah menyusun dan menyuntikkan seksi baru berdasarkan instruksi: "${textToSend}".` 
      }]);
      setIsGenerating(false);
    }, 1000);
  };

  const handleOpenExportModal = () => {
    if (!canExport) {
      if (onRequestPaywall) {
        onRequestPaywall('Fitur Cetak dan Export Dokumen (Word, PDF, TXT) membutuhkan kuota modul atau akun Premium aktif.');
      }
      return;
    }
    setIsExportModalOpen(true);
  };

  const deductQuotaOnAction = () => {
    if (!currentUser.is_premium && currentUser.kredit_tersisa > 0) {
      const updatedUser = {
        ...currentUser,
        doc_generated_count: (currentUser.doc_generated_count || 0) + 1,
        kredit_tersisa: Math.max(0, currentUser.kredit_tersisa - 1)
      };
      if (onUpdateCurrentUser) onUpdateCurrentUser(updatedUser);
      syncUserToGoogleSheets(updatedUser, 'DEDUCT_CREDIT');
    }
  };

  const handleDownloadWord = () => {
    deductQuotaOnAction();
    const blob = new Blob(['\ufeff' + docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${(currentDocument.title || 'Modul_Ajar').replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  const handleDownloadTxt = () => {
    deductQuotaOnAction();
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${(currentDocument.title || 'Modul_Ajar').replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  const handlePrintPDF = () => {
    deductQuotaOnAction();
    setIsExportModalOpen(false);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 font-sans">
      <div className="w-full md:w-5/12 bg-[#0F172A] border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <button onClick={onBackToDashboard} className="text-xs text-slate-400 hover:text-white cursor-pointer">← Kembali</button>
          <span className="text-xs font-bold text-[#D4AF37]">AI Co-Pilot (Deep Learning v3.0)</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map(m => (
            <div key={m.id} className={`p-3 rounded-2xl max-w-[85%] ${m.sender === 'user' ? 'bg-indigo-600 ml-auto text-white' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
              {m.text}
            </div>
          ))}
          {isGenerating && <div className="text-xs text-slate-400 italic">⏳ AI sedang merancang & menyuntikkan dokumen...</div>}
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputInstruction}
              onChange={(e) => setInputInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik instruksi..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button onClick={() => handleSendMessage()} className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer">Kirim</button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 bg-[#0F172A] border border-slate-800 rounded-2xl flex flex-col overflow-hidden p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-white">{currentDocument.title}</span>
          <button onClick={handleOpenExportModal} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5">
            <Icons.Printer className="w-4 h-4" />
            <span>🖨️ Export Dokumen</span>
          </button>
        </div>

        <div className="flex-1 bg-white text-slate-900 p-6 rounded-2xl overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed">
          {docContent}
        </div>
      </div>

      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-[#D4AF37]">Export Center Dokumen</h3>
              <button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>
            
            <div className="space-y-2.5">
              <button onClick={handleDownloadWord} className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer">
                <div>Unduh Berkas Word (.doc)</div>
                <span className="text-[#D4AF37]">Unduh →</span>
              </button>
              <button onClick={handleDownloadTxt} className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer">
                <div>Unduh Teks Polos (.txt)</div>
                <span className="text-[#D4AF37]">Unduh →</span>
              </button>
              <button onClick={handlePrintPDF} className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer">
                <div>Cetak / Simpan PDF</div>
                <span className="text-[#D4AF37]">Cetak →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminDashboard({ usersData, onUpdateUserStatus, onAddCredits, onAddUser }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Dashboard Admin Activation & Lisensi</h1>
        <p className="text-xs text-slate-400">Pengelolaan pengguna dan penambahan kuota token real-time.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase">
            <tr>
              <th className="p-4">Pengguna</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status Lisensi</th>
              <th className="p-4">Sisa Kuota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {(usersData || []).map(u => (
              <tr key={u.id}>
                <td className="p-4 font-semibold text-white">{u.name} ({u.email})</td>
                <td className="p-4 uppercase text-[10px]">{u.role}</td>
                <td className="p-4 font-bold text-amber-300">{u.is_premium ? 'PREMIUM' : 'GRATIS'}</td>
                <td className="p-4 font-mono">{u.is_premium ? 'Unlimited' : `${u.kredit_tersisa} Token`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MyFilesView({ documents, onOpenDocument, onOpenInEditor, onDeleteDocument, onOpenWizard }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = (documents || []).filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
            Pengelola Berkas & Perangkat Ajar
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Berkas Saya ({documents.length})
          </h1>
        </div>

        <button
          onClick={onOpenWizard}
          className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Icons.Plus />
          <span>+ Buat Perangkat Baru</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Cari judul perangkat ajar atau mata pelajaran..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-96"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-[#0D1C2E] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {doc.subject} • {doc.phase}
              </span>
              <h3 className="text-sm font-bold text-white line-clamp-2">{doc.title}</h3>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => onDeleteDocument(doc.id)}
                className="p-1.5 hover:bg-rose-950/50 rounded-lg text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Hapus Berkas"
              >
                <Icons.Trash />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenInEditor(doc)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Icons.Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Editor</span>
                </button>

                <button
                  onClick={() => onOpenDocument(doc)}
                  className="text-[#D4AF37] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka Workspace</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleanEditorView({ activeDocument, onSaveDocument }) {
  const [title, setTitle] = useState(activeDocument?.title || 'Modul Ajar Deep Learning');
  const [content, setContent] = useState(activeDocument?.content || `# MODUL AJAR DEEP LEARNING\n\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: General\n- **Fase**: Fase E`);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (activeDocument) {
      setTitle(activeDocument.title || 'Modul Ajar Deep Learning');
      setContent(activeDocument.content || `# MODUL AJAR DEEP LEARNING\n\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: ${activeDocument.subject || 'General'}\n- **Fase**: ${activeDocument.phase || 'Fase E'}`);
    }
  }, [activeDocument]);

  const handleSave = () => {
    if (onSaveDocument) {
      onSaveDocument({ ...activeDocument, title, content });
    }
    setToast('✨ Dokumen berhasil disimpan!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 space-y-4 font-sans max-w-7xl mx-auto">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-2xl animate-bounce">
          {toast}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
            Editor Teks Rapih & Markdown Studio
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg md:text-xl font-bold bg-transparent text-white focus:outline-none focus:border-b border-[#D4AF37] mt-1 w-full md:w-96"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
        >
          💾 Simpan Perubahan
        </button>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-[500px]">
        <div className="flex flex-col bg-[#0D1C2E] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400">
            📝 EDITOR MARKDOWN MURNI
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-slate-950 p-4 text-xs font-mono text-slate-200 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col bg-[#0D1C2E] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-[#D4AF37]">
            👁️ PRATINJAU DOKUMEN
          </div>
          <div className="flex-1 bg-white p-6 overflow-y-auto text-slate-900 text-xs whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('trisula_user_session');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Error reading localStorage session:', e);
      return null;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [allUsers, setAllUsers] = useState([
    { id: 'usr_admin_master', name: 'Root Admin Trisula', email: 'admin@trisula.ai', role: 'admin', is_premium: true, kredit_tersisa: 999999, doc_generated_count: 0, school: 'HQ Trisula Engine' },
    { id: 'usr_eike2000', name: 'Eike2000, S.Pd.', email: 'eike2000@sekolah.sch.id', role: 'guru', is_premium: false, kredit_tersisa: 5, doc_generated_count: 0, school: 'SMA Negeri 1 Jakarta' }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 'doc_01',
      title: 'Modul Ajar IPA & Biologi - Ekosistem & Keanekaragaman Hayati',
      subject: 'IPA & Biologi',
      phase: 'Fase E (Kelas 10 SMA)',
      topic: 'Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan',
      status: 'In Progress',
      content: `# MODUL AJAR DEEP LEARNING: IPA & BIOLOGI FASE E (KELAS 10 SMA)

## I. INFORMASI UMUM
- **Mata Pelajaran**: IPA & Biologi
- **Fase / Kelas**: Fase E (Kelas 10 SMA)
- **Topik Utama**: Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan
- **Alokasi Waktu**: 2 JP x 45 Menit

---

## II. CAPAIAN PEMBELAJARAN (CP)
### 📘 Analisis Capaian Pembelajaran Elemen (IPA & BIOLOGI)
Peserta didik mampu menganalisis interaksi antar komponen ekosistem, memahami pentingnya keanekaragaman hayati lokal, serta merancang solusi kreatif atas perubahan lingkungan secara kritis dan kolaboratif.

---

## III. TUJUAN PEMBELAJARAN (TP)
### 🎯 Poin Tujuan Pembelajaran ABCD (IPA & BIOLOGI)
- **TP1**: Menganalisis struktur rantai makanan dan piramida energi ekosistem.
- **TP2**: Menyusun grafik fluktuasi populasi spesies lokal berdasarkan data sampel dilapangan.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP (IPA & BIOLOGI)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 2 JP | Mampu menganalisis interaksi trophic level | Formatif Latihan Soal |
| **ATP.10.2** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |`
    }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeDocument, setActiveDocument] = useState(documents[0]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCurrentUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('trisula_user_session', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to save session to localStorage:', e);
    }
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleLoginSuccess = (userPayload) => {
    handleUpdateCurrentUser(userPayload);
    setAllUsers(prev => {
      if (!prev.some(u => u.email === userPayload.email)) {
        return [userPayload, ...prev];
      }
      return prev;
    });
    setCurrentView(userPayload.role === 'admin' ? 'admin' : 'dashboard');
    showToast(`Selamat datang kembali, ${userPayload.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('trisula_user_session');
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
    setCurrentView('dashboard');
    showToast('Anda telah keluar dari akun.');
  };

  const handleUpdateUserStatus = (userId, newStatus) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, is_premium: newStatus } : u));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, is_premium: newStatus };
      handleUpdateCurrentUser(updated);
      syncUserToGoogleSheets(updated, 'UPDATE_STATUS');
    }
  };

  const handleAddCredits = (userId, amount) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, kredit_tersisa: (u.kredit_tersisa || 0) + amount } : u));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, kredit_tersisa: (currentUser.kredit_tersisa || 0) + amount };
      handleUpdateCurrentUser(updated);
      syncUserToGoogleSheets(updated, 'ADD_CREDITS');
    }
  };

  const canPerformAction = Boolean(currentUser?.is_premium || (currentUser?.kredit_tersisa && currentUser.kredit_tersisa > 0));

  const handleTriggerPaywall = (reason) => {
    setPaywallReason(reason || 'Kuota token Anda telah habis. Silakan top up token atau tingkatkan paket lisensi Anda di bawah ini!');
    setIsPaywallOpen(true);
  };

  const handleOpenWizard = () => {
    if (!canPerformAction) {
      handleTriggerPaywall('Pembuatan perangkat ajar baru memerlukan token aktif atau akun Premium.');
      return;
    }
    setIsWizardOpen(true);
  };

  const handleCreateDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocument(newDoc);
    setCurrentView('workspace');
    showToast(`Perangkat Ajar "${newDoc.title}" berhasil dibuat!`);
  };

  const handleOpenDocumentInWorkspace = (doc) => {
    setActiveDocument(doc);
    setCurrentView('workspace');
  };

  const handleOpenDocumentInEditor = (doc) => {
    setActiveDocument(doc);
    setCurrentView('editor');
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Berkas berhasil dihapus dari daftar.');
  };

  const handleSaveEditorDocument = (updatedDoc) => {
    setDocuments(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
    setActiveDocument(updatedDoc);
    showToast('Perubahan berkas berhasil disimpan!');
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#070F1E] text-slate-100 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-slate-950 overflow-x-hidden">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenWizard={handleOpenWizard}
        currentUser={currentUser}
        onLogout={handleLogout}
        onRequestPaywall={handleTriggerPaywall}
      />

      <div className="flex-1 flex overflow-hidden w-full">
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0B1728] border-r border-slate-800 p-4 hidden md:flex flex-col justify-between transition-all duration-300 shrink-0`}>
          <div className="space-y-6">
            {isSidebarOpen && <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">NAVIGASI UTAMA</div>}
            <nav className="space-y-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'dashboard' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Home /> {isSidebarOpen && <span>Halaman Depan</span>}
              </button>

              <button
                onClick={() => setCurrentView('workspace')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'workspace' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Bolt /> {isSidebarOpen && <span>Ruang Bantu AI</span>}
              </button>

              <button
                onClick={() => setCurrentView('files')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'files' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Folder /> {isSidebarOpen && <span>Berkas Saya</span>}
              </button>

              <button
                onClick={() => setCurrentView('editor')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'editor' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Edit /> {isSidebarOpen && <span>Editor Teks</span>}
              </button>

              {(currentUser.role === 'admin' || currentUser.email.includes('admin')) && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                    currentView === 'admin' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icons.Shield /> {isSidebarOpen && <span>Panel Admin</span>}
                </button>
              )}
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto w-full">
          {currentView === 'dashboard' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-[#112238] via-[#0F1E33] to-[#0A1628] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="space-y-3 max-w-2xl">
                  <span className="px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase">
                    SaaS Engine Kurikulum Merdeka v3.0
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Selamat Datang, {currentUser.name}! 🚀
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Rancang perangkat ajar terintegrasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara presisi.
                  </p>
                  <button
                    onClick={handleOpenWizard}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 cursor-pointer transition-all"
                  >
                    ✨ Mulai Wizard Baru
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Total Berkas Saya</div>
                  <div className="text-2xl font-bold text-white mt-1">{documents.length}</div>
                </div>
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Status Token Kuota</div>
                  <div className="text-2xl font-bold text-amber-300 mt-1 font-mono">
                    {currentUser.is_premium ? 'Unlimited Pro' : `${currentUser.kredit_tersisa ?? 0} Token`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'workspace' && (
            <div className="w-full h-[calc(100vh-4rem)] p-2 sm:p-4">
              <AIWorkspace
                activeDocument={activeDocument}
                onBackToDashboard={() => setCurrentView('dashboard')}
                currentUser={currentUser}
                onUpdateCurrentUser={handleUpdateCurrentUser}
                onRequestPaywall={handleTriggerPaywall}
              />
            </div>
          )}

          {currentView === 'files' && (
            <MyFilesView
              documents={documents}
              onOpenDocument={handleOpenDocumentInWorkspace}
              onOpenInEditor={handleOpenDocumentInEditor}
              onDeleteDocument={handleDeleteDocument}
              onOpenWizard={handleOpenWizard}
            />
          )}

          {currentView === 'editor' && (
            <CleanEditorView
              activeDocument={activeDocument}
              onSaveDocument={handleSaveEditorDocument}
            />
          )}

          {currentView === 'admin' && (
            <AdminDashboard
              usersData={allUsers}
              onUpdateUserStatus={handleUpdateUserStatus}
              onAddCredits={handleAddCredits}
              onAddUser={(usr) => setAllUsers(prev => [usr, ...prev])}
            />
          )}
        </main>
      </div>

      <DeepLearningWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateDocument={handleCreateDocument}
      />

      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        userContext={currentUser}
        paywallReason={paywallReason}
      />
    </div>
  );
}
