import React, { useState, useEffect } from 'react';
import ExportCenterModal from './ExportCenterModal';

// ============================================================================
// COMPONENT: AI WORKSPACE & LIVE CANVAS EDITOR
// Features: Markdown Parser, LaTeX Renderer, AI Co-Pilot, Sub-Tab Filter
// ============================================================================

export default function AIWorkspace({
activeDocument,
onSaveDocument,
currentUser,
onDeductQuota,
onTriggerPaywall
}) {
const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
const [docContent, setDocContent] = useState(activeDocument?.content || '');
const [isExportModalOpen, setIsExportModalOpen] = useState(false);
const [inputInstruction, setInputInstruction] = useState('');
const [isGenerating, setIsGenerating] = useState(false);

const [messages, setMessages] = useState([
{
id: 1,
sender: 'ai',
text: Halo ${currentUser?.nama || 'Pengajar'}! Saya **Trisula AI Co-Pilot v8.7**. Dokumen **${activeDocument?.subject || 'Perangkat Ajar'}** siap kita kembangkan bersama.
}
]);

useEffect(() => {
if (activeDocument?.content) {
setDocContent(activeDocument.content);
}
}, [activeDocument]);

// Helper Sanitasi Ekspresi LaTeX ke Simbol Matematika Rapi
const formatMathFormula = (formulaStr) => {
return formulaStr
.replace(/\mathbf{(.*?)}/g, '$1')       .replace(/\bar{x}/g, 'x̄')       .replace(/\frac{([^}]+)}{([^}]+)}/g, '($1 / $2)')       .replace(/\sum_{([^}]+)}^{([^}]+)}/g, 'Σ($1..$2)')       .replace(/\sum/g, 'Σ')       .replace(/\sqrt{([^}]+)}/g, '√($1)')
.replace(/\times/g, '×')
.replace(/\div/g, '÷')
.replace(/\cdot/g, '·');
};

// Parser Markdown -> HTML dengan Dukungan Tabel Native & LaTeX
const parseMarkdownToHTML = (markdown) => {
if (!markdown) return '';
let content = markdown;

// 1. LATEX DISPLAY PARSER ($$...$$)
content = content.replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
  const cleanFormula = formatMathFormula(formula.trim());
  return `<div style="margin:14px 0; padding:12px 16px; background-color:#1E293B; border-left:4px solid #D4AF37; border-radius:8px; text-align:center;">
    <div style="color:#D4AF37; font-size:10px; font-weight:bold; margin-bottom:4px; font-family:'Courier New', monospace; text-transform:uppercase;">[ FORMULA MATEMATIKA / LATEX ]</div>
    <div style="font-family:'Courier New', monospace; font-weight:bold; font-size:14px; color:#F8FAFC;">${cleanFormula}</div>
  </div>`;
});

// 2. LATEX INLINE PARSER ($...$)
content = content.replace(/\$(.*?)\$/g, (match, formula) => {
  const cleanFormula = formatMathFormula(formula.trim());
  return `<code style="background-color:#0F172A; color:#F59E0B; border:1px solid #334155; padding:2px 6px; border-radius:4px; font-family:'Courier New', monospace; font-weight:bold;">${cleanFormula}</code>`;
});

let lines = content.split('\n');
let htmlResult = [];
let inTable = false;
let tableBuffer = [];

