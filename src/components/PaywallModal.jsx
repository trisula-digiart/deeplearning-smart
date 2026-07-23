import React, { useState } from 'react';

/**
 * TRISULAPROMPT - PaywallModal Component v1.0
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Stack: React / Tailwind CSS
 * Features:
 *  - 3-Tier Pricing Plan (Monthly Subscription, Document Credits, B2B School License)
 *  - Interactive Payment Gateway Simulation (Bank Transfer & QRIS Static Display)
 *  - User Confirmation Form (Name, Email, Proof Attachment)
 *  - Direct WhatsApp Admin Redirect with Pre-filled Confirmation Message
 *  - Mobile-Responsive & Glassmorphic Deep Navy / Gold Premium Aesthetic
 */

export default function PaywallModal({ isOpen, onClose, userContext = {}, targetFeature = 'export' }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' | 'credits' | 'b2b'
  const [paymentStep, setPaymentStep] = useState('pricing'); // 'pricing' | 'checkout'
  const [formData, setFormData] = useState({
    fullName: userContext.name || '',
    email: userContext.email || '',
    paymentMethod: 'qris', // 'qris' | 'bca' | 'mandiri'
    proofFile: null
  });

  if (!isOpen) return null;

  // Nomor WhatsApp Admin (Ganti sesuai nomor WhatsApp operational)
  const ADMIN_WA_NUMBER = "6281234567890";

  const plans = [
    {
      id: 'monthly',
      name: 'Paket Langganan Bulanan',
      price: 'Rp 50.000',
      period: '/ bulan',
      badge: 'PALING POPULER',
      description: 'Akses tanpa batas untuk guru profesional yang aktif mengajar.',
      features: [
        'Unlimited Export Word (.doc) & PDF',
        'Unlimited AI Document Generation',
        'Akses Full Visual Engine (LaTeX, Mermaid, Chart)',
        'Dukungan Semua Jenjang (PAUD - SMA/SMK)',
        'Update Prompt Kurikulum Merdeka Auto-Sync'
      ],
      actionText: 'Pilih Paket Bulanan',
      isPopular: true
    },
    {
      id: 'credits',
      name: 'Paket Kuota Dokumen',
      price: 'Rp 19.000',
      period: '/ 10 Dokumen',
      badge: 'HEMAT & FLEKSIBEL',
      description: 'Cocok untuk persiapan supervisi atau kebutuhan insidental.',
      features: [
        '10 Kredit Ekspor Dokumen Lengkap',
        'Format Word & PDF Terstruktur',
        'Termasuk Rendering Diagram & Formula',
        'Masa Aktif Kuota Selamanya (Tanpa Hangus)',
        'Dukungan Layanan Pelanggan'
      ],
      actionText: 'Pilih Paket Kuota',
      isPopular: false
    },
    {
      id: 'b2b',
      name: 'Lisensi Sekolah / B2B',
      price: 'Mulai Rp 1.500.000',
      period: '/ tahun',
      badge: 'AKSES INSTANSI',
      description: 'Akses penuh untuk seluruh guru di sekolah/yayasan + Faktur Resmi.',
      features: [
        'Akses Unlimited untuk Seluruh Guru Sekolah',
        'Dashboard Manajemen Lisensi Kepala Sekolah/Admin',
        'Faktur, Kwitansi & Invoicing Legal Instansi',
        'Sesi Pelatihan & Onboarding Guru via Zoom',
        'Prioritas Server & Jalur Khusus AI Service'
      ],
      actionText: 'Hubungi Tim Pembuat Web',
      isPopular: false
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    if (planId === 'b2b') {
      // Direct WA Inquiry for B2B
      const waText = encodeURIComponent(
        `Halo Tim TRISULAPROMPT, saya tertarik mengajukan *Lisensi Sekolah / B2B* untuk sekolah kami.\n\nNama: ${formData.fullName || '[Nama Bapak/Ibu]'}\nEmail: ${formData.email || '[Email]'}\nMohon info proposal dan kemitraan resmi. Terima kasih!`
      );
      window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${waText}`, '_blank');
      return;
    }
    setPaymentStep('checkout');
  };

  const handleSendConfirmationWA = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Mohon lengkapi Nama Lengkap dan Email Terdaftar!");
      return;
    }

    const currentPlanObj = plans.find(p => p.id === selectedPlan);
    const planTitle = currentPlanObj ? `${currentPlanObj.name} (${currentPlanObj.price})` : 'Paket Premium';

    const message = `Halo Admin Deep Learning Co-Pilot, saya telah melakukan pembayaran untuk *${planTitle}*.\n\n` +
      `📌 *DATA PEMBAYARAN USER*:\n` +
      `• Nama Lengkap: ${formData.fullName}\n` +
      `• Email Terdaftar: ${formData.email}\n` +
      `• Metode Pembayaran: ${formData.paymentMethod.toUpperCase()}\n` +
      `• Tanggal: ${new Date().toLocaleDateString('id-ID')}\n\n` +
      `Saya telah menyertakan bukti transfer/screenshot. Mohon verifikasi dan aktifkan status akun/kredit saya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F172A] border border-amber-500/30 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in duration-200">
        
        {/* HEADER MODAL */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-lg">
              👑
            </div>
            <div>
              <h2 className="font-extrabold text-base md:text-lg text-white flex items-center gap-2">
                Buka Akses Premium & Fitur Eksklusif
              </h2>
              <p className="text-xs text-slate-400">
                {targetFeature === 'export'
                  ? 'Fitur Cetak & Export Dokumen (Word/PDF) terkunci untuk akun versi uji coba.'
                  : 'Batas kuota generate gratis Anda telah tercapai. Tingkatkan paket untuk melanjutkan.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-all cursor-pointer font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          
          {paymentStep === 'pricing' ? (
            <>
              {/* BENEFIT HIGHLIGHT ALERT */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-xl shrink-0">💡</span>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400">Draft Anda Tetap Aman!</strong> Seluruh Modul Ajar dan perangkat yang sedang Anda susun di kanvas kanan tidak akan hilang. Aktivasi paket Anda untuk langsung mengunduhnya ke berkas Word/PDF.
                </p>
              </div>

              {/* PRICING CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all border ${
                      plan.isPopular
                        ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/60 shadow-xl shadow-amber-500/10 scale-[1.02]'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {plan.badge && (
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase shadow-md ${
                        plan.isPopular
                          ? 'bg-[#D4AF37] text-black border border-amber-300'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {plan.badge}
                      </span>
                    )}

                    <div className="space-y-4 pt-2">
                      <div>
                        <h3 className="font-bold text-sm text-slate-100">{plan.name}</h3>
                        <p className="text-[11px] text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>
                      </div>

                      <div className="border-y border-slate-800/80 py-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl md:text-2xl font-black text-amber-400">{plan.price}</span>
                          <span className="text-[11px] text-slate-400">{plan.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] leading-tight">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ${
                        plan.isPopular
                          ? 'bg-[#D4AF37] hover:bg-amber-400 text-black shadow-amber-500/20'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {plan.actionText} →
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* PAYMENT & CHECKOUT FORM STEP */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: BANK & QRIS DETAILS */}
              <div className="md:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <button
                  onClick={() => setPaymentStep('pricing')}
                  className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer mb-2"
                >
                  ← Kembali ke Pilihan Paket
                </button>

                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    AKUN TUJUAN PEMBAYARAN
                  </span>
                  <h3 className="font-bold text-sm text-slate-100 mt-2">
                    {plans.find(p => p.id === selectedPlan)?.name}
                  </h3>
                  <p className="text-xs font-black text-amber-400">
                    Total: {plans.find(p => p.id === selectedPlan)?.price}
                  </p>
                </div>

                {/* PAYMENT METHOD SELECTION */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-300">Pilih Metode Pembayaran:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'qris', label: 'QRIS Statis' },
                      { id: 'bca', label: 'Bank BCA' },
                      { id: 'mandiri', label: 'Bank Mandiri' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.paymentMethod === m.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DISPLAY QRIS / BANK DETAILS */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-3">
                  {formData.paymentMethod === 'qris' ? (
                    <div className="space-y-2">
                      <p className="text-[11px] text-slate-400">Scan QRIS menggunakan Mobile Banking / E-Wallet (Gopay, OVO, ShopeePay, DANA)</p>
                      <div className="bg-white p-3 rounded-xl inline-block shadow-lg mx-auto">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=TRISULAPROMPT_PAYMENT_SAMPLE"
                          alt="Kode QRIS Pembayaran TRISULAPROMPT"
                          className="w-40 h-40 object-contain mx-auto"
                        />
                      </div>
                      <p className="text-[10px] text-amber-400 font-bold">NPMI: ID1020394857201 • TRISULA AI</p>
                    </div>
                  ) : formData.paymentMethod === 'bca' ? (
                    <div className="space-y-2 text-left text-xs">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Bank Tujuan:</span>
                        <strong className="text-white">Bank BCA</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>No. Rekening:</span>
                        <strong className="text-amber-400 font-mono text-sm">8830-9182-33</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Atas Nama:</span>
                        <strong className="text-white">TRISULA DIGITAL ACADEMY</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-left text-xs">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Bank Tujuan:</span>
                        <strong className="text-white">Bank Mandiri</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>No. Rekening:</span>
                        <strong className="text-amber-400 font-mono text-sm">137-00-19283-441</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Atas Nama:</span>
                        <strong className="text-white">TRISULA DIGITAL ACADEMY</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: USER CONFIRMATION FORM */}
              <div className="md:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-sm text-slate-100">Konfirmasi & Aktivasi Akun</h3>
                  <p className="text-[11px] text-slate-400">Isi data akun Anda untuk mempercepat aktivasi oleh Admin.</p>
                </div>

                <form onSubmit={handleSendConfirmationWA} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Lengkap Guru / User *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Contoh: Guru Hebat, S.Pd."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Terdaftar di Web *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="guru.hebat@sekolah.sch.id"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Upload Bukti Transfer / Screenshot (Opsional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, proofFile: e.target.files[0] })}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>🟢</span> Konfirmasi Pembayaran via WhatsApp
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-2">
                      Pesan konfirmasi otomatis akan dibuka di aplikasi WhatsApp Anda.
                    </p>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* FOOTER MODAL */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 text-center text-[11px] text-slate-500">
          TRISULAPROMPT SaaS Engine • Transaksi Aman & Terverifikasi Manual 24/7
        </div>

      </div>
    </div>
  );
}
