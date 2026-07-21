import React, { useState } from 'react';
import { generatePerangkatAjar } from '../services/geminiService';

/**
 * TRISULAPROMPT - Deep Learning Wizard Component v2.5
 * Modal Multi-Step Form untuk pembuatan Perangkat Ajar Kurikulum Merdeka
 */

const PRESET_TOPICS = [
  { subject: 'Informatika', phase: 'Fase E (Kelas 10)', topic: 'Algoritma Pemrograman' },
  { subject: 'Matematika', phase: 'Fase F (Kelas 11)', topic: 'Analisis Data & Peluang' },
  { subject: 'Bahasa Indonesia', phase: 'Fase D (Kelas 7)', topic: 'Teks Laporan Hasil Observasi' },
  { subject: 'IPAS', phase: 'Fase C (Kelas 5)', topic: 'Ekosistem dan Keseimbangan Alam' }
];

export default function DeepLearningWizard({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    jenisDokumen: 'Modul Ajar',
    mataPelajaran: 'Informatika',
    fase: 'Fase E (Kelas 10)',
    topik: 'Algoritma Pemrograman',
    durasi: '2 JP (2 x 45 Menit)',
    pilarFocus: ['Mindful', 'Meaningful', 'Joyful']
  });

  if (!isOpen) return null;

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle Checkbox Pilar
  const handlePilarToggle = (pilar) => {
    setFormData((prev) => {
      const exists = prev.pilarFocus.includes(pilar);
      const updated = exists
        ? prev.pilarFocus.filter((p) => p !== pilar)
        : [...prev.pilarFocus, pilar];
      return { ...prev, pilarFocus: updated.length > 0 ? updated : prev.pilarFocus };
    });
  };

  // Preset Fast Loader
  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      mataPelajaran: preset.subject,
      fase: preset.phase,
      topik: preset.topic
    }));
  };

  // Form Validation
  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.jenisDokumen) newErrors.jenisDokumen = 'Pilih jenis dokumen terlebih dahulu.';
    } else if (currentStep === 2) {
      if (!formData.mataPelajaran.trim()) newErrors.mataPelajaran = 'Mata pelajaran wajib diisi.';
      if (!formData.topik.trim()) newErrors.topik = 'Topik utama wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit Handler & Call AI Engine
  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    try {
      const result = await generatePerangkatAjar(formData);
      if (result.success && onSuccess) {
        onSuccess(result.data);
        onClose();
        // Reset State
        setStep(1);
      }
    } catch (err) {
      console.error("[WIZARD ERROR]", err);
      setErrors({ global: 'Gagal merancang dokumen. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#0F172A] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#0B192C]">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="text-[#D4AF37]">✨</span> Wizard Deep Learning
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rancang Perangkat Ajar Kurikulum Merdeka Terintegrasi 3 Pilar
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
          {[
            { id: 1, label: '1. Jenis Dokumen' },
            { id: 2, label: '2. Parameter Pembelajaran' },
            { id: 3, label: '3. Integrasi 3 Pilar' }
          ].map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-2 text-xs font-semibold ${
                step === s.id
                  ? 'text-[#D4AF37]'
                  : step > s.id
                  ? 'text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === s.id
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : step > s.id
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s.id ? '✓' : s.id}
              </span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {errors.global && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400">
              {errors.global}
            </div>
          )}

          {/* STEP 1: PILIH DOKUMEN */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Pilih Jenis Perangkat Ajar yang Ingin Dibuat:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Modul Ajar', desc: 'Rencana pembelajaran lengkap + LKPD & Asesmen' },
                  { title: 'Tujuan Pembelajaran (TP)', desc: 'Rumusan TP berdasarkan CP Kurikulum Merdeka' },
                  { title: 'Alur Tujuan Pembelajaran (ATP)', desc: 'Pemetaan sekuensial pembelajaran 1 Tahun' },
                  { title: 'Kriteria KKTP', desc: 'Indikator ketercapaian & rubrik penilaian' },
                  { title: 'Program Tahunan (Prota)', desc: 'Alokasi waktu pembelajaran 2 Semester' },
                  { title: 'Program Semester (Prosem)', desc: 'Rincian jadwal mingguan per bulan' }
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setFormData({ ...formData, jenisDokumen: item.title })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.jenisDokumen === item.title
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white shadow-lg shadow-[#D4AF37]/5'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-sm text-slate-100">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
                  </button>
                ))}
              </div>
              {errors.jenisDokumen && (
                <p className="text-xs text-rose-400">{errors.jenisDokumen}</p>
              )}
            </div>
          )}

          {/* STEP 2: PARAMETER PEMBELAJARAN */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Presets */}
              <div>
                <span className="text-xs text-slate-400 block mb-2">Preset Cepat:</span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_TOPICS.map((preset) => (
                    <button
                      key={preset.topic}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 transition-colors"
                    >
                      ⚡ {preset.subject} - {preset.topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mata Pelajaran *
                  </label>
                  <input
                    type="text"
                    name="mataPelajaran"
                    value={formData.mataPelajaran}
                    onChange={handleChange}
                    placeholder="Contoh: Informatika"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.mataPelajaran && <p className="text-xs text-rose-400 mt-1">{errors.mataPelajaran}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Fase & Kelas *
                  </label>
                  <select
                    name="fase"
                    value={formData.fase}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Fase A (Kelas 1-2)">Fase A (Kelas 1-2 SD)</option>
                    <option value="Fase B (Kelas 3-4)">Fase B (Kelas 3-4 SD)</option>
                    <option value="Fase C (Kelas 5-6)">Fase C (Kelas 5-6 SD)</option>
                    <option value="Fase D (Kelas 7-9)">Fase D (Kelas 7-9 SMP)</option>
                    <option value="Fase E (Kelas 10)">Fase E (Kelas 10 SMA/SMK)</option>
                    <option value="Fase F (Kelas 11-12)">Fase F (Kelas 11-12 SMA/SMK)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Topik Utama / Materi Pokok *
                </label>
                <input
                  type="text"
                  name="topik"
                  value={formData.topik}
                  onChange={handleChange}
                  placeholder="Contoh: Algoritma Pemrograman & Flowchart"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
                {errors.topik && <p className="text-xs text-rose-400 mt-1">{errors.topik}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Alokasi Waktu
                </label>
                <input
                  type="text"
                  name="durasi"
                  value={formData.durasi}
                  onChange={handleChange}
                  placeholder="Contoh: 2 JP (2 x 45 Menit)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: INTEGRASI 3 PILAR DEEP LEARNING */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Pilih Fokus 3 Pilar Deep Learning:
              </label>
              <div className="space-y-3">
                {[
                  { id: 'Mindful', title: '🧠 Mindful Learning', desc: 'Siswa menyadari tujuan belajar, mengolah regulasi emosi, dan melakukan refleksi kritis di awal/akhir pembelajaran.' },
                  { id: 'Meaningful', title: '🎯 Meaningful Learning', desc: 'Materi dihubungkan langsung dengan dunia nyata, pemecahan masalah kontekstual, dan pengalaman siswa.' },
                  { id: 'Joyful', title: '🚀 Joyful Learning', desc: 'Pembelajaran yang menggugah rasa ingin tahu, kolaboratif, gamifikasi, dan menyenangkan.' }
                ].map((pilar) => {
                  const isChecked = formData.pilarFocus.includes(pilar.id);
                  return (
                    <div
                      key={pilar.id}
                      onClick={() => handlePilarToggle(pilar.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-100">{pilar.title}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#D4AF37] w-4 h-4 rounded"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pilar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0B192C] border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || isLoading}
            className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            ← Kembali
          </button>

          <div className="flex items-center gap-3">
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-black font-semibold text-xs transition-colors shadow-lg shadow-[#D4AF37]/10"
              >
                Lanjut →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black font-bold text-xs transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Merancang AI...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Generate AI Document</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
