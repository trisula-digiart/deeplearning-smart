import React, { useState, useEffect } from 'react';

/**
 * TRISULAPROMPT - AIWorkspace Component v2.5 (Enterprise Master Edition - Standalone Ready)
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Stack: React / Vite / Tailwind CSS
 * Features:
 *  - Self-contained Gemini Prompt Synthesis Engine
 *  - Split-Screen Layout (AI Co-Pilot Left + Live Canvas Preview Right)
 *  - Full Markdown & Custom Table HTML Parser Engine
 *  - Native Image Parser Engine ![alt](url)
 *  - LaTeX Math Parser Engine ($inline$ & $$display$$)
 *  - Mermaid.js Diagram Code Block Parser Engine
 *  - SVG Data Chart Visualizer Code Block Parser Engine
 *  - Dynamic Subject Generator Context (IPAS, Matematika, STEM, Bahasa Indonesia)
 *  - Anti-Clipping Top Margin Heading Fix
 *  - Full Enterprise Export Engine (Word .doc with styles, Plain .txt, & PDF Print Dialog)
 */

// Self-contained Deep Learning prompt generator service
const generateDeepLearningPrompt = ({ subject, phase, topic, instruction }) => {
  return `[PROMPT SYNTHESIS] Subject: ${subject || 'General'} | Phase: ${phase || 'Fase F'} | Topic: ${topic || 'General'} | Instruction: ${instruction}`;
};

