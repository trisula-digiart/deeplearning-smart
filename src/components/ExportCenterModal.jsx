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
  Layers
} from 'lucide-react';

/**
 * TRISULAPROMPT - Export Center Modal Component v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Multi-format export dialog for printing & exporting Kurikulum Merdeka teaching materials
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility flag
 * @param {Function} props.onClose - Callback to dismiss modal
 * @param {Object} props.exportOptions - Map of selected document components to include
 * @param {Function} props.setExportOptions - Setter for export component checkboxes
 * @param {Function} props.onExportPDF - Trigger callback for PDF downloading
 * @param {Function} props.onExportWord - Trigger callback for Word (.docx) exporting
 * @param {Function} props.onPrint - Trigger callback for browser print dialog
 */
export default function ExportCenterModal({
  isOpen,
  onClose,
  exportOptions = {},
  setExportOptions,
  onExportPDF,
  onExportWord,
  onPrint
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
    setExportOptions(updated);
  };

  const selectedCount = Object.values(exportOptions).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                Export Center Perangkat Ajar
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
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

        {/* Selection Control Bar */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            Komponen Terpilih ({selectedCount}/{componentItems.length})
          </span>
          <div className="flex gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleToggleAll(true)}
              className="text-indigo-400 hover:underline font-semibold cursor-pointer"
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

        {/* Component Checkboxes Container */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {componentItems.map((item) => {
            const isChecked = !!exportOptions[item.key];
            return (
              <label
                key={item.key}
                className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer ${
                  isChecked
                    ? 'bg-indigo-600/10 border-indigo-500/40 text-slate-100'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    setExportOptions({
                      ...exportOptions,
                      [item.key]: e.target.checked
                    })
                  }
                  className="mt-0.5 accent-indigo-600 rounded w-4 h-4 cursor-pointer"
                />
                <div className="flex-1 text-left">
                  <p className="text-xs font-bold leading-none">{item.label}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                </div>
                {isChecked && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
              </label>
            );
          })}
        </div>

        {/* Export Action Buttons */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onExportPDF}
              disabled={selectedCount === 0}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 border border-indigo-400/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <FileDown className="w-4 h-4" /> Download PDF
            </button>

            <button
              type="button"
              onClick={onExportWord}
              disabled={selectedCount === 0}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs py-3 rounded-xl font-bold border border-slate-700 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-400" /> Export Word (.docx)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={onPrint}
              disabled={selectedCount === 0}
              className="bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs py-2.5 rounded-xl font-semibold border border-slate-800 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" /> Direct Print
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs py-2.5 rounded-xl font-semibold border border-slate-800 transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" /> Salin Link Berbagi
            </button>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="pt-2 text-center">
          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Format terstandarisasi Kurikulum Merdeka v2.5
          </p>
        </div>
      </div>
    </div>
  );
}