const renderTable = (rows) => {
  if (rows.length === 0) return '';
  let tableHtml = `<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; margin: 16px 0; font-size:12px; border-color:#334155;">`;
  rows.forEach((row, rowIndex) => {
    let cleanRow = row.trim();
    if (cleanRow.startsWith('|')) cleanRow = cleanRow.substring(1);
    if (cleanRow.endsWith('|')) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    if (cleanRow.includes('---')) return;

    let cells = cleanRow.split('|').map(c => c.trim());

    if (rowIndex === 0) {
      tableHtml += `<tr style="background-color:#1E293B; color:#F8FAFC;">`;
      cells.forEach(cell => {
        tableHtml += `<th style="border:1px solid #334155; padding:10px; text-align:left; font-weight:bold;">${cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</th>`;
      });
      tableHtml += `</tr>`;
    } else {
      let bg = rowIndex % 2 === 0 ? '#0F172A' : '#1E293B';
      tableHtml += `<tr style="background-color:${bg}; color:#E2E8F0;">`;
      cells.forEach(cell => {
        tableHtml += `<td style="border:1px solid #334155; padding:8px;">${cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</td>`;
      });
      tableHtml += `</tr>`;
    }
  });
  tableHtml += `</table>`;
  return tableHtml;
};

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.trim().startsWith('|')) {
    inTable = true;
    tableBuffer.push(line);
    continue;
  } else if (inTable) {
    htmlResult.push(renderTable(tableBuffer));
    tableBuffer = [];
    inTable = false;
  }

  if (line.startsWith('# ')) {
    htmlResult.push(`<h1 style="color:#F59E0B; border-bottom:2px solid #D4AF37; padding-bottom:6px; font-size:18px; font-weight:bold; margin-top:16px; margin-bottom:12px;">${line.replace('# ', '')}</h1>`);
  } else if (line.startsWith('## ')) {
    htmlResult.push(`<h2 style="color:#38BDF8; border-bottom:1px solid #334155; padding-bottom:4px; font-size:15px; font-weight:bold; margin-top:18px; margin-bottom:10px;">${line.replace('## ', '')}</h2>`);
  } else if (line.startsWith('### ')) {
    htmlResult.push(`<h3 style="color:#F3F4F6; font-size:13px; font-weight:bold; margin-top:14px; margin-bottom:8px;">${line.replace('### ', '')}</h3>`);
  } else if (line.trim() === '---') {
    htmlResult.push(`<hr style="border:0; border-top:1px solid #334155; margin:16px 0;"/>`);
  } else if (line.trim().startsWith('> ')) {
    htmlResult.push(`<blockquote style="border-left:4px solid #D4AF37; background:#1E293B; padding:8px 12px; margin:10px 0; color:#FDE68A; font-size:11px;">${line.replace('> ', '')}</blockquote>`);
  } else if (line.trim().startsWith('- ')) {
    htmlResult.push(`<li style="margin-left:20px; margin-bottom:4px; color:#CBD5E1;">${line.replace('- ', '')}</li>`);
  } else if (line.trim().length > 0) {
    htmlResult.push(`<p style="margin-bottom:8px; color:#CBD5E1; line-height:1.6;">${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`);
  }
}

if (inTable) htmlResult.push(renderTable(tableBuffer));
return htmlResult.join('');


};

