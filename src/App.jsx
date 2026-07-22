/**
 * TRISULA SMART LEARNING ENGINE v3.5 - MAIN APP ARCHITECTURE
 * Principal Software Engineer & Lead Solution Architect
 */
import React, { useState, useEffect } from 'react';

// Google Apps Script Webhook URL for Google Sheets syncing
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJJp3CVGiAEkCQ-6zDTgS1Rz2Fz2vQYCvpn_hB-JkN13q9aWQOAFfAtpWH3cHnby6LEg/exec";

// Contact and Payment Configuration
const ADMIN_WA_NUMBER = "6281298406844";
const BANK_BCA_REK = "5765323549";
const BANK_BCA_NAME = "iis istianawahid";
const DANA_NUMBER = "081519234087";
const DANA_NAME = "iis istianawahid";

const syncUserToGoogleSheets = async (userData, action = 'SYNC_USER') => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, user: userData })
    });
  } catch (err) {
    console.error('Failed to sync with Google Sheets:', err);
  }
};

const Icons = {
  Cpu: ({ className = "w-5 h-5 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Mail: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 013.222-.563c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
    </svg>
  ),
  User: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Building: ({ className = "w-4 h-4 text-slate-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4 text-[#D4AF37]" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  ArrowRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  CheckCircle: ({ className = "w-4 h-4 text-emerald-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Home: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  LogOut: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Folder: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Edit: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Bolt: ({ className = "w-4 h-4 text-amber-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Printer: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  FileText: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Trash: ({ className = "w-4 h-4 text-rose-400" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Coins: ({ className = "w-4 h-4 text-amber-300" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const formatMathFormula = (formulaStr) => {
  return formulaStr
    .replace(/\\mathbf\{(.*?)\}/g, '$1')
    .replace(/\\bar\{x\}/g, 'x̄')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, 'Σ($1..$2)')
    .replace(/\\sum/g, 'Σ')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\log/g, 'log')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/x_i/g, 'xᵢ')
    .replace(/x_n/g, 'xₙ');
};

const parseMarkdownToHTML = (markdown) => {
  if (!markdown) return '';

  let content = markdown;

  // 1. LATEX DISPLAY PARSER ($$...$$)
  content = content.replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
    const cleanFormula = formatMathFormula(formula.trim());
    return `<div style="margin:14px 0; padding:12px 16px; background-color:#F1F5F9; border-left:4px solid #1E3A8A; border-radius:8px; text-align:center;">
      <div style="color:#D4AF37; font-size:10px; font-weight:bold; margin-bottom:4px; font-family:'Segoe UI', sans-serif; text-transform:uppercase;">[ FORMULA DEEP LEARNING ]</div>
      <div style="font-family:'Courier New', monospace; font-weight:bold; font-size:14px; color:#0F172A;">${cleanFormula}</div>
    </div>`;
  });

  // 2. LATEX INLINE PARSER ($...$)
  content = content.replace(/\$(.*?)\$/g, (match, formula) => {
    const cleanFormula = formatMathFormula(formula.trim());
    return `<code style="background-color:#F8FAFC; color:#1E3A8A; border:1px solid #CBD5E1; padding:2px 6px; border-radius:4px; font-family:'Courier New', monospace; font-weight:bold;">${cleanFormula}</code>`;
  });

  let lines = content.split('\n');
  let htmlResult = [];
  let inTable = false;
  let tableBuffer = [];

  const parseInlineMarkdown = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:#F1F5F9; color:#1E3A8A; padding:2px 5px; border-radius:4px; font-family:monospace;">$1</code>');
  };

  const renderTable = (rows) => {
    if (rows.length === 0) return '';
    let tableHtml = `<table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; margin: 16px 0; font-size:12px; font-family: 'Segoe UI', sans-serif; border-color:#CBD5E1;">`;
    
    rows.forEach((row, rowIndex) => {
      let cleanRow = row.trim();
      if (cleanRow.startsWith('|')) cleanRow = cleanRow.substring(1);
      if (cleanRow.endsWith('|')) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
      
      if (cleanRow.includes('---')) return;

      let cells = cleanRow.split('|').map(c => c.trim());

      if (rowIndex === 0) {
        tableHtml += `<tr style="background-color:#1E3A8A; color:#FFFFFF;">`;
        cells.forEach(cell => {
          let parsedCell = parseInlineMarkdown(cell);
          tableHtml += `<th style="border:1px solid #CBD5E1; padding:10px 12px; text-align:left; font-weight:bold; color:#FFFFFF;">${parsedCell}</th>`;
        });
        tableHtml += `</tr>`;
      } else {
        let bg = rowIndex % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
        tableHtml += `<tr style="background-color:${bg}; color:#1E293B;">`;
        cells.forEach(cell => {
          let parsedCell = parseInlineMarkdown(cell);
          tableHtml += `<td style="border:1px solid #CBD5E1; padding:8px 12px;">${parsedCell}</td>`;
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

    if (line.startsWith('#### ')) {
      htmlResult.push(`<h4 style="color:#D4AF37; font-size:13px; font-weight:bold; margin-top:14px; margin-bottom:6px;">${parseInlineMarkdown(line.replace('#### ', ''))}</h4>`);
    } else if (line.startsWith('### ')) {
      htmlResult.push(`<h3 style="color:#2563EB; font-size:14px; font-weight:bold; margin-top:16px; margin-bottom:8px;">${parseInlineMarkdown(line.replace('### ', ''))}</h3>`);
    } else if (line.startsWith('## ')) {
      htmlResult.push(`<h2 style="color:#1E3A8A; border-bottom:1px solid #E2E8F0; padding-bottom:4px; font-size:16px; font-weight:bold; margin-top:20px; margin-bottom:10px;">${parseInlineMarkdown(line.replace('## ', ''))}</h2>`);
    } else if (line.startsWith('# ')) {
      htmlResult.push(`<h1 style="color:#1E3A8A; border-bottom:2px solid #D4AF37; padding-bottom:6px; font-size:18px; font-weight:bold; margin-top:18px; margin-bottom:12px;">${parseInlineMarkdown(line.replace('# ', ''))}</h1>`);
    } else if (line.trim() === '---') {
      htmlResult.push(`<hr style="border:0; border-top:1px solid #CBD5E1; margin:16px 0;"/>`);
    } else if (line.trim().startsWith('> ')) {
      htmlResult.push(`<blockquote style="border-left:4px solid #D4AF37; background:#FEF3C7; padding:8px 12px; margin:10px 0; color:#78350F; font-size:11px;">${parseInlineMarkdown(line.replace('> ', ''))}</blockquote>`);
    } else if (line.trim().startsWith('- ')) {
      htmlResult.push(`<li style="margin-left:20px; margin-bottom:4px; color:#334155;">${parseInlineMarkdown(line.replace('- ', ''))}</li>`);
    } else if (line.trim().length > 0) {
      htmlResult.push(`<p style="margin-bottom:8px; color:#334155; line-height:1.6;">${parseInlineMarkdown(line)}</p>`);
    }
  }

  if (inTable) {
    htmlResult.push(renderTable(tableBuffer));
  }

  return htmlResult.join('');
};

const generateRichAIContent = (instruction, subject = 'Informatika & STEM') => {
  const text = instruction.toLowerCase();
  const upperSubject = subject.toUpperCase();

  if (text.includes('asesmen') || text.includes('rubrik') || text.includes('kktp')) {
    return `\n\n---\n## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) & RUBRIK ASESMEN\n### 📊 Rubrik Observasi & Asesmen Kinerja (${upperSubject})\n\n| Kriteria Penilaian | Belum Memenuhi (1) | Cukup (2) | Baik (3) | Sangat Baik (4) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Penerapan Konsep** | Belum memahami konsep dasar | Memahami 50% konsep dasar | Memahami 85% konsep dengan benar | Memahami 100% konsep & mampu mengaplikasikan |\n| **Analisis & Logika** | Tidak mampu menyusun alur | Menyusun alur namun ada kesalahan | Menyusun alur terstruktur & logis | Menyusun alur sangat presisi & optimal |\n| **Kolaborasi Tim** | Pasif dalam diskusi kelompok | Berpartisipasi jika diminta | Aktif berkontribusi dalam tim | Memimpin & membantu rekan kelompok |\n\n> 🎯 **Teknik Asesmen**: Formatif (Observasi diskusi & jurnal) & Sumatif (Unjuk kerja proyek kelompok).`;
  } 
  
  if (text.includes('lkpd') || text.includes('lembar kerja')) {
    return `\n\n---\n## XII. LEMBAR KERJA PESERTA DIDIK (LKPD)\n### 👥 Nama Kelompok: ____________________\n**Anggota Kelompok**: 1. _______________ 2. _______________ 3. _______________ \n\n#### A. PETUNJUK PENGERJAAN\n1. Bacalah studi kasus lingkungan lokal di bawah ini secara cermat.\n2. Diskusikan bersama anggota kelompokmu selama 20 menit.\n3. Susunlah model analisis menggunakan formula matematika dan diagram alir.\n\n#### B. TANTANGAN STUDI KASUS & FORMULA\nHitunglah estimasi efisiensi menggunakan rumus deviasi berikut:\n\n$$S = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}$$\n\n| No | Indikator Variabel | Nilai Pengamatan ($x_i$) | Selisih ($x_i - \\bar{x}$) |\n| :--- | :--- | :--- | :--- |\n| **1** | Sampel Data Pertama | 15.5 | +2.1 |\n| **2** | Sampel Data Kedua | 13.4 | -0.0 |\n| **3** | Sampel Data Ketiga | 18.0 | +4.6 |\n\n#### C. PERTANYAAN REFLEKSI GROUPS\n1. Berdasarkan nilai $S$ yang kamu peroleh, apa kesimpulan kelompokmu? Tuliskan dalam 3 kalimat!`;
  }

  if (text.includes('prosem') || text.includes('program semester')) {
    return `\n\n---\n## VII. PROGRAM SEMESTER (PROSEM)\n### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (${upperSubject})\n\n| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **1** | Analisis Data & Pemodelan Matematika | 6 JP | x | x | | | | |\n| **2** | Perancangan Flowchart & Diagram Logika | 6 JP | | | x | x | | |\n| **3** | Pengujian Program & Grafik Statistika | 6 JP | | | | | x | x |`;
  }

  if (text.includes('prota') || text.includes('program tahunan')) {
    return `\n\n---\n## VI. PROGRAM TAHUNAN (PROTA)\n### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (${upperSubject})\n\n| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |\n| :--- | :--- | :--- | :--- |\n| **1** | Pemodelan Sistem, Analisis Data & Algoritma | 18 JP | Semester 1 |\n| **2** | Rekayasa Perangkat Lunak & Proyek STEM | 18 JP | Semester 2 |`;
  }

  if (text.includes('atp') || text.includes('alur tujuan')) {
    return `\n\n---\n## IV. ALUR TUJUAN PEMBELAJARAN (ATP)\n### 🗺️ Pemetaan Runtutan ATP (${upperSubject})\n\n| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |\n| :--- | :--- | :--- | :--- |\n| **ATP.01** | 2 JP | Mampu menganalisis efisiensi model matematika | Formatif Latihan Soal |\n| **ATP.02** | 2 JP | Mampu membuat diagram alir terstruktur | Unjuk Kerja Kelompok |`;
  }

  if (text.includes('tp') || text.includes('tujuan pembelajaran')) {
    return `\n\n---\n## III. TUJUAN PEMBELAJARAN (TP)\n### 🎯 Poin Tujuan Pembelajaran ABCD (${upperSubject})\n\n- **TP1**: Menganalisis kompleksitas masalah menggunakan persamaan logika $\\bar{x} = \\frac{\\sum x_i}{n}$.\n- **TP2**: Menyusun diagram alir pemecahan masalah kontekstual.\n- **TP3**: Mempresentasikan hasil analisis proyek kelompok secara kolaboratif.`;
  }

  if (text.includes('cp') || text.includes('capaian')) {
    return `\n\n---\n## II. CAPAIAN PEMBELAJARAN (CP)\n### 📘 Analisis Capaian Pembelajaran Elemen (${upperSubject})\n\nPeserta didik mampu menerapkan konsep analisis data, menyusun model logika, serta merancang pemecahan masalah kontekstual secara kritis, mandiri, dan kolaboratif.`;
  }

  return `\n\n---\n## TANGGAPAN AI & REVISI PERANGKAT AJAR\n- **Instruksi Diterapkan**: "${instruction}"\n- **Penguatan Mindful**: Sesi hening 3 menit diawal pembelajaran untuk fokus mental.\n- **Penguatan Meaningful**: Studi kasus kontekstual isu lokal sekitar sekolah.\n- **Penguatan Joyful**: Permainan tim interaktif dan apresiasi sejaya.`;
};

function LoginPage({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('guru');
  const [selectedPackage, setSelectedPackage] = useState('free'); // 'free' | 'single' | 'monthly'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Silakan isi alamat email dan kata sandi Anda!');
      return;
    }

    if (authMode === 'register' && !fullName) {
      setErrorMessage('Silakan isi Nama Lengkap Anda!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      let initialCredits = 1;
      let isPrem = false;

      if (authMode === 'register') {
        if (selectedPackage === 'monthly' || email.includes('admin') || email.includes('premium')) {
          isPrem = true;
          initialCredits = 250;
        } else if (selectedPackage === 'single') {
          isPrem = false;
          initialCredits = 5;
        } else {
          isPrem = false;
          initialCredits = 1;
        }
      } else {
        isPrem = email.includes('admin') || email.includes('premium');
        initialCredits = isPrem ? 250 : 5;
      }

      const userPayload = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: fullName || (email.includes('admin') ? 'Root Admin Trisula' : email.split('@')[0]),
        email: email,
        role: selectedRole,
        is_premium: isPrem,
        kredit_tersisa: initialCredits,
        doc_generated_count: 0,
        school: schoolName || 'SMA Negeri 1 Jakarta'
      };

      syncUserToGoogleSheets(userPayload, authMode === 'register' ? 'REGISTER' : 'LOGIN');

      if (onLoginSuccess) {
        onLoginSuccess(userPayload);
      } else {
        setSuccessMessage('Login berhasil! Mengalihkan ke Dashboard...');
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    const demoUser = {
      id: 'usr_eike2000',
      name: 'Eike2000, S.Pd.',
      email: 'eike2000@sekolah.sch.id',
      role: 'guru',
      is_premium: false,
      kredit_tersisa: 5,
      doc_generated_count: 0,
      school: 'SMA Negeri 1 Jakarta'
    };
    setEmail('eike2000@sekolah.sch.id');
    setPassword('demo1234');
    setSelectedRole('guru');

    setTimeout(() => {
      setIsLoading(false);
      syncUserToGoogleSheets(demoUser, 'LOGIN');
      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B192C] text-slate-100 font-sans flex items-center justify-center p-3 sm:p-6 relative overflow-x-hidden overflow-y-auto">
      <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-[#132338]/95 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-5 my-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 mb-1">
            <Icons.Cpu className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            TRISULA SMART LEARNING ENGINE
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed px-2">
            Engine evaluasi penilaian otomatis, Modul ajar, CP, TP, ATP, KKTP, Prota, Prosem & Portal B2B Sekolah
          </p>
        </div>

        <div className="bg-slate-900/80 p-1 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-semibold">
          {[
            { id: 'guru', label: 'Pengajar / Guru' },
            { id: 'siswa', label: 'Siswa / Peserta' },
            { id: 'admin', label: 'Administrator' }
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRole(r.id)}
              className={`flex-1 py-2 text-center rounded-xl transition-all cursor-pointer ${
                selectedRole === r.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span> {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
            <Icons.CheckCircle /> {successMessage}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-3.5">
          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap & Gelar</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.User />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Budi Santoso, M.Pd."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Sekolah / Instansi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.Building />
                  </div>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Contoh: SMA Negeri 1 Jakarta"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D4AF37] mb-1.5 font-bold">Pilih Paket Awal Pendaftaran:</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'free', title: 'Gratis', desc: '1 Token' },
                    { id: 'single', title: '1 Modul', desc: '5 Token (Rp10rb)' },
                    { id: 'monthly', title: 'Bulanan', desc: 'Unlimited (Rp29rb)' }
                  ].map(pkg => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPackage === pkg.id 
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-md' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold text-xs text-amber-300">{pkg.title}</span>
                      <span className="text-[10px] text-slate-300 mt-1">{pkg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Email Terdaftar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Mail />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@sekolah.sch.id"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Kata Sandi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Lock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {authMode === 'login' ? 'Masuk Sekarang' : 'Daftar & Aktifkan Paket'}
                <Icons.ArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] text-center uppercase tracking-wider text-slate-400 font-semibold">
            ⚡ PENGUJIAN AKUN EIKE2000 (TOKEN 5)
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-xs text-amber-300 font-semibold transition-all text-center cursor-pointer shadow-sm"
          >
            🚀 Masuk sebagai eike2000 (5 Token)
          </button>
        </div>

        <div className="text-center text-xs text-slate-400">
          {authMode === 'login' ? (
            <>
              Belum memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
              >
                Daftar Sekarang
              </button>
            </>
          ) : (
            <>
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
              >
                Masuk Kembali
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ usersData, onUpdateUserStatus, onAddCredits, onAddUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUserForCredits, setSelectedUserForCredits] = useState(null);
  const [creditAmount, setCreditAmount] = useState(1);
  const [notification, setNotification] = useState(null);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'guru',
    is_premium: false,
    kredit_tersisa: 5,
    school: ''
  });

  const showToast = (message) => {
    setNotification({ message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredUsers = (usersData || []).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' ? true : 
                          statusFilter === 'PREMIUM' ? user.is_premium : 
                          !user.is_premium;
    return matchesSearch && matchesStatus;
  });

  const handleTogglePremium = (user) => {
    const newStatus = !user.is_premium;
    const updatedUser = { ...user, is_premium: newStatus };

    if (onUpdateUserStatus) {
      onUpdateUserStatus(user.id, newStatus);
    }

    syncUserToGoogleSheets(updatedUser, 'UPDATE_STATUS');
    showToast(`Status lisensi ${user.name} diubah & disinkron ke Google Sheets!`);
  };

  const handleCreditSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserForCredits) return;
    const added = parseInt(creditAmount, 10);
    if (isNaN(added) || added <= 0) return;

    const updatedUser = {
      ...selectedUserForCredits,
      kredit_tersisa: (selectedUserForCredits.kredit_tersisa || 0) + added
    };

    if (onAddCredits) {
      onAddCredits(selectedUserForCredits.id, added);
    }

    syncUserToGoogleSheets(updatedUser, 'ADD_CREDITS');
    showToast(`Berhasil +${added} token untuk ${selectedUserForCredits.name}.`);
    setSelectedUserForCredits(null);
    setCreditAmount(1);
  };

  const handleCreateUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;

    const newUserPayload = {
      id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      is_premium: newUserForm.is_premium,
      kredit_tersisa: parseInt(newUserForm.kredit_tersisa, 10) || 5,
      doc_generated_count: 0,
      school: newUserForm.school || 'Instansi Pendidikan'
    };

    if (onAddUser) {
      onAddUser(newUserPayload);
    }

    syncUserToGoogleSheets(newUserPayload, 'REGISTER');
    showToast(`Pengguna "${newUserPayload.name}" berhasil dibuat & disinkron!`);
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B192C] text-slate-100 p-4 sm:p-8 font-sans">
      {notification && (
        <div className="fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-2xl border text-sm font-semibold bg-emerald-950/90 border-emerald-500/50 text-emerald-200">
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
            Admin Activation Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Dashboard Aktivasi User & Lisensi
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            TRISULA SMART LEARNING ENGINE • Data pengguna otomatis tersinkronisasi dengan Google Sheets
          </p>
        </div>

        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Icons.Plus className="w-4 h-4 text-slate-950" />
          <span>+ Tambah Pengguna Baru</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full sm:w-80"
          />
          <div className="flex items-center gap-2 overflow-x-auto">
            <button onClick={() => setStatusFilter('ALL')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shrink-0 ${statusFilter === 'ALL' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Semua</button>
            <button onClick={() => setStatusFilter('PREMIUM')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shrink-0 ${statusFilter === 'PREMIUM' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Premium</button>
            <button onClick={() => setStatusFilter('FREE')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shrink-0 ${statusFilter === 'FREE' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Gratis</button>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 min-w-[700px]">
            <thead className="bg-slate-950 text-slate-400 uppercase">
              <tr>
                <th className="p-4">Pengguna</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status Lisensi</th>
                <th className="p-4">Sisa Token</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-[10px] text-slate-400">{user.email} ({user.school || '-'})</div>
                  </td>
                  <td className="p-4 uppercase text-[10px] font-bold">{user.role || 'guru'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${user.is_premium ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                      {user.is_premium ? 'PREMIUM' : 'GRATIS'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">
                    {user.is_premium ? 'Unlimited' : `${user.kredit_tersisa ?? 5} token`}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => handleTogglePremium(user)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${user.is_premium ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'}`}
                    >
                      {user.is_premium ? 'Nonaktifkan' : 'Aktifkan Premium'}
                    </button>
                    <button
                      onClick={() => setSelectedUserForCredits(user)}
                      className="px-3 py-1 bg-slate-800 hover:bg-[#D4AF37] hover:text-slate-950 text-white rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      + Token
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">👤 Tambah Pengguna Baru</h3>
            <form onSubmit={handleCreateUserSubmit} className="space-y-3.5">
              <input
                type="text"
                required
                value={newUserForm.name}
                onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                placeholder="Nama Lengkap & Gelar"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="email"
                required
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                placeholder="Email Terdaftar"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="text"
                value={newUserForm.school}
                onChange={(e) => setNewUserForm({ ...newUserForm, school: e.target.value })}
                placeholder="Nama Sekolah"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs">Batal</button>
                <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-slate-950 font-bold rounded-xl text-xs">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedUserForCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-[#0B192C] border border-[#D4AF37]/40 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Tambah Token untuk {selectedUserForCredits.name}</h3>
            <form onSubmit={handleCreditSubmit} className="space-y-3">
              <input
                type="number"
                min="1"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setSelectedUserForCredits(null)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold rounded-lg text-xs">Tambah</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PaywallModal({ isOpen, onClose, userContext = {}, paywallReason = '' }) {
  if (!isOpen) return null;

  const userEmail = userContext.email || 'email@sekolah.sch.id';

  const waMonthlyText = encodeURIComponent(
    `Halo Admin TRISULA SMART LEARNING ENGINE,\n\nSaya telah melakukan pembayaran untuk Paket Bulanan Rp29.000.\n\n📌 Email Terdaftar: ${userEmail}\n📌 Bukti Transfer: (Terlampir)\n\nMohon bantuannya untuk mengaktifkan akses akun saya. Terima kasih!`
  );

  const waSingleText = encodeURIComponent(
    `Halo Admin TRISULA SMART LEARNING ENGINE,\n\nSaya telah melakukan pembayaran untuk Paket 1 Modul Ajar Rp10.000.\n\n📌 Email Terdaftar: ${userEmail}\n📌 Bukti Transfer: (Terlampir)\n\nMohon bantuannya untuk menambahkan token saya. Terima kasih!`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B192C] border border-[#D4AF37] rounded-3xl max-w-xl w-full p-6 space-y-4 text-white shadow-2xl relative my-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="font-bold text-base text-[#D4AF37] flex items-center gap-2">
            <span>🔒</span> Buka Akses Fitur / Top Up Token
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer font-bold text-sm">✕</button>
        </div>
        
        {paywallReason && (
          <p className="text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl leading-relaxed">
            ⚠️ {paywallReason}
          </p>
        )}

        <div className="bg-slate-900/90 p-3.5 border border-slate-800 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-[#D4AF37]">💳 Rekening Transfer & E-Wallet Resmi:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-white block">🏦 Bank BCA</span>
              <span className="font-mono text-amber-300 text-xs font-bold block select-all">{BANK_BCA_REK}</span>
              <span className="text-[10px] text-slate-400">a.n. {BANK_BCA_NAME}</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-white block">💙 DANA</span>
              <span className="font-mono text-amber-300 text-xs font-bold block select-all">{DANA_NUMBER}</span>
              <span className="text-[10px] text-slate-400">a.n. {DANA_NAME}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-900 p-4 border border-amber-500/50 rounded-2xl space-y-2 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-bold rounded-full uppercase">Paling Laris</span>
              <div className="font-bold text-xs text-amber-300 uppercase mt-1">Paket Bulanan</div>
              <div className="text-base font-black text-[#D4AF37]">Rp29.000 <span className="text-[9px] text-slate-400 font-normal">/ bln</span></div>
              <ul className="text-[10px] text-slate-300 space-y-1 pt-2">
                <li>✓ Unlimited 30 Hari</li>
                <li>✓ Bebas Generate & Cetak</li>
              </ul>
            </div>
            <a href={`https://wa.me/${ADMIN_WA_NUMBER}?text=${waMonthlyText}`} target="_blank" rel="noreferrer" className="block text-center py-2 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors mt-2">
              🟢 Beli via WA
            </a>
          </div>

          <div className="bg-slate-900 p-4 border border-indigo-500/40 rounded-2xl space-y-2 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded-full uppercase">Eceran</span>
              <div className="font-bold text-xs text-indigo-300 uppercase mt-1">Paket 1 Modul</div>
              <div className="text-base font-black text-indigo-400">Rp10.000 <span className="text-[9px] text-slate-400 font-normal">/ modul</span></div>
              <ul className="text-[10px] text-slate-300 space-y-1 pt-2">
                <li>✓ Tambah 5 Token Aktif</li>
                <li>✓ Kuota Tanpa Hangus</li>
              </ul>
            </div>
            <a href={`https://wa.me/${ADMIN_WA_NUMBER}?text=${waSingleText}`} target="_blank" rel="noreferrer" className="block text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors mt-2">
              🟢 Beli via WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIWorkspace({ activeDocument, onBackToDashboard, currentUser, onUpdateCurrentUser, onRequestPaywall }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const defaultDoc = {
    title: 'Modul Ajar IPA & Biologi - Ekosistem & Keanekaragaman Hayati',
    subject: 'IPA & Biologi',
    phase: 'Fase E (Kelas 10 SMA)',
    content: `# MODUL AJAR DEEP LEARNING: IPA & BIOLOGI FASE E (KELAS 10 SMA)

## I. INFORMASI UMUM
- **Mata Pelajaran**: IPA & Biologi
- **Fase / Kelas**: Fase E (Kelas 10 SMA)
- **Topik Utama**: Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan
- **Alokasi Waktu**: 2 JP x 45 Menit

---

## II. CAPAIAN PEMBELAJARAN (CP)
### 📘 Analisis Capaian Pembelajaran Elemen (IPA & BIOLOGI)
Peserta didik mampu menganalisis interaksi antar komponen ekosistem, memahami pentingnya keanekaragaman hayati lokal, serta merancang solusi kreatif atas perubahan lingkungan secara kritis dan kolaboratif.

---

## III. TUJUAN PEMBELAJARAN (TP)
### 🎯 Poin Tujuan Pembelajaran ABCD (IPA & BIOLOGI)
- **TP1**: Menganalisis struktur rantai makanan dan piramida energi ekosistem menggunakan formula matematis $P(t) = P_0 e^{rt}$.
- **TP2**: Menyusun grafik fluktuasi populasi spesies lokal berdasarkan data sampel dilapangan.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 2 JP | Mampu menganalisis interaksi trophic level | Formatif Latihan Soal |
| **ATP.10.2** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |

---

## V. INTEGRASI 3 PILAR DEEP LEARNING
- **Mindful Learning**: Sesi hening STOP selama 3 menit diawal pembelajaran.
- **Meaningful Learning**: Menganalisis isu lingkungan sungai sekitar sekolah.
- **Joyful Learning**: Permainan tim interaktif dan apresiasi sejawat.`
  };

  const currentDocument = activeDocument || defaultDoc;
  const [docContent, setDocContent] = useState(currentDocument.content);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: `Halo Bapak/Ibu Guru! Dokumen ${currentDocument.subject || 'Pembelajaran'} Anda siap disempurnakan dengan sintesis AI!` }
  ]);

  useEffect(() => {
    if (activeDocument && activeDocument.content) {
      setDocContent(activeDocument.content);
    }
  }, [activeDocument]);

  const canExport = Boolean(currentUser?.is_premium || (currentUser?.kredit_tersisa && currentUser.kredit_tersisa > 0));

  const handleSendMessage = () => {
    if (!inputInstruction.trim()) return;
    const textToSend = inputInstruction;
    setInputInstruction('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setIsGenerating(true);

    setTimeout(() => {
      const generatedMarkdownBlock = generateRichAIContent(textToSend, currentDocument.subject);
      setDocContent(prev => prev + generatedMarkdownBlock);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: `✨ **[SINTESIS SELESAI]**\n\nSeksi baru berdasarkan instruksi "${textToSend}" telah disuntikkan ke kanvas!` 
      }]);
      setIsGenerating(false);
    }, 1000);
  };

  const handleOpenExportModal = () => {
    if (!canExport) {
      if (onRequestPaywall) {
        onRequestPaywall('Token Anda telah habis. Silakan top up token atau aktifkan paket bulanan untuk mencetak dokumen!');
      }
      return;
    }
    setIsExportModalOpen(true);
  };

  // PEMOTONGAN TEAPAT 1 TOKEN TERISOLASI PRESISI (TIDAK BERKURANG BANYAK SEKALIGUS)
  const deductQuotaOnAction = () => {
    if (!currentUser.is_premium && currentUser.kredit_tersisa > 0) {
      const currentToken = typeof currentUser.kredit_tersisa === 'number' 
        ? currentUser.kredit_tersisa 
        : parseInt(currentUser.kredit_tersisa, 10) || 0;

      const updatedUser = {
        ...currentUser,
        doc_generated_count: (currentUser.doc_generated_count || 0) + 1,
        kredit_tersisa: Math.max(0, currentToken - 1)
      };
      if (onUpdateCurrentUser) onUpdateCurrentUser(updatedUser);
      syncUserToGoogleSheets(updatedUser, 'DEDUCT_CREDIT');
    }
  };

  const handleDownloadWord = () => {
    deductQuotaOnAction();
    const parsedHtmlBody = parseMarkdownToHTML(docContent);
    const htmlContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><title>${currentDocument.title}</title></head><body><div>${parsedHtmlBody}</div></body></html>`;
    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${(currentDocument.title || 'Modul_Ajar').replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  const handleDownloadTxt = () => {
    deductQuotaOnAction();
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${(currentDocument.title || 'Modul_Ajar').replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  const handlePrintPDF = () => {
    deductQuotaOnAction();
    setIsExportModalOpen(false);
    setTimeout(() => window.print(), 300);
  };

  const filterContentByTab = (fullContent, tabId) => {
    if (tabId === 'modul-ajar') return fullContent;
    const sections = fullContent.split(/(?=\n##\s+)/g);
    const matched = sections.find(sec => {
      const line = sec.trim().split('\n')[0].toUpperCase();
      switch (tabId) {
        case 'cp': return line.includes('CAPAIAN PEMBELAJARAN');
        case 'tp': return line.includes('TUJUAN PEMBELAJARAN');
        case 'atp': return line.includes('ALUR TUJUAN');
        default: return false;
      }
    });
    return matched ? matched.trim() : null;
  };

  const activeTabContent = filterContentByTab(docContent, activeSubTab);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-4 font-sans p-2 sm:p-4 overflow-hidden">
      <div className="w-full lg:w-5/12 bg-[#0F172A] border border-slate-800 rounded-2xl flex flex-col overflow-hidden h-[45vh] lg:h-full">
        <div className="p-3 sm:p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <button onClick={onBackToDashboard} className="text-xs text-slate-400 hover:text-white cursor-pointer">← Kembali</button>
          <span className="text-xs font-bold text-[#D4AF37]">AI Co-Pilot (Deep Learning v3.5)</span>
        </div>

        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map(m => (
            <div key={m.id} className={`p-3 rounded-2xl max-w-[85%] ${m.sender === 'user' ? 'bg-indigo-600 ml-auto text-white' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
              {m.text}
            </div>
          ))}
          {isGenerating && <div className="text-xs text-slate-400 italic">⏳ AI sedang menyusun dokumen...</div>}
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex gap-2">
          <input
            type="text"
            value={inputInstruction}
            onChange={(e) => setInputInstruction(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik instruksi, misal: 'Tolong buatkan LKPD'..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          />
          <button onClick={handleSendMessage} className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer">Kirim</button>
        </div>
      </div>

      <div className="w-full lg:w-7/12 bg-[#0F172A] border border-slate-800 rounded-2xl flex flex-col overflow-hidden p-3 sm:p-4 space-y-3 h-[50vh] lg:h-full">
        <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['modul-ajar', 'cp', 'tp', 'atp'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === tab ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <button onClick={handleOpenExportModal} className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 shrink-0">
            <Icons.Printer className="w-4 h-4" />
            <span>Cetak / Export</span>
          </button>
        </div>

        <div className="flex-1 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl overflow-y-auto shadow-2xl">
          {activeTabContent ? (
            <div className="prose prose-slate max-w-none text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(activeTabContent) }} />
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="text-2xl">📄</div>
              <h3 className="text-sm font-bold text-slate-800">Seksi Belum Dibuat</h3>
              <button onClick={() => handleSendMessage(`Buat seksi ${activeSubTab}`)} className="px-4 py-2 bg-[#1E3A8A] text-white font-bold rounded-xl text-xs">✨ Buat Sekarang</button>
            </div>
          )}
        </div>
      </div>

      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-[#D4AF37]">Export Dokumen</h3>
              <button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer font-bold">✕</button>
            </div>
            <div className="space-y-2.5">
              <button onClick={handleDownloadWord} className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold flex justify-between items-center cursor-pointer">
                <span>🟦 Berkas Word (.doc)</span><span className="text-[#D4AF37]">-1 Token</span>
              </button>
              <button onClick={handleDownloadTxt} className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold flex justify-between items-center cursor-pointer">
                <span>📄 Teks Polos (.txt)</span><span className="text-[#D4AF37]">-1 Token</span>
              </button>
              <button onClick={handlePrintPDF} className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-left text-xs font-bold flex justify-between items-center cursor-pointer">
                <span>🖨️ Cetak PDF / A4</span><span className="text-[#D4AF37]">-1 Token</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MyFilesView({ documents, onOpenDocument, onOpenInEditor, onDeleteDocument, onOpenWizard }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = (documents || []).filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-full uppercase">
            Pengelola Berkas & Perangkat Ajar
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Berkas Saya ({documents.length})</h1>
        </div>
        <button onClick={onOpenWizard} className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer">
          <Icons.Plus /><span>+ Buat Perangkat Baru</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <input
          type="text"
          placeholder="Cari perangkat ajar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full sm:w-80"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-[#0D1C2E] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{doc.subject}</span>
              <h3 className="text-sm font-bold text-white line-clamp-2">{doc.title}</h3>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <button onClick={() => onDeleteDocument(doc.id)} className="text-rose-400 cursor-pointer"><Icons.Trash /></button>
              <div className="flex gap-2">
                <button onClick={() => onOpenInEditor(doc)} className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg text-[11px] cursor-pointer">Editor</button>
                <button onClick={() => onOpenDocument(doc)} className="text-[#D4AF37] font-bold cursor-pointer">Buka →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleanEditorView({ activeDocument, onSaveDocument }) {
  const [title, setTitle] = useState(activeDocument?.title || 'Modul Ajar');
  const [content, setContent] = useState(activeDocument?.content || '# MODUL AJAR');
  const [toast, setToast] = useState(null);

  const handleSave = () => {
    if (onSaveDocument) onSaveDocument({ ...activeDocument, title, content });
    setToast('✨ Disimpan!');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 space-y-4 font-sans max-w-7xl mx-auto">
      {toast && <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">{toast}</div>}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg font-bold bg-transparent text-white focus:outline-none w-full sm:w-96 border-b border-transparent focus:border-[#D4AF37]" />
        <button onClick={handleSave} className="px-4 py-2 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Simpan</button>
      </div>
      <div className="flex-1 grid sm:grid-cols-2 gap-4 min-h-[500px]">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none resize-none" />
        <div className="bg-white p-6 rounded-2xl overflow-y-auto text-slate-900" dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(content) }} />
      </div>
    </div>
  );
}

function WizardModal({ isOpen, onClose, onCreateDocument }) {
  const [subject, setSubject] = useState('IPA & Biologi');
  const [phase, setPhase] = useState('Fase E (Kelas 10 SMA)');
  const [topic, setTopic] = useState('Ekosistem & Keanekaragaman Hayati');
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `doc_${Date.now()}`,
      title: `Modul Ajar ${subject} - ${topic}`,
      subject,
      phase,
      topic,
      status: 'In Progress',
      content: `# MODUL AJAR: ${subject.toUpperCase()}\n\n## I. INFORMASI UMUM\n- **Topik**: ${topic}\n- **Fase**: ${phase}`
    };
    onCreateDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 space-y-4 text-white">
        <h3 className="text-base font-bold text-[#D4AF37]">✨ Wizard Generator</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Mata Pelajaran" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
          <input type="text" required value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topik Utama" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs">Batal</button>
            <button type="submit" className="px-5 py-2 bg-[#D4AF37] text-slate-950 font-bold rounded-xl text-xs">Buat Dokumen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('trisula_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [allUsers, setAllUsers] = useState([
    { id: 'usr_admin_master', name: 'Root Admin Trisula', email: 'admin@trisula.ai', role: 'admin', is_premium: true, kredit_tersisa: 999999, school: 'HQ' },
    { id: 'usr_eike2000', name: 'Eike2000, S.Pd.', email: 'eike2000@sekolah.sch.id', role: 'guru', is_premium: false, kredit_tersisa: 5, school: 'SMA Negeri 1 Jakarta' }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 'doc_01',
      title: 'Modul Ajar IPA & Biologi - Ekosistem',
      subject: 'IPA & Biologi',
      phase: 'Fase E',
      topic: 'Ekosistem',
      status: 'In Progress',
      content: `# MODUL AJAR\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: IPA & Biologi`
    }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeDocument, setActiveDocument] = useState(documents[0]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCurrentUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('trisula_user_session', JSON.stringify(updatedUser));
    } catch (e) { console.error(e); }
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const handleLoginSuccess = (userPayload) => {
    handleUpdateCurrentUser(userPayload);
    setCurrentView(userPayload.role === 'admin' ? 'admin' : 'dashboard');
    showToast(`Selamat datang, ${userPayload.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try { localStorage.removeItem('trisula_user_session'); } catch (e) { console.error(e); }
    setCurrentView('dashboard');
    showToast('Anda telah keluar dari akun.');
  };

  const handleUpdateUserStatus = (userId, newStatus) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, is_premium: newStatus } : u));
    if (currentUser?.id === userId) {
      handleUpdateCurrentUser({ ...currentUser, is_premium: newStatus });
    }
  };

  const handleAddCredits = (userId, amount) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, kredit_tersisa: (u.kredit_tersisa || 0) + amount } : u));
    if (currentUser?.id === userId) {
      handleUpdateCurrentUser({ ...currentUser, kredit_tersisa: (currentUser.kredit_tersisa || 0) + amount });
    }
  };

  const canPerformAction = Boolean(currentUser?.is_premium || (currentUser?.kredit_tersisa && currentUser.kredit_tersisa > 0));

  const handleTriggerPaywall = (reason) => {
    setPaywallReason(reason || 'Token Anda tidak mencukupi. Silakan lakukan top up atau upgrade paket!');
    setIsPaywallOpen(true);
  };

  const handleOpenWizard = () => {
    if (!canPerformAction) {
      handleTriggerPaywall('Pembuatan perangkat ajar baru memerlukan token aktif atau akun Premium.');
      return;
    }
    setIsWizardOpen(true);
  };

  const handleCreateDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocument(newDoc);
    setCurrentView('workspace');
    showToast('Perangkat ajar berhasil dibuat!');
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#070F1E] text-slate-100 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-slate-950 overflow-x-hidden">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* HEADER NAVBAR DENGAN INDIKATOR REAL-TIME TOKEN */}
      <header className="h-16 bg-[#0B1728]/95 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md w-full">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-xl shadow-md">
              <Icons.Cpu className="w-5 h-5 text-slate-950" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-white tracking-wider hidden sm:block">
              TRISULA SMART LEARNING
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* INDIKATOR SISA TOKEN TERSEDIA REAL-TIME */}
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl flex items-center gap-2 text-xs shadow-sm">
            <Icons.Coins />
            <span className="font-bold text-amber-300">
              {currentUser.is_premium ? 'Unlimited Pro' : `${currentUser.kredit_tersisa ?? 0} Token`}
            </span>
          </div>

          <button onClick={handleOpenWizard} className="px-3.5 py-2 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer">
            <Icons.Plus className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">+ Buat Perangkat</span>
          </button>

          <button onClick={handleLogout} className="p-2 bg-slate-900 hover:bg-rose-950/80 border border-slate-800 text-slate-300 hover:text-rose-300 rounded-xl cursor-pointer" title="Keluar">
            <Icons.LogOut />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden w-full">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#0B1728] border-r border-slate-800 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">NAVIGASI UTAMA</div>
            <nav className="space-y-1">
              <button onClick={() => setCurrentView('dashboard')} className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${currentView === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                <Icons.Home /> Halaman Depan
              </button>
              <button onClick={() => setCurrentView('workspace')} className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${currentView === 'workspace' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                <Icons.Bolt /> Ruang Bantu AI
              </button>
              <button onClick={() => setCurrentView('files')} className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${currentView === 'files' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                <Icons.Folder /> Berkas Saya
              </button>
              <button onClick={() => setCurrentView('editor')} className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${currentView === 'editor' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                <Icons.Edit /> Editor Teks
              </button>
              {currentUser.role === 'admin' && (
                <button onClick={() => setCurrentView('admin')} className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 cursor-pointer ${currentView === 'admin' ? 'bg-cyan-950 text-cyan-300' : 'text-slate-400'}`}>
                  <Icons.Shield /> Panel Admin
                </button>
              )}
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto w-full">
          {currentView === 'dashboard' && (
            <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-[#112238] via-[#0F1E33] to-[#0A1628] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="space-y-3 max-w-2xl">
                  <span className="px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase">
                    SaaS Engine Kurikulum Merdeka v3.5
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Selamat Datang, {currentUser.name}! 🚀</h1>
                  <p className="text-xs sm:text-sm text-slate-300">Rancang perangkat ajar terintegrasi 3 Pilar Deep Learning dengan mudah dan presisi.</p>
                  <button onClick={handleOpenWizard} className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer">
                    ✨ Mulai Wizard Baru
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Total Berkas</div>
                  <div className="text-2xl font-bold text-white mt-1">{documents.length}</div>
                </div>
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-[11px] text-slate-400">Token Tersedia</div>
                  <div className="text-2xl font-bold text-amber-300 mt-1">{currentUser.is_premium ? 'Unlimited' : `${currentUser.kredit_tersisa ?? 0} Token`}</div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'workspace' && (
            <AIWorkspace 
              activeDocument={activeDocument}
              onBackToDashboard={() => setCurrentView('dashboard')}
              currentUser={currentUser}
              onUpdateCurrentUser={handleUpdateCurrentUser}
              onRequestPaywall={handleTriggerPaywall}
            />
          )}

          {currentView === 'files' && (
            <MyFilesView documents={documents} onOpenDocument={(doc) => { setActiveDocument(doc); setCurrentView('workspace'); }} onOpenInEditor={(doc) => { setActiveDocument(doc); setCurrentView('editor'); }} onDeleteDocument={(id) => setDocuments(prev => prev.filter(d => d.id !== id))} onOpenWizard={handleOpenWizard} />
          )}

          {currentView === 'editor' && (
            <CleanEditorView activeDocument={activeDocument} onSaveDocument={(updated) => { setDocuments(prev => prev.map(d => d.id === updated.id ? updated : d)); setActiveDocument(updated); showToast('Disimpan!'); }} />
          )}

          {currentView === 'admin' && (
            <AdminDashboard usersData={allUsers} onUpdateUserStatus={handleUpdateUserStatus} onAddCredits={handleAddCredits} onAddUser={(usr) => setAllUsers(prev => [usr, ...prev])} />
          )}
        </main>
      </div>

      <WizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} onCreateDocument={handleCreateDocument} />
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} userContext={currentUser} paywallReason={paywallReason} />
    </div>
  );
}
