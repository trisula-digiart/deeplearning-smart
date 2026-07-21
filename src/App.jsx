import React, { useState } from 'react';
import DeepLearningWizard from './components/DeepLearningWizard';
import AIWorkspace from './components/AIWorkspace';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'workspace' | 'project-hub' | 'notion-studio'
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);

  // Mock Data Draft Perangkat Ajar Terbaru
  const [draftList, setDraftList] = useState([
    {
      id: 'draft-1',
      title: 'Modul Ajar Informatika - Algoritma Pemrograman',
      subject: 'Informatika',
      phase: 'Fase E (Kelas 10)',
      topic: 'Algoritma Pemrograman & Flowchart',
      status: 'In Progress',
      progress: 65,
      updatedAt: '2 jam yang lalu',
      summary: 'Peserta didik mampu menerapkan strategi algortimik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit volume besar.',
      components: [
        {
          id: 'comp-1',
          section: '1. Identitas & Informasi Umum',
          content: '• Mata Pelajaran: Informatika\n• Fase / Kelas: Fase E (Kelas 10)\n• Alokasi Waktu: 2 JP\n• Target Peserta Didik: Reguler'
        },
        {
          id: 'comp-2',
          section: '2. Capaian & Tujuan Pembelajaran (TP)',
          content: '• CP: Memahami strategi algoritmik standar.\n• TP 1.1: Mendesain flowchart dan pseudo-code kasus nyata.'
        }
      ]
    },
    {
      id: 'draft-2',
      title: 'Perangkat Ajar Matematika - Analisis Data & Peluang',
      subject: 'Matematika',
      phase: 'Fase F (Kelas 11)',
      topic: 'Analisis Data & Peluang',
      status: 'Completed',
      progress: 100,
      updatedAt: '1 hari yang lalu',
      summary: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.',
      components: [
        {
          id: 'comp-1',
          section: '1. Identitas & Informasi Umum',
          content: '• Mata Pelajaran: Matematika\n• Fase / Kelas: Fase F (Kelas 11)\n• Alokasi Waktu: 4 JP'
        }
      ]
    }
  ]);

  // Handler setelah Wizard sukses menghasilkan dokumen AI
  const handleWizardSuccess = (newDocData) => {
    const newDraft = {
      id: `draft-${Date.now()}`,
      title: newDocData.title || `Perangkat Ajar - ${newDocData.topic}`,
      subject: newDocData.subject,
      phase: newDocData.phase,
      topic: newDocData.topic,
      status: 'In Progress',
      progress: 80,
      updatedAt: 'Baru saja',
      summary: newDocData.summary,
      components: newDocData.components || []
    };

    setDraftList([newDraft, ...draftList]);
    setActiveDocument(newDraft);
    setActiveTab('workspace');
  };

  // Switch ke Workspace membawa dokumen terpilih
  const handleOpenWorkspace = (doc = null) => {
    setActiveDocument(doc);
    setActiveTab('workspace');
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 font-sans flex flex-col">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-amber-500 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-[#D4AF37]/20">
            🪶
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide text-white flex items-center gap-2">
              TRISULAPROMPT
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                DEEP LEARNING ENGINE v2.5
              </span>
            </h1>
          </div>
        </div>

        {/* Global Search & Action */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Cari perangkat ajar..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-700/70 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            <span className="absolute left-3 top-2 text-slate-500 text-xs">🔍</span>
          </div>

          <button
            onClick={() => setIsWizardOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black font-bold text-xs rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 flex items-center gap-1.5"
          >
            <span>+ Buat Perangkat Baru</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-[#D4AF37]">
              GH
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-200">Guru Hebat, S.Pd.</div>
              <div className="text-[10px] text-slate-400">Guru Penggerak Fase E/F</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-[#0F172A]/60 border-r border-slate-800/80 p-4 hidden md:flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 tracking-wider">
              Navigasi Utama
            </div>

            {[
              { id: 'dashboard', label: 'Dashboard SaaS', icon: '📊' },
              { id: 'workspace', label: 'AI Workspace (Split)', icon: '⚡' },
              { id: 'project-hub', label: 'Project Hub', icon: '📁' },
              { id: 'notion-studio', label: 'Notion Studio', icon: '📝' }
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === menu.id
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <span>{menu.icon}</span>
                <span>{menu.label}</span>
              </button>
            ))}
          </div>

          {/* Bottom Card Info */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <span className="text-[#D4AF37]">⚡</span> 3 Pilar Active
            </div>
            <p className="text-[11px] leading-relaxed">
              Mindful • Meaningful • Joyful Engine Connected
            </p>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD SAAS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* BANNER HERO */}
              <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-slate-800 shadow-2xl">
                <div className="relative z-10 max-w-2xl space-y-3">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold">
                    SaaS Engine Kurikulum Merdeka v2.5
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Selamat Datang, Bapak/Ibu Guru Hebat! 🚀
                  </h2>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Rancang Modul Ajar, TP, ATP, KKTP, Prota, dan Prosem terintegrasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara otomatis dan presisi.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => setIsWizardOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-black font-bold text-xs transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
                    >
                      <span>✨ Mulai Wizard Deep Learning</span>
                    </button>
                    <button
                      onClick={() => handleOpenWorkspace(draftList[0])}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                    >
                      Lihat Semua Proyek
                    </button>
                  </div>
                </div>
              </div>

              {/* METRIC CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Total Perangkat Ajar', val: draftList.length.toString(), sub: '+2 minggu ini', icon: '📦' },
                  { title: 'Dalam Proses (Draft)', val: draftList.filter(d => d.status === 'In Progress').length.toString(), sub: 'Butuh peninjauan TP/ATP', icon: '⏱️' },
                  { title: 'Selesai & Siap Cetak', val: draftList.filter(d => d.status === 'Completed').length.toString(), sub: 'Siap di-export PDF/Word', icon: '✅' },
                  { title: 'Estimasi Waktu Dihemat', val: '18.5 Jam', sub: 'Otomasi Deep Learning', icon: '⚡' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">{stat.title}</div>
                      <div className="text-2xl font-black text-white mt-1">{stat.val}</div>
                      <div className="text-[10px] text-emerald-400 mt-1">{stat.sub}</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center text-lg">
                      {stat.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* DRAFT DOKUMEN TERBARU */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>📋</span> Draft Perangkat Ajar Terbaru
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draftList.map((draft) => (
                    <div key={draft.id} className="p-6 rounded-2xl bg-[#0F172A]/80 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                              {draft.subject} • {draft.phase}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                              draft.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {draft.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-100">{draft.title}</h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {draft.summary}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Kelengkapan Dokumen</span>
                          <span>{draft.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-500 rounded-full"
                            style={{ width: `${draft.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                        <span className="text-slate-500 text-[10px]">Diedit {draft.updatedAt}</span>
                        <button
                          onClick={() => handleOpenWorkspace(draft)}
                          className="text-[#D4AF37] hover:underline font-semibold text-xs flex items-center gap-1"
                        >
                          Buka AI Workspace →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI WORKSPACE */}
          {activeTab === 'workspace' && (
            <div className="h-[calc(100vh-100px)]">
              <AIWorkspace
                activeDocument={activeDocument}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            </div>
          )}

          {/* TAB 3 & 4 PLACEHOLDER */}
          {(activeTab === 'project-hub' || activeTab === 'notion-studio') && (
            <div className="p-12 text-center bg-[#0F172A]/50 border border-slate-800 rounded-2xl max-w-xl mx-auto space-y-3">
              <div className="text-3xl">🚀</div>
              <h3 className="text-lg font-bold text-white">Modul {activeTab === 'project-hub' ? 'Project Hub' : 'Notion Studio'} Siap Diaktifkan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fitur ini siap dikembangkan pada langkah berikutnya untuk penyuntingan tingkat lanjut.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-xl border border-slate-700"
              >
                Kembali ke Dashboard
              </button>
            </div>
          )}

        </main>
      </div>

      {/* MODAL WIZARD DEEP LEARNING */}
      <DeepLearningWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccess={handleWizardSuccess}
      />

    </div>
  );
}
