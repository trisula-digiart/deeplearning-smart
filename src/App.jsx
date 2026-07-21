import React, { useState, useEffect, useMemo } from 'react';

const Icons = {
  LogOut: ({ className = "w-4 h-4 text-rose-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4 text-slate-950" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Cpu: ({ className = "w-5 h-5 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Home: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

function LoginPage({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('guru');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Silakan isi alamat email dan kata sandi Anda!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userPayload = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: fullName || (email.includes('admin') ? 'Root Admin Trisula' : email.split('@')[0]),
        email: email,
        role: selectedRole,
        is_premium: selectedRole === 'admin' || email.includes('premium') || email.includes('guru'),
        kredit_tersisa: email.includes('premium') ? 100 : 1,
        doc_generated_count: 0,
        school: schoolName || 'SMA Negeri 1 Jakarta'
      };

      if (onLoginSuccess) {
        onLoginSuccess(userPayload);
      }
    }, 1000);
  };

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
    }

    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#132338]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
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
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                selectedRole === r.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span> {errorMessage}
          </div>
        )}

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
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {authMode === 'login' ? 'Masuk Sekarang' : 'Buat Akun Baru'}
                <Icons.ArrowRight />
              </>
            )}
          </button>
        </form>

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
      </div>
    </div>
  );
}

