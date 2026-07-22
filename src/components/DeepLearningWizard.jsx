import React, { useState } from 'react';
import { generatePerangkatAjar } from '../services/geminiService';

/**
 * TRISULA SMART LEARNING ENGINE - Deep Learning Wizard Component v3.0
 * Multi-Step & Single-View Form Modal for Kurikulum Merdeka + 3 Pillars
 */

const PRESET_TOPICS = [
  { subject: 'Informatika', phase: 'Fase E (Kelas 10 SMA)', topic: 'Algoritma Pemrograman & Flowchart' },
  { subject: 'IPA & Biologi', phase: 'Fase E (Kelas 10 SMA)', topic: 'Ekosistem & Keanekaragaman Hayati' },
  { subject: 'Matematika', phase: 'Fase F (Kelas 11 SMA)', topic: 'Analisis Data, Statistika & Peluang' },
  { subject: 'IPAS', phase: 'Fase C (Kelas 5 SD)', topic: 'Ekosistem dan Keseimbangan Alam' }
];

export default function DeepLearningWizard({ isOpen, onClose, onSuccess, onCreateDocument }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    mataPelajaran: 'IPA & Biologi',
    fase: 'Fase E (Kelas 10 SMA)',
    topik: 'Ekosistem & Keanekaragaman Hayati',
    durasi: '2 JP x 45 Menit',
    components: {
      modulAjar: true,
      cp: true,
      tp: true,
      atp: true,
      kktp: true,
      prota: true,
      prosem: true
    },
    pilarFocus: {
      mindful: true,
      meaningful: true,
      joyful: true
    }
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleComponentToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      components: {
        ...prev.components,
        [key]: !prev.components[key]
      }
    }));
  };

  const handlePilarToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      pilarFocus: {
        ...prev.pilarFocus,
        [key]: !prev.pilarFocus[key]
      }
    }));
  };

  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      mataPelajaran: preset.subject,
      fase: preset.phase,
      topik: preset.topic
    }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.mataPelajaran.trim()) newErrors.mataPelajaran = 'Mata pelajaran wajib diisi.';
      if (!formData.topik.trim()) newErrors.topik = 'Topik utama wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMarkdownStructure = () => {
    const upperSub = formData.mataPelajaran.toUpperCase();
    const upperPhase = formData.fase.toUpperCase();

    let content = `# MODUL AJAR DEEP LEARNING: ${upperSub} ${upperPhase}

## I. INFORMASI UMUM
- **Mata Pelajaran**: ${formData.mataPelajaran}
- **Fase / Kelas**: ${formData.fase}
- **Topik Utama**: ${formData.topik}
- **Alokasi Waktu**: ${formData.durasi}`;

    if (formData.components.cp) {
      content += `\n\n---\n## II. CAPAIAN PEMBELAJARAN (CP)\n### 📘 Analisis Capaian Pembelajaran Elemen (${upperSub})\nPeserta didik mampu menganalisis interaksi komponen ${formData.topik}, memahami keterhubungan fenomena nyata, serta merancang solusi solutif secara kritis dan kolaboratif.`;
    }

    if (formData.components.tp) {
      content += `\n\n---\n## III. TUJUAN PEMBELAJARAN (TP)\n### 🎯 Poin Tujuan Pembelajaran ABCD (${upperSub})\n- **TP1**: Menganalisis konsep dan fungsi dasar dari ${formData.topik}.\n- **TP2**: Menyusun model analisis terstruktur dan grafik pemrosesan data.\n- **TP3**: Mempresentasikan hasil analisis proyek kelompok secara kolaboratif.`;
    }

    if (formData.components.atp) {
      content += `\n\n---\n## IV. ALUR TUJUAN PEMBELAJARAN (ATP)\n### 🗺️ Pemetaan Runtutan ATP (${upperSub})\n| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |\n| :--- | :--- | :--- | :--- |\n| **ATP.01** | 2 JP | Mampu menganalisis konsep dasar ${formData.topik} | Formatif Latihan Soal |\n| **ATP.02** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |`;
    }

    if (formData.components.kktp) {
      content += `\n\n---\n## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)\n### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (${upperSub})\n| Kriteria Penilaian | Belum Memenuhi (1) | Memenuhi (2-3) | Sangat Baik (4) |\n| :--- | :--- | :--- | :--- |\n| **Penerapan Konsep** | Belum menguasai alur dasar | Tepat mengidentifikasi 80% komponen | Tepat 100% & solutif |`;
    }

    if (formData.components.prota) {
      content += `\n\n---\n## VI. PROGRAM TAHUNAN (PROTA)\n### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (${upperSub})\n| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |\n| :--- | :--- | :--- | :--- |\n| **1** | ${formData.topik} | 18 JP | Semester 1 |`;
    }

    if (formData.components.prosem) {
      content += `\n\n---\n## VII. PROGRAM SEMESTER (PROSEM)\n### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (${upperSub})\n| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **1** | ${formData.topik} | 6 JP | x | x | | | | |`;
    }

    content += `\n\n---\n## VIII. INTEGRASI 3 PILAR DEEP LEARNING\n${formData.pilarFocus.mindful ? '- **Mindful Learning**: Siswa diajak melakukan sesi hening STOP 3 menit untuk membangun kesadaran belajar.\n' : ''}${formData.pilarFocus.meaningful ? '- **Meaningful Learning**: Menganalisis isu lingkungan/kasus nyata di sekitar lingkungan sekolah.\n' : ''}${formData.pilarFocus.joyful ? '- **Joyful Learning**: Kuis interaktif berbasis kelompok dan presentasi solutif.' : ''}`;

    return content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1)) return;

    setIsLoading(true);
    try {
      const activePilars = Object.keys(formData.pilarFocus)
        .filter((k) => formData.pilarFocus[k])
        .map((k) => k.toUpperCase());

      const activeComps = Object.keys(formData.components)
        .filter((k) => formData.components[k])
        .map((k) => k.toUpperCase());

      const generatedContent = generateMarkdownStructure();

      const newDocument = {
        id: `doc_${Date.now()}`,
        title: `Modul Ajar ${formData.mataPelajaran} - ${formData.topik}`,
        subject: formData.mataPelajaran,
        phase: formData.fase,
        topic: formData.topik,
        status: 'In Progress',
        content: generatedContent,
        summary: `Komponen: [${activeComps.join(', ')}] | Pilar: [${activePilars.join(', ')}]`
      };

      if (onCreateDocument) {
        onCreateDocument(newDocument);
      } else if (onSuccess) {
        onSuccess(newDocument);
      }

      onClose();
    } catch (err) {
      console.error("[WIZARD ERROR]", err);
      setErrors({ global: 'Gagal merancang dokumen. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#0F172A] border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0B192C]">
          <div>
            <h2 className="text-base font-bold text-[#D4AF37] flex items-center gap-2">
              <span>✨</span> Wizard Generator Perangkat Ajar
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rancang Perangkat Ajar Terintegrasi 3 Pilar Deep Learning
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-white font-bold p-1 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-100">
          {errors.global && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400">
              {errors.global}
            </div>
          )}

          {/* Preset Quick Buttons */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">⚡ Preset Cepat:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TOPICS.map((preset) => (
                <button
                  key={preset.topic}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-[11px] text-slate-300 transition-colors cursor-pointer"
                >
                  {preset.subject}
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mata Pelajaran *</label>
            <input
              type="text"
              name="mataPelajaran"
              required
              value={formData.mataPelajaran}
              onChange={handleChange}
              placeholder="Contoh: IPA & Biologi / Matematika"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {errors.mataPelajaran && <p className="text-xs text-rose-400 mt-1">{errors.mataPelajaran}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Fase / Kelas *</label>
            <select
              name="fase"
              value={formData.fase}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topik Utama / Materi Pokok *</label>
            <input
              type="text"
              name="topik"
              required
              value={formData.topik}
              onChange={handleChange}
              placeholder="Contoh: Ekosistem & Keanekaragaman Hayati"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {errors.topik && <p className="text-xs text-rose-400 mt-1">{errors.topik}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Alokasi Waktu</label>
            <input
              type="text"
              name="durasi"
              value={formData.durasi}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* PILIHAN KOMPONEN DOKUMEN WAJIB */}
          <div className="pt-1">
            <label className="block text-xs font-bold text-[#D4AF37] mb-2">
              Pilihan Komponen Perangkat Ajar Wajib:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              {[
                { key: 'modulAjar', label: '📘 Modul Ajar' },
                { key: 'cp', label: '📘 CP (Capaian)' },
                { key: 'tp', label: '🎯 TP (Tujuan)' },
                { key: 'atp', label: '🗺️ ATP (Alur)' },
                { key: 'kktp', label: '📊 KKTP & Rubrik' },
                { key: 'prota', label: '🗓️ Prota' },
                { key: 'prosem', label: '📅 Prosem' }
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none hover:text-white">
                  <input
                    type="checkbox"
                    checked={formData.components[item.key]}
                    onChange={() => handleComponentToggle(item.key)}
                    className="accent-[#D4AF37] rounded w-4 h-4 cursor-pointer"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* INTEGRASI 3 PILAR DEEP LEARNING */}
          <div className="pt-1">
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Integrasi 3 Pilar Deep Learning:
            </label>
            <div className="flex gap-4 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
              {[
                { key: 'mindful', label: '🧠 Mindful' },
                { key: 'meaningful', label: '🎯 Meaningful' },
                { key: 'joyful', label: '🚀 Joyful' }
              ].map((pilar) => (
                <label key={pilar.key} className="flex items-center gap-1.5 cursor-pointer select-none hover:text-white">
                  <input
                    type="checkbox"
                    checked={formData.pilarFocus[pilar.key]}
                    onChange={() => handlePilarToggle(pilar.key)}
                    className="accent-[#D4AF37] rounded w-4 h-4 cursor-pointer"
                  />
                  <span>{pilar.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Merancang Dokumen...</span>
                </>
              ) : (
                <span>✨ Buat Dokumen</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
