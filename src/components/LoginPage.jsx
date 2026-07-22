import React, { useState } from 'react';

// ============================================================================
// COMPONENT: LOGIN PAGE (AUTH & INSTANT DEMO INJECTOR)
// ============================================================================

export default function LoginPage({ onLoginSuccess, onSyncUser }) {
const [activeTab, setActiveTab] = useState('guru'); // 'guru' | 'siswa' | 'admin'
const [isRegister, setIsRegister] = useState(false);
const [formData, setFormData] = useState({
nama: '',
email: '',
sekolah: '',
password: ''
});

const handleDemoLogin = (type) => {
let demoUser;
if (type === 'FREE') {
demoUser = {
id: "usr_free_01",
nama: "Siti Rahmawati, S.Pd.",
name: "Siti Rahmawati, S.Pd.",
email: "siti.rahmawati@guru.sd.id",
role: "guru",
sekolah: "SDN 01 Merdeka",
kredit_tersisa: 1,
is_premium: false,
status_langganan: "FREE",
tanggal_daftar: "2026-01-10"
};
} else if (type === 'PRO') {
demoUser = {
id: "usr_pro_02",
nama: "Budi Santoso, M.Pd.",
name: "Budi Santoso, M.Pd.",
email: "budi.santoso@sma.sch.id",
role: "guru",
sekolah: "SMAN 3 Jakarta",
kredit_tersisa: 999,
is_premium: true,
status_langganan: "PRO_UNLIMITED",
tanggal_daftar: "2025-11-20"
};
} else {
demoUser = {
id: "usr_admin",
nama: "Administrator Trisula",
name: "Administrator Trisula",
email: "admin@trisula.edu",
role: "admin",
sekolah: "Dinas Pendidikan Central",
kredit_tersisa: 9999,
is_premium: true,
status_langganan: "SUPER_ADMIN",
tanggal_daftar: "2025-01-01"
};
}

if (onSyncUser) onSyncUser(demoUser, 'DEMO_LOGIN');
onLoginSuccess(demoUser);


};

const handleSubmit = (e) => {
e.preventDefault();
if (!formData.email || !formData.nama) {
alert("Mohon isi nama lengkap dan email dengan lengkap!");
return;
}

const newUser = {
  id: "usr_" + Date.now(),
  nama: formData.nama,
  name: formData.nama,
  email: formData.email,
  role: activeTab,
  sekolah: formData.sekolah || "Sekolah Umum",
  kredit_tersisa: 1, // User registrasi baru dapat 1 token gratis
  is_premium: false,
  status_langganan: "FREE",
  tanggal_daftar: new Date().toISOString().split('T')[0]
};

if (onSyncUser) onSyncUser(newUser, isRegister ? 'REGISTER' : 'LOGIN');
onLoginSuccess(newUser);


};

return (


  {/* GLOW DECORATIONS */}
  <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
    
    {/* LOGO HEADER */}
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 mb-3 shadow-xl shadow-amber-500/20 border border-amber-300/40">
        <svg className="w-9 h-9 text-[#0B192C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-2xl font-black text-amber-200 tracking-tight">TRISULA AI SYSTEM</h2>
      <p className="text-xs text-slate-400 mt-1">Platform Perangkat Ajar Otomatis Kurikulum Merdeka</p>
    </div>

    {/* ROLE TABS */}
    <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-amber-500/10">
      <button
        type="button"
        onClick={() => setActiveTab('guru')}
        className={`py-2 text-xs font-bold rounded-lg transition-all ${
          activeTab === 'guru' ? 'bg-amber-500 text-[#0B192C] shadow-md' : 'text-slate-400 hover:text-amber-300'
        }`}
      >
        Pengajar
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('siswa')}
        className={`py-2 text-xs font-bold rounded-lg transition-all ${
          activeTab === 'siswa' ? 'bg-amber-500 text-[#0B192C] shadow-md' : 'text-slate-400 hover:text-amber-300'
        }`}
      >
        Siswa
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('admin')}
        className={`py-2 text-xs font-bold rounded-lg transition-all ${
          activeTab === 'admin' ? 'bg-amber-500 text-[#0B192C] shadow-md' : 'text-slate-400 hover:text-amber-300'
        }`}
      >
        Admin
      </button>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-amber-300/90 mb-1">Nama Lengkap & Gelar</label>
        <input
          type="text"
          required
          placeholder="Contoh: Siti Rahmawati, S.Pd."
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          className="w-full bg-slate-950/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-amber-300/90 mb-1">Alamat Email Aktivasi</label>
        <input
          type="email"
          required
          placeholder="nama@sekolah.sch.id"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-slate-950/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-amber-300/90 mb-1">Nama Instansi / Sekolah</label>
        <input
          type="text"
          placeholder="Contoh: SDN 01 Merdeka"
          value={formData.sekolah}
          onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
          className="w-full bg-slate-950/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-[#0B192C] py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
      >
        {isRegister ? "Daftar & Klaim 1 Token Gratis" : "Masuk Sistem Workspace"}
      </button>
    </form>

    <div className="text-center">
      <button
        type="button"
        onClick={() => setIsRegister(!isRegister)}
        className="text-xs text-amber-400/80 hover:text-amber-300 underline font-medium cursor-pointer"
      >
        {isRegister ? "Sudah punya akun? Masuk sekarang" : "Belum punya akun? Registrasi Akun Baru"}
      </button>
    </div>

    {/* QUICK DEMO LOGIN BUTTONS */}
    <div className="pt-4 border-t border-amber-500/20">
      <p className="text-[10px] text-center uppercase tracking-widest text-slate-400 font-mono mb-3">
        -- AKUN DEMO SIAP PAKAI (INSTANT) --
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleDemoLogin('FREE')}
          className="bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 p-2.5 rounded-xl text-left transition-all cursor-pointer"
        >
          <div className="font-bold text-xs">Siti Rahmawati</div>
          <div className="text-[10px] opacity-75">Guru Gratis (1 Token)</div>
        </button>
        <button
          type="button"
          onClick={() => handleDemoLogin('PRO')}
          className="bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 p-2.5 rounded-xl text-left transition-all cursor-pointer"
        >
          <div className="font-bold text-xs">Budi Santoso</div>
          <div className="text-[10px] opacity-75">Guru PRO Unlimited</div>
        </button>
      </div>
    </div>

  </div>
</div>


);
}
