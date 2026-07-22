import React from 'react';
import {
  Menu,
  Search,
  Plus,
  BrainCircuit,
  Bell,
  User,
  Sparkles,
  Coins,
  LogOut
} from 'lucide-react';

/**
 * TRISULAPROMPT - Navbar Component v3.0
 * Module: Main Header Navigation Bar with Real-time Token Badge & User Status
 */
export default function Navbar({
  isSidebarOpen,
  setIsSidebarOpen,
  searchQuery,
  setSearchQuery,
  onOpenWizard,
  currentUser,
  onLogout,
  onRequestPaywall
}) {
  // Determine displayed credits / token badge info
  const isPremium = Boolean(currentUser?.is_premium);
  const creditCount = currentUser?.kredit_tersisa ?? 0;

  return (
    <header className="bg-[#0F172A]/90 border-b border-slate-800 px-3 sm:px-4 py-3 sticky top-0 z-40 backdrop-blur-md flex items-center justify-between shadow-lg w-full">
      {/* Left Brand Identity & Sidebar Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition active:scale-95 border border-transparent hover:border-slate-700 cursor-pointer"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Platform Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-amber-400/30 shrink-0">
            <BrainCircuit className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-extrabold text-xs sm:text-base tracking-wide bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent leading-none">
              TRISULAPROMPT
            </h1>
            <p className="text-[10px] text-indigo-400 font-bold tracking-wider mt-0.5 uppercase">
              DEEP LEARNING ENGINE v3.0
            </p>
          </div>
        </div>
      </div>

      {/* Center/Right Search Input, Token Badge & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-1.5 w-60 xl:w-72 text-xs focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition shadow-inner">
          <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Cari modul, CP, TP, atau mapel..."
            className="bg-transparent border-none outline-none text-slate-200 text-xs w-full placeholder-slate-500"
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </div>

        {/* REAL-TIME TOKEN / CREDIT BADGE (INDICATOR) */}
        <button
          type="button"
          onClick={() => onRequestPaywall && onRequestPaywall('Top up token atau tingkatkan paket lisensi Anda!')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
            isPremium
              ? 'bg-amber-500/10 border-[#D4AF37]/50 text-amber-300 hover:bg-amber-500/20'
              : creditCount > 0
              ? 'bg-slate-900 border-slate-700 text-amber-300 hover:border-[#D4AF37]'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-300 hover:bg-rose-900/50 animate-pulse'
          }`}
          title="Klik untuk Top Up / Buka Akses"
        >
          <Coins className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="font-mono text-xs">
            {isPremium ? 'Unlimited Pro' : `${creditCount} Token`}
          </span>
        </button>

        {/* Primary Action Button: Open Wizard */}
        <button
          onClick={onOpenWizard}
          className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 text-xs px-3 sm:px-4 py-2 rounded-xl font-bold shadow-lg shadow-amber-500/15 transition active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span className="hidden sm:inline">Buat Perangkat</span>
        </button>

        {/* System User Profile Badge */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800/80">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-indigo-600 p-[1px] shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-xs font-black text-amber-300 uppercase">
                {currentUser?.name ? currentUser.name.substring(0, 2) : 'GH'}
              </div>
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${isPremium ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          </div>
          
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-200 leading-tight truncate max-w-[130px]">
              {currentUser?.name || 'Guru Penggerak'}
            </p>
            <p className="text-[10px] text-slate-400 font-medium truncate max-w-[130px]">
              {currentUser?.school || 'Instansi Pendidikan'}
            </p>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 ml-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
