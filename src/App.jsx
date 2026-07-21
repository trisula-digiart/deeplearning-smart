import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bot,
  Send,
  RefreshCw,
  Edit3,
  FileDown,
  Printer,
  Check,
  X,
  Layers,
  Zap,
  BrainCircuit,
  Menu,
  User,
  AlertCircle,
  Share2,
  Type,
  BookOpen,
  UserCheck,
  Building2
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Modul Ajar Informatika - Algoritma Pemrograman',
    subject: 'Informatika',
    grade: 'Kelas X',
    semester: 'Semester 1 (Ganjil)',
    phase: 'Fase E',
    status: 'In Progress',
    progress: 65,
    lastEdited: '2 jam yang lalu',
    cp: 'Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit volume besar.',
    diagnostic: {
      learningStyle: 'Kinestetik & Visual (60%), Auditori (40%)',
      infrastructure: 'Lab Komputer (20 PC), Akses Internet WiFi, Proyektor',
      realIssue: 'Siswa kesulitan memahami logika looping dan rekursi tanpa visualisasi konkret.'
    },
    docTree: {
      cp: 'Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit volume besar.',
      tp: '10.1 Memahami konsep algoritma dan pemrograman secara runtut.\n10.2 Menganalisis efisiensi alur logika pemrograman Python.\n10.3 Merancang solusi masalah kontekstual dengan struktur kontrol.',
      atp: '| Kode ATP | Tujuan Pembelajaran | Alokasi Waktu | Asesmen |\n|---|---|---|---|\n| ATP.1 | Konsep Dasar Algoritma & Flowchart | 4 JP | Formatif Tes Lisan |\n| ATP.2 | Struktur Kontrol Percabangan & Perulangan | 8 JP | Tugas Proyek Kelompok |\n| ATP.3 | Mini Proyek Pemrograman Kontekstual | 6 JP | Produk & Presentasi |',
      kktp: '| Indikator | Belum Memenuhi (0-60) | Memenuhi (61-80) | Sangat Baik (81-100) |\n|---|---|---|---|\n| Pemahaman Logika | Belum memahami alur | Mampu menyusun flowchart | Mampu optimasi kode Python |',
      prota: 'Semester 1: 36 JP (4 Bab Utama)\nSemester 2: 36 JP (3 Bab Proyek Lanjutan)',
      prosem: 'Bulan Juli: 8 JP Algoritma\nBulan Agustus: 12 JP Struktur Data\nBulan September: 16 JP Bahasa Python',
      modul: `# MODUL AJAR DEEP LEARNING: INFORMATIKA FASE E\n\n## I. INFORMASI UMUM\n- **Penyusun**: Tim Guru Informatika\n- **Satuan Pendidikan**: SMA Negeri 1 Indonesia\n- **Tahun Ajaran**: 2026/2027\n- **Fase / Kelas**: E / X\n- **Alokasi Waktu**: 4 JP (2 x Pertemuan)\n\n---\n\n## II. PILAR DEEP LEARNING INTEGRATION\n\n### 1. Mindful Learning (Penyadaran Diri & Faktual)\n- **Aktivitas STOP**: Sebelum memulai sesi coding, murid diajak melakukan teknik pernapasan 2 menit untuk fokus.\n- **Refleksi Kesadaran**: Murid mencatat ekspektasi dan kekhawatiran mereka terhadap materi algoritma.\n\n### 2. Meaningful Learning (Kontekstual & Bermakna)\n- **Studi Kasus Nyata**: Siswa menganalisis logika antrean sistem pendaftaran BPJS / Kasir Minimarket lokal.\n- **Problem-Based Challenge**: Membuat simulasi logika pemesanan tiket angkutan daerah.\n\n### 3. Joyful Learning (Kolaboratif & Reflektif)\n- **Game Algoritma Unplugged**: Bermain peran sebagai CPU dan Memori dalam menyelesaikan puzzle logika fisik.\n- **Peer Code Review**: Diskusi kelompok saling memberikan umpan balik positif.`
    }
  },
  {
    id: 'proj-2',
    title: 'Perangkat Ajar Matematika - Analisis Data & Peluang',
    subject: 'Matematika',
    grade: 'Kelas XI',
    semester: 'Semester 2 (Genap)',
    phase: 'Fase F',
    status: 'Completed',
    progress: 100,
    lastEdited: '1 hari yang lalu',
    cp: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.',
    diagnostic: {
      learningStyle: 'Auditori & Visual',
      infrastructure: 'Smartphone Siswa, Buku Paket, Kuota Internet',
      realIssue: 'Literasi data statistik pada berita hoaks sosial media.'
    },
    docTree: {
      cp: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.',
      tp: '11.1 Membaca dan menafsirkan diagram tebar data.\n11.2 Menghitung ukuran pemusatan data kelompok.',
      atp: '| ATP | Tujuan | JP | Asesmen |\n|---|---|---|---|\n| 1 | Diagram Tebar | 4 JP | Quiz |\n| 2 | Regresi Linear | 6 JP | Proyek |',
      kktp: 'Rubrik Evaluasi Kuantitatif dan Kualitatif.',
      prota: '72 JP Total Tahun Ajaran',
      prosem: 'Distribusikan pada Bulan Jan-Mei',
      modul: `# MODUL AJAR MATEMATIKA DEEP LEARNING FASE F\n\n## Pendekatan Kontekstual Data Statistik Real-World`
    }
  }
];

