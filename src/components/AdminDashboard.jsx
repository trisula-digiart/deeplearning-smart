import React, { useState, useMemo } from 'react';

// Custom SVG Icons to guarantee zero missing dependency crashes
const Icons = {
  ShieldCheck: () => (
    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Zap: ({ className = "w-5 h-5 text-amber-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  CreditCard: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  QrCode: () => (
    <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5 text-slate-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  GraduationCap: () => (
    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  )
};

const INITIAL_B2B_SCHOOLS = [
  { id: 'SCH-001', name: 'SMA Negeri 1 Jakarta', tier: 'High School', students: 1200, teachers: 85, status: 'Active', plan: 'B2B Enterprise Gold', renewalDate: '2027-08-15', totalValue: 'Rp 48.000.000' },
  { id: 'SCH-002', name: 'SMA Labschool Kebayoran', tier: 'High School', students: 850, teachers: 60, status: 'Active', plan: 'B2B Enterprise Silver', renewalDate: '2026-11-20', totalValue: 'Rp 34.000.000' },
  { id: 'SCH-003', name: 'SMK Telkom Bandung', tier: 'Vocational', students: 2100, teachers: 120, status: 'Active', plan: 'B2B Platinum Custom', renewalDate: '2027-01-10', totalValue: 'Rp 84.000.000' },
  { id: 'SCH-004', name: 'SMP Islam Al-Azhar Pusat', tier: 'Junior High', students: 640, teachers: 45, status: 'Pending Review', plan: 'B2B Trial Academy', renewalDate: '2026-09-01', totalValue: 'Rp 18.000.000' }
];

const INITIAL_TRANSACTIONS = [
  { id: 'INV-2026-8801', title: 'Top-Up Kuota AI (500.000 Tokens)', date: '2026-07-21', amount: 'Rp 2.000.000', method: 'QRIS Auto', status: 'Success' },
  { id: 'INV-2026-8794', title: 'Perpanjangan B2B SMA N 1 Jakarta', date: '2026-07-15', amount: 'Rp 48.000.000', method: 'Bank Transfer (BCA)', status: 'Success' },
  { id: 'INV-2026-8650', title: 'Paket Pro Academy (Tahunan)', date: '2026-06-10', amount: 'Rp 14.390.000', method: 'Credit Card (Visa)', status: 'Success' },
  { id: 'INV-2026-8512', title: 'Top-Up Kuota AI (100.000 Tokens)', date: '2026-05-28', amount: 'Rp 500.000', method: 'Mandiri VA', status: 'Success' }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [quotaBalance, setQuotaBalance] = useState(142500); // Current Token Quota
  const [quotaLimit, setQuotaLimit] = useState(250000);
  const [currentPlan, setCurrentPlan] = useState('Pro Academy VIP');
  
  // Data States
  const [b2bSchools, setB2bSchools] = useState(INITIAL_B2B_SCHOOLS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Visibility States
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);

  // Modal Flow / Step States
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'
  const [paymentStep, setPaymentStep] = useState(1); // 1: Select, 2: Payment Gateway, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [isProcessing, setIsProcessing] = useState(false);

  // Quota Modal State
  const [selectedQuotaPack, setSelectedQuotaPack] = useState(null);

  // B2B Calculator Form State
  const [b2bForm, setB2bForm] = useState({
    schoolName: '',
    tier: 'SMA',
    studentCount: 500,
    teacherCount: 35,
    includeAIGrading: true,
    includeCustomDomain: false
  });

  const stats = useMemo(() => {
    const totalB2bRevenue = b2bSchools.reduce((acc, sch) => {
      const num = parseInt(sch.totalValue.replace(/[^0-9]/g, ''), 10) || 0;
      return acc + num;
    }, 0);

    const activeSchoolsCount = b2bSchools.filter(s => s.status === 'Active').length;
    const quotaUsagePercent = Math.min(100, Math.round((quotaBalance / quotaLimit) * 100));

    return {
      revenue: `Rp ${totalB2bRevenue.toLocaleString('id-ID')}`,
      activeSchools: activeSchoolsCount,
      quotaUsagePercent,
      totalStudentsServed: b2bSchools.reduce((a, b) => a + b.students, 0)
    };
  }, [b2bSchools, quotaBalance, quotaLimit]);

  const b2bEstimatedPrice = useMemo(() => {
    const basePerStudent = 35000; // Rp 35.000 / student / year
    const basePerTeacher = 75000;  // Rp 75.000 / teacher / year
    let subtotal = (b2bForm.studentCount * basePerStudent) + (b2bForm.teacherCount * basePerTeacher);
    
    if (b2bForm.includeAIGrading) subtotal += 5000000;
    if (b2bForm.includeCustomDomain) subtotal += 3500000;

    // Bulk Discount >= 1000 students
    if (b2bForm.studentCount >= 1000) {
      subtotal *= 0.85; // 15% discount
    }

    return Math.round(subtotal);
  }, [b2bForm]);

  const handleExecutePayment = (type) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep(3); // Success Screen

      if (type === 'plan' && selectedPlan) {
        setCurrentPlan(selectedPlan.name);
        setQuotaLimit(prev => prev + selectedPlan.quotaBonus);
        
        // Add transaction log
        setTransactions(prev => [
          {
            id: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            title: `Langganan Paket ${selectedPlan.name}`,
            date: new Date().toISOString().split('T')[0],
            amount: selectedPlan.priceFormatted,
            method: paymentMethod.toUpperCase(),
            status: 'Success'
          },
          ...prev
        ]);
      } else if (type === 'quota' && selectedQuotaPack) {
        setQuotaBalance(prev => prev + selectedQuotaPack.tokens);
        setQuotaLimit(prev => prev + selectedQuotaPack.tokens);

        setTransactions(prev => [
          {
            id: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            title: `Top-Up Kuota (${selectedQuotaPack.tokens.toLocaleString('id-ID')} Tokens)`,
            date: new Date().toISOString().split('T')[0],
            amount: selectedQuotaPack.priceFormatted,
            method: paymentMethod.toUpperCase(),
            status: 'Success'
          },
          ...prev
        ]);
      } else if (type === 'b2b') {
        const newSchool = {
          id: `SCH-00${b2bSchools.length + 1}`,
          name: b2bForm.schoolName || 'SMA Mitra Baru',
          tier: b2bForm.tier,
          students: parseInt(b2bForm.studentCount, 10),
          teachers: parseInt(b2bForm.teacherCount, 10),
          status: 'Active',
          plan: 'B2B Enterprise Custom',
          renewalDate: '2027-08-01',
          totalValue: `Rp ${b2bEstimatedPrice.toLocaleString('id-ID')}`
        };
        setB2bSchools(prev => [newSchool, ...prev]);

        setTransactions(prev => [
          {
            id: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            title: `Kontrak B2B Sekolah - ${newSchool.name}`,
            date: new Date().toISOString().split('T')[0],
            amount: newSchool.totalValue,
            method: 'Bank Transfer (BCA B2B)',
            status: 'Success'
          },
          ...prev
        ]);
      }
    }, 1500);
  };

  const resetModalState = () => {
    setPaymentStep(1);
    setSelectedPlan(null);
    setSelectedQuotaPack(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 font-sans antialiased p-4 md:p-8">
      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-xl shadow-lg shadow-amber-500/20">
              <Icons.ShieldCheck />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                TRISULA ARCHITECT <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">Kernel v8.7</span>
              </h1>
              <p className="text-xs text-slate-400">Portal Manajemen Admin, Subskripsi Paket, Kuota AI, & Lisensi B2B Sekolah</p>
            </div>
          </div>
        </div>

        {/* Quick Action Badges & Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Current Quota Indicator */}
          <div className="bg-[#132338] border border-slate-700/80 rounded-xl p-2.5 px-4 flex items-center gap-3">
            <Icons.Zap />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Sisa Kuota Token AI</div>
              <div className="text-sm font-bold text-white">
                {quotaBalance.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-normal">/ {quotaLimit.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <button 
              onClick={() => { resetModalState(); setIsQuotaModalOpen(true); }}
              className="ml-2 text-xs font-semibold bg-[#D4AF37] hover:bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg transition-all shadow-md shadow-amber-500/10 flex items-center gap-1"
            >
              <Icons.Plus /> Top-Up
            </button>
          </div>

          {/* Active Plan Badge */}
          <button 
            onClick={() => { resetModalState(); setIsSubscriptionModalOpen(true); }}
            className="bg-gradient-to-r from-amber-500/10 to-amber-700/20 border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl p-2.5 px-4 text-left transition-all"
          >
            <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">Paket Aktif</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              {currentPlan} <span className="text-xs text-emerald-400 font-normal">(Upgrade)</span>
            </div>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto my-6 flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Ringkasan Dashboard', icon: Icons.ShieldCheck },
          { id: 'b2b', label: 'Portal B2B Sekolah', icon: Icons.Building },
          { id: 'history', label: 'Riwayat & Invoice', icon: Icons.CreditCard }
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-amber-600/10 text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <IconComp />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {}
      <main className="max-w-7xl mx-auto space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#132338] border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Total Pendapatan B2B</span>
                  <Icons.TrendingUp />
                </div>
                <div className="text-2xl font-bold text-white mt-2">{stats.revenue}</div>
                <div className="text-xs text-emerald-400 mt-1 font-medium">↑ +18.4% bulan ini</div>
              </div>

              <div className="bg-[#132338] border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Mitra Sekolah Aktif</span>
                  <Icons.Building />
                </div>
                <div className="text-2xl font-bold text-white mt-2">{stats.activeSchools} Sekolah</div>
                <div className="text-xs text-slate-400 mt-1">{stats.totalStudentsServed.toLocaleString('id-ID')} Siswa Terdaftar</div>
              </div>

              <div className="bg-[#132338] border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Penggunaan Kuota Token</span>
                  <Icons.Zap />
                </div>
                <div className="text-2xl font-bold text-white mt-2">{stats.quotaUsagePercent}%</div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-[#D4AF37] h-full rounded-full" style={{ width: `${stats.quotaUsagePercent}%` }}></div>
                </div>
              </div>

              <div className="bg-[#132338] border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Akses Pengajar B2B</span>
                  <Icons.Users />
                </div>
                <div className="text-2xl font-bold text-white mt-2">310 Guru</div>
                <div className="text-xs text-cyan-400 mt-1">SLA Uptime 99.98%</div>
              </div>
            </div>

            {/* Main Action Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Subscription Banner & B2B Spotlight */}
              <div className="lg:col-span-2 space-y-6">
                {/* Subscription Upgrade Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#132338] via-[#0F223D] to-[#0B192C] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -z-0"></div>
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                        Pilihan Utama Enterprise
                      </span>
                      <h2 className="text-xl font-bold text-white mt-2">Tingkatkan Kapasitas Institusi Sekolah Anda</h2>
                      <p className="text-sm text-slate-300 mt-1 max-w-xl">
                        Dapatkan lisensi B2B khusus sekolah dengan kuota token AI tanpa batas, dashboard pemantauan nilai siswa, dan integrasi kurikulum otomatis.
                      </p>
                    </div>
                    <button
                      onClick={() => { resetModalState(); setIsB2BModalOpen(true); }}
                      className="whitespace-nowrap px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
                    >
                      <Icons.GraduationCap /> Buat Kontrak B2B
                    </button>
                  </div>
                </div>

                {/* Quick Transactions Log */}
                <div className="bg-[#132338] border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Transaksi Terbaru</h3>
                    <button onClick={() => setActiveTab('history')} className="text-xs text-[#D4AF37] hover:underline font-medium">Lihat Semua →</button>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {transactions.slice(0, 3).map(tx => (
                      <div key={tx.id} className="py-3 flex items-center justify-between text-sm">
                        <div>
                          <div className="font-semibold text-white">{tx.title}</div>
                          <div className="text-xs text-slate-400">{tx.id} • {tx.date} • {tx.method}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#D4AF37]">{tx.amount}</div>
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Quota Meter & Quick Actions */}
              <div className="space-y-6">
                <div className="bg-[#132338] border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-base font-semibold text-white mb-3">Status Kuota AI Kernel</h3>
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Token Terpakai</span>
                      <span className="font-bold text-white">{(quotaLimit - quotaBalance).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Sisa Kuota Aktif</span>
                      <span className="font-bold text-[#D4AF37]">{quotaBalance.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-[#D4AF37] h-full" style={{ width: `${(quotaBalance/quotaLimit)*100}%` }}></div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => { resetModalState(); setIsQuotaModalOpen(true); }}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Icons.Zap /> Tambah Kuota Token AI
                    </button>
                    <button
                      onClick={() => { resetModalState(); setIsSubscriptionModalOpen(true); }}
                      className="w-full py-2.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Icons.ShieldCheck /> Upgrade Paket Langganan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {/* TAB 2: B2B SEKOLAH */}
        {activeTab === 'b2b' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Daftar Mitra Sekolah & Institusi (B2B)</h2>
                <p className="text-xs text-slate-400">Kelola kuota, jumlah siswa, dan masa aktif lisensi institusi pendidikan.</p>
              </div>
              <button
                onClick={() => { resetModalState(); setIsB2BModalOpen(true); }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <Icons.Plus /> Tambah Kontrak Sekolah B2B
              </button>
            </div>

            {/* Table Card */}
            <div className="bg-[#132338] border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Search />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama sekolah / ID..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Nama Sekolah / ID</th>
                      <th className="p-4">Jenjang</th>
                      <th className="p-4">Kapasitas (Siswa / Guru)</th>
                      <th className="p-4">Paket B2B</th>
                      <th className="p-4">Nilai Kontrak</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {b2bSchools
                      .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((school) => (
                        <tr key={school.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-semibold text-white">
                            {school.name}
                            <div className="text-[10px] text-slate-500 font-normal">{school.id}</div>
                          </td>
                          <td className="p-4">{school.tier}</td>
                          <td className="p-4">{school.students} Siswa / {school.teachers} Guru</td>
                          <td className="p-4 text-[#D4AF37] font-medium">{school.plan}</td>
                          <td className="p-4 font-bold text-white">{school.totalValue}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                              school.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {school.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700">
                              Detail & Invoice
                            </button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {}
        {/* TAB 3: TRANSACTION HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Riwayat Transaksi & Pembayaran</h2>
              <p className="text-xs text-slate-400">Daftar invoice pembelian paket langganan, top-up kuota, dan kontrak B2B.</p>
            </div>

            <div className="bg-[#132338] border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">ID Invoice</th>
                      <th className="p-4">Deskripsi Pembelian</th>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Metode Bayar</th>
                      <th className="p-4">Jumlah Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Unduh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-semibold text-[#D4AF37]">{tx.id}</td>
                        <td className="p-4 font-medium text-white">{tx.title}</td>
                        <td className="p-4 text-slate-400">{tx.date}</td>
                        <td className="p-4">{tx.method}</td>
                        <td className="p-4 font-bold text-white">{tx.amount}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all inline-flex items-center gap-1 text-[11px]">
                            <Icons.Download /> Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      {/* ========================================================================= */}
      {/* MODAL 1: PAKET LANGGANAN (SUBSCRIPTION MODAL)                             */}
      {/* ========================================================================= */}
      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#132338] border border-[#D4AF37]/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/30">
                  <Icons.ShieldCheck />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upgrade Paket Langganan Trisula AI</h3>
                  <p className="text-xs text-slate-400">Pilih skema lisensi yang sesuai dengan skala operasional Anda.</p>
                </div>
              </div>
              <button onClick={() => setIsSubscriptionModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-800">
                <Icons.Close />
              </button>
            </div>

            {/* STEP 1: PLAN SELECTION */}
            {paymentStep === 1 && (
              <div className="mt-6 space-y-6">
                {/* Billing Cycle Toggle */}
                <div className="flex justify-center">
                  <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        billingCycle === 'monthly' ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Bulanan
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        billingCycle === 'yearly' ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Tahunan <span className="text-[9px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">Hemat 20%</span>
                    </button>
                  </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      id: 'starter',
                      name: 'Starter Gold',
                      priceFormatted: billingCycle === 'yearly' ? 'Rp 4.790.000 / thn' : 'Rp 499.000 / bln',
                      priceRaw: 499000,
                      quotaBonus: 50000,
                      features: ['50.000 Tokens AI / Bln', 'Maksimal 5 Pengajar', 'Dukungan Standard', 'Akses Modul Dasar AI']
                    },
                    {
                      id: 'pro',
                      name: 'Pro Academy VIP',
                      popular: true,
                      priceFormatted: billingCycle === 'yearly' ? 'Rp 14.390.000 / thn' : 'Rp 1.499.000 / bln',
                      priceRaw: 1499000,
                      quotaBonus: 250000,
                      features: ['250.000 Tokens AI / Bln', 'Maksimal 25 Pengajar', 'Prioritas SLA 99.9%', 'Custom System Prompt', 'Analytics Dashboard']
                    },
                    {
                      id: 'enterprise',
                      name: 'B2B School Enterprise',
                      priceFormatted: billingCycle === 'yearly' ? 'Rp 47.990.000 / thn' : 'Rp 4.999.000 / bln',
                      priceRaw: 4999000,
                      quotaBonus: 1000000,
                      features: ['1.000.000+ Tokens AI', 'Pengajar & Siswa Tanpa Batas', 'Dedicated Server & API Key', 'Integration Support 24/7']
                    }
                  ].map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative rounded-2xl p-5 cursor-pointer border transition-all flex flex-col justify-between ${
                        selectedPlan?.id === plan.id
                          ? 'bg-[#0F223D] border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-xl'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 px-3 py-0.5 rounded-full shadow-md">
                          Paling Populer
                        </span>
                      )}
                      <div>
                        <h4 className="text-base font-bold text-white">{plan.name}</h4>
                        <div className="text-lg font-extrabold text-[#D4AF37] mt-2">{plan.priceFormatted}</div>
                        <p className="text-[11px] text-slate-400 mt-1">+ Bonus {plan.quotaBonus.toLocaleString('id-ID')} Tokens AI</p>

                        <ul className="mt-4 space-y-2">
                          {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <Icons.Check /> {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                          selectedPlan?.id === plan.id
                            ? 'bg-[#D4AF37] text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {selectedPlan?.id === plan.id ? 'Terpilih' : 'Pilih Paket Ini'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer Next Button */}
                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    disabled={!selectedPlan}
                    onClick={() => setPaymentStep(2)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 shadow-lg shadow-amber-500/20"
                  >
                    Lanjut Ke Pembayaran →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT GATEWAY METHOD */}
            {paymentStep === 2 && selectedPlan && (
              <div className="mt-6 space-y-6">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-slate-400">Ringkasan Pesanan:</div>
                    <div className="text-sm font-bold text-white">{selectedPlan.name} ({billingCycle === 'yearly' ? 'Tahunan' : 'Bulanan'})</div>
                  </div>
                  <div className="text-base font-bold text-[#D4AF37]">{selectedPlan.priceFormatted}</div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-3">Pilih Metode Pembayaran:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'qris', name: 'QRIS Auto Instant', desc: 'Gopay, OVO, Dana, ShopeePay' },
                      { id: 'bca', name: 'Virtual Account BCA', desc: 'Transfer VA otomatis terverifikasi' },
                      { id: 'cc', name: 'Kartu Kredit / Visa', desc: 'Pembayaran aman 256-bit SSL' }
                    ].map(pm => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === pm.id 
                            ? 'bg-[#0F223D] border-[#D4AF37] text-white' 
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{pm.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{pm.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QRIS / VA Simulation Box */}
                {paymentMethod === 'qris' && (
                  <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-3 rounded-xl shadow-lg my-2">
                      <Icons.QrCode />
                    </div>
                    <p className="text-xs text-slate-400">Pindai Kode QRIS di atas untuk menyelesaikan transaksi instan.</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button onClick={() => setPaymentStep(1)} className="text-xs text-slate-400 hover:text-white">
                    ← Kembali
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment('plan')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                  >
                    {isProcessing ? 'Memproses Transaksi...' : 'Konfirmasi & Bayar Sekarang'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SUCCESS STATE */}
            {paymentStep === 3 && (
              <div className="mt-8 py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Icons.Check />
                </div>
                <h3 className="text-xl font-bold text-white">Pembayaran Berhasil Dikonfirmasi!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Paket <span className="text-[#D4AF37] font-semibold">{selectedPlan?.name}</span> telah aktif secara otomatis pada akun Anda. Kuota token AI tambahan siap digunakan.
                </p>
                <button
                  onClick={() => setIsSubscriptionModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs hover:bg-amber-500 transition-all mt-4"
                >
                  Selesai & Kembali ke Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {/* ========================================================================= */}
      {/* MODAL 2: TOP-UP KUOTA AI (QUOTA ADD-ON MODAL)                            */}
      {/* ========================================================================= */}
      {isQuotaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#132338] border border-[#D4AF37]/40 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/30">
                  <Icons.Zap />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Top-Up Kuota Token AI</h3>
                  <p className="text-xs text-slate-400">Beli isi ulang token kuota instan tanpa perlu merubah paket bulanan.</p>
                </div>
              </div>
              <button onClick={() => setIsQuotaModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-800">
                <Icons.Close />
              </button>
            </div>

            {paymentStep === 1 && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { tokens: 25000, priceFormatted: 'Rp 150.000', desc: 'Cocok untuk penggunaan ringan' },
                    { tokens: 100000, priceFormatted: 'Rp 500.000', popular: true, desc: 'Pilihan hemat sekolah menengah' },
                    { tokens: 500000, priceFormatted: 'Rp 2.000.000', desc: 'Maksimal untuk pemrosesan AI massal' }
                  ].map((pack, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedQuotaPack(pack)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        selectedQuotaPack?.tokens === pack.tokens
                          ? 'bg-[#0F223D] border-[#D4AF37] ring-2 ring-[#D4AF37]/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-lg font-extrabold text-[#D4AF37]">{pack.tokens.toLocaleString('id-ID')} Tokens</div>
                        <div className="text-sm font-bold text-white mt-1">{pack.priceFormatted}</div>
                        <p className="text-[10px] text-slate-400 mt-2">{pack.desc}</p>
                      </div>
                      <button className={`mt-4 w-full py-1.5 rounded-lg text-xs font-semibold ${
                        selectedQuotaPack?.tokens === pack.tokens ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        Pilih Pack
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    disabled={!selectedQuotaPack}
                    onClick={() => handleExecutePayment('quota')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 font-bold text-xs disabled:opacity-50 hover:brightness-110 shadow-lg shadow-amber-500/20"
                  >
                    {isProcessing ? 'Memproses...' : 'Bayar Top-Up Instan'}
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="mt-6 py-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Icons.Check />
                </div>
                <h4 className="text-lg font-bold text-white">Top-Up Kuota Berhasil!</h4>
                <p className="text-xs text-slate-300">
                  Sisa kuota Anda telah bertambah sebanyak <span className="text-[#D4AF37] font-bold">{selectedQuotaPack?.tokens.toLocaleString('id-ID')} Tokens</span>.
                </p>
                <button
                  onClick={() => setIsQuotaModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs"
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {/* ========================================================================= */}
      {/* MODAL 3: B2B SEKOLAH & KONTRAK KHUSUS (SCHOOL B2B CUSTOM PLAN MODAL)     */}
      {/* ========================================================================= */}
      {isB2BModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#132338] border border-[#D4AF37]/40 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                  <Icons.GraduationCap />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Kalkulator & Pengajuan Kontrak B2B Sekolah</h3>
                  <p className="text-xs text-slate-400">Simulasikan harga khusus berdasarkan kapasitas siswa & guru institusi Anda.</p>
                </div>
              </div>
              <button onClick={() => setIsB2BModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-800">
                <Icons.Close />
              </button>
            </div>

            {paymentStep === 1 && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Nama Sekolah / Lembaga</label>
                    <input
                      type="text"
                      value={b2bForm.schoolName}
                      onChange={(e) => setB2bForm({ ...b2bForm, schoolName: e.target.value })}
                      placeholder="Misal: SMA Negeri 1 Jakarta"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Jenjang Pendidikan</label>
                    <select
                      value={b2bForm.tier}
                      onChange={(e) => setB2bForm({ ...b2bForm, tier: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="SMP">SMP / Junior High</option>
                      <option value="SMA">SMA / High School</option>
                      <option value="SMK">SMK / Vocational</option>
                      <option value="Universitas">Perguruan Tinggi / Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Jumlah Siswa Terdaftar</label>
                    <input
                      type="number"
                      value={b2bForm.studentCount}
                      onChange={(e) => setB2bForm({ ...b2bForm, studentCount: Math.max(10, parseInt(e.target.value, 10) || 0) })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Jumlah Pengajar / Guru</label>
                    <input
                      type="number"
                      value={b2bForm.teacherCount}
                      onChange={(e) => setB2bForm({ ...b2bForm, teacherCount: Math.max(1, parseInt(e.target.value, 10) || 0) })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Optional Addons */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Fitur Tambahan Enterprise:</label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={b2bForm.includeAIGrading}
                      onChange={(e) => setB2bForm({ ...b2bForm, includeAIGrading: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0"
                    />
                    Modul Penilaian Otomatis AI (Auto-Grading Essay & Quiz) (+ Rp 5.000.000 / thn)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={b2bForm.includeCustomDomain}
                      onChange={(e) => setB2bForm({ ...b2bForm, includeCustomDomain: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0"
                    />
                    Custom Domain Sekolah & Branding Logo (+ Rp 3.500.000 / thn)
                  </label>
                </div>

                {/* Price Estimate Card */}
                <div className="p-5 bg-gradient-to-r from-slate-900 to-[#0F223D] border border-[#D4AF37]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Estimasi Total Kontrak B2B (1 Tahun Akademik):</div>
                    <div className="text-2xl font-extrabold text-[#D4AF37] mt-1">
                      Rp {b2bEstimatedPrice.toLocaleString('id-ID')}
                    </div>
                    {b2bForm.studentCount >= 1000 && (
                      <div className="text-[10px] text-emerald-400 font-medium"> Diskon Bulk 15% Diterapkan (Siswa ≥ 1.000)</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleExecutePayment('b2b')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 whitespace-nowrap"
                  >
                    {isProcessing ? 'Membuat Kontrak...' : 'Setujui & Terbitkan Invoice B2B'}
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="mt-6 py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto">
                  <Icons.Check />
                </div>
                <h3 className="text-xl font-bold text-white">Kontrak B2B Resmi Diterbitkan!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Kontrak untuk <span className="text-[#D4AF37] font-semibold">{b2bForm.schoolName || 'Sekolah Mitra'}</span> telah berhasil ditambahkan ke portal. Invoice resmi & instruksi aktivasi API telah dikirim ke email institusi.
                </p>
                <button
                  onClick={() => setIsB2BModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs hover:bg-amber-500 transition-all"
                >
                  Lihat di Daftar Sekolah
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
