import React from 'react';

// Native Inline SVG Icons (100% Standalone - Zero External Dependencies)
const Icons = {
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
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Cpu: ({ className = "w-5 h-5 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
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
  )
};

export default function Navbar({
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
  // Safe Fallback & Normalization for User State
  const isPremium = Boolean(currentUser?.is_premium);
  const creditCount = currentUser?.kredit_tersisa ?? 0;

  // Resilient Handlers
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
      
      {/* LEFT SECTION: Sidebar Toggle + Brand Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={triggerToggleSidebar}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition cursor-pointer border border-transparent hover:border-slate-700 active:scale-95"
          aria-label="Toggle Menu Sidebar"
          title="Buka / Tutup Navigasi"
        >
          <Icons.Menu className="w-5 h-5 text-slate-300" />
        </button>

        {/* Brand Logo and Title */}
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

      {}
      {/* RIGHT SECTION: Search + Token Badge + CTA + User Profile + Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Global Search Bar (Hidden on Mobile) */}
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

        {/* Real-time Token / Kuota Badge */}
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

        {/* Primary Action Button: Wizard */}
        <button
          onClick={triggerWizard}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 text-xs px-3.5 py-1.5 rounded-xl font-bold shadow-lg shadow-amber-500/15 transition-all active:scale-95 cursor-pointer shrink-0"
          title="Buat Perangkat Ajar Baru"
        >
          <Icons.Plus className="w-4 h-4 text-slate-950" />
          <span className="hidden sm:inline">+ Buat Perangkat</span>
        </button>

        {/* User Profile Badge & Logout Button */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-[#D4AF37] text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-md uppercase shrink-0">
            {currentUser?.name ? currentUser.name.substring(0, 2) : 'GH'}
          </div>

          <div className="hidden md:block text-left text-xs leading-tight max-w-[120px] truncate">
            <span className="font-bold text-white block truncate">{currentUser?.name || 'Guru Hebat'}</span>
            <span className="text-[10px] text-slate-400 block truncate">{currentUser?.school || 'Sekolah'}</span>
          </div>

          {/* Guaranteed Visible Logout Button */}
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
