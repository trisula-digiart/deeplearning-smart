import React from 'react';
import {
  FileText,
  Sparkles,
  Zap,
  CheckCircle2,
  Type,
  Check
} from 'lucide-react';

const DOC_TREE_LABELS = [
  { id: 'cp', label: '1. Capaian Pembelajaran (CP)' },
  { id: 'tp', label: '2. Tujuan Pembelajaran (TP)' },
  { id: 'atp', label: '3. Alur TP (ATP)' },
  { id: 'kktp', label: '4. KKTP Rubrik' },
  { id: 'prota', label: '5. Program Tahunan' },
  { id: 'prosem', label: '6. Program Semester' },
  { id: 'modul', label: '7. Modul Ajar Utuh' }
];

/**
 * TRISULAPROMPT - Notion Studio Component
 * Notion-style document editing canvas with tree-view navigation and quick inline AI tools.
 * 
 * @param {Object} props
 * @param {Object} props.activeProject - Active project object
 * @param {string} props.activeDocView - Active document tab ('cp'|'tp'|'atp'|'kktp'|'prota'|'prosem'|'modul')
 * @param {Function} props.setActiveDocView - Setter for active document view tab
 * @param {string} props.notionContent - Raw content string for editing
 * @param {Function} props.setNotionContent - Setter for notion content
 * @param {Function} props.onAiFixGrammar - Trigger for AI Grammar Polish
 * @param {Function} props.onAiExpand - Trigger for AI Content Expansion
 * @param {Function} props.onAiSimplify - Trigger for AI Simplification
 * @param {boolean} props.isAiThinking - Processing indicator state
 */
export default function NotionStudio({
  activeProject,
  activeDocView,
  setActiveDocView,
  notionContent,
  setNotionContent,
  onAiFixGrammar,
  onAiExpand,
  onAiSimplify,
  isAiThinking
}) {
  const currentDocLabel =
    DOC_TREE_LABELS.find((item) => item.id === activeDocView)?.label ||
    '7. Modul Ajar Utuh';

  return (
    <div className="h-[calc(100vh-61px)] flex overflow-hidden bg-[#0B192C]">
      {/* LEFT PANEL: Document Navigation Tree */}
      <div className="w-64 bg-slate-950/80 border-r border-slate-800 p-4 space-y-4 overflow-y-auto shrink-0 hidden md:block">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-400" /> Dokumen Tree
          </h3>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
            Notion Mode
          </span>
        </div>

        {}
        <div className="space-y-1">
          {DOC_TREE_LABELS.map((item) => {
            const isActive = activeDocView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDocView(item.id)}
                className={`w-full text-left text-xs px-3 py-2.5 rounded-xl font-medium transition flex items-center justify-between group ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-[11px] text-slate-400 space-y-1.5">
            <p className="font-bold text-slate-200 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Fitur AI Studio
            </p>
            <p className="leading-relaxed">
              Gunakan bilah tombol AI di bagian atas editor untuk memperbaiki tata bahasa, memperluas uraian, atau menyederhanakan teks secara otomatis.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN PANEL: Notion-Style Rich Text Canvas */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto relative bg-[#0B192C]">
        {/* Mobile Horizontal Sub-Menu for Doc Tree */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto pb-3 mb-2 border-b border-slate-800 shrink-0">
          {DOC_TREE_LABELS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveDocView(item.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                activeDocView === item.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 bg-slate-900 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 flex flex-col flex-1">
          {/* Header Bar & Inline AI Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider inline-flex items-center gap-1">
                <FileText className="w-3 h-3 text-emerald-400" />
                {currentDocLabel}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white mt-2">
                {activeProject ? activeProject.title : 'Modul Ajar'}
              </h2>
            </div>

            {/* Inline AI Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onAiFixGrammar}
                disabled={isAiThinking}
                className="text-xs bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-1.5 rounded-xl border border-indigo-500/30 font-bold transition flex items-center gap-1.5 disabled:opacity-50 active:scale-95 shadow-sm"
                title="Perbaiki tata bahasa dan ejaan sesuai PUEBI"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Fix Grammar
              </button>

              <button
                onClick={onAiExpand}
                disabled={isAiThinking}
                className="text-xs bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/30 font-bold transition flex items-center gap-1.5 disabled:opacity-50 active:scale-95 shadow-sm"
                title="Perluas deskripsi dengan contoh kontekstual"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Expand
              </button>

              <button
                onClick={onAiSimplify}
                disabled={isAiThinking}
                className="text-xs bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold transition flex items-center gap-1.5 disabled:opacity-50 active:scale-95 shadow-sm"
                title="Sederhanakan kalimat agar lebih ringkas"
              >
                <Type className="w-3.5 h-3.5" /> AI Simplify
              </button>
            </div>
          </div>

          {/* Textarea Editor Canvas */}
          <div className="flex-1 min-h-[420px] flex flex-col bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 shadow-inner">
            <textarea
              className="w-full h-full flex-1 bg-transparent text-slate-200 text-xs sm:text-sm leading-relaxed outline-none resize-none font-mono placeholder-slate-600 focus:ring-0"
              value={notionContent}
              onChange={(e) => setNotionContent(e.target.value)}
              placeholder="Mulai mengetik atau gunakan tombol AI di atas untuk menyintesis konten..."
            />
          </div>

          {/* Canvas Bottom Metadata & Auto-save Status */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Tersimpan Otomatis di Local State
            </span>
            <span>
              Karakter: {notionContent ? notionContent.length : 0} | Kata: {notionContent ? notionContent.trim().split(/\s+/).filter(Boolean).length : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