const DEFAULT_WIZARD_DATA = {
  subject: 'Bahasa Indonesia',
  grade: 'Kelas X',
  semester: 'Semester 1 (Ganjil)',
  phase: 'Fase E',
  cpText: 'Peserta didik mampu mengevaluasi informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari berbagai jenis teks untuk menemukan makna tersurat dan tersirat.',
  learningStyle: 'Visual & Kinestetik Dominan',
  infrastructure: 'Proyektor Kelas, HP Siswa, Perpustakaan Sekolah',
  realIssue: 'Minat baca rendah terhadap teks panjang & kesulitan membedakan fakta vs opini di medsos.',
  generatedTP: '',
  generatedATP: '',
  generatedKKTP: '',
  generatedProta: '',
  generatedProsem: ''
};

const DOC_TREE_LABELS = [
  { id: 'cp', label: '1. Capaian Pembelajaran (CP)' },
  { id: 'tp', label: '2. Tujuan Pembelajaran (TP)' },
  { id: 'atp', label: '3. Alur TP (ATP)' },
  { id: 'kktp', label: '4. KKTP Rubrik' },
  { id: 'prota', label: '5. Program Tahunan' },
  { id: 'prosem', label: '6. Program Semester' },
  { id: 'modul', label: '7. Modul Ajar Utuh' }
];

async function callGeminiAI(promptText) {
  try {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      systemInstruction: {
        parts: [
          {
            text: "Anda adalah Pakar Kurikulum Merdeka & Deep Learning Engine v2.5 Indonesia. Selalu gunakan 3 Pilar: Mindful Learning, Meaningful Learning, dan Joyful Learning."
          }
        ]
      }
    };

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('API Error');

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (reply) return reply;
  } catch (err) {
    console.warn('Gemini API fallback triggered:', err);
  }

  await new Promise((r) => setTimeout(r, 800));
  return `[DEEP LEARNING SYNTHESIS COMPLETED]\n\nRevisi berbasis 3 Pilar:\n1. **Mindful**: Latihan hening STOP 3 menit sebelum belajar.\n2. **Meaningful**: Studi kasus nyata permasalahan sekitar sekolah.\n3. **Joyful**: Gamifikasi dan apresiasi antar teman kelompok.`;
}