// Seksi Sub-Tab Filter
const filterContentByTab = (fullContent, tabId) => {
if (!fullContent) return '';
if (tabId === 'modul-ajar') return fullContent;

const sections = fullContent.split(/(?=\n##\s+)/g);
const matchedSection = sections.find(sec => {
  const firstLine = sec.trim().split('\n')[0].toUpperCase();
  switch (tabId) {
    case 'cp': return firstLine.includes('CAPAIAN PEMBELAJARAN') || firstLine.includes('CP');
    case 'tp': return (firstLine.includes('TUJUAN PEMBELAJARAN') || firstLine.includes('TP')) && !firstLine.includes('ALUR') && !firstLine.includes('KRITERIA');
    case 'atp': return firstLine.includes('ALUR TUJUAN') || firstLine.includes('ATP');
    case 'kktp': return firstLine.includes('KRITERIA KETERCAPAIAN') || firstLine.includes('KKTP');
    case 'prota': return firstLine.includes('PROGRAM TAHUNAN') || firstLine.includes('PROTA');
    case 'prosem': return firstLine.includes('PROGRAM SEMESTER') || firstLine.includes('PROSEM');
    default: return false;
  }
});

return matchedSection ? matchedSection.trim() : `## SEKSI ${tabId.toUpperCase()} BELUM DI-GENERATE\n\n> ℹ️ Gunakan AI Co-Pilot di sebelah kiri untuk menyusun seksi ini secara otomatis!`;


};

// AI Co-Pilot Generator
const handleSendMessage = (overridePrompt) => {
const textToSend = overridePrompt || inputInstruction;
if (!textToSend.trim() || isGenerating) return;

if (!currentUser?.is_premium && currentUser?.kredit_tersisa <= 0) {
  onTriggerPaywall('Generasi teks AI memerlukan kuota token aktif.');
  return;
}

setInputInstruction('');
setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
setIsGenerating(true);

setTimeout(() => {
  const newAddition = `\n\n---\n## TANGGAPAN & SUPLENEN AI CO-PILOT\n- **Instruksi Diterapkan**: "${textToSend}"\n- **Pilar Deep Learning**: Mindful, Meaningful, & Joyful Integrated.\n\n$$E = m \\cdot c^2 \\quad \\text{(Simulasi Modul Ajar Otomatis)}$$`;
  const updatedContent = docContent + newAddition;

  setDocContent(updatedContent);
  if (onSaveDocument) {
    onSaveDocument({ ...activeDocument, content: updatedContent });
  }

  setMessages(prev => [
    ...prev,
    { id: Date.now() + 1, sender: 'ai', text: `✨ Seksi baru berhasil disusun dan disuntikkan langsung ke kanvas dokumen!` }
  ]);

  setIsGenerating(false);
  onDeductQuota('GENERATE_AI');
}, 1200);


};

// Handlers Unduhan (Memotong Token Persisi -1)
const handleDownloadWord = () => {
if (!currentUser?.is_premium && currentUser?.kredit_tersisa <= 0) {
onTriggerPaywall('Ekspor dokumen memerlukan kuota token aktif.');
return;
}

onDeductQuota('EXPORT_WORD');
const docTitle = activeDocument?.title || 'Modul_Ajar_Trisula';
const blob = new Blob(['\ufeff' + parseMarkdownToHTML(docContent)], { type: 'application/msword' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
link.click();
URL.revokeObjectURL(url);
setIsExportModalOpen(false);


};

const handleDownloadTxt = () => {
if (!currentUser?.is_premium && currentUser?.kredit_tersisa <= 0) {
onTriggerPaywall('Ekspor dokumen memerlukan kuota token aktif.');
return;
}

onDeductQuota('EXPORT_TXT');
const docTitle = activeDocument?.title || 'Modul_Ajar_Trisula';
const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
link.click();
URL.revokeObjectURL(url);
setIsExportModalOpen(false);


};

const handlePrintPDF = () => {
if (!currentUser?.is_premium && currentUser?.kredit_tersisa <= 0) {
onTriggerPaywall('Cetak PDF memerlukan kuota token aktif.');
return;
}

onDeductQuota('PRINT_PDF');
setIsExportModalOpen(false);
setTimeout(() => window.print(), 300);


};

const activeContent = filterContentByTab(docContent, activeSubTab);

return (


  {/* CO-PILOT CHAT PANEL (LEFT) */}
  <div className="w-full lg:w-4/12 bg-slate-900/90 border border-amber-500/20 rounded-3xl p-4 flex flex-col justify-between shadow-xl">
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-bold text-xs text-amber-200 flex items-center gap-2">
          <span>🤖</span> AI Co-Pilot Engine
        </h3>
        <span className="text-[10px] font-mono text-slate-400">Deep Learning v8.7</span>
      </div>

      <div className="h-[55vh] overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map(m => (
          <div key={m.id} className={`p-3 rounded-2xl ${m.sender === 'user' ? 'bg-amber-500 text-[#0B192C] font-semibold ml-auto max-w-[85%]' : 'bg-slate-950 text-slate-200 border border-slate-800 max-w-[90%]'}`}>
            {m.text}
          </div>
        ))}
        {isGenerating && <div className="text-amber-400 text-xs italic animate-pulse">⏳ AI sedang menyusun tanggapan...</div>}
      </div>
    </div>

    <div className="pt-3 border-t border-slate-800 space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Minta AI revisi / tambah seksi..."
          value={inputInstruction}
          onChange={(e) => setInputInstruction(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-slate-950 border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-amber-500 hover:bg-amber-400 text-[#0B192C] font-bold px-3 py-2 rounded-xl text-xs transition-all"
        >
          Kirim
        </button>
      </div>
    </div>
  </div>

  {/* LIVE CANVAS PREVIEW PANEL (RIGHT) */}
  <div className="w-full lg:w-8/12 bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 flex flex-col shadow-xl overflow-hidden">
    
    {/* SUB-TAB NAVIGATOR */}
    <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4 overflow-x-auto gap-2">
      <div className="flex items-center gap-1">
        {[
          { id: 'modul-ajar', label: 'Modul Ajar' },
          { id: 'cp', label: 'CP' },
          { id: 'tp', label: 'TP' },
          { id: 'atp', label: 'ATP' },
          { id: 'kktp', label: 'KKTP' },
          { id: 'prota', label: 'Prota' },
          { id: 'prosem', label: 'Prosem' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === tab.id ? 'bg-amber-500 text-[#0B192C]' : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsExportModalOpen(true)}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0B192C] font-black px-4 py-1.5 rounded-xl text-xs shadow-md shrink-0"
      >
        🖨️ Ekspor Dokumen
      </button>
    </div>

    {/* CANVAS WORKSPACE EDITOR */}
    <div className="flex-1 bg-slate-950 border border-amber-500/10 rounded-2xl p-6 overflow-y-auto">
      <div
        className="prose prose-invert max-w-none text-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(activeContent) }}
      />
    </div>
  </div>

  {/* EXPORT CENTER MODAL */}
  <ExportCenterModal
    isOpen={isExportModalOpen}
    onClose={() => setIsExportModalOpen(false)}
    onDownloadWord={handleDownloadWord}
    onDownloadTxt={handleDownloadTxt}
    onPrintPDF={handlePrintPDF}
  />

</div>


);
}