function AdminDashboard({ usersData, onUpdateUserStatus, onAddCredits }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUserForCredits, setSelectedUserForCredits] = useState(null);
  const [creditAmount, setCreditAmount] = useState(10);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const defaultUsers = [
    { id: 'usr_001', name: 'Budi Santoso', email: 'budi.santoso@guru.sma.sch.id', is_premium: true, kredit_tersisa: 45, doc_generated_count: 12, register_date: '2026-06-15' },
    { id: 'usr_002', name: 'Siti Rahmawati', email: 'siti.rahma@sd.kemdikbud.go.id', is_premium: false, kredit_tersisa: 1, doc_generated_count: 1, register_date: '2026-07-01' },
    { id: 'usr_003', name: 'Ahmad Dahlan', email: 'ahmad.dahlan@yayasan.ac.id', is_premium: false, kredit_tersisa: 0, doc_generated_count: 3, register_date: '2026-07-10' },
  ];

  const activeUsers = usersData && usersData.length > 0 ? usersData : defaultUsers;

  const filteredUsers = activeUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' ? true : 
                          statusFilter === 'PREMIUM' ? user.is_premium : 
                          !user.is_premium;
    return matchesSearch && matchesStatus;
  });

  const handleTogglePremium = (user) => {
    const newStatus = !user.is_premium;
    if (onUpdateUserStatus) {
      onUpdateUserStatus(user.id, newStatus);
    }
    showToast(`Status lisensi ${user.name} diubah menjadi ${newStatus ? 'PREMIUM' : 'GRATIS'}.`);
  };

  const handleCreditSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserForCredits) return;
    const added = parseInt(creditAmount, 10);
    if (isNaN(added) || added <= 0) return;

    if (onAddCredits) {
      onAddCredits(selectedUserForCredits.id, added);
    }
    showToast(`Berhasil menambahkan ${added} kredit dokumen untuk ${selectedUserForCredits.name}.`);
    setSelectedUserForCredits(null);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 p-4 md:p-8 font-sans">
      {notification && (
        <div className="fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl border text-sm font-semibold bg-emerald-950/90 border-emerald-500/50 text-emerald-200">
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
            Admin Activation Control Panel
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Dashboard Aktivasi User & Lisensi
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-80"
          />
          <div className="flex items-center gap-2">
            <button onClick={() => setStatusFilter('ALL')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === 'ALL' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Semua</button>
            <button onClick={() => setStatusFilter('PREMIUM')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === 'PREMIUM' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Premium</button>
            <button onClick={() => setStatusFilter('FREE')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === 'FREE' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Gratis</button>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase">
              <tr>
                <th className="p-4">Pengguna</th>
                <th className="p-4">Status Lisensi</th>
                <th className="p-4">Sisa Kredit</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-[10px] text-slate-400">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${user.is_premium ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                      {user.is_premium ? 'PREMIUM' : 'GRATIS'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{user.kredit_tersisa} doc</td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleTogglePremium(user)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${user.is_premium ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}
                    >
                      {user.is_premium ? 'Nonaktifkan' : 'Aktifkan Premium'}
                    </button>
                    <button
                      onClick={() => setSelectedUserForCredits(user)}
                      className="px-3 py-1 bg-slate-800 hover:bg-[#D4AF37] hover:text-slate-950 text-white rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      + Kredit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUserForCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-[#0B192C] border border-[#D4AF37]/40 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Tambah Kredit for {selectedUserForCredits.name}</h3>
            <form onSubmit={handleCreditSubmit} className="space-y-3">
              <input
                type="number"
                min="1"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setSelectedUserForCredits(null)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold rounded-lg text-xs">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AIWorkspace({ activeDocument, onBackToDashboard, onUpdateDocument, userStatus: externalUserStatus }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
  const [userStatus, setUserStatus] = useState(externalUserStatus || {
    is_premium: false,
    kredit_tersisa: 1,
    doc_generated_count: 1
  });

  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentForm, setPaymentForm] = useState({ fullname: '', email: '' });

  const defaultDoc = {
    id: 'doc-stem-master',
    title: 'Modul Ajar STEM & Informatika - Model Matematika, Algoritma & Prosem',
    subject: 'Informatika & STEM',
    phase: 'Fase F (Kelas 11 SMA)',
    content: `# MODUL AJAR DEEP LEARNING: INFORMATIKA & STEM FASE F
## I. INFORMASI UMUM
- Mata Pelajaran: Informatika Integrated
## II. CAPAIAN PEMBELAJARAN (CP)
Peserta didik mampu merancang algoritma logika secara kritis.`
  };

  const currentDoc = activeDocument || defaultDoc;
  const [docContent, setDocContent] = useState(currentDoc.content);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: `Halo Bapak/Ibu Guru! AI Workspace siap digunakan.` }
  ]);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenExportModal = () => {
    if (!userStatus.is_premium) {
      setPaywallReason('Cetak dan Export Dokumen (Word, PDF, TXT) adalah fitur eksklusif akun Premium.');
      setIsPaywallOpen(true);
      return;
    }
    alert('Fitur Cetak/Export Siap Digunakan!');
  };

  const handleSendMessage = () => {
    if (!inputInstruction.trim()) return;

    if (!userStatus.is_premium && userStatus.doc_generated_count >= 1) {
      setPaywallReason('Batas gratis 1x generate telah dicapai. Upgrade ke Premium untuk Generate tanpa batas!');
      setIsPaywallOpen(true);
      return;
    }

    const textToSend = inputInstruction;
    setInputInstruction('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setIsGenerating(true);

    setTimeout(() => {
      const added = `\n\n## SUPLENEN AI\nInstruksi: "${textToSend}" berhasil diterapkan.`;
      setDocContent(prev => prev + added);
      setUserStatus(prev => ({ ...prev, doc_generated_count: prev.doc_generated_count + 1 }));
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: `Selesai menyusun draf baru.` }]);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 p-4 bg-[#070F1E] text-slate-100 font-sans">
      <div className="w-full md:w-5/12 bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <button onClick={onBackToDashboard} className="text-xs text-slate-400 hover:text-white cursor-pointer">← Kembali</button>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${userStatus.is_premium ? 'bg-amber-500/20 text-[#D4AF37]' : 'bg-slate-800 text-slate-400'}`}>
              {userStatus.is_premium ? '★ PREMIUM' : 'GRATIS'}
            </span>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto text-xs">
            {messages.map(m => (
              <div key={m.id} className={`p-3 rounded-xl ${m.sender === 'user' ? 'bg-indigo-600 text-right ml-auto max-w-[80%]' : 'bg-slate-900 border border-slate-800 text-left mr-auto max-w-[80%]'}`}>
                {m.text}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputInstruction}
            onChange={(e) => setInputInstruction(e.target.value)}
            placeholder="Instruksi AI..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          />
          <button onClick={handleSendMessage} className="px-4 py-2 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Kirim</button>
        </div>
      </div>

      <div className="w-full md:w-7/12 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 flex flex-col">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
          <span className="text-xs font-bold text-[#D4AF37]">Modul Ajar Preview</span>
          <button onClick={handleOpenExportModal} className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold text-xs cursor-pointer">
            🖨️ Cetak / Export Dokumen
          </button>
        </div>

        <div className="bg-white text-slate-900 p-6 rounded-xl font-mono text-xs flex-1 overflow-y-auto whitespace-pre-wrap">
          {docContent}
        </div>
      </div>

      {isPaywallOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-[#D4AF37] max-w-md w-full p-6 rounded-3xl space-y-4 text-center">
            <h3 className="text-lg font-bold text-white">🔒 Fitur Premium Terkunci</h3>
            <p className="text-xs text-amber-300">{paywallReason}</p>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-2 text-xs">
              <div className="font-bold text-[#D4AF37]">Paket Bulanan - Rp29.000 / bulan</div>
              <p className="text-slate-400">Akses Tanpa Batas: Unlimited Export Word/PDF, Unlimited Generate.</p>
            </div>
            <button onClick={() => setIsPaywallOpen(false)} className="w-full py-2 bg-[#D4AF37] text-slate-950 font-bold rounded-xl text-xs cursor-pointer">
              Tutup & Hubungi Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 'usr_premium_01',
    name: 'Budi Santoso, M.Pd.',
    email: 'budi.santoso@guru.sma.sch.id',
    role: 'guru',
    is_premium: true,
    kredit_tersisa: 250,
    doc_generated_count: 14,
    school: 'SMA Negeri 1 Jakarta'
  });

  const [currentView, setCurrentView] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSuccess = (userPayload) => {
    setCurrentUser(userPayload);
    setCurrentView(userPayload.role === 'admin' ? 'admin' : 'dashboard');
    showToast(`Selamat datang kembali, ${userPayload.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    showToast('Anda telah keluar dari akun.');
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#070F1E] text-slate-100 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-slate-950">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* TOP HEADER NAVIGATION BAR WITH LOGOUT BUTTON */}
      <header className="h-16 bg-[#0B1728]/95 border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity text-left cursor-pointer"
          >
            <div className="p-2 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-xl shadow-md shadow-amber-500/10">
              <Icons.Cpu className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wider block">TRISULAPROMPT</span>
            </div>
          </button>
          
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-slate-800/90 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold rounded-full uppercase tracking-wider">
            DEEP LEARNING ENGINE v3.0
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'dashboard' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icons.Home /> Dashboard
          </button>
          <button
            onClick={() => setCurrentView('workspace')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'workspace' 
                ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icons.Sparkles /> AI Workspace
          </button>
          {(currentUser.role === 'admin' || currentUser.email.includes('admin')) && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'admin' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icons.Shield /> Admin Panel
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('workspace')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
          >
            <Icons.Plus />
            <span>+ Buat Perangkat Baru</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-[#D4AF37] text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-md">
              {currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : 'GH'}
            </div>
            <div className="hidden md:block text-left text-xs leading-tight">
              <div className="font-bold text-white flex items-center gap-1">
                {currentUser.name}
                {currentUser.is_premium && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded font-bold">
                    PRO
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                {currentUser.school || 'Guru Penggerak'}
              </div>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="p-2 md:px-3 md:py-2 bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Keluar / Logout dari Akun"
          >
            <Icons.LogOut />
            <span className="hidden md:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* MAIN BODY AREA */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === 'dashboard' && (
          <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full">
            <div className="bg-gradient-to-r from-[#112238] via-[#0F1E33] to-[#0A1628] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-3 max-w-2xl relative z-10">
                <span className="inline-block px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                  SaaS Engine Kurikulum Merdeka v3.0
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Selamat Datang, Bapak/Ibu Guru Hebat! 🚀
                </h1>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Rancang Modul Ajar, TP, ATP, KKTP, Prota, dan Prosem terintegrasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara otomatis dan presisi.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentView('workspace')}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    ✨ Mulai Wizard Deep Learning
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400">Total Perangkat Ajar</div>
                <div className="text-xl font-bold text-white mt-1">2</div>
              </div>
              <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400">Status Lisensi</div>
                <div className="text-xl font-bold text-[#D4AF37] mt-1">{currentUser.is_premium ? 'PRO / Premium' : 'Free / Gratis'}</div>
              </div>
              <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400">Sisa Kredit</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{currentUser.kredit_tersisa} Dokumen</div>
              </div>
              <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                <div className="text-[11px] text-slate-400">Waktu Dihemat</div>
                <div className="text-xl font-bold text-amber-400 mt-1">18.5 Jam</div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'workspace' && (
          <div className="flex-1 p-2 w-full h-[calc(100vh-4rem)]">
            <AIWorkspace 
              onBackToDashboard={() => setCurrentView('dashboard')} 
              userStatus={currentUser}
            />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="flex-1 w-full">
            <AdminDashboard usersData={[currentUser]} />
          </div>
        )}
      </div>
    </div>
  );
}
