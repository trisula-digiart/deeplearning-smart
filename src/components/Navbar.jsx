import React from 'react';

// ============================================================================
// COMPONENT: NAVBAR (HEADER & REAL-TIME TOKEN INDICATOR)
// ============================================================================

export default function Navbar({
currentUser,
onOpenWizard,
onTriggerPaywall,
onLogout,
onViewChange,
currentView
}) {
const isZeroQuota = !currentUser?.is_premium && (currentUser?.kredit_tersisa <= 0);

return (



    {/* BRAND LOGO */}
    <div 
      className="flex items-center space-x-3 cursor-pointer" 
      onClick={() => onViewChange('dashboard')}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-300/40">
        <svg className="w-6 h-6 text-[#0B192C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
            TRISULA
          </span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
            v8.7
          </span>
        </div>
        <p className="text-[10px] text-slate-400 -mt-1 font-medium">AI Perangkat Ajar Kurikulum Merdeka</p>
      </div>
    </div>

    {/* NAVIGATION ROUTE LINKS */}
    <div className="hidden md:flex items-center space-x-1 bg-slate-950/80 p-1.5 rounded-xl border border-amber-500/10">
      <button
        onClick={() => onViewChange('dashboard')}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentView === 'dashboard'
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0B192C] shadow-md font-bold'
            : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => onViewChange('workspace')}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentView === 'workspace'
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0B192C] shadow-md font-bold'
            : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
        }`}
      >
        AI Workspace
      </button>
      <button
        onClick={() => onViewChange('files')}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentView === 'files'
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0B192C] shadow-md font-bold'
            : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/50'
        }`}
      >
        Berkas Saya
      </button>
      {currentUser?.role === 'admin' && (
        <button
          onClick={() => onViewChange('admin')}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            currentView === 'admin'
              ? 'bg-rose-600 text-white shadow-md font-bold'
              : 'text-rose-400 hover:bg-rose-950/30'
          }`}
        >
          Admin Panel
        </button>
      )}
    </div>

    {/* USER TOKEN & ACTIONS */}
    <div className="flex items-center space-x-3">
      
      {/* TOKEN INDICATOR */}
      {currentUser && (
        <div 
          onClick={() => isZeroQuota && onTriggerPaywall("KUOTA_HABIS")}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            currentUser.is_premium
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10'
              : !isZeroQuota
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-300 animate-pulse'
          }`}
        >
          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a7 7 0 00-6 7 1 1 0 102 0 5 5 0 015-5h.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 00-1.414 1.414L10.586 4H10a7 7 0 00-7 7 1 1 0 102 0 5 5 0 015-5V3z" />
          </svg>
          <div className="text-left">
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono">Token Kuota</span>
            <span className="text-xs font-bold font-mono">
              {currentUser.is_premium ? "PRO / Unlimited" : `${currentUser.kredit_tersisa ?? 0} Token`}
            </span>
          </div>
        </div>
      )}

      {/* + BUAT PERANGKAT BARU BUTTON */}
      <button
        onClick={() => {
          if (isZeroQuota) {
            onTriggerPaywall("KUOTA_HABIS");
          } else {
            onOpenWizard();
          }
        }}
        className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-[#0B192C] px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-lg shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">+ Buat Perangkat Baru</span>
      </button>

      {/* USER PROFILE DROPDOWN */}
      {currentUser && (
        <div className="flex items-center space-x-2 pl-2 border-l border-amber-500/20">
          <div className="text-right hidden lg:block">
            <div className="text-xs font-bold text-amber-200 line-clamp-1">{currentUser.nama || currentUser.name}</div>
            <div className="text-[10px] text-slate-400 line-clamp-1">{currentUser.sekolah || currentUser.school || 'Sekolah Umum'}</div>
          </div>
          <button
            onClick={onLogout}
            title="Keluar / Reset Sesi"
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/50 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      )}

    </div>

  </div>
</header>


);
}
