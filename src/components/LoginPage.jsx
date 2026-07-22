import React, { useState } from 'react';

// Custom SVG Icons for Zero-Crash Reliability and Styling Consistency
const Icons = {
  Cpu: ({ className = "w-6 h-6 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 013.222-.563c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
    </svg>
  ),
  User: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Building: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4 text-amber-300" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  CheckCircle: ({ className = "w-4 h-4 text-emerald-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export default function LoginPage({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [selectedRole, setSelectedRole] = useState('guru'); // 'guru' | 'siswa' | 'admin'

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handler Login Submisi
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Silakan isi alamat email dan kata sandi Anda!');
      return;
    }

    if (authMode === 'register' && !fullName) {
      setErrorMessage('Silakan isi Nama Lengkap Anda!');
      return;
    }

    setIsLoading(true);

    // Simulasi Authentication Latency
    setTimeout(() => {
      setIsLoading(false);

      const userPayload = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: fullName || (email.includes('admin') ? 'Administrator Trisula' : email.split('@')[0]),
        email: email,
        role: selectedRole,
        is_premium: selectedRole === 'admin' || email.includes('premium') || email.includes('guru'),
        kredit_tersisa: email.includes('premium') ? 100 : 1,
        doc_generated_count: 0,
        school: schoolName || 'SMA Negeri 1 Jakarta'
      };

      if (onLoginSuccess) {
        onLoginSuccess(userPayload);
      } else {
        setSuccessMessage('Login berhasil! Mengalihkan ke Dashboard...');
      }
    }, 1200);
  };

  // Quick Demo Auto-Fill Handler
  const handleDemoLogin = (type) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    let demoUser = {};

    if (type === 'guru_premium') {
      demoUser = {
        id: 'usr_premium_01',
        name: 'Budi Santoso, M.Pd.',
        email: 'budi.santoso@guru.sma.sch.id',
        role: 'guru',
        is_premium: true,
        kredit_tersisa: 250,
        doc_generated_count: 14,
        school: 'SMA Negeri 1 Jakarta'
      };
      setEmail('budi.santoso@guru.sma.sch.id');
      setPassword('demo1234');
      setSelectedRole('guru');
    } else if (type === 'guru_free') {
      demoUser = {
        id: 'usr_free_01',
        name: 'Siti Rahmawati, S.Pd.',
        email: 'siti.rahma@sd.kemdikbud.go.id',
        role: 'guru',
        is_premium: false,
        kredit_tersisa: 1,
        doc_generated_count: 1,
        school: 'SD Negeri 05 Kebayoran'
      };
      setEmail('siti.rahma@sd.kemdikbud.go.id');
      setPassword('demo1234');
      setSelectedRole('guru');
    } else if (type === 'admin') {
      demoUser = {
        id: 'usr_admin_master',
        name: 'Root Admin Trisula',
        email: 'admin@trisula.ai',
        role: 'admin',
        is_premium: true,
        kredit_tersisa: 999999,
        doc_generated_count: 0,
        school: 'HQ Trisula Engine'
      };
      setEmail('admin@trisula.ai');
      setPassword('admin1234');
      setSelectedRole('admin');
    }

    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#132338]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 mb-2">
            <Icons.Cpu className="w-8 h-8 text-slate-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            TRISULA AI PORTAL
          </h1>
          <p className="text-xs text-slate-400">
            Engine Evaluasi Penilaian Otomatis, Modul Ajar, & Portal B2B Sekolah
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-900/80 p-1 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-semibold">
          {[
            { id: 'guru', label: 'Pengajar / Guru' },
            { id: 'siswa', label: 'Siswa / Peserta' },
            { id: 'admin', label: 'Administrator' }
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRole(r.id)}
              className={`flex-1 py-2 text-center rounded-xl transition-all ${
                selectedRole === r.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span> {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
            <Icons.CheckCircle /> {successMessage}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap & Gelar</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.User />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Budi Santoso, M.Pd."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Sekolah / Instansi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Building />
                  </div>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Contoh: SMA Negeri 1 Jakarta"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Email Terdaftar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Mail />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Kata Sandi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Lock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
          </div>

          {authMode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0"
                />
                Ingat Saya
              </label>
              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Lupa Sandi?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {authMode === 'login' ? 'Masuk Sekarang' : authMode === 'register' ? 'Buat Akun Baru' : 'Kirim Instruksi Reset'}
                <Icons.ArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Launcher */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] text-center uppercase tracking-wider text-slate-400 font-semibold">
            ⚡ Pengujian Cepat / Akun Demo
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('guru_premium')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-xl text-[10px] text-amber-300 font-semibold transition-all text-center cursor-pointer"
            >
              Guru Premium
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('guru_free')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-[10px] text-slate-300 font-semibold transition-all text-center cursor-pointer"
            >
              User Gratis
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-[10px] text-cyan-300 font-semibold transition-all text-center cursor-pointer"
            >
              Root Admin
            </button>
          </div>
        </div>

        {/* Auth Mode Toggle Footer */}
        <div className="text-center text-xs text-slate-400">
          {authMode === 'login' ? (
            <>
              Belum memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#D4AF37] font-bold hover:underline"
              >
                Daftar Sekarang
              </button>
            </>
          ) : (
            <>
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#D4AF37] font-bold hover:underline"
              >
                Masuk Kembali
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
