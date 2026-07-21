import React from 'react';
import {
  Bot,
  Send,
  RefreshCw,
  Edit3,
  Check,
  Download,
  Sparkles,
  Zap,
  FileText,
  User,
  CheckCircle2
} from 'lucide-react';

/**
 * TRISULAPROMPT - Split-Screen AI Workspace View Component (v2.5)
 * Dual-panel interactive interface for co-editing Kurikulum Merdeka documents with AI.
 * 
 * @param {Object} props
 * @param {Object} props.activeProject - Selected project document object
 * @param {Function} props.setActiveProject - Setter for project state updates
 * @param {string} props.activeDocView - Active document tab ('modul'|'cp'|'tp'|'atp'|'kktp'|'prota'|'prosem')
 * @param {Function} props.setActiveDocView - Setter for active document view tab
 * @param {Array} props.chatMessages - Array of chat conversation objects { role, text }
 * @param {string} props.chatInput - Controlled input text state for chat
 * @param {Function} props.setChatInput - Setter for chat input text
 * @param {boolean} props.isAiThinking - Loading status boolean for AI generation
 * @param {Function} props.onSendChatMessage - Callback trigger when sending user prompt
 * @param {Function} props.onAccAndContinue - Callback trigger when approving current document section
 * @param {Function} props.onOpenExport - Callback trigger to open Export Center modal
 */
export default function SplitWorkspace({
  activeProject,
  setActiveProject,
  activeDocView,
  setActiveDocView,
  chatMessages = [],
  chatInput,
  setChatInput,
  isAiThinking,
  onSendChatMessage,
  onAccAndContinue,
  onOpenExport
}) {
  const docTabs = [
    { id: 'modul', label: 'Modul Ajar' },
    { id: 'cp', label: 'CP' },
    { id: 'tp', label: 'TP' },
    { id: 'atp', label: 'ATP' },
    { id: 'kktp', label: 'KKTP' },
    { id: 'prota', label: 'Prota' },
    { id: 'prosem', label: 'Prosem' }
  ];

  return (
    <div className="h-[calc(100vh-61px)] flex flex-col lg:flex-row overflow-hidden bg-[#0B192C]">
      {/* LEFT PANEL: AI Co-Pilot Interactive Chat Interface */}
      {}
      <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-950/60 shrink-0">
        {/* Panel Header */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">
                AI Co-Pilot (Deep Learning v2.5)
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                Pilar: Mindful • Meaningful • Joyful
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connected
          </span>
        </div>

        {/* Scrollable Chat Conversation Log */}
        {}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] text-xs leading-relaxed p-3.5 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md font-medium'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isAiThinking && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs italic bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 w-fit shadow-md">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Deep Learning Engine sedang menyintesis revisi...</span>
            </div>
          )}
        </div>

        {/* Quick Decision Actions Bar */}
        {}
        <div className="p-2.5 bg-slate-900/70 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={onAccAndContinue}
            className="whitespace-nowrap bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" /> ACC & Lanjutkan
          </button>
          <button
            onClick={() =>
              setChatInput(
                'Tolong tajamkan pilar Meaningful Learning dengan studi kasus nyata lingkungan.'
              )
            }
            className="whitespace-nowrap bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-[11px] px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" /> Minta Revisi
          </button>
          <button
            onClick={() =>
              setChatInput(
                'Regenerate ulang rumusan TP & ATP berbasis gaya belajar kinestetik murid.'
              )
            }
            className="whitespace-nowrap bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Regenerate
          </button>
        </div>

        {/* Prompt Input Form Bar */}
        {}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ketik instruksi atau penyesuaian dokumen..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 transition placeholder-slate-500"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendChatMessage()}
          />
          <button
            onClick={onSendChatMessage}
            disabled={!chatInput.trim() || isAiThinking}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0"
            aria-label="Send message to AI"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Live Document Canvas Reader */}
      {}
      <div className="w-full lg:w-7/12 flex flex-col bg-[#0B192C]">
        {/* Sub-Navigation Document Views Header */}
        <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between overflow-x-auto shrink-0 gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {docTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDocView(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  activeDocView === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 shrink-0">
            <button
              onClick={onOpenExport}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> Cetak / PDF
            </button>
          </div>
        </div>

        {/* Live Canvas Paper Display */}
        {}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-950/40">
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 text-xs leading-relaxed">
            {/* Document Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  LIVE CANVAS PREVIEW
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">
                  {activeProject ? activeProject.title : 'Judul Perangkat Ajar'}
                </h2>
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-[11px] text-slate-400 font-medium">Status Dokumen</p>
                <p className="text-xs font-bold text-emerald-400 flex items-center sm:justify-end gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeProject ? activeProject.status : 'In Progress'}
                </p>
              </div>
            </div>

            {/* Document Content Output */}
            {}
            <div className="space-y-4 whitespace-pre-wrap font-sans text-slate-200 leading-relaxed min-h-[350px]">
              {activeProject && activeProject.docTree ? (
                activeProject.docTree[activeDocView] || (
                  <div className="p-8 text-center text-slate-500 italic space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-600" />
                    <p>Dokumen untuk bagian ini belum dibentuk oleh Deep Learning Engine.</p>
                  </div>
                )
              ) : (
                <p className="text-slate-500 italic">Tidak ada proyek yang aktif.</p>
              )}
            </div>

            {/* Document Footer Metadata */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
              <span>Kurikulum Merdeka • Deep Learning Engine v2.5</span>
              <span className="text-indigo-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Terintegrasi 3 Pilar (Mindful, Meaningful, Joyful)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
