import React from 'react';
import {
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  Zap,
  FileText,
  ChevronRight 
} from 'lucide-react';

/**
 * TRISULAPROMPT - SaaS Dashboard View Component v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Executive Dashboard with Real-Time Metrics & Recent Project Hub Snippets
 * 
 * @param {Object} props
 * @param {Array} props.projects - Array of active teaching material project objects
 * @param {Function} props.setActiveProject - State setter for selecting active project
 * @param {Function} props.setActiveTab - State setter for switching main navigation tabs
 * @param {Function} props.onOpenWizard - Callback to trigger Deep Learning Wizard Modal
 */
export default function SaaSDashboard({
  projects = [],
  setActiveProject,
  setActiveTab,
  onOpenWizard
}) {
  // Calculating dynamic status metrics
  const inProgressCount = projects.filter((p) => p.status !== 'Completed').length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Hero Welcome Banner */}
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
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Mulai Wizard Deep Learning
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs px-4 py-3 rounded-xl border border-slate-700 font-semibold transition cursor-pointer"
            >
              Lihat Semua Proyek
            </button>
          </div>
        </div>
      </div>

      {/* Key Performance Indicator (KPI) Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg hover:border-slate-700 transition">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Perangkat Ajar</p>
            <p className="text-2xl font-black text-white mt-1">{projects.length}</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Terbuka di Local Storage
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* In Progress Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg hover:border-slate-700 transition">
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

        {/* Completed Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg hover:border-slate-700 transition">
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

        {/* Saved Time Metric Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg hover:border-slate-700 transition">
          <div>
            <p className="text-xs text-slate-400 font-medium">Estimasi Waktu Dihemat</p>
            <p className="text-2xl font-black text-indigo-400 mt-1">18.5 Jam</p>
            <span className="text-[10px] text-indigo-300 flex items-center gap-1 mt-1 font-semibold">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" /> Otomasi Deep Learning
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* Recent Teaching Material Drafts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Draft Perangkat Ajar Terbaru
          </h3>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition cursor-pointer"
          >
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 text-xs">
            Belum ada proyek perangkat ajar. Klik tombol "Mulai Wizard Deep Learning" di atas untuk membuat.
          </div>
        ) : (
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

                {/* Progress Bar */}
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
        )}
      </div>
    </div>
  );
}
