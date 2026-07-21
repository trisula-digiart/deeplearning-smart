import React, { useState } from 'react';
import {
  Filter,
  Search,
  Plus,
  Sparkles,
  FileText,
  Layers,
  Trash2,
  Copy
} from 'lucide-react';

/**
 * TRISULAPROMPT - Project Hub View Component v2.5 (Fully Patched)
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Filterable & Searchable Grid for Kurikulum Merdeka Teaching Materials
 */

// Realistic Internal Mock Data Fallback
const DEFAULT_MOCK_PROJECTS = [
  {
    id: 'draft-1',
    title: 'Modul Ajar Informatika - Algoritma Pemrograman & Flowchart',
    subject: 'Informatika',
    phase: 'Fase E (Kelas 10)',
    grade: 'Kelas 10',
    topic: 'Algoritma Pemrograman',
    status: 'In Progress',
    progress: 65,
    updatedAt: '2 jam yang lalu',
    summary: 'Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan.',
    cp: 'Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit volume besar.'
  },
  {
    id: 'draft-2',
    title: 'Perangkat Ajar Matematika - Analisis Data & Peluang',
    subject: 'Matematika',
    phase: 'Fase F (Kelas 11)',
    grade: 'Kelas 11',
    topic: 'Analisis Data & Peluang',
    status: 'Completed',
    progress: 100,
    updatedAt: '1 hari yang lalu',
    summary: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.',
    cp: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik dan mengevaluasi klaim berbasis media.'
  },
  {
    id: 'draft-3',
    title: 'Modul Ajar Bahasa Indonesia - Teks Laporan Hasil Observasi',
    subject: 'Bahasa Indonesia',
    phase: 'Fase D (Kelas 7)',
    grade: 'Kelas 7',
    topic: 'Laporan Hasil Observasi',
    status: 'In Progress',
    progress: 40,
    updatedAt: '3 hari yang lalu',
    summary: 'Peserta didik mampu mengidentifikasi informasi dan menyajikan teks laporan hasil observasi dengan kritis.',
    cp: 'Peserta didik mampu mengidentifikasi informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari teks LHO.'
  }
];

export default function ProjectHub(props) {
  // Kompatibilitas fleksibel untuk props dari App.jsx
  const rawProjects = props.projects || props.draftList || DEFAULT_MOCK_PROJECTS;
  const projects = rawProjects.length > 0 ? rawProjects : DEFAULT_MOCK_PROJECTS;

  // Handler callback fleksibel untuk tombol Wizard & Navigasi
  const handleOpenWizard = props.onCreateNew || props.onOpenWizard || (() => alert("Membuka Deep Learning Wizard..."));
  const handleSelectProject = props.onSelectProject || props.setActiveProject || (() => {});
  const handleSelectTab = props.setActiveTab || (() => {});
  const handleDelete = props.onDeleteProject || (() => {});

  // Local State Fallback jika props setter tidak dikirim dari parent
  const [localSearch, setLocalSearch] = useState('');
  const [localStatus, setLocalStatus] = useState('All');

  const searchQuery = props.searchQuery !== undefined ? props.searchQuery : localSearch;
  const setSearchQuery = props.setSearchQuery || setLocalSearch;

  const statusFilter = props.statusFilter !== undefined ? props.statusFilter : localStatus;
  const setStatusFilter = props.setStatusFilter || setLocalStatus;

  // Apply status and text search filtering dengan penanganan safe string (lower-case)
  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;
    const q = (searchQuery || '').toLowerCase();
    
    const titleMatch = (p.title || '').toLowerCase().includes(q);
    const subjectMatch = (p.subject || '').toLowerCase().includes(q);
    const phaseMatch = (p.phase || p.grade || '').toLowerCase().includes(q);
    const topicMatch = (p.topic || '').toLowerCase().includes(q);

    return matchesStatus && (titleMatch || subjectMatch || phaseMatch || topicMatch);
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Section with CTA Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📁</span> Project Hub Perangkat Ajar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola, filter, dan tinjau seluruh dokumen Kurikulum Merdeka Anda.
          </p>
        </div>
        <button
          onClick={handleOpenWizard}
          className="bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-black font-extrabold" />
          <span>Proyek Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar Control Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 border border-slate-800 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
          <span className="text-xs text-slate-400 font-medium shrink-0">Filter Status:</span>
          {['All', 'In Progress', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-72 text-xs focus-within:border-[#D4AF37] transition">
          <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Filter nama / mapel / topik..."
            className="bg-transparent outline-none text-slate-200 text-xs w-full placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid Display Area */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-3">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-xs font-semibold text-slate-400">
            Tidak ada perangkat ajar yang cocok dengan filter.
          </p>
          <button
            onClick={() => {
              setStatusFilter('All');
              setSearchQuery('');
            }}
            className="text-xs text-[#D4AF37] hover:underline font-medium cursor-pointer"
          >
            Reset Filter & Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl group transition hover:shadow-2xl relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {proj.subject || 'Mapel'} • {proj.phase || proj.grade || 'Fase'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        proj.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {proj.status}
                    </span>
                    {props.onDeleteProject && (
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="text-slate-500 hover:text-rose-400 transition p-1"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-slate-100 group-hover:text-[#D4AF37] transition text-sm leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.summary || proj.cp || 'Tidak ada ringkasan deskripsi.'}
                </p>
              </div>

              {/* Document Progress & Direct Navigation CTA */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Progres Kelengkapan</span>
                  <span className="font-bold text-[#D4AF37]">{proj.progress || 50}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37] transition-all duration-500"
                    style={{ width: `${proj.progress || 50}%` }}
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      handleSelectProject(proj);
                      handleSelectTab('workspace');
                    }}
                    className="flex-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/30 text-xs py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> AI Workspace
                  </button>
                  <button
                    onClick={() => {
                      handleSelectProject(proj);
                      handleSelectTab('notion-studio');
                    }}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl font-bold border border-slate-700 transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" /> Notion Studio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
