import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import AIWorkspace from './components/AIWorkspace';
import AdminDashboard from './components/AdminDashboard';
import PaywallModal from './components/PaywallModal';
import { syncUserToGoogleSheets } from './services/googleSheetsService';

const Icons = {
  Cpu: ({ className = "w-5 h-5 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Home: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Folder: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Bolt: ({ className = "w-4 h-4 text-amber-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4 text-rose-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
};

function WizardModal({ isOpen, onClose, onCreateDocument }) {
  const [subject, setSubject] = useState('IPA & Biologi');
  const [phase, setPhase] = useState('Fase E (Kelas 10 SMA)');
  const [topic, setTopic] = useState('Ekosistem & Keanekaragaman Hayati');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `doc_${Date.now()}`,
      title: `Modul Ajar ${subject} - ${topic}`,
      subject,
      phase,
      topic,
      status: 'In Progress',
      content: `# MODUL AJAR DEEP LEARNING: ${subject.toUpperCase()}\n\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: ${subject}\n- **Fase**: ${phase}\n- **Topik Utama**: ${topic}\n\n---\n## II. CAPAIAN PEMBELAJARAN (CP)\nPeserta didik mampu menganalisis interaksi komponen ekosistem serta menyusun solusi solutif.\n\n---\n## III. TUJUAN PEMBELAJARAN (TP)\n- **TP1**: Menganalisis konsep dasar ${topic}.\n- **TP2**: Menyusun model analisis terstruktur.`
    };
    onCreateDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-[#D4AF37]">✨ Wizard Generator Perangkat Ajar</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mata Pelajaran</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Fase / Kelas</label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Fase A (Kelas 1-2 SD)">Fase A (Kelas 1-2 SD)</option>
              <option value="Fase B (Kelas 3-4 SD)">Fase B (Kelas 3-4 SD)</option>
              <option value="Fase C (Kelas 5-6 SD)">Fase C (Kelas 5-6 SD)</option>
              <option value="Fase D (Kelas 7-9 SMP)">Fase D (Kelas 7-9 SMP)</option>
              <option value="Fase E (Kelas 10 SMA)">Fase E (Kelas 10 SMA)</option>
              <option value="Fase F (Kelas 11-12 SMA)">Fase F (Kelas 11-12 SMA)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topik / Materi Utama</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer">Batal</button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 cursor-pointer">✨ Buat Dokumen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MyFilesView({ documents, onOpenDocument, onDeleteDocument, onOpenWizard }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = (documents || []).filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-full uppercase">
            Pengelola Berkas & Perangkat Ajar
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Berkas Saya ({documents.length})</h1>
        </div>
        <button onClick={onOpenWizard} className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer">
          <Icons.Plus /><span>+ Buat Perangkat Baru</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <input
          type="text"
          placeholder="Cari perangkat ajar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full sm:w-80"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-[#0D1C2E] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{doc.subject}</span>
              <h3 className="text-sm font-bold text-white line-clamp-2">{doc.title}</h3>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <button onClick={() => onDeleteDocument(doc.id)} className="text-rose-400 hover:text-rose-300 cursor-pointer"><Icons.Trash /></button>
              <button onClick={() => onOpenDocument(doc)} className="text-[#D4AF37] font-bold hover:underline cursor-pointer">Buka Workspace →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  // 1. SAFE SESSION INITIALIZATION (Null default if no localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('trisula_user_session');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Error reading localStorage session:', e);
      return null;
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [allUsers, setAllUsers] = useState([
    { id: 'usr_admin_master', name: 'Root Admin Trisula', email: 'admin@trisula.ai', role: 'admin', is_premium: true, kredit_tersisa: 999999, doc_generated_count: 0, school: 'HQ Trisula Engine' },
    { id: 'usr_eike2000', name: 'Eike2000, S.Pd.', email: 'eike2000@sekolah.sch.id', role: 'guru', is_premium: false, kredit_tersisa: 5, doc_generated_count: 0, school: 'SMA Negeri 1 Jakarta' }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 'doc_01',
      title: 'Modul Ajar IPA & Biologi - Ekosistem & Keanekaragaman Hayati',
      subject: 'IPA & Biologi',
      phase: 'Fase E (Kelas 10 SMA)',
      topic: 'Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan',
      status: 'In Progress',
      content: `# MODUL AJAR DEEP LEARNING: IPA & BIOLOGI FASE E (KELAS 10 SMA)

## I. INFORMASI UMUM
- **Mata Pelajaran**: IPA & Biologi
- **Fase / Kelas**: Fase E (Kelas 10 SMA)
- **Topik Utama**: Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan
- **Alokasi Waktu**: 2 JP x 45 Menit

---

## II. CAPAIAN PEMBELAJARAN (CP)
### 📘 Analisis Capaian Pembelajaran Elemen (IPA & BIOLOGI)
Peserta didik mampu menganalisis interaksi antar komponen ekosistem, memahami pentingnya keanekaragaman hayati lokal, serta merancang solusi kreatif atas perubahan lingkungan secara kritis dan kolaboratif.

---

## III. TUJUAN PEMBELAJARAN (TP)
### 🎯 Poin Tujuan Pembelajaran ABCD (IPA & BIOLOGI)
- **TP1**: Menganalisis struktur rantai makanan dan piramida energi ekosistem.
- **TP2**: Menyusun grafik fluktuasi populasi spesies lokal berdasarkan data sampel dilapangan.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP (IPA & BIOLOGI)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 2 JP | Mampu menganalisis interaksi trophic level | Formatif Latihan Soal |
| **ATP.10.2** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |`
    }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeDocument, setActiveDocument] = useState(documents[0]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCurrentUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('trisula_user_session', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to save session to localStorage:', e);
    }
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleLoginSuccess = (userPayload) => {
    handleUpdateCurrentUser(userPayload);
    setAllUsers(prev => {
      if (!prev.some(u => u.email === userPayload.email)) {
        return [userPayload, ...prev];
      }
      return prev;
    });
    setCurrentView(userPayload.role === 'admin' ? 'admin' : 'dashboard');
    showToast(`Selamat datang kembali, ${userPayload.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('trisula_user_session');
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
    setCurrentView('dashboard');
    showToast('Anda telah keluar dari akun.');
  };

  const handleUpdateUserStatus = (userId, newStatus) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, is_premium: newStatus } : u));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, is_premium: newStatus };
      handleUpdateCurrentUser(updated);
      syncUserToGoogleSheets(updated, 'UPDATE_STATUS');
    }
  };

  const handleAddCredits = (userId, amount) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, kredit_tersisa: (u.kredit_tersisa || 0) + amount } : u));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, kredit_tersisa: (currentUser.kredit_tersisa || 0) + amount };
      handleUpdateCurrentUser(updated);
      syncUserToGoogleSheets(updated, 'ADD_CREDITS');
    }
  };

  const canPerformAction = Boolean(currentUser?.is_premium || (currentUser?.kredit_tersisa && currentUser.kredit_tersisa > 0));

  const handleTriggerPaywall = (reason) => {
    setPaywallReason(reason || 'Kuota token Anda telah habis. Silakan top up token atau tingkatkan paket lisensi Anda di bawah ini!');
    setIsPaywallOpen(true);
  };

  const handleOpenWizard = () => {
    if (!canPerformAction) {
      handleTriggerPaywall('Pembuatan perangkat ajar baru memerlukan token aktif atau akun Premium.');
      return;
    }
    setIsWizardOpen(true);
  };

  const handleCreateDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocument(newDoc);
    setCurrentView('workspace');
    showToast(`Perangkat Ajar "${newDoc.title}" berhasil dibuat!`);
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#070F1E] text-slate-100 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-slate-950 overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* Global Navbar Header with Real-Time Token Indicator */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenWizard={handleOpenWizard}
        currentUser={currentUser}
        onLogout={handleLogout}
        onRequestPaywall={handleTriggerPaywall}
      />

      {/* Main Workspace Body & Responsive Sidebar */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Sidebar Nav */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0B1728] border-r border-slate-800 p-4 hidden md:flex flex-col justify-between transition-all duration-300 shrink-0`}>
          <div className="space-y-6">
            {isSidebarOpen && <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">NAVIGASI UTAMA</div>}
            <nav className="space-y-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'dashboard' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Home /> {isSidebarOpen && <span>Halaman Depan</span>}
              </button>

              <button
                onClick={() => setCurrentView('workspace')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'workspace' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Bolt /> {isSidebarOpen && <span>Ruang Bantu AI</span>}
              </button>

              <button
                onClick={() => setCurrentView('files')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'files' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icons.Folder /> {isSidebarOpen && <span>Berkas Saya</span>}
              </button>

              {(currentUser.role === 'admin' || currentUser.email.includes('admin')) && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${
                    currentView === 'admin' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icons.Shield /> {isSidebarOpen && <span>Panel Admin</span>}
                </button>
              )}
            </nav>
          </div>
        </aside>

        {/* View Switcher Main Container */}
        <main className="flex-1 overflow-y-auto w-full">
          {currentView === 'dashboard' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-[#112238] via-[#0F1E33] to-[#0A1628] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="space-y-3 max-w-2xl">
                  <span className="px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase">
                    SaaS Engine Kurikulum Merdeka v3.0
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Selamat Datang, {currentUser.name}! 🚀
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Rancang perangkat ajar terintegrasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara presisi.
                  </p>
                  <button
                    onClick={handleOpenWizard}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 cursor-pointer transition-all"
                  >
                    ✨ Mulai Wizard Baru
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Total Berkas Saya</div>
                  <div className="text-2xl font-bold text-white mt-1">{documents.length}</div>
                </div>
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Status Token Kuota</div>
                  <div className="text-2xl font-bold text-amber-300 mt-1 font-mono">
                    {currentUser.is_premium ? 'Unlimited Pro' : `${currentUser.kredit_tersisa ?? 0} Token`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'workspace' && (
            <div className="w-full h-[calc(100vh-4rem)] p-2 sm:p-4">
              <AIWorkspace
                activeDocument={activeDocument}
                onBackToDashboard={() => setCurrentView('dashboard')}
                currentUser={currentUser}
                onUpdateCurrentUser={handleUpdateCurrentUser}
                onRequestPaywall={handleTriggerPaywall}
              />
            </div>
          )}

          {currentView === 'files' && (
            <MyFilesView
              documents={documents}
              onOpenDocument={(doc) => { setActiveDocument(doc); setCurrentView('workspace'); }}
              onDeleteDocument={(id) => setDocuments(prev => prev.filter(d => d.id !== id))}
              onOpenWizard={handleOpenWizard}
            />
          )}

          {currentView === 'admin' && (
            <AdminDashboard
              usersData={allUsers}
              onUpdateUserStatus={handleUpdateUserStatus}
              onAddCredits={handleAddCredits}
              onAddUser={(usr) => setAllUsers(prev => [usr, ...prev])}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <WizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateDocument={handleCreateDocument}
      />

      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        userContext={currentUser}
        paywallReason={paywallReason}
      />
    </div>
  );
}
