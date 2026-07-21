import React from 'react';
import {
  Filter,
  Search,
  Plus,
  Sparkles,
  FileText,
  Layers,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

/**
 * TRISULAPROMPT - Project Hub View Component v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Filterable & Searchable Grid for Kurikulum Merdeka Teaching Materials
 * 
 * @param {Object} props
 * @param {Array} props.projects - Array of teaching material project objects
 * @param {string} props.searchQuery - Active search query string
 * @param {Function} props.setSearchQuery - Setter function for global search
 * @param {string} props.statusFilter - Active status filter ('All' | 'In Progress' | 'Completed')
 * @param {Function} props.setStatusFilter - Setter function for status filter
 * @param {Function} props.setActiveProject - Setter function for selected active project
 * @param {Function} props.setActiveTab - Setter function for switching main workspace tabs
 * @param {Function} props.onOpenWizard - Callback trigger for the Deep Learning Wizard
 */
export default function ProjectHub({
  projects = [],
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  setActiveProject,
  setActiveTab,
  onOpenWizard
}) {
  // Apply status and text search filtering
  const filteredProjects = projects
    .filter((p) => (statusFilter === 'All' ? true : p.status === statusFilter))
    .filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.grade.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Section with CTA Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Project Hub Perangkat Ajar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola, filter, dan tinjau seluruh dokumen Kurikulum Merdeka Anda.
          </p>
        </div>
        <button
          onClick={onOpenWizard}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" /> Proyek Baru
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
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-64 text-xs focus-within:border-indigo-500/80 transition">
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
            className="text-xs text-indigo-400 hover:underline font-medium cursor-pointer"
          >
            Reset Filter & Search
          </button>
        </div>
      ) : (
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

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.cp}
                </p>
              </div>

              {/* Document Progress & Direct Navigation CTA */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Progres Kelengkapan</span>
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
                    className="flex-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Split AI
                  </button>
                  <button
                    onClick={() => {
                      setActiveProject(proj);
                      setActiveTab('notion');
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
