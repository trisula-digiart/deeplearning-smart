import React from 'react';
import {
X,
Download,
FileDown,
Printer,
Share2,
Check,
FileText, 
Sparkles,
Layers,
Coins
} from 'lucide-react';

/

TRISULAPROMPT - Export Center Modal Component v3.0

Author: TRISULACODER v8.7 - Lead Solution Architect

Module: Multi-format export dialog with credit cost indicator & component selectors
*/

export default function ExportCenterModal({
isOpen,
onClose,
exportOptions = {},
setExportOptions,
onExportPDF,
onExportWord,
onExportTxt,
onPrint,
currentUser
}) {
if (!isOpen) return null;

const componentItems = [
{ key: 'includeCP', label: '1. Capaian Pembelajaran (CP)', desc: 'Narasi CP resmi Kemendikbudristek' },
{ key: 'includeTP', label: '2. Tujuan Pembelajaran (TP)', desc: 'Rumusan TP terintegrasi 3 Pilar' },
{ key: 'includeATP', label: '3. Alur Tujuan Pembelajaran (ATP)', desc: 'Matriks alokasi JP & asesmen' },
{ key: 'includeKKTP', label: '4. KKTP / Rubrik Penilaian', desc: 'Kriteria Ketuntasan & indikator' },
{ key: 'includeProta', label: '5. Program Tahunan (Prota)', desc: 'Peta alokasi waktu tahunan' },
{ key: 'includeProsem', label: '6. Program Semester (Prosem)', desc: 'Sebaran materi per bulan' },
{ key: 'includeModul', label: '7. Modul Ajar Utuh (3 Pilar)', desc: 'Rencana pembelajaran lengkap' }
];

const handleToggleAll = (status) => {
const updated = {};
componentItems.forEach((item) => {
updated[item.key] = status;
});
if (setExportOptions) {
setExportOptions(updated);
}
};

const selectedCount = Object.values(exportOptions).filter(Boolean).length;
const isPremium = Boolean(currentUser?.is_premium);

return (



    {/* Header Modal */}
    <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 border border-indigo-400/30 flex items-center justify-center text-amber-300 shadow-lg shadow-indigo-600/20">
          <Download className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            Export Center Perangkat Ajar
          </h3>
          <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
            Cetak & Unduh Dokumen Kurikulum Merdeka
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
        aria-label="Close Export Modal"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Status Kuota */}
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <Coins className="w-4 h-4 text-[#D4AF37]" />
        <span className="text-slate-300 font-semibold">Status Kuota Cetak:</span>
      </div>
      <span className="font-mono font-bold text-amber-300">
        {isPremium ? 'Unlimited Pro' : `${currentUser?.kredit_tersisa ?? 0} Token Tersisa`}
      </span>
    </div>

    {/* Selector Header */}
    <div className="flex items-center justify-between text-xs pt-1">
      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
        <Layers className="w-4 h-4 text-[#D4AF37]" />
        Komponen Terpilih ({selectedCount}/{componentItems.length})
      </span>
      <div className="flex gap-2 text-[11px]">
        <button
          type="button"
          onClick={() => handleToggleAll(true)}
          className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
        >
          Pilih Semua
        </button>
        <span className="text-slate-600">•</span>
        <button
          type="button"
          onClick={() => handleToggleAll(false)}
          className="text-slate-400 hover:underline cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>

    {/* Checkbox List */}
    <div className="space-y-2 max-h-52 sm:max-h-60 overflow-y-auto pr-1">
      {componentItems.map((item) => {
        const isChecked = !!exportOptions[item.key];
        return (
          <label
            key={item.key}
            className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl border transition cursor-pointer ${
              isChecked
                ? 'bg-indigo-600/15 border-indigo-500/50 text-slate-100 shadow-sm'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) =>
                setExportOptions && setExportOptions({
                  ...exportOptions,
                  [item.key]: e.target.checked
                })
              }
              className="mt-0.5 accent-[#D4AF37] rounded w-4 h-4 cursor-pointer"
            />
            <div className="flex-1 text-left">
              <p className="text-xs font-bold leading-none">{item.label}</p>
              <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
            </div>
            {isChecked && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </label>
        );
      })}
    </div>

    {/* Action Buttons */}
    <div className="pt-2 border-t border-slate-800 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onExportWord}
          disabled={selectedCount === 0}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2.5 rounded-xl font-bold transition flex items-center justify-between px-3 shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Word (.doc)</span>
          </div>
          <span className="text-[10px] bg-slate-950/50 px-1.5 py-0.5 rounded text-amber-300 font-mono">
            {isPremium ? 'Pro' : '-1 Token'}
          </span>
        </button>

        <button
          type="button"
          onClick={onExportPDF}
          disabled={selectedCount === 0}
          className="bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:brightness-110 text-slate-950 text-xs py-2.5 rounded-xl font-bold transition flex items-center justify-between px-3 shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <FileDown className="w-4 h-4 text-slate-950" />
            <span>Download PDF</span>
          </div>
          <span className="text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded text-slate-950 font-mono">
            {isPremium ? 'Pro' : '-1 Token'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-0.5">
        <button
          type="button"
          onClick={onPrint}
          disabled={selectedCount === 0}
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs py-2.5 rounded-xl font-semibold border border-slate-700 transition flex items-center justify-between px-3 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Cetak / A4</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {isPremium ? 'Pro' : '-1 Token'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs py-2.5 rounded-xl font-semibold border border-slate-800 transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Salin Link</span>
        </button>
      </div>
    </div>

    {/* Footer Note */}
    <div className="pt-1 text-center">
      <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
        <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Format terstandarisasi Deep Learning Engine v3.0
      </p>
    </div>

  </div>
</div>


);
}
