import React from 'react';
import { Menu, Search, Plus, BrainCircuit } from 'lucide-react';

/**
 * TRISULAPROMPT - Navbar Component v2.5
 * Header navigation bar providing quick search, menu toggling, and new project wizard CTA.
 * 
 * @param {Object} props
 * @param {boolean} props.isSidebarOpen - Current toggle state of the sidebar
 * @param {Function} props.setIsSidebarOpen - State setter for sidebar toggle
 * @param {string} props.searchQuery - Current active global search term
 * @param {Function} props.setSearchQuery - State setter for global search term
 * @param {Function} props.onOpenWizard - Callback trigger to open Deep Learning Wizard
 */
export default function Navbar({
  isSidebarOpen,
  setIsSidebarOpen,
  searchQuery,
  setSearchQuery,
  onOpenWizard
}) {
  return (
    <header className="bg-[#0F172A]/90 border-b border-slate-800 px-4 py-3 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between">
      {}
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

      {}
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
