import React, { useState } from 'react';

// Custom SVG Icons for Zero-Crash Reliability and Styling Consistency
const Icons = {
Cpu: ({ className = "w-6 h-6 text-[#D4AF37]" }) => (



),
Mail: ({ className = "w-4 h-4 text-slate-400" }) => (



),
Lock: ({ className = "w-4 h-4 text-slate-400" }) => (



),
Eye: ({ className = "w-4 h-4 text-slate-400" }) => (




),
EyeOff: ({ className = "w-4 h-4 text-slate-400" }) => (



),
User: ({ className = "w-4 h-4 text-slate-400" }) => (



),
Building: ({ className = "w-4 h-4 text-slate-400" }) => (



),
ArrowRight: ({ className = "w-4 h-4" }) => (



),
CheckCircle: ({ className = "w-4 h-4 text-emerald-400" }) => (



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

// Pilihan Paket Berlangganan Saat Registrasi Baru
const [selectedPackage, setSelectedPackage] = useState('free'); // 'free' | 'pro_monthly' | 'single_modul'

const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(true);

// Status & Feedback States
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

// Handler Submisi Form
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

setTimeout(() => {
  setIsLoading(false);

  let isPrem = false;
  let kredit = 1;
  let packageName = 'Gratis (1 Token)';

  if (authMode === 'register') {
    if (selectedPackage === 'pro_monthly') {
      isPrem = true;
      kredit = 250;
      packageName = 'Paket Bulanan PRO (Rp29.000)';
    } else if (selectedPackage === 'single_modul') {
      isPrem = false;
      kredit = 1;
      packageName = 'Paket 1 Modul Ajar (Rp10.000)';
    } else {
      isPrem = false;
      kredit = 1;
      packageName = 'Gratis (1 Token)';
    }
  } else {
    isPrem = selectedRole === 'admin' || email.includes('admin') || email.includes('premium') || email.includes('budi');
    kredit = isPrem ? 250 : 1;
    packageName = isPrem ? 'PRO Unlimited' : 'Gratis';
  }

  const userPayload = {
    id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
    name: fullName || (email.includes('admin') ? 'Administrator Trisula' : email.split('@')[0]),
    email: email,
    role: selectedRole,
    is_premium: isPrem,
    kredit_tersisa: kredit,
    doc_generated_count: 0,
    school: schoolName || 'SMA Negeri 1 Jakarta',
    status_langganan: packageName
  };

  if (onLoginSuccess) {
    onLoginSuccess(userPayload);
  } else {
    setSuccessMessage('Berhasil! Mengalihkan ke Dashboard...');
  }
}, 1000);


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
    school: 'SMA Negeri 1 Jakarta',
    status_langganan: 'Paket Bulanan PRO (Rp29.000)'
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
    school: 'SD Negeri 05 Kebayoran',
    status_langganan: 'Gratis (1 Token)'
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
    school: 'HQ Trisula Engine',
    status_langganan: 'Lisensi Sekolah / B2B'
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

{/* Background Glow Decorations */}



  <div className="w-full max-w-md bg-[#132338]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6 max-h-[95vh] overflow-y-auto">
    
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

          {/* FITUR OPSIONAL: PILIHAN PAKET BERLANGGANAN SAAT REGISTRASI */}
          <div>
            <label className="block text-xs font-bold text-[#D4AF37] mb-1.5 flex items-center gap-1">
              <span>⭐</span> Pilih Opsi Berlangganan / Akun
            </label>
            <div className="space-y-2 text-xs">
              <label
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPackage === 'free'
                    ? 'bg-amber-500/10 border-[#D4AF37] text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="subscription_pack_comp"
                    value="free"
                    checked={selectedPackage === 'free'}
                    onChange={() => setSelectedPackage('free')}
                    className="accent-[#D4AF37] cursor-pointer"
                  />
                  <div>
                    <div className="font-bold text-white">Akun Uji Coba (Gratis)</div>
                    <div className="text-[10px] text-slate-400">1 Token Kuota Modul Ajar</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-400">Rp0</span>
              </label>

              <label
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPackage === 'pro_monthly'
                    ? 'bg-amber-500/10 border-[#D4AF37] text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="subscription_pack_comp"
                    value="pro_monthly"
                    checked={selectedPackage === 'pro_monthly'}
                    onChange={() => setSelectedPackage('pro_monthly')}
                    className="accent-[#D4AF37] cursor-pointer"
                  />
                  <div>
                    <div className="font-bold text-amber-300 flex items-center gap-1">
                      Paket Bulanan PRO <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">REKOMENDASI</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Unlimited 30 Hari + Semua Fitur</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#D4AF37]">Rp29.000</span>
              </label>

              <label
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedPackage === 'single_modul'
                    ? 'bg-amber-500/10 border-[#D4AF37] text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="subscription_pack_comp"
                    value="single_modul"
                    checked={selectedPackage === 'single_modul'}
                    onChange={() => setSelectedPackage('single_modul')}
                    className="accent-[#D4AF37] cursor-pointer"
                  />
                  <div>
                    <div className="font-bold text-white">Paket 1 Modul Ajar</div>
                    <div className="text-[10px] text-slate-400">Eceran 1 Kuota Tanpa Hangus</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-indigo-300">Rp10.000</span>
              </label>
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

      {authMode === 'login' && (
        <div className="flex items-center justify-between text-xs text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0 cursor-pointer"
            />
            Ingat Saya
          </label>
          <button
            type="button"
            onClick={() => setAuthMode('forgot')}
            className="hover:text-[#D4AF37] transition-colors cursor-pointer"
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
            className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
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
            className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
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
