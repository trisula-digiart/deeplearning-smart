import React from 'react';
import {
  X,
  BrainCircuit,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  FileText,
  Layers,
  Zap,
  BookOpen,
  UserCheck,
  Building2,
  AlertCircle
} from 'lucide-react';

/**
 * TRISULAPROMPT - Deep Learning Wizard Modal Component (v2.5)
 * Guided 4-Step interactive modal for synthesizing CP into TP, ATP, KKTP, Prota, Prosem, & Modul Ajar.
 */
export default function DeepLearningWizard({
  isOpen,
  onClose,
  wizardStep,
  setWizardStep,
  wizardData,
  setWizardData,
  isGenerating,
  onNextStep,
  onPrevStep
}) {
  if (!isOpen) return null;

  const stepsList = [
    { step: 1, title: 'Data Dasar & CP', desc: 'Identitas & Capaian Pembelajaran' },
    { step: 2, title: 'AI Diagnostic', desc: 'Profil Murid & Isu Sekitar' },
    { step: 3, title: 'Review Konsep', desc: 'Evaluasi Draf TP, ATP, & Prota' },
    { step: 4, title: 'Konfirmasi', desc: 'Luncurkan Modul Ajar' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      {}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                Deep Learning Wizard Engine v2.5
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                  3 Pilar
                </span>
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                Sintesis Terarah: Mindful • Meaningful • Joyful
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            aria-label="Close Wizard Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0 overflow-x-auto gap-2">
          {stepsList.map((s) => {
            const isActive = wizardStep === s.step;
            const isDone = wizardStep > s.step;
            return (
              <div key={s.step} className="flex items-center gap-2.5 shrink-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </div>
                <div className="hidden md:block text-left">
                  <p
                    className={`text-xs font-bold ${
                      isActive
                        ? 'text-white'
                        : isDone
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-[9px] text-slate-500 font-medium">{s.desc}</p>
                </div>
                {s.step < 4 && (
                  <ChevronRight className="w-4 h-4 text-slate-700 hidden sm:block shrink-0 ml-1" />
                )}
              </div>
            );
          })}
        </div>

        {}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-[#0B192C]">
          {/* STEP 1: Basic Metadata & Capaian Pembelajaran Input */}
          {wizardStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-xs text-indigo-200 leading-relaxed">
                  Langkah 1: Masukkan data satuan pendidikan dan Capaian Pembelajaran (CP) Kurikulum Merdeka yang akan diturunkan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                    Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition placeholder-slate-600"
                    value={wizardData.subject}
                    onChange={(e) =>
                      setWizardData({ ...wizardData, subject: e.target.value })
                    }
                    placeholder="Contoh: Informatika, Bahasa Indonesia..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                    Kelas & Fase
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition placeholder-slate-600"
                    value={wizardData.grade}
                    onChange={(e) =>
                      setWizardData({ ...wizardData, grade: e.target.value })
                    }
                    placeholder="Contoh: Kelas X (Fase E)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">
                    Semester
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
                    value={wizardData.semester}
                    onChange={(e) =>
                      setWizardData({ ...wizardData, semester: e.target.value })
                    }
                  >
                    <option value="Semester 1 (Ganjil)">Semester 1 (Ganjil)</option>
                    <option value="Semester 2 (Genap)">Semester 2 (Genap)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1 block">
                    Fase Kurikulum
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
                    value={wizardData.phase}
                    onChange={(e) =>
                      setWizardData({ ...wizardData, phase: e.target.value })
                    }
                  >
                    <option value="Fase A">Fase A (Kelas 1-2 SD)</option>
                    <option value="Fase B">Fase B (Kelas 3-4 SD)</option>
                    <option value="Fase C">Fase C (Kelas 5-6 SD)</option>
                    <option value="Fase D">Fase D (Kelas 7-9 SMP)</option>
                    <option value="Fase E">Fase E (Kelas 10 SMA/SMK)</option>
                    <option value="Fase F">Fase F (Kelas 11-12 SMA/SMK)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                  Capaian Pembelajaran (CP) Utuh
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition leading-relaxed font-sans placeholder-slate-600"
                  value={wizardData.cpText}
                  onChange={(e) =>
                    setWizardData({ ...wizardData, cpText: e.target.value })
                  }
                  placeholder="Tempelkan narasi Capaian Pembelajaran (CP) resmi..."
                />
              </div>
            </div>
          )}

          {}
          {wizardStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent border border-amber-500/20 rounded-2xl">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> AI Diagnostic Interview Engine
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Informasi ini digunakan Deep Learning Engine untuk menyintesis modul ajar yang memiliki korelasi kontekstual tinggi (Mindful, Meaningful, & Joyful).
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Profil & Gaya Belajar Dominan Murid
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition placeholder-slate-600"
                  value={wizardData.learningStyle}
                  onChange={(e) =>
                    setWizardData({ ...wizardData, learningStyle: e.target.value })
                  }
                  placeholder="Contoh: Kinestetik & Visual (60%), Butuh pendampingan konsep dasar"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" /> Sarana, Prasarana, & Ketersediaan Alat
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition placeholder-slate-600"
                  value={wizardData.infrastructure}
                  onChange={(e) =>
                    setWizardData({ ...wizardData, infrastructure: e.target.value })
                  }
                  placeholder="Contoh: Proyektor di kelas, WiFi Sekolah, Smartphone Siswa"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-emerald-400" /> Isu Nyata / Konteks Masalah Sekitar Sekolah
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none focus:border-indigo-500 transition placeholder-slate-600"
                  value={wizardData.realIssue}
                  onChange={(e) =>
                    setWizardData({ ...wizardData, realIssue: e.target.value })
                  }
                  placeholder="Contoh: Kesulitan membedakan hoaks vs fakta di media sosial lokal"
                />
              </div>
            </div>
          )}

          {}
          {wizardStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              {isGenerating ? (
                <div className="py-16 text-center space-y-4">
                  <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
                  <div>
                    <p className="text-sm font-bold text-white">
                      Deep Learning Engine v2.5 Sedang Menyintesis...
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Menurunkan CP menjadi TP, ATP, KKTP, Prota, dan Prosem berbasis 3 Pilar...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    Sintesis Konsep Berhasil! Silakan tinjau draf hasil olahan AI di bawah ini.
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      Rumusan Tujuan Pembelajaran (TP)
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {wizardData.generatedTP || 'Tujuan Pembelajaran belum terproses.'}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      Matriks Alur Tujuan Pembelajaran (ATP)
                    </h4>
                    <p className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                      {wizardData.generatedATP || 'ATP Matrix belum terproses.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {}
          {wizardStep === 4 && (
            <div className="text-center py-8 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-extrabold text-white">
                  Perangkat Ajar Siap Di-Launch!
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Modul Ajar utuh terintegrasi 3 Pilar (Mindful, Meaningful, Joyful) telah berhasil dirancang dan siap ditinjau di AI Workspace.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 max-w-md mx-auto text-left space-y-1 text-xs">
                <p className="font-bold text-slate-200">{wizardData.subject} - {wizardData.grade}</p>
                <p className="text-slate-400 text-[11px]">{wizardData.semester} • {wizardData.phase}</p>
              </div>
            </div>
          )}
        </div>

        {}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            disabled={wizardStep === 1 || isGenerating}
            onClick={onPrevStep}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            Kembali
          </button>

          <button
            disabled={isGenerating}
            onClick={onNextStep}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 border border-indigo-400/20 transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {wizardStep === 4 ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Luncurkan Modul Ajar Utuh
              </>
            ) : wizardStep === 2 ? (
              <>
                <BrainCircuit className="w-4 h-4 text-amber-300" />
                Proses Sintesis Deep Learning
              </>
            ) : (
              <>
                Lanjut Step berikutnya
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
