import React, { useState, useEffect, useMemo } from 'react';

// Google Apps Script Webhook URL
const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJJp3CVGiAEkCQ-6zDTgS1Rz2Fz2vQYCvpn_hB-JkN13q9aWQOAFfAtpWH3cHnby6LEg/exec";

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
  Sparkles: ({ className = "w-4 h-4 text-amber-300" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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

    // STRICT HEADING ORDER (#### before ### before ## before #)
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
      const userPayload = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: fullName || (email.includes('admin') ? 'Root Admin Trisula' : email.split('@')[0]),
        email: email,
        role: selectedRole,
        is_premium: selectedRole === 'admin' || email.includes('premium') || email.includes('budi'),
        kredit_tersisa: email.includes('premium') || email.includes('budi') ? 250 : 1,
        doc_generated_count: 0,
        school: schoolName || 'SMA Negeri 1 Jakarta'
      };

      syncUserToGoogleSheets(userPayload, 'REGISTER');

      if (onLoginSuccess) {
        onLoginSuccess(userPayload);
      } else {
        setSuccessMessage('Login berhasil! Mengalihkan ke Dashboard...');
      }
    }, 1000);
  };

  const handleDemoLogin = (type) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    let demoUser = {};

    if (type === 'guru_premium') {
      demoUser = {
        id: 'usr_premium_01',
        name: 'Budi Santoso, M.Pd.',
        email: 'budi.santoso@guru.sma.sch.id',
        role: 'guru',
        is_premium: true,
        kredit_tersisa: 250,
        doc_generated_count: 14,
        school: 'SMA Negeri 1 Jakarta'
      };
      setEmail('budi.santoso@guru.sma.sch.id');
      setPassword('demo1234');
      setSelectedRole('guru');
    } else if (type === 'guru_free') {
      demoUser = {
        id: 'usr_free_01',
        name: 'Siti Rahmawati, S.Pd.',
        email: 'siti.rahma@sd.kemdikbud.go.id',
        role: 'guru',
        is_premium: false,
        kredit_tersisa: 1,
        doc_generated_count: 1,
        school: 'SD Negeri 05 Kebayoran'
      };
      setEmail('siti.rahma@sd.kemdikbud.go.id');
      setPassword('demo1234');
      setSelectedRole('guru');
    } else if (type === 'admin') {
      demoUser = {
        id: 'usr_admin_master',
        name: 'Root Admin Trisula',
        email: 'admin@trisula.ai',
        role: 'admin',
        is_premium: true,
        kredit_tersisa: 999999,
        doc_generated_count: 0,
        school: 'HQ Trisula Engine'
      };
      setEmail('admin@trisula.ai');
      setPassword('admin1234');
      setSelectedRole('admin');
    }

    setTimeout(() => {
      setIsLoading(false);
      syncUserToGoogleSheets(demoUser, 'LOGIN');
      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#132338]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 mb-2">
            <Icons.Cpu className="w-8 h-8 text-slate-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            TRISULA AI PORTAL
          </h1>
          <p className="text-xs text-slate-400">
            Engine Evaluasi Penilaian Otomatis, Modul Ajar, & Portal B2B Sekolah
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

        <form onSubmit={handleAuthSubmit} className="space-y-4">
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

          {authMode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0 cursor-pointer"
                />
                Ingat Saya
              </label>
              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Lupa Sandi?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {authMode === 'login' ? 'Masuk Sekarang' : authMode === 'register' ? 'Buat Akun Baru' : 'Kirim Instruksi Reset'}
                <Icons.ArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[10px] text-center uppercase tracking-wider text-slate-400 font-semibold">
            ⚡ PENGUJIAN CEPAT / AKUN DEMO
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('guru_premium')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-xl text-[10px] text-amber-300 font-semibold transition-all text-center cursor-pointer"
            >
              Guru Premium
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('guru_free')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-[10px] text-slate-300 font-semibold transition-all text-center cursor-pointer"
            >
              User Gratis
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-[10px] text-cyan-300 font-semibold transition-all text-center cursor-pointer"
            >
              Root Admin
            </button>
          </div>
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
  const [creditAmount, setCreditAmount] = useState(10);
  const [notification, setNotification] = useState(null);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'guru',
    is_premium: false,
    kredit_tersisa: 10,
    school: ''
  });

  const showToast = (message) => {
    setNotification({ message });
    setTimeout(() => setNotification(null), 3000);
  };

  const defaultUsers = [
    { id: 'usr_001', name: 'Budi Santoso, M.Pd.', email: 'budi.santoso@guru.sma.sch.id', role: 'guru', is_premium: true, kredit_tersisa: 250, doc_generated_count: 14, school: 'SMA Negeri 1 Jakarta' },
    { id: 'usr_002', name: 'Siti Rahmawati, S.Pd.', email: 'siti.rahma@sd.kemdikbud.go.id', role: 'guru', is_premium: false, kredit_tersisa: 1, doc_generated_count: 1, school: 'SD Negeri 05 Kebayoran' },
    { id: 'usr_003', name: 'Ahmad Dahlan, M.T.', email: 'ahmad.dahlan@yayasan.ac.id', role: 'guru', is_premium: false, kredit_tersisa: 0, doc_generated_count: 3, school: 'Yayasan Islam Pusat' },
  ];

  const activeUsers = usersData && usersData.length > 0 ? usersData : defaultUsers;

  const filteredUsers = activeUsers.filter(user => {
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
    showToast(`Berhasil +${added} kredit untuk ${selectedUserForCredits.name} & tersimpan ke Google Sheets.`);
    setSelectedUserForCredits(null);
  };

  const handleCreateUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      showToast('Mohon isi nama dan email pengguna!');
      return;
    }

    const newUserPayload = {
      id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      is_premium: newUserForm.is_premium,
      kredit_tersisa: parseInt(newUserForm.kredit_tersisa, 10) || 10,
      doc_generated_count: 0,
      school: newUserForm.school || 'Instansi Pendidikan'
    };

    if (onAddUser) {
      onAddUser(newUserPayload);
    }

    syncUserToGoogleSheets(newUserPayload, 'REGISTER');
    showToast(`Pengguna "${newUserPayload.name}" berhasil dibuat & disinkronkan ke Google Sheets!`);

    setIsAddUserModalOpen(false);
    setNewUserForm({
      name: '',
      email: '',
      role: 'guru',
      is_premium: false,
      kredit_tersisa: 10,
      school: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 p-4 md:p-8 font-sans">
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
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Dashboard Aktivasi User & Lisensi
          </h1>
          <p className="text-xs text-slate-400 mt-1">Data pengguna otomatis tersinkronisasi dengan Google Sheets</p>
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
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-80"
          />
          <div className="flex items-center gap-2">
            <button onClick={() => setStatusFilter('ALL')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${statusFilter === 'ALL' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Semua</button>
            <button onClick={() => setStatusFilter('PREMIUM')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${statusFilter === 'PREMIUM' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Premium</button>
            <button onClick={() => setStatusFilter('FREE')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${statusFilter === 'FREE' ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Gratis</button>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase">
              <tr>
                <th className="p-4">Pengguna</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status Lisensi</th>
                <th className="p-4">Sisa Kredit</th>
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
                  <td className="p-4">
                    <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {user.role || 'guru'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${user.is_premium ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                      {user.is_premium ? 'PREMIUM' : 'GRATIS'}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{user.kredit_tersisa} doc</td>
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
                      + Kredit
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
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>👤</span> Tambah Pengguna Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="Contoh: Dr. Herman Wijaya, M.Pd."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Terdaftar</label>
                <input
                  type="email"
                  required
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="herman@sekolah.sch.id"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sekolah / Instansi</label>
                <input
                  type="text"
                  value={newUserForm.school}
                  onChange={(e) => setNewUserForm({ ...newUserForm, school: e.target.value })}
                  placeholder="Contoh: SMAN 2 Surabaya"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role / Peran</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="guru">Pengajar / Guru</option>
                    <option value="siswa">Siswa / Peserta</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Sisa Kredit Awal</label>
                  <input
                    type="number"
                    min="0"
                    value={newUserForm.kredit_tersisa}
                    onChange={(e) => setNewUserForm({ ...newUserForm, kredit_tersisa: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPremiumCheck"
                  checked={newUserForm.is_premium}
                  onChange={(e) => setNewUserForm({ ...newUserForm, is_premium: e.target.checked })}
                  className="rounded border-slate-800 bg-slate-950 text-[#D4AF37] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isPremiumCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Aktifkan Lisensi PREMIUM Langsung
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 cursor-pointer"
                >
                  Simpan & Sync Google Sheets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedUserForCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-[#0B192C] border border-[#D4AF37]/40 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Tambah Kredit untuk {selectedUserForCredits.name}</h3>
            <form onSubmit={handleCreditSubmit} className="space-y-3">
              <input
                type="number"
                min="1"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setSelectedUserForCredits(null)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs cursor-pointer">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold rounded-lg text-xs cursor-pointer">Simpan & Sync</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AIWorkspace({ activeDocument, onBackToDashboard, externalUserStatus }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
  const [userStatus, setUserStatus] = useState(externalUserStatus || {
    is_premium: false,
    kredit_tersisa: 1,
    doc_generated_count: 1
  });

  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState('');
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
- **TP3**: Mempresentasikan hasil analisis proyek pelestarian lingkungan secara kolaboratif.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP (IPA & BIOLOGI)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 2 JP | Mampu menganalisis interaksi trophic level | Formatif Latihan Soal |
| **ATP.10.2** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |

---

## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (IPA & BIOLOGI)
| Kriteria Penilaian | Belum Memenuhi (1) | Memenuhi (2-3) | Sangat Baik (4) |
| :--- | :--- | :--- | :--- |
| **Penerapan Konsep** | Salah mengidentifikasi rantai makanan | Tepat mengidentifikasi 80% komponen | Tepat 100% & menganalisis dampak lingkungan |
| **Laporan Proyek** | Laporan tidak terstruktur | Laporan rapi dan alur benar | Laporan sangat presisi & solutif |

---

## VI. PROGRAM TAHUNAN (PROTA)
### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (IPA & BIOLOGI)
| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |
| :--- | :--- | :--- | :--- |
| **1** | Keanekaragaman Hayati & Ekosistem | 18 JP | Semester 1 |
| **2** | Perubahan Lingkungan & Pemanasan Global | 18 JP | Semester 2 |

---

## VII. PROGRAM SEMESTER (PROSEM)
### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (IPA & BIOLOGI)
| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Analisis Interaksi Ekosistem | 6 JP | x | x | | | | |
| **2** | Pemetaan Keanekaragaman Hayati | 6 JP | | | x | x | | |
| **3** | Proyek Konservasi Lingkungan | 6 JP | | | | | x | x |

---

## VIII. INTEGRASI 3 PILAR DEEP LEARNING

### 1. Mindful Learning (Penyadaran Diri)
- **Latihan Hening STOP**: Siswa diajak hening selama 3 menit untuk mengamati lingkungan sekitar dan menyiapkan kestabilan mental sebelum belajar.
- **Refleksi Awal**: Siswa mengisi jurnal singkat mengenai harapan dan pemahaman awal materi ekosistem.

### 2. Meaningful Learning (Keterhubungan Masalah Nyata)
- **Konteks Lokal**: Membahas isu pencemaran sungai lokal dan grafik tren perubahan keanekaragaman spesies lokal.
- **Problem Solving**: Merancang solusi daur ulang limbah organik sekolah.

### 3. Joyful Learning (Kolaboratif & Menggembirakan)
- **Gamifikasi Pembelajaran**: Tantangan tim interaktif berbasis kuis/permainan "BONGKAR LOGIKA EKOSISTEM".
- **Apresiasi Sebaya**: Sesi saling memberikan umpan balik positif antar kelompok.

---

## IX. DUKUNGAN RUMUS MATEMATIKA (LATEX FORMULA)

Berikut adalah formula dasar perhitungan laju pertumbuhan populasi dan rata-rata sampel:
- **Model Laju Pertumbuhan Populasi**: $$P(t) = P_0 e^{rt}$$
- **Rata-rata Sampel**: $\\bar{x} = \\frac{\\sum x_i}{n}$

---

## X. LEMBAR KERJA PESERTA DIDIK (LKPD)
### 👥 Nama Kelompok: ____________________
1. Hitunglah populasi $P(t)$ jika diketahui $P_0 = 100$, $r = 0.05$, $t = 10$!
2. Analisis interaksi antar spesies pada tabel observasi di atas dan tuliskan solusinya!`
  };

  const currentDocument = activeDocument || defaultDoc;
  const [docContent, setDocContent] = useState(currentDocument.content);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: `Halo Bapak/Ibu Guru! Saya Deep Learning Engine v3.0. Dokumen ${currentDocument.subject || 'Pembelajaran'} Anda siap disempurnakan dengan sintesis AI!` }
  ]);

  useEffect(() => {
    if (activeDocument && activeDocument.content) {
      setDocContent(activeDocument.content);
    }
  }, [activeDocument]);

  const handleSendMessage = (customPrompt) => {
    const textToSend = customPrompt || inputInstruction;
    if (!textToSend.trim()) return;

    if (!userStatus.is_premium && userStatus.doc_generated_count >= 1) {
      setPaywallReason('Batas 1x Generate Dokumen Gratis telah dicapai. Upgrade ke Premium untuk Generate tanpa batas!');
      setIsPaywallOpen(true);
      return;
    }

    setInputInstruction('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setIsGenerating(true);

    setTimeout(() => {
      const generatedMarkdownBlock = generateRichAIContent(textToSend, currentDocument.subject);
      
      setDocContent(prev => prev + generatedMarkdownBlock);
      setUserStatus(prev => ({
        ...prev,
        doc_generated_count: prev.doc_generated_count + 1,
        kredit_tersisa: Math.max(0, prev.kredit_tersisa - 1)
      }));
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: `✨ **[SINTESIS DEEP LEARNING SELESAI]**\n\nSaya telah menyusun dan menyuntikkan seksi baru berdasarkan instruksi: "${textToSend}".\n\nSeksi baru kini aktif dan dapat Anda lihat langsung di kanvas dokumen sebelah kanan!` 
      }]);
      setIsGenerating(false);
    }, 1000);
  };

  const handleOpenExportModal = () => {
    if (!userStatus.is_premium) {
      setPaywallReason('Cetak dan Export Dokumen (Word, PDF, TXT) adalah fitur eksklusif akun Premium.');
      setIsPaywallOpen(true);
      return;
    }
    setIsExportModalOpen(true);
  };

  const handleDownloadWord = () => {
    const parsedHtmlBody = parseMarkdownToHTML(docContent);
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${currentDocument.title || 'Modul_Ajar'}</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 20px; color: #1E293B; }
          h1 { color: #1E3A8A; border-bottom: 2px solid #D4AF37; }
          h2 { color: #1E3A8A; border-bottom: 1px solid #CBD5E1; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background-color: #1E3A8A; color: #FFFFFF; padding: 8px; }
          td { border: 1px solid #CBD5E1; padding: 8px; }
        </style>
      </head>
      <body><div>${parsedHtmlBody}</div></body>
      </html>
    `;
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
    setIsExportModalOpen(false);
    setTimeout(() => window.print(), 300);
  };

  const filterContentByTab = (fullContent, tabId) => {
    if (tabId === 'modul-ajar') return fullContent;
    const sections = fullContent.split(/(?=\n##\s+)/g);
    const matched = sections.find(sec => {
      const line = sec.trim().split('\n')[0].toUpperCase();
      switch (tabId) {
        case 'cp': return line.includes('CAPAIAN PEMBELAJARAN') || line.includes('CP');
        case 'tp': return line.includes('TUJUAN PEMBELAJARAN') && !line.includes('ALUR') && !line.includes('KRITERIA');
        case 'atp': return line.includes('ALUR TUJUAN');
        case 'kktp': return line.includes('KRITERIA KETERCAPAIAN');
        case 'prota': return line.includes('PROGRAM TAHUNAN');
        case 'prosem': return line.includes('PROGRAM SEMESTER');
        default: return false;
      }
    });
    return matched ? matched.trim() : null;
  };

  const activeTabContent = filterContentByTab(docContent, activeSubTab);

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 font-sans">
      <div className="w-full md:w-5/12 bg-[#0F172A] border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <button onClick={onBackToDashboard} className="text-xs text-slate-400 hover:text-white cursor-pointer">← Kembali</button>
          <span className="text-xs font-bold text-[#D4AF37]">AI Co-Pilot (Deep Learning v3.0)</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map(m => (
            <div key={m.id} className={`p-3 rounded-2xl max-w-[85%] ${m.sender === 'user' ? 'bg-indigo-600 ml-auto text-white' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
              {m.text}
            </div>
          ))}
          {isGenerating && <div className="text-xs text-slate-400 italic">⏳ AI sedang merancang & menyuntikkan dokumen...</div>}
        </div>

        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => handleSendMessage('Tolong buatkan Asesmen & Rubrik Penilaian')} className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-semibold shrink-0 cursor-pointer">
              🎯 + Asesmen & Rubrik
            </button>
            <button onClick={() => handleSendMessage('Tolong buatkan LKPD IPAS lengkap')} className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[10px] font-semibold shrink-0 cursor-pointer">
              📄 + LKPD Lengkap
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputInstruction}
              onChange={(e) => setInputInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik instruksi, misal: 'Tolong buatkan seksi PROSEM'..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button onClick={() => handleSendMessage()} className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer">Kirim</button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 bg-[#0F172A] border border-slate-800 rounded-2xl flex flex-col overflow-hidden p-4 space-y-4">
        <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'modul-ajar', label: 'Modul Ajar' },
              { id: 'cp', label: 'CP' },
              { id: 'tp', label: 'TP' },
              { id: 'atp', label: 'ATP' },
              { id: 'kktp', label: 'KKTP' },
              { id: 'prota', label: 'Prota' },
              { id: 'prosem', label: 'Prosem' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === tab.id ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button onClick={handleOpenExportModal} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5">
            <Icons.Printer className="w-4 h-4" />
            <span>🖨️ Cetak / Export Dokumen</span>
          </button>
        </div>

        {/* CANVAS PREVIEW RICH TEXT */}
        <div className="flex-1 bg-white text-slate-900 p-8 rounded-2xl overflow-y-auto shadow-2xl">
          {activeTabContent ? (
            <div
              className="prose prose-slate max-w-none text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(activeTabContent) }}
            />
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="text-3xl">📄</div>
              <h3 className="text-base font-bold text-slate-800">
                Seksi {activeSubTab.toUpperCase()} Belum Dibuat
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Seksi ini belum ada di dokumen kamu. Klik tombol di bawah ini untuk meminta AI Co-Pilot membuatkan drafnya secara otomatis!
              </p>
              <button
                onClick={() => handleSendMessage(`Tolong buatkan seksi ${activeSubTab.toUpperCase()} secara lengkap dan rinci`)}
                className="px-5 py-2.5 bg-[#1E3A8A] text-white font-bold rounded-xl text-xs hover:bg-indigo-900 transition-all shadow-md cursor-pointer"
              >
                ✨ Generasikan Draf {activeSubTab.toUpperCase()} Sekarang
              </button>
            </div>
          )}
        </div>
      </div>

      {/* EXPORT MODAL CENTER */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-[#D4AF37] flex items-center gap-2">
                <Icons.FileText /> Export Center Dokumen
              </h3>
              <button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>
            
            <p className="text-xs text-slate-300">Pilih format unduhan untuk dokumen perangkat ajar Anda:</p>

            <div className="space-y-2.5">
              <button
                onClick={handleDownloadWord}
                className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-white">🟦 Unduh Berkas Word (.doc)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Layout Tabel Native Presisi</div>
                </div>
                <span className="text-[#D4AF37]">Unduh →</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-white">📄 Unduh Teks Polos (.txt)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Format Markdown murni</div>
                </div>
                <span className="text-[#D4AF37]">Unduh →</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="w-full p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-white">🖨️ Cetak / Simpan PDF</div>
                  <div className="text-[10px] text-slate-400 font-normal">Mencetak kanvas dokumen A4</div>
                </div>
                <span className="text-[#D4AF37]">Cetak →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYWALL LOCK MODAL */}
      {isPaywallOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-[#D4AF37] rounded-3xl max-w-lg w-full p-6 space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-base text-[#D4AF37]">🔒 Fitur Premium Terkunci</h3>
              <button onClick={() => setIsPaywallOpen(false)} className="text-slate-400 cursor-pointer">✕</button>
            </div>
            <p className="text-xs text-slate-300">{paywallReason}</p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900 p-4 border border-amber-500/40 rounded-xl space-y-2">
                <div className="font-bold text-xs">Paket Bulanan</div>
                <div className="text-lg font-black text-[#D4AF37]">Rp29.000</div>
                <a href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20beli%20Paket%20Bulanan" target="_blank" rel="noreferrer" className="block text-center py-1.5 bg-[#D4AF37] text-slate-950 font-bold rounded-lg text-xs">Beli via WA</a>
              </div>
              <div className="bg-slate-900 p-4 border border-slate-800 rounded-xl space-y-2">
                <div className="font-bold text-xs">Paket Kuota</div>
                <div className="text-lg font-black text-indigo-400">Rp10.000</div>
                <a href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20beli%20Paket%20Kuota" target="_blank" rel="noreferrer" className="block text-center py-1.5 bg-indigo-600 text-white font-bold rounded-lg text-xs">Beli via WA</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MyFilesView({ documents, onOpenDocument, onOpenInEditor, onDeleteDocument, onOpenWizard }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
            Pengelola Berkas & Perangkat Ajar
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Berkas Saya ({documents.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola, sunting, atau ekspor seluruh draf perangkat ajar yang telah dibuat.
          </p>
        </div>

        <button
          onClick={onOpenWizard}
          className="px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Icons.Plus />
          <span>+ Buat Perangkat Baru</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Cari judul perangkat ajar atau mata pelajaran..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-96"
        />
        <span className="text-xs text-slate-400">Menampilkan {filtered.length} berkas</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(doc => (
          <div key={doc.id} className="bg-[#0D1C2E] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {doc.subject} • {doc.phase}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${doc.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {doc.status || 'In Progress'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white line-clamp-2">{doc.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {doc.topic ? `Topik: ${doc.topic}` : 'Modul Ajar Deep Learning Kurikulum Merdeka.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => onDeleteDocument(doc.id)}
                className="p-1.5 hover:bg-rose-950/50 rounded-lg text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Hapus Berkas"
              >
                <Icons.Trash />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenInEditor(doc)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1"
                  title="Sunting di Editor Teks Rapih"
                >
                  <Icons.Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Editor Teks</span>
                </button>

                <button
                  onClick={() => onOpenDocument(doc)}
                  className="text-[#D4AF37] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka Workspace</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleanEditorView({ activeDocument, onSaveDocument }) {
  const [title, setTitle] = useState(activeDocument?.title || 'Modul Ajar Deep Learning');
  const [content, setContent] = useState(activeDocument?.content || `# MODUL AJAR DEEP LEARNING\n\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: General\n- **Fase**: Fase E`);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (activeDocument) {
      setTitle(activeDocument.title || 'Modul Ajar Deep Learning');
      setContent(activeDocument.content || `# MODUL AJAR DEEP LEARNING\n\n## I. INFORMASI UMUM\n- **Mata Pelajaran**: ${activeDocument.subject || 'General'}\n- **Fase**: ${activeDocument.phase || 'Fase E'}`);
    }
  }, [activeDocument]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    if (onSaveDocument) {
      onSaveDocument({ ...activeDocument, title, content });
    }
    showToast('✨ Dokumen berhasil disimpan!');
  };

  const handleInsertHeader = (level) => {
    const prefix = '#'.repeat(level) + ' ';
    setContent(prev => prev + `\n\n${prefix}JUDUL SEKSI BARU\n`);
  };

  const handleInsertTable = () => {
    const tableTemplate = `\n\n| Kolom 1 | Kolom 2 | Kolom 3 |\n| :--- | :--- | :--- |\n| Data A | Data B | Data C |\n| Data D | Data E | Data F |\n`;
    setContent(prev => prev + tableTemplate);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 space-y-4 font-sans max-w-7xl mx-auto">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-2xl animate-bounce">
          {toast}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
            Editor Teks Rapih & Markdown Studio
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg md:text-xl font-bold bg-transparent text-white focus:outline-none focus:border-b border-[#D4AF37] mt-1 w-full md:w-96"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
        >
          💾 Simpan Perubahan
        </button>
      </div>

      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl overflow-x-auto text-xs">
        <button onClick={() => handleInsertHeader(1)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold">H1</button>
        <button onClick={() => handleInsertHeader(2)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold">H2</button>
        <button onClick={() => handleInsertHeader(3)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold">H3</button>
        <span className="text-slate-700">|</span>
        <button onClick={handleInsertTable} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">📊 + Tabel</button>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-[500px]">
        <div className="flex flex-col bg-[#0D1C2E] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400">
            📝 EDITOR MARKDOWN MURNI
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 w-full bg-slate-950 p-4 text-xs font-mono text-slate-200 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col bg-[#0D1C2E] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-[#D4AF37]">
            👁️ PRATINJAU KANVAS HASIL (LIVE PREVIEW)
          </div>
          <div className="flex-1 bg-white p-6 overflow-y-auto text-slate-900">
            <div
              className="prose prose-slate max-w-none text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(content) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WizardModal({ isOpen, onClose, onCreateDocument }) {
  const [subject, setSubject] = useState('IPA & Biologi');
  const [phase, setPhase] = useState('Fase E (Kelas 10 SMA)');
  const [topic, setTopic] = useState('Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan');
  const [hours, setHours] = useState('2 JP x 45 Menit');
  
  // Selection options for curriculum components
  const [selectedComponents, setSelectedComponents] = useState({
    modulAjar: true,
    cp: true,
    tp: true,
    atp: true,
    kktp: true,
    prota: true,
    prosem: true
  });

  const [pillars, setPillars] = useState({ mindful: true, meaningful: true, joyful: true });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const upperSub = subject.toUpperCase();

    let generatedContent = `# MODUL AJAR DEEP LEARNING: ${upperSub} ${phase.toUpperCase()}

## I. INFORMASI UMUM
- **Mata Pelajaran**: ${subject}
- **Fase / Kelas**: ${phase}
- **Topik Utama**: ${topic}
- **Alokasi Waktu**: ${hours}`;

    if (selectedComponents.cp) {
      generatedContent += `\n\n---\n## II. CAPAIAN PEMBELAJARAN (CP)\n### 📘 Analisis Capaian Pembelajaran Elemen (${upperSub})\nPeserta didik mampu memahami konsep utama ${topic}, mengaitkannya dengan fenomena nyata, serta merancang solusi kreatif melalui pendekatan analisis kritis.`;
    }

    if (selectedComponents.tp) {
      generatedContent += `\n\n---\n## III. TUJUAN PEMBELAJARAN (TP)\n### 🎯 Poin Tujuan Pembelajaran ABCD (${upperSub})\n- **TP1**: Menganalisis struktur dan dinamika ${topic}.\n- **TP2**: Menyusun model matematika/logika sederhana terkait ${topic}.\n- **TP3**: Mempresentasikan hasil analisis proyek kelompok secara kolaboratif.`;
    }

    if (selectedComponents.atp) {
      generatedContent += `\n\n---\n## IV. ALUR TUJUAN PEMBELAJARAN (ATP)\n### 🗺️ Pemetaan Runtutan ATP (${upperSub})\n| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |\n| :--- | :--- | :--- | :--- |\n| **ATP.01** | 2 JP | Mampu menganalisis efisiensi model matematika | Formatif Latihan Soal |\n| **ATP.02** | 2 JP | Mampu membuat diagram alir terstruktur | Unjuk Kerja Kelompok |`;
    }

    if (selectedComponents.kktp) {
      generatedContent += `\n\n---\n## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)\n### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (${upperSub})\n| Kriteria Penilaian | Belum Memenuhi (1) | Memenuhi (2-3) | Sangat Baik (4) |\n| :--- | :--- | :--- | :--- |\n| **Penerapan Konsep** | Salah mengidentifikasi komponen | Tepat mengidentifikasi 80% komponen | Tepat 100% & solutif |`;
    }

    if (selectedComponents.prota) {
      generatedContent += `\n\n---\n## VI. PROGRAM TAHUNAN (PROTA)\n### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (${upperSub})\n| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |\n| :--- | :--- | :--- | :--- |\n| **1** | ${topic} | 18 JP | Semester 1 |`;
    }

    if (selectedComponents.prosem) {
      generatedContent += `\n\n---\n## VII. PROGRAM SEMESTER (PROSEM)\n### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (${upperSub})\n| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **1** | ${topic} | 6 JP | x | x | | | | |`;
    }

    generatedContent += `\n\n---\n## VIII. INTEGRASI 3 PILAR DEEP LEARNING\n${pillars.mindful ? '- **Mindful Learning**: Siswa diajak melakukan sesi hening STOP untuk membangun kesadaran belajar.' : ''}\n${pillars.meaningful ? '- **Meaningful Learning**: Menganalisis isu lingkungan lokal di sekitar lingkungan sekolah.' : ''}\n${pillars.joyful ? '- **Joyful Learning**: Kuis interaktif berbasis kelompok dan presentasi solutif.' : ''}`;

    const newDoc = {
      id: `doc_${Date.now()}`,
      title: `Modul Ajar ${subject} - ${topic}`,
      subject: subject,
      phase: phase,
      topic: topic,
      status: 'In Progress',
      content: generatedContent
    };

    onCreateDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B192C] border border-[#D4AF37]/50 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-[#D4AF37] flex items-center gap-2">
            <span>✨</span> Wizard Generator Perangkat Ajar Deep Learning
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mata Pelajaran</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Fisika / Matematika / Bahasa Indonesia"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Fase / Kelas</label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topik / Materi Utama</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Analisis Data & Statistika"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Alokasi Waktu</label>
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* CURRICULUM SECTIONS SELECTION */}
          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] mb-1.5">
              Pilihan Komponen Perangkat Ajar Wajib
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.modulAjar} onChange={(e) => setSelectedComponents({ ...selectedComponents, modulAjar: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                📘 Modul Ajar
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.cp} onChange={(e) => setSelectedComponents({ ...selectedComponents, cp: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                📘 CP (Capaian)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.tp} onChange={(e) => setSelectedComponents({ ...selectedComponents, tp: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                🎯 TP (Tujuan)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.atp} onChange={(e) => setSelectedComponents({ ...selectedComponents, atp: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                🗺️ ATP (Alur)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.kktp} onChange={(e) => setSelectedComponents({ ...selectedComponents, kktp: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                📊 KKTP & Rubrik
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.prota} onChange={(e) => setSelectedComponents({ ...selectedComponents, prota: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                🗓️ Prota
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={selectedComponents.prosem} onChange={(e) => setSelectedComponents({ ...selectedComponents, prosem: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                📅 Prosem
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Integrasi 3 Pilar Deep Learning</label>
            <div className="flex gap-4 text-xs text-slate-300 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pillars.mindful} onChange={(e) => setPillars({ ...pillars, mindful: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                Mindful
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pillars.meaningful} onChange={(e) => setPillars({ ...pillars, meaningful: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                Meaningful
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pillars.joyful} onChange={(e) => setPillars({ ...pillars, joyful: e.target.checked })} className="rounded bg-slate-900 text-[#D4AF37]" />
                Joyful
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer">Batal</button>
            <button type="submit" className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 cursor-pointer">✨ Generasikan Dokumen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 'usr_premium_01',
    name: 'Budi Santoso, M.Pd.',
    email: 'budi.santoso@guru.sma.sch.id',
    role: 'guru',
    is_premium: true,
    kredit_tersisa: 250,
    doc_generated_count: 14,
    school: 'SMA Negeri 1 Jakarta'
  });

  const [allUsers, setAllUsers] = useState([
    { id: 'usr_admin_master', name: 'Root Admin Trisula', email: 'admin@trisula.ai', role: 'admin', is_premium: true, kredit_tersisa: 999999, doc_generated_count: 0, school: 'HQ Trisula Engine' },
    { id: 'usr_premium_01', name: 'Budi Santoso, M.Pd.', email: 'budi.santoso@guru.sma.sch.id', role: 'guru', is_premium: true, kredit_tersisa: 250, doc_generated_count: 14, school: 'SMA Negeri 1 Jakarta' },
    { id: 'usr_free_01', name: 'Siti Rahmawati, S.Pd.', email: 'siti.rahma@sd.kemdikbud.go.id', role: 'guru', is_premium: false, kredit_tersisa: 1, doc_generated_count: 1, school: 'SD Negeri 05 Kebayoran' }
  ]);

  const [documents, setDocuments] = useState([
    {
      id: 'doc_01',
      title: 'Modul Ajar IPA & Biologi - Ekosistem & Keanekaragaman Hayati',
      subject: 'IPA & Biologi',
      phase: 'Fase E (Kelas 10 SMA)',
      topic: 'Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan',
      status: 'In Progress',
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
- **TP3**: Mempresentasikan hasil analisis proyek pelestarian lingkungan secara kolaboratif.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP (IPA & BIOLOGI)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 2 JP | Mampu menganalisis interaksi trophic level | Formatif Latihan Soal |
| **ATP.10.2** | 2 JP | Mampu menyusun laporan proyek pelestarian | Unjuk Kerja Kelompok |

---

## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (IPA & BIOLOGI)
| Kriteria Penilaian | Belum Memenuhi (1) | Memenuhi (2-3) | Sangat Baik (4) |
| :--- | :--- | :--- | :--- |
| **Penerapan Konsep** | Salah mengidentifikasi rantai makanan | Tepat mengidentifikasi 80% komponen | Tepat 100% & menganalisis dampak |

---

## VI. PROGRAM TAHUNAN (PROTA)
### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (IPA & BIOLOGI)
| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |
| :--- | :--- | :--- | :--- |
| **1** | Keanekaragaman Hayati & Ekosistem | 18 JP | Semester 1 |
| **2** | Perubahan Lingkungan & Pemanasan Global | 18 JP | Semester 2 |

---

## VII. PROGRAM SEMESTER (PROSEM)
### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (IPA & BIOLOGI)
| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Analisis Interaksi Ekosistem | 6 JP | x | x | | | | |
| **2** | Pemetaan Keanekaragaman Hayati | 6 JP | | | x | x | | |

---

## VIII. INTEGRASI 3 PILAR DEEP LEARNING
- **Mindful Learning**: Siswa diajak melakukan sesi hening STOP untuk membangun kesadaran belajar.
- **Meaningful Learning**: Menganalisis isu lingkungan lokal di sekitar sekolah.
- **Joyful Learning**: Kuis interaktif berbasis kelompok dan presentasi solutif.`
    },
    {
      id: 'doc_02',
      title: 'Perangkat Ajar Matematika - Analisis Data & Peluang',
      subject: 'Matematika',
      phase: 'Fase F (Kelas 11 SMA)',
      topic: 'Analisis Data, Statistika & Peluang',
      status: 'Completed',
      content: `# PERANGKAT AJAR MATEMATIKA FASE F

## I. INFORMASI UMUM
- **Mata Pelajaran**: Matematika
- **Fase / Kelas**: Fase F (Kelas 11 SMA)

## II. CAPAIAN PEMBELAJARAN (CP)
Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.`
    }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeDocument, setActiveDocument] = useState(documents[0]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSuccess = (userPayload) => {
    setCurrentUser(userPayload);
    setAllUsers(prev => {
      if (!prev.some(u => u.email === userPayload.email)) {
        return [userPayload, ...prev];
      }
      return prev;
    });
    setCurrentView(userPayload.role === 'admin' ? 'admin' : 'dashboard');
    showToast(`Selamat datang kembali, ${userPayload.name}! Data tersinkron ke Google Sheets.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    showToast('Anda telah keluar dari akun.');
  };

  const handleUpdateUserStatus = (userId, newStatus) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, is_premium: newStatus } : u));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, is_premium: newStatus };
      setCurrentUser(updated);
      syncUserToGoogleSheets(updated, 'UPDATE_STATUS');
    }
  };

  const handleAddCredits = (userId, amount) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, kredit_tersisa: (u.kredit_tersisa || 0) + amount } : u));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, kredit_tersisa: currentUser.kredit_tersisa + amount };
      setCurrentUser(updated);
      syncUserToGoogleSheets(updated, 'ADD_CREDITS');
    }
  };

  const handleAddUser = (newUserPayload) => {
    setAllUsers(prev => [newUserPayload, ...prev]);
  };

  const handleCreateDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocument(newDoc);
    setCurrentView('workspace');
    showToast(`Perangkat Ajar "${newDoc.title}" berhasil dibuat!`);
  };

  const handleOpenDocumentInWorkspace = (doc) => {
    setActiveDocument(doc);
    setCurrentView('workspace');
  };

  const handleOpenDocumentInEditor = (doc) => {
    setActiveDocument(doc);
    setCurrentView('editor');
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Berkas berhasil dihapus dari daftar.');
  };

  const handleSaveEditorDocument = (updatedDoc) => {
    setDocuments(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
    setActiveDocument(updatedDoc);
    showToast('Perubahan berkas berhasil disimpan!');
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#070F1E] text-slate-100 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-slate-950">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#D4AF37] text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* HEADER TOP NAV BAR */}
      <header className="h-16 bg-[#0B1728]/95 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity text-left cursor-pointer"
          >
            <div className="p-2 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-xl shadow-md shadow-amber-500/10">
              <Icons.Cpu className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wider block">TRISULAPROMPT</span>
            </div>
          </button>
          
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-slate-800/90 text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-bold rounded-full uppercase tracking-wider">
            DEEP LEARNING ENGINE V3.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWizardOpen(true)}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Icons.Plus className="w-4 h-4 text-slate-950" />
            <span>+ Buat Perangkat Baru</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-[#D4AF37] text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-md">
              {currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : 'GH'}
            </div>
            <div className="hidden md:block text-left text-xs leading-tight">
              <div className="font-bold text-white flex items-center gap-1">
                {currentUser.name}
                {currentUser.is_premium && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded font-bold">
                    PRO
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                {currentUser.school || 'Guru Penggerak'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 md:px-3 md:py-2 bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Keluar / Logout dari Akun"
          >
            <Icons.LogOut />
            <span className="hidden md:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* MAIN BODY LAYOUT WITH SIDEBAR */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGASI UTAMA KIRI */}
        <aside className="w-64 bg-[#0B1728] border-r border-slate-800/80 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              NAVIGASI UTAMA
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-slate-800/90 text-white border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icons.Home /> Halaman Depan
              </button>

              <button
                onClick={() => setCurrentView('workspace')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'workspace'
                    ? 'bg-slate-800/90 text-white border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icons.Bolt /> Ruang Bantu AI
              </button>

              <button
                onClick={() => setCurrentView('files')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'files'
                    ? 'bg-slate-800/90 text-white border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icons.Folder /> Berkas Saya
              </button>

              <button
                onClick={() => setCurrentView('editor')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  currentView === 'editor'
                    ? 'bg-slate-800/90 text-white border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icons.Edit /> Editor Teks Rapih
              </button>

              {(currentUser.role === 'admin' || currentUser.email.includes('admin')) && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                    currentView === 'admin'
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icons.Shield /> Panel Admin
                </button>
              )}
            </nav>
          </div>

          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1 text-[10px] text-slate-400">
            <div className="font-bold text-amber-300 flex items-center gap-1">
              ⚡ 3 Pilar Active
            </div>
            <div>Mindful • Meaningful • Joyful Engine Connected</div>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
              {/* WELCOME BANNER */}
              <div className="bg-gradient-to-r from-[#112238] via-[#0F1E33] to-[#0A1628] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="space-y-3 max-w-2xl relative z-10">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                    SaaS Engine Kurikulum Merdeka v2.5
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    Selamat Datang, Bapak/Ibu Guru Hebat! 🚀
                  </h1>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Rancang Modul Ajar, TP, ATP, KKTP, Prota, dan Prosem terintegrasi 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara otomatis dan presisi.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsWizardOpen(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>✨ Mulai Wizard Deep Learning</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('files')}
                      className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Lihat Semua Proyek ({documents.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* STATS METRICS GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="text-[11px] text-slate-400">Total Perangkat Ajar</div>
                  <div className="text-2xl font-bold text-white">{documents.length}</div>
                  <div className="text-[10px] text-emerald-400">+{documents.length} minggu ini</div>
                </div>

                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="text-[11px] text-slate-400">Dalam Proses (Draft)</div>
                  <div className="text-2xl font-bold text-amber-400">
                    {documents.filter(d => d.status !== 'Completed').length}
                  </div>
                  <div className="text-[10px] text-amber-300">Butuh peninjauan TP/ATP</div>
                </div>

                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="text-[11px] text-slate-400">Selesai & Siap Cetak</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {documents.filter(d => d.status === 'Completed').length}
                  </div>
                  <div className="text-[10px] text-emerald-300">Siap di-export PDF/Word</div>
                </div>

                <div className="bg-[#0D1C2E] border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="text-[11px] text-slate-400">Estimasi Waktu Dihemat</div>
                  <div className="text-2xl font-bold text-[#D4AF37]">18.5 Jam</div>
                  <div className="text-[10px] text-cyan-400">Otomasi Deep Learning</div>
                </div>
              </div>

              {/* DRAFT PERANGKAT AJAR TERBARU */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📋</span> Draft Perangkat Ajar Terbaru
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {documents.slice(0, 2).map((doc) => (
                    <div key={doc.id} className="bg-[#0D1C2E] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {doc.subject} • {doc.phase}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${doc.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                          {doc.status || 'In Progress'}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {doc.topic ? `Topik Utama: ${doc.topic}` : 'Perangkat Ajar Kurikulum Merdeka.'}
                      </p>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-500">Deep Learning Engine</span>
                        <button
                          onClick={() => handleOpenDocumentInWorkspace(doc)}
                          className="text-[#D4AF37] font-bold hover:underline cursor-pointer"
                        >
                          Buka AI Workspace →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'workspace' && (
            <div className="p-2 w-full h-[calc(100vh-4rem)]">
              <AIWorkspace 
                activeDocument={activeDocument}
                onBackToDashboard={() => setCurrentView('dashboard')} 
                externalUserStatus={currentUser}
              />
            </div>
          )}

          {currentView === 'files' && (
            <MyFilesView
              documents={documents}
              onOpenDocument={handleOpenDocumentInWorkspace}
              onOpenInEditor={handleOpenDocumentInEditor}
              onDeleteDocument={handleDeleteDocument}
              onOpenWizard={() => setIsWizardOpen(true)}
            />
          )}

          {currentView === 'editor' && (
            <CleanEditorView
              activeDocument={activeDocument}
              onSaveDocument={handleSaveEditorDocument}
            />
          )}

          {currentView === 'admin' && (
            <div className="w-full">
              <AdminDashboard 
                usersData={allUsers} 
                onUpdateUserStatus={handleUpdateUserStatus}
                onAddCredits={handleAddCredits}
                onAddUser={handleAddUser}
              />
            </div>
          )}
        </main>
      </div>

      {/* WIZARD MODAL BUAT PERANGKAT BARU */}
      <WizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateDocument={handleCreateDocument}
      />
    </div>
  );
}
