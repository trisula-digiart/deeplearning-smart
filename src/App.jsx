import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import AIWorkspace from './components/AIWorkspace';

// ============================================================================
// TRISULA SMART LEARNING ENGINE v8.7 - ENTERPRISE CORE ENGINE & STATE HUB
// Stack: React / Tailwind CSS / Google Sheets Webhook
// Architecture: Single Source of Truth / Zero Feature Loss
// ============================================================================

export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJJp3CVGiAEkCQ-6zDTgS1Rz2Fz2vQYCvpn_hB-JkN13q9aWQOAFfAtpWH3cHnby6LEg/exec";

// Default Master Initial Documents
const INITIAL_DOCUMENTS = [
{
id: "doc_01",
title: "Modul Ajar IPA & Biologi - Ekosistem & Keanekaragaman Hayati",
subject: "IPA & Biologi",
phase: "Fase E (Kelas 10 SMA)",
topic: "Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan",
fase_pembelajaran: "Modul Ajar",
lastModified: "2026-07-22 14:30",
status: "In Progress",
content: `# MODUL AJAR DEEP LEARNING: IPA & BIOLOGI FASE E (KELAS 10 SMA)

I. INFORMASI UMUM

Mata Pelajaran: IPA & Biologi

Fase / Kelas: Fase E (Kelas 10 SMA)

Topik Utama: Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan

Alokasi Waktu: 2 JP x 45 Menit

II. CAPAIAN PEMBELAJARAN (CP)

📘 Analisis Capaian Pembelajaran Elemen (IPA & BIOLOGI)

Peserta didik mampu menganalisis interaksi antar komponen ekosistem, memahami pentingnya keanekaragaman hayati lokal, serta merancang solusi kreatif atas perubahan lingkungan secara kritis dan kolaboratif.

III. TUJUAN PEMBELAJARAN (TP)

🎯 Poin Tujuan Pembelajaran ABCD (IPA & BIOLOGI)

TP1: Menganalisis struktur rantai makanan dan piramida energi ekosistem menggunakan formula matematis $P(t) = P_0 e^{rt}$.

TP2: Menyusun grafik fluktuasi populasi spesies lokal berdasarkan data sampel di lapangan.

TP3: Mempresentasikan hasil analisis proyek pelestarian lingkungan secara kolaboratif.

$$E = m \cdot c^2 \quad \text{(Simulasi Energi Biomasa Ekosistem)}$$

IV. ALUR TUJUAN PEMBELAJARAN (ATP)

🗺️ Pemetaan Runtutan ATP (IPA & BIOLOGI)

Kode ATP

Alokasi Waktu

Indikator Ketercapaian

Rencana Asesmen

ATP.10.1

2 JP

Mampu menganalisis interaksi trophic level

Formatif Latihan Soal

ATP.10.2

2 JP

Mampu menyusun laporan proyek pelestarian

Unjuk Kerja Kelompok

V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)

📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (IPA & BIOLOGI)

Kriteria Penilaian

Belum Memenuhi (1)

Memenuhi (2-3)

Sangat Baik (4)

Penerapan Konsep

Salah mengidentifikasi rantai makanan

Tepat mengidentifikasi 80% komponen

Tepat 100% & menganalisis dampak

VI. PROGRAM TAHUNAN (PROTA)

No

Bab / Elemen Materi Utama

Alokasi Waktu (JP)

Keterangan Semester

1

Keanekaragaman Hayati & Ekosistem

18 JP

Semester 1

2

Perubahan Lingkungan & Pemanasan Global

18 JP

Semester 2

VII. PROGRAM SEMESTER (PROSEM)

No

Materi / Tujuan Pembelajaran

JP

Juli

Ags

Sep

Okt

Nov

Des

1

Analisis Interaksi Ekosistem

6 JP

x

x









2

Pemetaan Keanekaragaman Hayati

6 JP





x

x





}

















];

















// Background Webhook Sync to Google Sheets
export const syncUserToGoogleSheets = async (userData, actionType = 'SYNC_USER') => {
console.log('[TRISULA SHEET WEBHOOK] Sync Payload (' + actionType + '):', userData);
if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
try {
const payload = {
action: actionType,
timestamp: new Date().toISOString(),
user: userData
};
if (navigator.onLine) {
await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
method: 'POST',
mode: 'no-cors',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});
}
} catch (err) {
console.warn("Google Sheet Webhook Sync Warning:", err);
}
};

export default function App() {
// --- LIFTED STATE MANAGEMENT (SINGLE SOURCE OF TRUTH) ---
const [currentUser, setCurrentUser] = useState(() => {
try {
const saved = localStorage.getItem('trisula_user_session');
return saved ? JSON.parse(saved) : null;
} catch (e) {
return null;
}
});

const [documents, setDocuments] = useState(() => {
try {
const saved = localStorage.getItem('trisula_docs_data');
return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
} catch (e) {
return INITIAL_DOCUMENTS;
}
});

const [activeDocument, setActiveDocument] = useState(() => documents[0] || null);
const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'workspace' | 'files' | 'admin'
const [isPaywallOpen, setIsPaywallOpen] = useState(false);
const [paywallReason, setPaywallReason] = useState('');
const [isWizardOpen, setIsWizardOpen] = useState(false);
const [toastMessage, setToastMessage] = useState(null);

// Persistence Effects
useEffect(() => {
if (currentUser) {
localStorage.setItem('trisula_user_session', JSON.stringify(currentUser));
} else {
localStorage.removeItem('trisula_user_session');
}
}, [currentUser]);

useEffect(() => {
localStorage.setItem('trisula_docs_data', JSON.stringify(documents));
}, [documents]);

const showToast = (msg) => {
setToastMessage(msg);
setTimeout(() => setToastMessage(null), 3200);
};

// --- HANDLERS & CALLBACKS ---
const handleLoginSuccess = useCallback((userPayload) => {
setCurrentUser(userPayload);
setCurrentView(userPayload.role === 'admin' ? 'admin' : 'dashboard');
showToast('Selamat datang kembali, ' + (userPayload.nama || userPayload.name || 'Pengajar') + '!');
}, []);

const handleLogout = useCallback(() => {
setCurrentUser(null);
localStorage.removeItem('trisula_user_session');
setCurrentView('dashboard');
showToast('Sesi telah diakhiri.');
}, []);

const handleTriggerPaywall = useCallback((reason) => {
setPaywallReason(reason || 'Kuota token gratis Anda telah habis. Silakan tingkatkan ke Paket PRO Unlimited atau Top-Up Token!');
setIsPaywallOpen(true);
}, []);

const handleOpenWizard = useCallback(() => {
if (!currentUser?.is_premium && (currentUser?.kredit_tersisa || 0) <= 0) {
handleTriggerPaywall('Pembuatan perangkat ajar memerlukan kuota token aktif atau akun PRO.');
return;
}
setIsWizardOpen(true);
}, [currentUser, handleTriggerPaywall]);

// Token Deduction Core Engine (-1 Token)
const deductQuotaOnAction = useCallback((actionName) => {
if (!currentUser) return;
if (currentUser.is_premium) {
console.log('[TRISULA TOKEN] Action ' + actionName + ' bypassed for PRO Member.');
return;
}

if ((currentUser.kredit_tersisa || 0) <= 0) {
  handleTriggerPaywall('Aksi ' + actionName + ' memerlukan kuota token.');
  return;
}

const updatedUser = {
  ...currentUser,
  kredit_tersisa: Math.max(0, (currentUser.kredit_tersisa || 0) - 1)
};

setCurrentUser(updatedUser);
syncUserToGoogleSheets(updatedUser, 'DEDUCT_TOKEN_' + actionName);
showToast('-1 Token Kuota digunakan untuk ' + actionName);


}, [currentUser, handleTriggerPaywall]);

const handleSaveDocument = useCallback((updatedDoc) => {
setDocuments(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
setActiveDocument(updatedDoc);
showToast('Perubahan berkas disimpan!');
}, []);

const handleDeleteDocument = useCallback((docId) => {
if (window.confirm("Yakin ingin menghapus berkas ini?")) {
setDocuments(prev => prev.filter(d => d.id !== docId));
if (activeDocument?.id === docId) {
setActiveDocument(documents[0] || null);
}
showToast('Berkas dihapus.');
}
}, [activeDocument, documents]);

// Auth Gate
if (!currentUser) {
return ;
}

return (


  {/* GLOBAL TOAST NOTIFICATION */}
  {toastMessage && (
    <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
      <span>✨</span> {toastMessage}
    </div>
  )}

  {/* NAVBAR HEADER */}
  <Navbar
    currentUser={currentUser}
    onOpenWizard={handleOpenWizard}
    onTriggerPaywall={handleTriggerPaywall}
    onLogout={handleLogout}
    onViewChange={setCurrentView}
    currentView={currentView}
  />

  {/* MAIN VIEW ROUTER */}
  <main className="flex-1 pb-12">
    {currentView === 'dashboard' && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest">
              Selamat Datang Kembali
            </span>
            <h1 className="text-3xl font-black text-amber-200">
              Halo, {currentUser.nama || currentUser.name}!
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Platform TRISULA AI v8.7 siap membantu Anda merancang Modul Ajar, CP, TP, ATP, KKTP, Prota, dan Prosem Kurikulum Merdeka secara otomatis dan presisi.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={handleOpenWizard}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-[#0B192C] font-black px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                + Buat Perangkat Ajar
              </button>
              <button
                onClick={() => setCurrentView('workspace')}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-5 py-2.5 rounded-xl text-xs border border-amber-500/30 cursor-pointer"
              >
                Buka AI Workspace
              </button>
            </div>
          </div>
        </div>

        {/* DASHBOARD CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-amber-200">Draf Berkas Terakhir</h2>
            {documents.slice(0, 3).map(doc => (
              <div key={doc.id} className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl flex items-center justify-between hover:border-amber-500/40 transition-all">
                <div>
                  <div className="text-xs font-bold text-amber-100">{doc.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{doc.subject || 'Umum'} • {doc.lastModified || 'Terbaru'}</div>
                </div>
                <button
                  onClick={() => {
                    setActiveDocument(doc);
                    setCurrentView('workspace');
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka Editor</span>
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>

          {/* USER PROFILE SUMMARY CARD */}
          <div className="bg-slate-900/80 border border-amber-500/20 p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider">Status Sesi Pengajar</h3>
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <div className="text-sm font-bold text-amber-100">{currentUser.nama || currentUser.name}</div>
              <div className="text-xs text-slate-400">{currentUser.sekolah || currentUser.school || 'Sekolah Umum'}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/10">
              <div className="text-[10px] text-slate-400">Sisa Kuota Token:</div>
              <div className="text-xl font-mono font-bold text-amber-300 mt-1">
                {currentUser.is_premium ? "PRO / Unlimited" : (currentUser.kredit_tersisa || 0) + " Token"}
              </div>
            </div>
            {!currentUser.is_premium && (
              <button
                onClick={() => handleTriggerPaywall("MANUAL")}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0B192C] font-black py-2.5 rounded-xl text-xs uppercase shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Upgrade Ke PRO VIP
              </button>
            )}
          </div>
        </div>

      </div>
    )}

    {currentView === 'workspace' && (
      <AIWorkspace
        activeDocument={activeDocument || documents[0]}
        onSaveDocument={handleSaveDocument}
        currentUser={currentUser}
        onDeductQuota={deductQuotaOnAction}
        onTriggerPaywall={handleTriggerPaywall}
      />
    )}

    {currentView === 'files' && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <div>
            <h1 className="text-2xl font-black text-amber-200">Berkas Saya</h1>
            <p className="text-xs text-slate-400 mt-0.5">Kelola draf perangkat ajar yang telah dibuat</p>
          </div>
          <button
            onClick={handleOpenWizard}
            className="bg-amber-500 hover:bg-amber-400 text-[#0B192C] font-bold px-4 py-2 rounded-xl text-xs shadow-lg cursor-pointer"
          >
            + Buat Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map(doc => (
            <div key={doc.id} className="bg-slate-900/80 border border-amber-500/20 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase">
                  {doc.fase_pembelajaran || 'Modul Ajar'}
                </span>
                <h3 className="font-bold text-amber-100 text-base mt-2 line-clamp-2">{doc.title}</h3>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                <button
                  onClick={() => {
                    setActiveDocument(doc);
                    setCurrentView('workspace');
                  }}
                  className="font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  Buka Workspace →
                </button>
                <button
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="text-rose-400/80 hover:text-rose-400 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </main>

  {/* GLOBAL PAYWALL MODAL */}
  {isPaywallOpen && (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-slate-100">
        <button
          onClick={() => setIsPaywallOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-amber-300 p-2 cursor-pointer"
        >
          ✕
        </button>
        <div className="text-center space-y-2">
          <span className="bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
            TRISULA VIP ACCESS
          </span>
          <h2 className="text-2xl font-black text-amber-200">AKSES TERKUNCI / KUOTA HABIS</h2>
          <p className="text-xs text-slate-400">{paywallReason}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/20 text-left space-y-2">
            <div className="font-bold text-amber-300 text-xs">Paket Top-Up Kuota</div>
            <div className="text-xl font-black text-white">Rp 25.000 <span className="text-[10px] font-normal text-slate-400">/ 10 Token</span></div>
            <button
              onClick={() => {
                const updated = { ...currentUser, kredit_tersisa: (currentUser.kredit_tersisa || 0) + 10 };
                setCurrentUser(updated);
                syncUserToGoogleSheets(updated, 'TOPUP_10_TOKENS');
                setIsPaywallOpen(false);
                showToast('Sukses +10 Token ditambahkan!');
              }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-2 rounded-xl text-xs border border-amber-500/30 mt-2 cursor-pointer"
            >
              Beli 10 Token (+10)
            </button>
          </div>
          <div className="bg-gradient-to-b from-amber-950/40 to-slate-950 p-4 rounded-2xl border-2 border-amber-400 text-left space-y-2">
            <div className="font-bold text-amber-200 text-xs">PRO Unlimited Member</div>
            <div className="text-xl font-black text-amber-400">Rp 99.000 <span className="text-[10px] font-normal text-slate-400">/ Bulan</span></div>
            <button
              onClick={() => {
                const updated = { ...currentUser, is_premium: true, status_langganan: 'PRO_UNLIMITED' };
                setCurrentUser(updated);
                syncUserToGoogleSheets(updated, 'ACTIVATE_PRO_UNLIMITED');
                setIsPaywallOpen(false);
                showToast('Sukses! Akun PRO Unlimited Aktif!');
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0B192C] font-black py-2 rounded-xl text-xs uppercase shadow-lg shadow-amber-500/20 mt-2 cursor-pointer"
            >
              Aktifkan PRO Unlimited
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

</div>


);
}