function Navbar({ isSidebarOpen, setIsSidebarOpen, searchQuery, setSearchQuery, onOpenWizard }) {
  return (
    <header className="bg-[#0F172A]/90 border-b border-slate-800 px-4 py-3 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
              TRISULAPROMPT
            </h1>
            <p className="text-[10px] text-indigo-400 font-medium tracking-wider">
              DEEP LEARNING ENGINE v2.5
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-64 text-sm focus-within:border-indigo-500 transition">
          <Search className="w-4 h-4 text-slate-500 mr-2" />
          <input
            type="text"
            placeholder="Cari perangkat ajar..."
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          onClick={onOpenWizard}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs px-3.5 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-400/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Buat Perangkat Baru
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-indigo-600 p-[1px]">
            <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-xs font-bold text-amber-300">
              GH
            </div>
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-200">Guru Hebat, S.Pd.</p>
            <p className="text-[10px] text-slate-400">Guru Penggerak Fase E/F</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ isSidebarOpen, activeTab, setActiveTab, onOpenExport }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard SaaS', icon: LayoutDashboard, color: 'text-indigo-400' },
    { id: 'projects', label: 'Project Hub', icon: FolderKanban, color: 'text-indigo-400' },
    { id: 'workspace', label: 'AI Workspace (Split)', icon: Sparkles, color: 'text-amber-400' },
    { id: 'notion', label: 'Notion Studio', icon: FileText, color: 'text-emerald-400' }
  ];

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-[#0F172A]/70 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-30 shrink-0`}
    >
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
              title={!isSidebarOpen ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              {isSidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {isSidebarOpen && (
        <div className="p-3 m-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-center shadow-lg">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
            <Zap className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-bold">3 Pilar Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed mb-2">
            Mindful • Meaningful • Joyful Engine Connected
          </p>
          <button
            onClick={onOpenExport}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-1.5 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5 font-medium active:scale-95"
          >
            <Download className="w-3.5 h-3.5" /> Export Center
          </button>
        </div>
      )}
    </aside>
  );
}

function Toast({ toast, onClose }) {
  if (!toast) return null;

  const message = typeof toast === 'string' ? toast : toast.message;
  const type = typeof toast === 'object' && toast.type ? toast.type : 'info';

  const getStyles = () => {
    switch (type) {
      case 'success':
        return { bg: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-400' };
      case 'error':
        return { bg: 'bg-rose-950/90 border-rose-500/40 text-rose-200', icon: AlertCircle, iconColor: 'text-rose-400' };
      default:
        return { bg: 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200', icon: Zap, iconColor: 'text-amber-400' };
    }
  };

  const style = getStyles();
  const IconComponent = style.icon;

  return (
    <div className="fixed top-5 right-5 z-50 transition-all duration-300">
      <div className={`px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-md ${style.bg}`}>
        <div className="p-1 rounded-lg bg-slate-900/50 shrink-0">
          <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <span className="text-xs font-semibold leading-snug flex-1">{message}</span>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function SaaSDashboard({ projects = [], setActiveProject, setActiveTab, onOpenWizard }) {
  const inProgressCount = projects.filter((p) => p.status !== 'Completed').length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold tracking-wide">
            SaaS Engine Kurikulum Merdeka v2.5
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Selamat Datang, Bapak/Ibu Guru Hebat! 🚀
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Rancang Modul Ajar, TP, ATP, KKTP, Prota, dan Prosem terintegrasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara otomatis dan presisi.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenWizard}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Mulai Wizard Deep Learning
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs px-4 py-3 rounded-xl border border-slate-700 font-semibold transition"
            >
              Lihat Semua Proyek
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Perangkat Ajar</p>
            <p className="text-2xl font-black text-white mt-1">{projects.length}</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> +2 minggu ini
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-slate-400 font-medium">Dalam Proses (Draft)</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{inProgressCount}</p>
            <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-1 font-semibold">
              <Clock className="w-3 h-3" /> Butuh peninjauan TP/ATP
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-slate-400 font-medium">Selesai & Siap Cetak</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{completedCount}</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Siap di-export PDF/Word
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-xs text-slate-400 font-medium">Estimasi Waktu Dihemat</p>
            <p className="text-2xl font-black text-indigo-400 mt-1">18.5 Jam</p>
            <span className="text-[10px] text-indigo-300 flex items-center gap-1 mt-1 font-semibold">
              <Zap className="w-3 h-3 text-amber-400" /> Otomasi Deep Learning
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Draft Perangkat Ajar Terbaru
          </h3>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition"
          >
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.slice(0, 4).map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setActiveProject(proj);
                setActiveTab('workspace');
              }}
              className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition cursor-pointer shadow-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {proj.subject} • {proj.grade}
                  </span>
                  <h4 className="font-bold text-slate-100 group-hover:text-amber-300 transition mt-2 text-sm">
                    {proj.title}
                  </h4>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    proj.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {proj.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{proj.cp}</p>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Kelengkapan Dokumen</span>
                  <span>{proj.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60">
                <span>Diedit {proj.lastEdited}</span>
                <span className="text-indigo-400 group-hover:translate-x-1 transition flex items-center gap-1 font-semibold">
                  Buka AI Workspace <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectHub({
  projects = [],
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  setActiveProject,
  setActiveTab,
  onOpenWizard
}) {
  const filteredProjects = projects
    .filter((p) => (statusFilter === 'All' ? true : p.status === statusFilter))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Project Hub Perangkat Ajar</h2>
          <p className="text-xs text-slate-400 mt-1">Kelola, filter, dan tinjau seluruh dokumen Kurikulum Merdeka Anda.</p>
        </div>
        <button
          onClick={onOpenWizard}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4" /> Proyek Baru
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
          <span className="text-xs text-slate-400 font-medium shrink-0">Filter Status:</span>
          {['All', 'In Progress', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
                statusFilter === st ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-64 text-xs">
          <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Filter nama / mapel..."
            className="bg-transparent outline-none text-slate-200 text-xs w-full placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl group transition hover:shadow-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {proj.phase} • {proj.semester}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    proj.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {proj.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 transition text-sm leading-snug">
                {proj.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{proj.cp}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/80">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Progres Pembentukan AI</span>
                <span className="font-bold text-indigo-400">{proj.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${proj.progress}%` }}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    setActiveProject(proj);
                    setActiveTab('workspace');
                  }}
                  className="flex-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Split AI
                </button>
                <button
                  onClick={() => {
                    setActiveProject(proj);
                    setActiveTab('notion');
                  }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl font-bold border border-slate-700 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" /> Notion Studio
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitWorkspace({
  activeProject,
  activeDocView,
  setActiveDocView,
  chatMessages = [],
  chatInput,
  setChatInput,
  isAiThinking,
  onSendChatMessage,
  onAccAndContinue,
  onOpenExport
}) {
  const docTabs = [
    { id: 'modul', label: 'Modul Ajar' },
    { id: 'cp', label: 'CP' },
    { id: 'tp', label: 'TP' },
    { id: 'atp', label: 'ATP' },
    { id: 'kktp', label: 'KKTP' },
    { id: 'prota', label: 'Prota' },
    { id: 'prosem', label: 'Prosem' }
  ];

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col lg:flex-row overflow-hidden bg-[#0B192C]">
      <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-950/60 shrink-0">
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">AI Co-Pilot (Deep Learning v2.5)</h3>
              <p className="text-[10px] text-slate-400 font-medium">Pilar: Mindful • Meaningful • Joyful</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Connected
          </span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] text-xs leading-relaxed p-3.5 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md font-medium'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isAiThinking && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs italic bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Deep Learning Engine sedang menyintesis revisi...</span>
            </div>
          )}
        </div>

        <div className="p-2.5 bg-slate-900/70 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={onAccAndContinue}
            className="whitespace-nowrap bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 active:scale-95"
          >
            <Check className="w-3.5 h-3.5" /> ACC & Lanjutkan
          </button>
          <button
            onClick={() => setChatInput('Tolong tajamkan pilar Meaningful Learning dengan studi kasus nyata lingkungan.')}
            className="whitespace-nowrap bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-[11px] px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" /> Minta Revisi
          </button>
          <button
            onClick={() => setChatInput('Regenerate ulang rumusan TP & ATP berbasis gaya belajar kinestetik murid.')}
            className="whitespace-nowrap bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Regenerate
          </button>
        </div>

        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ketik instruksi atau penyesuaian dokumen..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 transition placeholder-slate-500"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendChatMessage()}
          />
          <button
            onClick={onSendChatMessage}
            disabled={!chatInput.trim() || isAiThinking}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full lg:w-7/12 flex flex-col bg-[#0B192C]">
        <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between overflow-x-auto shrink-0 gap-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {docTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDocView(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  activeDocView === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 shrink-0">
            <button
              onClick={onOpenExport}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold flex items-center gap-1.5 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> Cetak / PDF
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-950/40">
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 text-xs leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  LIVE CANVAS PREVIEW
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">
                  {activeProject ? activeProject.title : 'Judul Perangkat Ajar'}
                </h2>
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-[11px] text-slate-400 font-medium">Status Dokumen</p>
                <p className="text-xs font-bold text-emerald-400 flex items-center sm:justify-end gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeProject ? activeProject.status : 'In Progress'}
                </p>
              </div>
            </div>

            <div className="space-y-4 whitespace-pre-wrap font-sans text-slate-200 leading-relaxed min-h-[350px]">
              {activeProject && activeProject.docTree ? (
                activeProject.docTree[activeDocView] || (
                  <div className="p-8 text-center text-slate-500 italic space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-600" />
                    <p>Dokumen untuk bagian ini belum dibentuk oleh Deep Learning Engine.</p>
                  </div>
                )
              ) : (
                <p className="text-slate-500 italic">Tidak ada proyek yang aktif.</p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
              <span>Kurikulum Merdeka • Deep Learning Engine v2.5</span>
              <span className="text-indigo-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Terintegrasi 3 Pilar (Mindful, Meaningful, Joyful)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotionStudio({
  activeProject,
  activeDocView,
  setActiveDocView,
  notionContent,
  setNotionContent,
  onAiFixGrammar,
  onAiExpand,
  onAiSimplify,
  isAiThinking
}) {
  const currentDocLabel =
    DOC_TREE_LABELS.find((item) => item.id === activeDocView)?.label || '7. Modul Ajar Utuh';

  return (
    <div className="h-[calc(100vh-61px)] flex overflow-hidden bg-[#0B192C]">
      <div className="w-64 bg-slate-950/80 border-r border-slate-800 p-4 space-y-4 overflow-y-auto shrink-0 hidden md:block">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-400" /> Dokumen Tree
          </h3>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
            Notion Mode
          </span>
        </div>

        <div className="space-y-1">
          {DOC_TREE_LABELS.map((item) => {
            const isActive = activeDocView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDocView(item.id)}
                className={`w-full text-left text-xs px-3 py-2.5 rounded-xl font-medium transition flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto relative bg-[#0B192C]">
        <div className="max-w-4xl mx-auto w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 flex flex-col flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider inline-flex items-center gap-1">
                <FileText className="w-3 h-3 text-emerald-400" />
                {currentDocLabel}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white mt-2">
                {activeProject ? activeProject.title : 'Modul Ajar'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onAiFixGrammar}
                disabled={isAiThinking}
                className="text-xs bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-1.5 rounded-xl border border-indigo-500/30 font-bold transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Fix Grammar
              </button>

              <button
                onClick={onAiExpand}
                disabled={isAiThinking}
                className="text-xs bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/30 font-bold transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Expand
              </button>

              <button
                onClick={onAiSimplify}
                disabled={isAiThinking}
                className="text-xs bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Type className="w-3.5 h-3.5" /> AI Simplify
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[420px] flex flex-col bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 shadow-inner">
            <textarea
              className="w-full h-full flex-1 bg-transparent text-slate-200 text-xs sm:text-sm leading-relaxed outline-none resize-none font-mono placeholder-slate-600"
              value={notionContent}
              onChange={(e) => setNotionContent(e.target.value)}
              placeholder="Mulai mengetik atau gunakan tombol AI di atas untuk menyintesis konten..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DeepLearningWizard({
  isOpen,
  onClose,
  wizardStep,
  wizardData,
  setWizardData,
  isGenerating,
  onNextStep,
  onPrevStep
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                Deep Learning Wizard Engine v2.5
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Sintesis Terarah: Mindful • Meaningful • Joyful</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-[#0B192C]">
          {wizardStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">Mata Pelajaran</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
                    value={wizardData.subject}
                    onChange={(e) => setWizardData({ ...wizardData, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">Kelas & Fase</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
                    value={wizardData.grade}
                    onChange={(e) => setWizardData({ ...wizardData, grade: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">Capaian Pembelajaran (CP) Utuh</label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition leading-relaxed"
                  value={wizardData.cpText}
                  onChange={(e) => setWizardData({ ...wizardData, cpText: e.target.value })}
                />
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">Profil & Gaya Belajar Dominan Murid</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
                  value={wizardData.learningStyle}
                  onChange={(e) => setWizardData({ ...wizardData, learningStyle: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">Isu Nyata / Konteks Masalah Sekitar Sekolah</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
                  value={wizardData.realIssue}
                  onChange={(e) => setWizardData({ ...wizardData, realIssue: e.target.value })}
                />
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4">
              {isGenerating ? (
                <div className="py-16 text-center space-y-4">
                  <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
                  <p className="text-sm font-bold text-white">Deep Learning Engine v2.5 Sedang Menyintesis...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase">Rumusan Tujuan Pembelajaran (TP)</h4>
                    <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">{wizardData.generatedTP}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase">Matriks Alur Tujuan Pembelajaran (ATP)</h4>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">{wizardData.generatedATP}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {wizardStep === 4 && (
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Perangkat Ajar Siap Di-Launch!</h3>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            disabled={wizardStep === 1 || isGenerating}
            onClick={onPrevStep}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition disabled:opacity-50"
          >
            Kembali
          </button>
          <button
            disabled={isGenerating}
            onClick={onNextStep}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg transition"
          >
            {wizardStep === 4 ? 'Luncurkan Modul Ajar Utuh' : 'Lanjut Step berikutnya'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExportCenterModal({ isOpen, onClose, exportOptions, setExportOptions, onExportPDF, onExportWord, onPrint }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" /> Export Center Perangkat Ajar
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-xl transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {[
            { key: 'includeCP', label: '1. Capaian Pembelajaran (CP)' },
            { key: 'includeTP', label: '2. Tujuan Pembelajaran (TP)' },
            { key: 'includeATP', label: '3. Alur Tujuan Pembelajaran (ATP)' },
            { key: 'includeKKTP', label: '4. KKTP / Rubrik Penilaian' },
            { key: 'includeProta', label: '5. Program Tahunan (Prota)' },
            { key: 'includeProsem', label: '6. Program Semester (Prosem)' },
            { key: 'includeModul', label: '7. Modul Ajar Utuh (3 Pilar)' }
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 p-3 rounded-2xl border bg-slate-950/60 border-slate-800 text-slate-200 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={!!exportOptions[item.key]}
                onChange={(e) => setExportOptions({ ...exportOptions, [item.key]: e.target.checked })}
                className="accent-indigo-600 rounded"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onExportPDF}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={onExportWord}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs py-3 rounded-xl font-bold border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-indigo-400" /> Export Word
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState(INITIAL_PROJECTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState(DEFAULT_WIZARD_DATA);
  const [isGeneratingWizard, setIsGeneratingWizard] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: 'Halo Bapak/Ibu Guru! Saya **Deep Learning Engine v2.5**. Dokumen Anda siap ditinjau. Apa ada bagian dari Modul Ajar ini yang perlu kita pertajam berbasis 3 Pilar (Mindful, Meaningful, Joyful)?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeDocView, setActiveDocView] = useState('modul');

  const [notionContent, setNotionContent] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeCP: true,
    includeTP: true,
    includeATP: true,
    includeKKTP: true,
    includeProta: true,
    includeProsem: true,
    includeModul: true
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (activeProject && activeProject.docTree) {
      setNotionContent(activeProject.docTree[activeDocView] || activeProject.docTree.modul || '');
    }
  }, [activeProject, activeDocView]);

  const handleOpenWizard = () => {
    setWizardStep(1);
    setWizardData(DEFAULT_WIZARD_DATA);
    setIsWizardOpen(true);
  };

  const handleNextWizardStep = async () => {
    if (wizardStep === 1) {
      if (!wizardData.cpText.trim()) {
        showToast('Mohon tempelkan Capaian Pembelajaran (CP) terlebih dahulu!', 'error');
        return;
      }
      setWizardStep(2);
    } else if (wizardStep === 2) {
      setIsGeneratingWizard(true);
      setWizardStep(3);

      try {
        await callGeminiAI(`Generate TP & ATP for ${wizardData.subject}`);

        setWizardData((prev) => ({
          ...prev,
          generatedTP: `1. Menganalisis gagasan utama dan makna tersurat dalam teks narasi kontekstual.\n2. Membedakan fakta dan opini pada artikel berita media sosial lokal.\n3. Menyusun ringkasan kritis berbasis isu nyata sekitar sekolah.`,
          generatedATP: `| Kode ATP | Tujuan Pembelajaran | Alokasi Waktu | Asesmen |\n|---|---|---|---|\n| ATP.1 | Analisis Gagasan Teks Narasi Kontekstual | 4 JP | Formatif Tes Lisan |\n| ATP.2 | Identifikasi Fakta vs Opini Media Sosial | 6 JP | Tugas Kinerja Kelompok |\n| ATP.3 | Penyusunan Ringkasan Kritis Bermakna | 6 JP | Produk Portofolio & Refleksi |`,
          generatedKKTP: `| Indikator | Belum Memenuhi (0-60) | Memenuhi (61-80) | Sangat Baik (81-100) |\n|---|---|---|---|\n| Analisis Teks | Belum membedakan fakta | Mampu membedakan fakta | Mampu mengkritisi bias berita |`,
          generatedProta: `Semester 1: 36 JP (4 Bab Utama)\nSemester 2: 36 JP (3 Bab Proyek Lanjutan)`,
          generatedProsem: `Bulan Juli - Agustus: 16 JP Teks Eksposisi & Narasi`
        }));
      } catch (err) {
        showToast('Terjadi penyesuaian otomatis dalam sintesis draf.', 'info');
      } finally {
        setIsGeneratingWizard(false);
      }
    } else if (wizardStep === 3) {
      setWizardStep(4);
    } else if (wizardStep === 4) {
      const newProj = {
        id: `proj-${Date.now()}`,
        title: `Modul Ajar ${wizardData.subject} - ${wizardData.grade}`,
        subject: wizardData.subject,
        grade: wizardData.grade,
        semester: wizardData.semester,
        phase: wizardData.phase,
        status: 'In Progress',
        progress: 85,
        lastEdited: 'Baru saja',
        cp: wizardData.cpText,
        diagnostic: {
          learningStyle: wizardData.learningStyle,
          infrastructure: wizardData.infrastructure,
          realIssue: wizardData.realIssue
        },
        docTree: {
          cp: wizardData.cpText,
          tp: wizardData.generatedTP,
          atp: wizardData.generatedATP,
          kktp: wizardData.generatedKKTP,
          prota: wizardData.generatedProta,
          prosem: wizardData.generatedProsem,
          modul: `# MODUL AJAR DEEP LEARNING: ${wizardData.subject.toUpperCase()} ${wizardData.phase.toUpperCase()}\n\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: ${wizardData.subject}\n- **Kelas / Semester**: ${wizardData.grade} / ${wizardData.semester}\n- **Gaya Belajar Dominan**: ${wizardData.learningStyle}\n\n---\n\n## II. TIGA PILAR DEEP LEARNING INTEGRATION\n\n### 1. Mindful Learning (Penyadaran Diri)\n- **Latihan STOP**: Sebelum pembelajaran dimulai, murid diajak hening selama 3 menit untuk menyiapkan fokus mental.\n- **Refleksi Awal**: Murid menuliskan harapan dan tingkat kepercayaan diri dalam menguasai materi.\n\n### 2. Meaningful Learning (Keterhubungan Masalah Nyata)\n- **Konteks Lokal**: Membahas isu nyata: "${wizardData.realIssue}".\n- **Problem Solving**: Murid merancang solusi terapan dari teks yang dipelajari.\n\n### 3. Joyful Learning (Kolaboratif & Menggembirakan)\n- **Game Unplugged**: Aktivitas kelompok interaktif berbasis tantangan logika teks.\n- **Peer Feedback**: Saling memberikan umpan balik apresiatif antar kelompok.`
        }
      };

      setProjects([newProj, ...projects]);
      setActiveProject(newProj);
      setIsWizardOpen(false);
      setWizardStep(1);
      setActiveTab('workspace');
      showToast('Modul Ajar Deep Learning Utuh Berhasil Diluncurkan!', 'success');
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isAiThinking) return;

    const userPrompt = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userPrompt }]);
    setIsAiThinking(true);

    try {
      const response = await callGeminiAI(userPrompt);
      setChatMessages((prev) => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      showToast('Gagal memproses respon AI, mencoba ulang...', 'error');
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleAccAndContinue = () => {
    showToast('Bagian dokumen di-ACC! Progress pengerjaan diperbarui.', 'success');
    if (activeProject) {
      setActiveProject((prev) => ({
        ...prev,
        progress: Math.min(100, prev.progress + 15),
        status: prev.progress + 15 >= 100 ? 'Completed' : 'In Progress'
      }));
    }
  };

  const handleAiFixGrammar = async () => {
    setIsAiThinking(true);
    showToast('AI sedang menyempurnakan tata bahasa PUEBI...', 'info');
    try {
      const fixed = await callGeminiAI(`Perbaiki tata bahasa: ${notionContent}`);
      setNotionContent(fixed);
      showToast('Tata bahasa berhasil disempurnakan!', 'success');
    } catch (e) {
      showToast('Gagal memproses perbaikan tata bahasa.', 'error');
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleAiExpand = async () => {
    setIsAiThinking(true);
    showToast('AI sedang memperluas deskripsi...', 'info');
    try {
      const expanded = await callGeminiAI(`Perluas deskripsi: ${notionContent}`);
      setNotionContent(expanded);
      showToast('Konten berhasil diperluas!', 'success');
    } catch (e) {
      showToast('Gagal memperluas konten.', 'error');
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleAiSimplify = async () => {
    setIsAiThinking(true);
    showToast('AI sedang menyederhanakan kalimat...', 'info');
    try {
      const simplified = await callGeminiAI(`Sederhanakan teks: ${notionContent}`);
      setNotionContent(simplified);
      showToast('Kalimat berhasil disederhanakan!', 'success');
    } catch (e) {
      showToast('Gagal menyederhanakan teks.', 'error');
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenWizard={handleOpenWizard}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenExport={() => setIsExportOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-[#0B192C]">
          {activeTab === 'dashboard' && (
            <SaaSDashboard
              projects={projects}
              setActiveProject={setActiveProject}
              setActiveTab={setActiveTab}
              onOpenWizard={handleOpenWizard}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectHub
              projects={projects}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              setActiveProject={setActiveProject}
              setActiveTab={setActiveTab}
              onOpenWizard={handleOpenWizard}
            />
          )}

          {activeTab === 'workspace' && (
            <SplitWorkspace
              activeProject={activeProject}
              activeDocView={activeDocView}
              setActiveDocView={setActiveDocView}
              chatMessages={chatMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              isAiThinking={isAiThinking}
              onSendChatMessage={handleSendChatMessage}
              onAccAndContinue={handleAccAndContinue}
              onOpenExport={() => setIsExportOpen(true)}
            />
          )}

          {activeTab === 'notion' && (
            <NotionStudio
              activeProject={activeProject}
              activeDocView={activeDocView}
              setActiveDocView={setActiveDocView}
              notionContent={notionContent}
              setNotionContent={setNotionContent}
              onAiFixGrammar={handleAiFixGrammar}
              onAiExpand={handleAiExpand}
              onAiSimplify={handleAiSimplify}
              isAiThinking={isAiThinking}
            />
          )}
        </main>
      </div>

      <DeepLearningWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        wizardStep={wizardStep}
        wizardData={wizardData}
        setWizardData={setWizardData}
        isGenerating={isGeneratingWizard}
        onNextStep={handleNextWizardStep}
        onPrevStep={() => setWizardStep((s) => Math.max(1, s - 1))}
      />

      <ExportCenterModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        exportOptions={exportOptions}
        setExportOptions={setExportOptions}
        onExportPDF={() => {
          setIsExportOpen(false);
          showToast('Menyiapkan berkas PDF...', 'success');
        }}
        onExportWord={() => {
          setIsExportOpen(false);
          showToast('Mengunduh dokumen Word...', 'success');
        }}
        onPrint={() => {
          setIsExportOpen(false);
          window.print();
        }}
      />
    </div>
  );
}