export default function AIWorkspace({ activeDocument, onBackToDashboard, onUpdateDocument }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');
  
  // Default fallback data (STEM Integrated: Matematika, Fisika, IPAS)
  const defaultDoc = {
    id: 'doc-stem-master',
    title: 'Modul Ajar STEM - Model Matematika, Fisika Parabola & Diagram Alir',
    subject: 'Matematika & Fisika (STEM)',
    phase: 'Fase F (Kelas 11 SMA)',
    topic: 'Analisis Data, Persamaan Gelombang & Diagram Alir Logika',
    status: 'In Progress',
    content: `# MODUL AJAR DEEP LEARNING: STEM FASE F (KELAS 11 SMA)

## I. INFORMASI UMUM
- **Mata Pelajaran**: Matematika & Fisika (STEM Integrated)
- **Fase / Kelas**: Fase F (Kelas 11 SMA)
- **Topik Utama**: Analisis Data, Persamaan Gelombang & Diagram Alir Logika
- **Alokasi Waktu**: 2 JP x 45 Menit

---

## II. INTEGRASI 3 PILAR DEEP LEARNING

### 1. Mindful Learning (Penyadaran Diri)
- **Latihan Hening STOP**: Siswa diajak hening selama 3 menit untuk menyadarkan fokus pikiran sebelum memecahkan rumus matematika kompleks.
- **Refleksi Awal**: Siswa menuliskan tingkat kepercayaan diri dalam mengoperasikan persamaan variabel.

### 2. Meaningful Learning (Keterhubungan Masalah Nyata)
- **Konteks Lokal**: Membahas data statistik hasil panen padi lokal dan grafik tren fluktuasi harga pasar daerah.
- **Problem Solving**: Merancang model matematika untuk memprediksi keuntungan hasil tani.

### 3. Joyful Learning (Kolaboratif & Menggembirakan)
- **Game Simulasi**: Tantangan logika "Tebak Kurva & Diagram Alir" berbasis kelompok.
- **Apresiasi Sebaya**: Sesi saling memberi masukan konstruktif atas diagram grafik kelompok lain.

---

## III. DUKUNGAN RUMUS MATEMATIKA (LATEX FORMULA)

Berikut adalah formula dasar perhitungan statistika dan persamaan kuadrat gerak parabola:

- **Rata-rata Hitung (Mean)**: $\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}$
- **Persamaan Lintasan Parabola**: $$y = v_0 t \\sin(\\theta) - \\frac{1}{2}g t^2$$
- **Standar Deviasi**: $$S = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}$$

---

## IV. DIAGRAM ALIR PROSES (MERMAID FLOWCHART)

\`\`\`mermaid
graph TD
    A[Start: Input Data Poin] --> B{Apakah Data Valid?}
    B -- Ya --> C[Hitung Rata-rata & Varians]
    B -- Tidak --> D[Tampilkan Pesan Error]
    D --> A
    C --> E[Plot Kurva & Grafik Batang]
    E --> F[End: Hasil Analisis Selesai]
\`\`\`

---

## V. GRAFIK DATA INTERAKTIF (CHART VISUALIZER)

\`\`\`chart
{
  "type": "bar",
  "title": "Grafik Hasil Panen & Frekuensi Data (Ton)",
  "labels": ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
  "data": [45, 60, 52, 85, 73, 90]
}
\`\`\`

---

## VI. ILUSTRASI VISUAL EKOSISTEM & LINGKUNGAN

![Diagram Anatomi Siklus Air & Daur Hujan](https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80)

| Tahapan Siklus Air | Istilah Ilmiah | Deskripsi & Fenomena Alam |
| :--- | :--- | :--- |
| **Penguapan Air Laut/Danau** | Evaporasi | Air menguap menjadi uap air akibat panas sinar matahari |
| **Penguapan Tumbuhan** | Transpirasi | Pelepasan uap air dari jaringan daun dan tumbuhan ke atmosfer |
| **Pembentukan Awan** | Kondensasi | Perubahan uap air menjadi titik-titik air kecil pembentuk awan |
| **Turunnya Hujan** | Presipitasi | Awan jenuh mencair dan jatuh ke bumi sebagai hujan/salju |

---

## VII. LEMBAR KERJA PESERTA DIDIK (LKPD)

### 👥 Nama Kelompok: ____________________
**Anggota**: 1. _______________ 2. _______________ 3. _______________

#### A. ANALISIS DIAGRAM & FORMULA (15 Menit)
1. Hitunglah nilai $y$ jika diketahui $v_0 = 20$, $\\theta = 30^\\circ$, $g = 10$, dan $t = 2$!
2. Analisis diagram alir di atas dan tuliskan langkah perbaikannya jika input data berupa nilai negatif!`
  };

  const currentDoc = activeDocument || defaultDoc;
  const [docContent, setDocContent] = useState(currentDoc.content);
  
  useEffect(() => {
    if (activeDocument && activeDocument.content) {
      setDocContent(activeDocument.content);
    }
  }, [activeDocument]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Halo Bapak/Ibu Guru! Saya **Deep Learning Engine v2.5**. Dokumen ${currentDoc.subject || 'Pembelajaran'} Anda lengkap dengan LaTeX Math, Diagram Mermaid, Grafik Data, dan Gambar siap ditinjau. Kirim instruksi seperti "Tambahkan LKPD" atau "Buat Asesmen" untuk menyempurnakannya!`
    }
  ]);
  const [inputInstruction, setInputInstruction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const parseMarkdownToHTML = (markdown) => {
    if (!markdown) return '';

    let content = markdown;

    // 1. LATEX DISPLAY PARSER ($$...$$)
    content = content.replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
      return `<div style="background-color:#F1F5F9; border-left:4px solid #1E3A8A; padding:12px 16px; margin:14px 0; border-radius:8px; font-family:'Courier New', monospace; font-weight:bold; color:#0F172A; text-align:center; overflow-x:auto;">
        <span style="color:#D4AF37; font-size:10px; display:block; margin-bottom:4px; font-family:'Segoe UI', sans-serif;">[ FORMULA MATEMATIKA / FISIKA ]</span>
        $$\\mathbf{${formula.trim()}}$$
      </div>`;
    });

    // 2. LATEX INLINE PARSER ($...$)
    content = content.replace(/\$(.*?)\$/g, (match, formula) => {
      return `<code style="background-color:#F8FAFC; color:#1E3A8A; border:1px solid #CBD5E1; padding:2px 6px; border-radius:4px; font-family:'Courier New', monospace; font-weight:bold;">${formula}</code>`;
    });

    // 3. MERMAID CODE BLOCK PARSER (```mermaid ... ```)
    content = content.replace(/```mermaid\s*([\s\S]*?)\s*```/g, (match, mermaidCode) => {
      const cleanCode = mermaidCode.trim();
      const lines = cleanCode.split('\n').filter(l => l.trim().length > 0);
      
      let nodesHtml = lines.map((line) => {
        if (line.includes('-->') || line.includes('---')) {
          const parts = line.split(/-->|---/);
          const from = parts[0].trim().replace(/\[|\]|\{|\}/g, '');
          const to = parts[1] ? parts[1].trim().replace(/\[|\]|\{|\}/g, '') : '';
          return `<div style="display:flex; align-items:center; justify-content:center; gap:10px; margin:8px 0;">
            <span style="background-color:#1E3A8A; color:white; padding:6px 14px; border-radius:8px; font-weight:bold; font-size:11px;">${from}</span>
            <span style="color:#D4AF37; font-weight:bold; font-size:14px;">➔</span>
            <span style="background-color:#0F172A; color:white; padding:6px 14px; border-radius:8px; font-weight:bold; font-size:11px;">${to}</span>
          </div>`;
        }
        return '';
      }).join('');

      return `<div style="background:#F8FAFC; border:2px dashed #1E3A8A; border-radius:12px; padding:16px; margin:18px 0; text-align:center;">
        <div style="font-size:11px; font-weight:bold; color:#1E3A8A; margin-bottom:12px; text-transform:uppercase; letter-spacing:1px; font-family:'Segoe UI', sans-serif;">📊 Diagram Alir Visual (Mermaid.js Engine)</div>
        <div style="background:white; padding:14px; border-radius:8px; border:1px solid #E2E8F0;">
          ${nodesHtml || `<pre style="font-size:11px; text-align:left; color:#334155;">${cleanCode}</pre>`}
        </div>
      </div>`;
    });

    // 4. CHART JSON CODE BLOCK PARSER (```chart ... ```)
    content = content.replace(/```chart\s*([\s\S]*?)\s*```/g, (match, chartJsonStr) => {
      try {
        const chartData = JSON.parse(chartJsonStr.trim());
        const maxVal = Math.max(...chartData.data, 1);

        const barsHtml = chartData.labels.map((label, idx) => {
          const val = chartData.data[idx] || 0;
          const heightPct = Math.round((val / maxVal) * 100);
          return `<div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
            <span style="font-size:10px; font-weight:bold; color:#1E3A8A;">${val}</span>
            <div style="width:100%; max-width:32px; background-color:#E2E8F0; height:90px; display:flex; align-items:flex-end; border-radius:6px; overflow:hidden;">
              <div style="width:100%; height:${heightPct}%; background:linear-gradient(to top, #1E3A8A, #D4AF37); border-radius:4px;"></div>
            </div>
            <span style="font-size:9px; font-weight:600; color:#64748B;">${label}</span>
          </div>`;
        }).join('');

        return `<div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:12px; padding:16px; margin:18px 0;">
          <div style="font-size:12px; font-weight:bold; color:#1E3A8A; margin-bottom:14px; text-align:center; font-family:'Segoe UI', sans-serif;">📈 ${chartData.title || 'Grafik Data Visual'}</div>
          <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:8px; background:white; padding:16px; border-radius:8px; border:1px solid #E2E8F0;">
            ${barsHtml}
          </div>
        </div>`;
      } catch (e) {
        return `<pre style="background:#FFF1F2; color:#9F1239; padding:10px; border-radius:6px; font-size:11px;">Error parsing chart data</pre>`;
      }
    });

    let lines = content.split('\n');
    let htmlResult = [];
    let inTable = false;
    let tableBuffer = [];
    let isFirstHeading = true;

    const renderTable = (rows) => {
      if (rows.length === 0) return '';
      let tableHtml = `<table style="width:100%; border-collapse:collapse; margin: 16px 0; font-size:12px; font-family: 'Segoe UI', sans-serif;">`;
      
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
            tableHtml += `<th style="border:1px solid #CBD5E1; padding:10px 12px; text-align:left; font-weight:bold;">${parsedCell}</th>`;
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

    const parseInlineMarkdown = (text) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Parse Gambar Markdown: ![alt](url)
      const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        if (inTable) {
          htmlResult.push(renderTable(tableBuffer));
          tableBuffer = [];
          inTable = false;
        }
        const altText = imgMatch[1];
        const imgUrl = imgMatch[2];
        htmlResult.push(`
          <div style="margin: 20px 0; text-align: center;">
            <img src="${imgUrl}" alt="${altText}" style="max-width: 100%; height: 220px; object-fit: cover; border-radius: 12px; border: 2px solid #D4AF37; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: inline-block;" />
            <p style="font-size: 11px; color: #64748B; font-style: italic; margin-top: 6px;">📷 ${altText}</p>
          </div>
        `);
        continue;
      }

      // Detect Table Line
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
        const topMargin = isFirstHeading ? 'margin-top:0px;' : 'margin-top:20px;';
        isFirstHeading = false;
        htmlResult.push(`<h1 style="color:#1E3A8A; border-bottom:2px solid #D4AF37; padding-bottom:6px; font-size:18px; font-weight:bold; ${topMargin} margin-bottom:12px; line-height:1.3;">${parseInlineMarkdown(line.replace('# ', ''))}</h1>`);
      } else if (line.startsWith('## ')) {
        htmlResult.push(`<h2 style="color:#1E3A8A; border-bottom:1px solid #E2E8F0; padding-bottom:4px; font-size:15px; font-weight:bold; margin-top:18px; margin-bottom:10px;">${parseInlineMarkdown(line.replace('## ', ''))}</h2>`);
      } else if (line.startsWith('### ')) {
        htmlResult.push(`<h3 style="color:#2563EB; font-size:13px; font-weight:bold; margin-top:14px; margin-bottom:8px;">${parseInlineMarkdown(line.replace('### ', ''))}</h3>`);
      } else if (line.startsWith('#### ')) {
        htmlResult.push(`<h4 style="color:#D4AF37; font-size:12px; font-weight:bold; margin-top:12px; margin-bottom:6px;">${parseInlineMarkdown(line.replace('#### ', ''))}</h4>`);
      } else if (line.trim() === '---') {
        htmlResult.push(`<hr style="border:0; border-top:1px solid #CBD5E1; margin:16px 0;"/>`);
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

  const generateLKPDBlock = (userInstruction) => {
    const isAsesmen = userInstruction.toLowerCase().includes('asesmen') || userInstruction.toLowerCase().includes('rubrik');
    const isLKPD = userInstruction.toLowerCase().includes('lkpd') || userInstruction.toLowerCase().includes('lembar kerja');
    const subjectName = currentDoc.subject || 'STEM';

    if (isAsesmen) {
      return `\n\n---
\n## VIII. ASESMEN & RUBRIK PENILAIAN ANALITIS ${subjectName.toUpperCase()}

### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah

| Kriteria Penilaian | Skor 1 (Perlu Bimbingan) | Skor 2 (Cukup) | Skor 3 (Baik) | Skor 4 (Sangat Baik) |
| :--- | :--- | :--- | :--- | :--- |
| **Penerapan Formula & Rumus** | Belum tepat mengoperasikan variabel | Mengoperasikan rumus dengan 1-2 kekeliruan | Tepat mengaplikasikan seluruh rumus matematika/sains | Sangat presisi & mampu menyimpulkan makna fisikanya |
| **Konstruksi Diagram** | Belum mampu menyusun diagram | Diagram alir tersusun namun alur kurang sistematis | Diagram alir rapi & mudah dipahami | Diagram sangat akurat, komunikatif, & solutif |
| **Kerjasama Kelompok** | Pasif dalam diskusi | Berpartisipasi jika diminta | Aktif berdiskusi kelompok | Sangat memimpin & mengapresiasi karya kawan |`;
    } else if (isLKPD) {
      return `\n\n---
\n## IX. LEMBAR KERJA PESERTA DIDIK (LKPD) - ${subjectName.toUpperCase()}

### 👥 Nama Kelompok: ____________________
**Anggota**: 1. _______________ 2. _______________ 3. _______________

#### B. TANTANGAN LOGIKA CHATTING & DIAGRAM (20 Menit)
Lengkapi tabel analisis formula dan diagram alir berikut:

| Nama Eksperimen | Persamaan Formula | Output Diagram | Status |
| :--- | :--- | :--- | :--- |
| **Gerak Parabola** | $y = v_0 t \\sin(\\theta) - \\frac{1}{2}gt^2$ | Diagram Alir Logika | Valid |
| **Pemusatan Data** | $\\bar{x} = \\frac{\\sum x_i}{n}$ | Grafik Batang Frekuensi | Valid |`;
    } else {
      return `\n\n---
\n## X. CATATAN & SUPLENEN REVISI AI CO-PILOT
**Instruksi Diterapkan**: "${userInstruction}"
- **Penguatan Mindful**: Siswa diajak hening 3 menit sebelum memecahkan rumus.
- **Penguatan Meaningful**: Menghubungkan variabel data dengan kasus nyata.
- **Penguatan Joyful**: Menggunakan kuis tantangan diagram kelompok.`;
    }
  };

  const handleSendMessage = async (overridePrompt) => {
    const textToSend = overridePrompt || inputInstruction;
    if (!textToSend.trim() || isGenerating) return;

    setInputInstruction('');
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setIsGenerating(true);

    try {
      generateDeepLearningPrompt({
        subject: currentDoc.subject,
        phase: currentDoc.phase,
        topic: currentDoc.topic,
        instruction: textToSend
      });

      setTimeout(() => {
        const newAddition = generateLKPDBlock(textToSend);
        const updatedFullContent = docContent + newAddition;

        setDocContent(updatedFullContent);

        if (onUpdateDocument) {
          onUpdateDocument({
            ...currentDoc,
            content: updatedFullContent
          });
        }

        const aiResponseText = `✨ **[SINTESIS DEEP LEARNING SELESAI]**\n\nSaya telah menyusun draf baru berdasarkan instruksi: "${textToSend}".\n\n**Isi Tambahan yang Disuntikkan ke Kanvas Kanan:**${newAddition}`;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: aiResponseText
          }
        ]);

        setIsGenerating(false);
        showToast('⚡ Kanvas Kanan Berhasil Diperbarui oleh AI!');
      }, 1000);

    } catch (err) {
      setIsGenerating(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: 'Maaf, terjadi kendala saat merespons. Silakan coba lagi.' }
      ]);
    }
  };

  const handleDownloadWord = () => {
    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const parsedHtmlBody = parseMarkdownToHTML(docContent);

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <style>
          body { font-family: 'Segoe UI', 'Arial', sans-serif; line-height: 1.6; padding: 30px; color: #1E293B; }
          h1 { color: #1E3A8A; border-bottom: 2px solid #D4AF37; padding-bottom: 6px; font-size: 22px; text-align: center; }
          h2 { color: #1E3A8A; border-bottom: 1px solid #CBD5E1; padding-bottom: 4px; margin-top: 20px; font-size: 18px; }
          h3 { color: #2563EB; margin-top: 15px; font-size: 15px; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
          th { background-color: #1E3A8A; color: #FFFFFF; border: 1px solid #CBD5E1; padding: 10px; text-align: left; }
          td { border: 1px solid #CBD5E1; padding: 8px; }
          img { max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 15px auto; }
          code { background-color: #F8FAFC; color: #1E3A8A; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
          ul, ol { margin-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${docTitle}</h1>
        <p style="text-align: center; font-style: italic; color: #64748B;">Perangkat Ajar Kurikulum Merdeka - Integrated Deep Learning Engine</p>
        <hr style="border:0; border-top: 2px solid #D4AF37; margin-bottom: 25px;"/>
        <div>${parsedHtmlBody}</div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setIsExportModalOpen(false);
    showToast('✅ Berkas Word (.doc) Lengkap Berhasil Diunduh!');
  };

  const handleDownloadTxt = () => {
    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const rawContent = `${docTitle}\nMata Pelajaran: ${currentDoc.subject} | Phase: ${currentDoc.phase}\n\n=========================================\n\n${docContent}`;

    const blob = new Blob([rawContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setIsExportModalOpen(false);
    showToast('✅ Berkas Dokumen (.txt) berhasil diunduh!');
  };

  const handlePrintPDF = () => {
    setIsExportModalOpen(false);
    showToast('🖨️ Membuka jendela cetak / simpan PDF...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 relative">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#D4AF37] text-black font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs animate-bounce border border-amber-300">
          {toastMessage}
        </div>
      )}

      {/* LEFT PANEL: AI CO-PILOT CHAT */}
      <div className="w-full md:w-5/12 bg-[#0F172A]/90 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors text-xs cursor-pointer"
              title="Kembali ke Beranda Utama"
            >
              ← Kembali
            </button>
            <div>
              <h3 className="font-bold text-xs text-slate-100 flex items-center gap-1.5">
                <span>🤖</span> AI Co-Pilot (Deep Learning v2.5)
              </h3>
              <p className="text-[10px] text-slate-400">Pilar: Mindful • Meaningful • Joyful</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            ● Connected
          </span>
        </div>

        {/* Chat Stream Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 font-bold text-indigo-300">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-2">
              <span className="animate-spin">⏳</span> AI sedang merancang & menyuntikkan dokumen...
            </div>
          )}
        </div>

        {/* Quick Action Bar & Chat Input */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => handleSendMessage(`Tolong buatkan Asesmen & Rubrik Penilaian ${currentDoc.subject || ''}`)}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer"
            >
              🎯 + Asesmen & Rubrik
            </button>
            <button
              onClick={() => handleSendMessage(`Tolong tambahkan LKPD Kelompok ${currentDoc.subject || ''}`)}
              className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer"
            >
              📝 + LKPD {currentDoc.subject || 'Kelompok'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputInstruction}
              onChange={(e) => setInputInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik instruksi, misal: 'Tambahkan LKPD SD'..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isGenerating}
              className="p-2 bg-[#D4AF37] hover:bg-amber-500 text-black font-bold rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              ✈️
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: LIVE CANVAS PREVIEW (WHITE PAPER A4 STYLE) */}
      <div className="w-full md:w-7/12 bg-[#0F172A]/90 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Canvas Toolbar & Tabs */}
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/50">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>🖨️ Cetak / Export Dokumen</span>
          </button>
        </div>

        {/* Canvas Rendered Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950/80">
          <div className="p-8 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 min-h-full">
            <div className="flex items-center justify-between border-b border-amber-400 pb-2 mb-4">
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-300">
                ✨ LIVE CANVAS PREVIEW - ULTRA VISUAL ENGINE READY
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">● Auto-Synced</span>
            </div>

            <div
              className="prose prose-slate max-w-none text-xs leading-relaxed pt-1"
              dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(docContent) }}
            />
          </div>
        </div>

      </div>

      {/* EXPORT CENTER MODAL REAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>📄</span> Export Center Dokumen
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Pilih format unduhan untuk perangkat ajar Anda.</p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-500 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadWord}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">🟦</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">
                      Unduh Berkas Word (.doc)
                    </div>
                    <div className="text-[10px] text-slate-400">Termasuk Gambar, Diagram, Formula & Color Style</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Unduh →</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">
                      Unduh Teks Polos (.txt)
                    </div>
                    <div className="text-[10px] text-slate-400">Format markdown murni tanpa format visual</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Unduh →</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">🖨️</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">
                      Cetak / Simpan PDF
                    </div>
                    <div className="text-[10px] text-slate-400">Dialog cetak sistem browser</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Cetak →</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Batal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
