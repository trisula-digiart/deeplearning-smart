import React, { useState } from 'react';

export default function AdminDashboard({ usersData, onUpdateUserStatus, onAddCredits, transactionsHistory }) {
  // Local state untuk filter & search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, PREMIUM, FREE
  const [selectedUserForCredits, setSelectedUserForCredits] = useState(null);
  const [creditAmount, setCreditAmount] = useState(10);
  const [notification, setNotification] = useState(null);

  // Helper Toast Notification
  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Mock User Data bawaan jika props kosong (Realistic Data Mocking)
  const defaultUsers = [
    { id: 'usr_001', name: 'Budi Santoso', email: 'budi.santoso@guru.sma.sch.id', is_premium: true, kredit_tersisa: 45, doc_generated_count: 12, register_date: '2026-06-15' },
    { id: 'usr_002', name: 'Siti Rahmawati', email: 'siti.rahma@sd.kemdikbud.go.id', is_premium: false, kredit_tersisa: 1, doc_generated_count: 1, register_date: '2026-07-01' },
    { id: 'usr_003', name: 'Ahmad Dahlan', email: 'ahmad.dahlan@yayasan.ac.id', is_premium: false, kredit_tersisa: 0, doc_generated_count: 3, register_date: '2026-07-10' },
    { id: 'usr_004', name: 'Dewi Lestari', email: 'dewi.lestari@smpn1.sch.id', is_premium: true, kredit_tersisa: 120, doc_generated_count: 28, register_date: '2026-05-20' },
  ];

  const activeUsers = usersData && usersData.length > 0 ? usersData : defaultUsers;

  // Filter Users
  const filteredUsers = activeUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' ? true : 
                          statusFilter === 'PREMIUM' ? user.is_premium : 
                          !user.is_premium;
    return matchesSearch && matchesStatus;
  });

  // Handler Toggle Status Premium
  const handleTogglePremium = (user) => {
    const newStatus = !user.is_premium;
    if (onUpdateUserStatus) {
      onUpdateUserStatus(user.id, newStatus);
    }
    showToast(`Status lisensi ${user.name} berhasil diubah menjadi ${newStatus ? 'PREMIUM' : 'GRATIS'}.`);
  };

  // Handler Submit Tambah Kredit
  const handleCreditSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserForCredits) return;
    
    const added = parseInt(creditAmount, 10);
    if (isNaN(added) || added <= 0) {
      showToast('Masukkan jumlah kredit yang valid!', 'error');
      return;
    }

    if (onAddCredits) {
      onAddCredits(selectedUserForCredits.id, added);
    }
    
    showToast(`Berhasil menambahkan ${added} kredit dokumen untuk ${selectedUserForCredits.name}.`);
    setSelectedUserForCredits(null);
    setCreditAmount(10);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 p-4 md:p-8 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl border text-sm font-semibold transition-all duration-300 ${
          notification.type === 'error' 
            ? 'bg-rose-950/90 border-rose-500/50 text-rose-200' 
            : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header Container */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Admin Control Panel
              </span>
              <span className="text-xs text-slate-400">Trisula Engine v8.7</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
              Dashboard Aktivasi & Manajemen Lisensi
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Kelola status akun pengguna, alokasi kredit dokumen, serta verifikasi aktivasi manual B2B.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-center min-w-[100px]">
              <span className="text-xs text-slate-400 block">Total User</span>
              <span className="text-lg font-bold text-white">{activeUsers.length}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-center min-w-[100px]">
              <span className="text-xs text-slate-400 block">Premium</span>
              <span className="text-lg font-bold text-[#D4AF37]">
                {activeUsers.filter(u => u.is_premium).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Filter and Search Bar */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari nama atau email user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-medium">Filter Status:</span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-[#D4AF37] text-slate-950'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('PREMIUM')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'PREMIUM'
                  ? 'bg-[#D4AF37] text-slate-950'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Premium
            </button>
            <button
              onClick={() => setStatusFilter('FREE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'FREE'
                  ? 'bg-[#D4AF37] text-slate-950'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Gratis
            </button>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
              Daftar Pengguna Terdaftar
            </h2>
            <span className="text-xs text-slate-400">Menampilkan {filteredUsers.length} pengguna</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Pengguna</th>
                  <th className="px-6 py-4">Status Lisensi</th>
                  <th className="px-6 py-4">Sisa Kredit</th>
                  <th className="px-6 py-4">Total Dokumen</th>
                  <th className="px-6 py-4">Tanggal Daftar</th>
                  <th className="px-6 py-4 text-center">Aksi / Kontrol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      Tidak ada pengguna yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.email}</div>
                      </td>

                      <td className="px-6 py-4">
                        {user.is_premium ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            PREMIUM
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                            GRATIS
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 font-mono font-semibold text-white">
                        {user.kredit_tersisa} <span className="text-xs font-normal text-slate-400">dokumen</span>
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-300">
                        {user.doc_generated_count || 0}
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-400">
                        {user.register_date || '2026-07-01'}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          {/* Toggle Premium Button */}
                          <button
                            onClick={() => handleTogglePremium(user)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                              user.is_premium
                                ? 'bg-rose-950/40 text-rose-400 border-rose-800/60 hover:bg-rose-900/60'
                                : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/60'
                            }`}
                          >
                            {user.is_premium ? 'Nonavtifkan Premium' : 'Aktifkan Premium'}
                          </button>

                          {/* Top-up Credit Button */}
                          <button
                            onClick={() => setSelectedUserForCredits(user)}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-[#D4AF37] hover:text-slate-950 hover:border-[#D4AF37] transition-all"
                          >
                            + Tambah Kredit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Logs / Invoice History */}
        {transactionsHistory && transactionsHistory.length > 0 && (
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Riwayat Pembayaran & Konfirmasi Masuk
            </h3>
            <div className="space-y-3">
              {transactionsHistory.map((tx, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{tx.user_name}</span> ({tx.email})
                    <span className="text-slate-400 block mt-0.5">Paket: <strong className="text-amber-400">{tx.paket}</strong> • Ref: {tx.ref_id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">{tx.amount}</span>
                    <span className="text-slate-500 text-[10px]">{tx.date || 'Baru Saja'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Kredit */}
      {selectedUserForCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0B192C] border border-[#D4AF37]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">Tambah Kredit Dokumen</h3>
            <p className="text-xs text-slate-400 mb-4">
              Pemberian kredit manual untuk <span className="text-[#D4AF37] font-semibold">{selectedUserForCredits.name}</span>.
            </p>

            <form onSubmit={handleCreditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Jumlah Kredit Yang Ditambahkan
                </label>
                <input
                  type="number"
                  min="1"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForCredits(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] text-slate-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10"
                >
                  Simpan Kredit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
