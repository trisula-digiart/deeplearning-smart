import React from 'react';
import {
  Menu,
  Search,
  Plus,
  BrainCircuit,
  Bell,
  User,
  Sparkles
} from 'lucide-react';

/**
 * TRISULAPROMPT - Navbar Component v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Main Header Navigation Bar with Search & CTA Actions
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
    <header className="bg-[#0F172A]/90 border-b border-slate-800 px-4 py-3 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between shadow-lg">
      {/* Left Brand Identity & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition active:scale-95 border border-transparent hover:border-slate-700"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Platform Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-amber-400/30">
            <BrainCircuit className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent leading-none">
              TRISULAPROMPT
            </h1>
            <p className="text-[10px] text-indigo-400 font-bold tracking-wider mt-0.5 uppercase">
              DEEP LEARNING ENGINE v2.5
            </p>
          </div>
        </div>
      </div>

      {/* Right Search Input & Quick Actions */}
      <div className="flex items-center gap-3.5">
        {/* Global Search Bar */}
        <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-1.5 w-64 lg:w-80 text-xs focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition shadow-inner">
          <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Cari modul, CP, TP, atau mapel..."
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Primary Action Button: Open Wizard */}
        <button
          onClick={onOpenWizard}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white text-xs px-4 py-2 rounded-xl font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Buat Perangkat Baru</span>
        </button>

        {/* System User Profile Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800/80">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-indigo-600 p-[1px] shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-xs font-black text-amber-300">
                GH
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>
          
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-200 leading-tight">
              Guru Hebat, S.Pd.
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              Guru Penggerak Fase E/F
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
