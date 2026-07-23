import React, { useState, useEffect } from 'react';

/**
 * TRISULAPROMPT - AIWorkspace Component v3.2 (Comprehensive 12-Page Engine)
 * Author: TRISULACODER v9.6 - Lead Solution Architect
 * Revisions:
 *  - Exact 7-Token Deduction Engine for Print/Export (Fixes Token Reset to 0 Bug)
 *  - Free User Access Control: Unlimited Document Creation/AI Chat, Restricted Export/Print
 *  - Updated Pricing Plans: Rp 19.000 (7 Tokens) & Rp 50.000/month (30-day Unlimited)
 *  - Zero Feature Loss & Complete UI/UX Preservation
 */

// Dynamic Deep Learning prompt synthesizer
const generateDeepLearningPrompt = ({ subject, phase, topic, instruction }) => {
  return `[PROMPT SYNTHESIS] Subject: ${subject || 'General'} | Phase: ${phase || 'Fase E'} | Topic: ${topic || 'General'} | Instruction: ${instruction}`;
};

export default function AIWorkspace({ activeDocument, onBackToDashboard, onUpdateDocument, userStatus: externalUserStatus, onUpdateUserStatus }) {
  const [activeSubTab, setActiveSubTab] = useState('modul-ajar');

  // --- STATE USER & PAYWALL LOCK ENGINE ---
  const [userStatus, setUserStatus] = useState(() => {
    if (externalUserStatus) {
      return {
        ...externalUserStatus,
        kredit_tersisa: externalUserStatus.is_premium ? "UNLIMITED" : (parseInt(externalUserStatus.kredit_tersisa, 10) || 0)
      };
    }
    return {
      is_premium: false,
      kredit_tersisa: 15000,
      doc_generated_count: 0
    };
  });

  useEffect(() => {
    if (externalUserStatus) {
      setUserStatus({
        ...externalUserStatus,
        kredit_tersisa: externalUserStatus.is_premium ? "UNLIMITED" : (parseInt(externalUserStatus.kredit_tersisa, 10) || 0)
      });
    }
  }, [externalUserStatus]);

  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState(''); 
  const [selectedPlan, setSelectedPlan] = useState(null); // 'SETOKEN' | 'BULANAN' | 'B2B'
  const [paymentStep, setPaymentStep] = useState(1); // 1: Select Plan, 2: Transfer & WA
  
  // Form Konfirmasi Pembayaran
  const [paymentForm, setPaymentForm] = useState({
    fullname: userStatus?.name || '',
    email: userStatus?.email || '',
    proof: null
  });

  const defaultDoc = {
    id: 'doc-biologi-master',
    title: 'Modul Ajar Deep Learning IPA (Biologi) - Bab 10 Ekosistem',
    subject: 'IPA (Biologi)',
    phase: 'Fase E (Kelas 10 SMA)',
    topic: 'Ekosistem, Keanekaragaman Hayati & Perubahan Lingkungan',
    status: 'In Progress',
    content: `# MODUL AJAR DEEP LEARNING: IPA (BIOLOGI)
## BAB 10: EKOSISTEM & PERUBAHAN LINGKUNGAN

---

## A. IDENTITAS MODUL
| Komponen | Rincian Keterangan |
| :--- | :--- |
| **Nama Sekolah** | SMA Negeri 1 Gondang |
| **Nama Penyusun** | Intan Kartika Putri, S.Si. |
| **Mata Pelajaran** | IPA (Biologi) |
| **Kelas / Fase / Semester** | X / Fase E / Ganjil |
| **Alokasi Waktu** | 3 Jam Pelajaran (3 x 45 Menit) |
| **Tahun Pelajaran** | 2024 / 2025 |

---

## B. IDENTIFIKASI KESIAPAN PESERTA DIDIK
Sebelum memulai pembelajaran tentang Ekosistem, asesmen diagnostik dilakukan untuk mengidentifikasi kesiapan peserta didik:

- **Pengetahuan Awal**:
  - Pemahaman dasar tentang hirarki makhluk hidup (individu, populasi, komunitas, ekosistem).
  - Pengenalan terhadap lingkungan abiotik (tanah, air, udara, cahaya, suhu).
  - Konsep dasar interaksi antar makhluk hidup (makan-memakan, simbiosis, kompetisi).
  - Pengetahuan tentang siklus sederhana di alam (siklus air, siklus karbon).

- **Minat & Ketertarikan**:
  - Melalui kuesioner singkat, guru menggali minat peserta didik terkait isu lingkungan lokal, keanekaragaman hayati, dan fenomena alam di sekitar sekolah.
  - Guru mengamati ketertarikan peserta didik terhadap aktivitas observasi lapangan atau eksperimen kelompok.

- **Latar Belakang Lingkungan**:
  - Pengalaman peserta didik terkait lingkungan sekitar (pedesaan/perkotaan, dekat sungai/pantai) yang memengaruhi persepsi ekologis.
  - Pengalaman belajar sebelumnya terkait integrasi IPA (Biologi, Kimia, Fisika dasar).

- **Kebutuhan Belajar Berdiferensiasi**:
  - **Visual**: Membutuhkan diagram alir, grafik, gambar ilustrasi, atau media video interaktif.
  - **Auditori**: Lebih optimal melalui diskusi kelompok, penjelasan lisan, dan debat isu lingkungan.
  - **Kinestetik**: Membutuhkan praktikum lapangan, pengamatan fisik tanah/air, dan pembuatan model ekosistem buatan.
  - **Dukungan ABK / Kesulitan Belajar**: Pendampingan khusus, penyederhanaan teks, dan panduan visual tambahan.
  - **Pengayaan Murid Minat Tinggi**: Diberikan porsi studi kasus ilmiah mendalam dan riset mandiri.

---

## C. KARAKTERISTIK MATERI PELAJARAN
- **Jenis Pengetahuan yang Dicapai**:
  - **Konseptual**: Memahami konsep dasar ekosistem, komponen biotik-abiotik, rantai makanan, jaring-jaring makanan, piramida ekologi, dan daur biogeokimia.
  - **Prosedural**: Mampu mengidentifikasi komponen ekosistem, menyusun diagram jaring makanan, serta melakukan pengamatan lingkungan secara terstruktur.
  - **Metakognitif**: Merefleksikan bagaimana interaksi dalam ekosistem memengaruhi kehidupan manusia serta pentingnya menjaga keseimbangan alam.

- **Relevansi dengan Kehidupan Nyata**:
  - Sangat erat dengan isu pencemaran sungai lokal, alih fungsi lahan, daur ulang limbah organik, dan ketahanan pangan.

- **Tingkat Kesulitan & Struktur**:
  - Kesulitan tingkat sedang (pemahaman konseptual konkrit hingga analisis daur biogeokimia abstrak).

- **Integrasi Nilai & Karakter**:
  - Kepedulian Lingkungan, Tanggung Jawab Sosial, Kerja Sama Tim, Berpikir Kritis & Analitis, serta Rasa Ingin Tahu Ilmiah.

---

## D. DIMENSI PROFIL LULUSAN (PROFIL PELAJAR PANCASILA)
- **Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia**: Mensyukuri anugerah keanekaragaman hayati dan menjaga keseimbangan ekosistem ciptaan Tuhan.
- **Penalaran Kritis**: Menganalisis data pengamatan ekosistem dan memecahkan permasalahan lingkungan berbasis bukti ilmiah.
- **Kreativitas**: Mengembangkan solusi inovatif dalam kampanye pelestarian lingkungan atau proyek daur ulang.
- **Kolaborasi**: Bekerja sama secara aktif dan inklusif dalam pengamatan lapangan serta penyusunan laporan kelompok.
- **Kemandirian**: Mengelola tugas mandiri dan bertanggung jawab atas proses belajar individual.
- **Kesehatan & Kepedulian Lingkungan**: Memahami pentingnya sanitasi dan lingkungan bersih bagi kesehatan masyarakat.
- **Komunikasi**: Menyampaikan gagasan, grafik data, dan kesimpulan pengamatan secara efektif baik lisan maupun tertulis.

---

## E. DESAIN PEMBELAJARAN KOMPREHENSIF

### 1. CAPAIAN PEMBELAJARAN (CP) RESMI KEMDIKBUD (NOMOR 32 TAHUN 2024)
Pada akhir Fase E, peserta didik memiliki kemampuan untuk memahami sistem pengukuran, energi alternatif, ekosistem, bioteknologi, keanekaragaman hayati, dan perubahan iklim sehingga responsif serta berperan aktif dalam menyelesaikan masalah isu lokal dan global.

| Elemen CP | Deskripsi Capaian Pembelajaran |
| :--- | :--- |
| **Pemahaman IPA** | Peserta didik memahami proses klasifikasi makhluk hidup; peranan virus, bakteri, dan jamur; ekosistem dan interaksi antarkomponen serta faktor yang mempengaruhinya. |
| **Keterampilan Proses** | Mengamati, Mempertanyakan & Memprediksi, Merencanakan & Melakukan Penyelidikan, Memproses/Menganalisis Data, Mengevaluasi & Refleksi, serta Mengomunikasikan Hasil. |

---

## II. CAPAIAN PEMBELAJARAN (CP)
### 📘 Analisis Capaian Pembelajaran Elemen (IPA BIOLOGI)
Peserta didik mampu menganalisis interaksi antar komponen ekosistem, memahami pentingnya keanekaragaman hayati lokal, serta merancang solusi kreatif atas perubahan lingkungan secara kritis dan kolaboratif.

---

## III. TUJUAN PEMBELAJARAN (TP)
### 🎯 Poin Tujuan Pembelajaran ABCD (IPA BIOLOGI)
- **TP1**: Mengidentifikasi komponen biotik dan abiotik di lingkungan sekolah melalui observasi langsung dengan akurat.
- **TP2**: Menganalisis struktur rantai makanan dan piramida energi ekosistem menggunakan formula matematis $P(t) = P_0 e^{rt}$.
- **TP3**: Menyusun diagram alir jaring-jaring makanan dan simulasi daur biogeokimia secara terstruktur.
- **TP4**: Merancang proyek kampanye solusi pencemaran lingkungan lokal secara kolaboratif.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP (IPA BIOLOGI)
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.10.1** | 3 JP | Mampu memetakan komponen biotik dan abiotik lingkungan | Formatif Observasi & Latihan Soal |
| **ATP.10.2** | 3 JP | Mampu menganalisis aliran energi & trophic level | Formatif Tugas Kelompok |
| **ATP.10.3** | 3 JP | Mampu mensimulasikan daur biogeokimia & suksesi | Formatif Presentasi Diagram |
| **ATP.10.4** | 3 JP | Mampu membuat laporan proyek kampanye lingkungan | Sumatif Penilaian Proyek & Laporan |

---

## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
### 📊 Rubrik Observasi & Asesmen Kinerja (IPA BIOLOGI)
| Kriteria Penilaian | Belum Memenuhi (1) | Cukup (2) | Baik (3) | Sangat Baik (4) |
| :--- | :--- | :--- | :--- | :--- |
| **Penerapan Konsep** | Salah mengidentifikasi rantai makanan | Mengidentifikasi 60% komponen ekosistem | Mengidentifikasi 85% komponen dengan benar | Memahami 100% konsep & menganalisis dampak |
| **Analisis & Logika** | Tidak mampu menyusun alur jaring makanan | Menyusun alur namun ada kesalahan logika | Menyusun alur terstruktur & logis | Menyusun diagram sangat presisi & solutif |
| **Kolaborasi Tim** | Pasif dalam diskusi kelompok | Berpartisipasi jika diminta | Aktif berkontribusi dalam tim | Memimpin & membantu rekan kelompok |

---

## VI. PROGRAM TAHUNAN (PROTA)
### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan (IPA BIOLOGI)
| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |
| :--- | :--- | :--- | :--- |
| **1** | Keanekaragaman Hayati & Ekosistem | 18 JP | Semester 1 |
| **2** | Perubahan Lingkungan & Pemanasan Global | 18 JP | Semester 2 |

---

## VII. PROGRAM SEMESTER (PROSEM)
### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (IPA BIOLOGI)
| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Analisis Interaksi Ekosistem & Biotik Abiotik | 6 JP | x | x | | | | |
| **2** | Pemetaan Keanekaragaman Hayati & Jaring Makanan | 6 JP | | | x | x | | |
| **3** | Aliran Energi, Daur Biogeokimia & Proyek Lingkungan | 6 JP | | | | | x | x |

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

## IX. RUMUS & MODEL EKOLOGI (LATEX FORMULA)

Berikut adalah formula dasar perhitungan laju pertumbuhan populasi dan rata-rata sampel:
- **Model Laju Pertumbuhan Populasi**: $$P(t) = P_0 e^{rt}$$
- **Rata-rata Sampel Observasi**: $\\bar{x} = \\frac{\\sum x_i}{n}$
- **Deviasi Standar Populasi**: $$S = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}$$

---

## X. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI RINCI

### PERTEMUAN 1: PENGENALAN EKOSISTEM DAN KOMPONENNYA (3 JP)

#### A. KEGIATAN PENDAHULUAN (15 Menit - Mindful, Meaningful, Joyful)
1. **Pembukaan & Ice Breaking (5 Menit)**: Guru menyapa peserta didik dengan hangat. Pertanyaan pemantik: *"Pernahkah kalian mengamati makhluk hidup apa saja yang ada di taman sekolah kita?"*
2. **Apersepsi (5 Menit)**: Menampilkan visual ekosistem alami vs buatan dan meminta murid memberikan kesan.
3. **Asesmen Diagnostik Singkat (5 Menit)**: Kuesioner cepat mengenai pemahaman benda hidup dan tak hidup.

#### B. KEGIATAN INTI (105 Menit - Memahami, Mengaplikasi, Merefleksi)
1. **Stimulasi & Eksplorasi (20 Menit)**: Guru mengajak siswa melakukan observasi langsung ke area hijau sekolah.
2. **Identifikasi Masalah & Pengumpulan Data (30 Menit)**: Murid dibagi menjadi 6 kelompok heterogen untuk mencatat komponen biotik-abiotik serta mengukur suhu/kelembapan.
3. **Pengolahan Data & Diskusi Kelompok (30 Menit)**: Kelompok menyusun daftar komponen dan mengidentifikasi interaksi timbal balik.
4. **Presentasi Singkat & Clarification (25 Menit)**: Perwakilan kelompok mempresentasikan temuan dan guru memberikan klarifikasi konsep kunci.

#### C. KEGIATAN PENUTUP (15 Menit)
1. **Refleksi Diri (10 Menit)**: Menuliskan lembar refleksi 3-2-1 (3 hal baru dipelajari, 2 hal membingungkan, 1 hal paling menarik).
2. **Kesimpulan & Penugasan (5 Menit)**: Menyimpulkan poin utama dan memberikan instruksi tugas pengamatan mandiri di rumah.

---

## XI. ASESMEN PEMBELAJARAN UTUH

### A. ASESMEN DIAGNOSTIK
- Tes tertulis singkat dan lembar refleksi kesiapan kognitif awal.

### B. ASESMEN FORMATIF
- **Observasi Kinerja**: Rubrik partisipasi diskusi kelompok.
- **Jurnal Refleksi Mingguan**: Catatan pemahaman mandiri siswa.

### C. ASESMEN SUMATIF
- **Tugas Proyek**: Pembuatan Kampanye Digital Pelestarian Lingkungan Lokal.
- **Tes Tertulis**: Soal Esai Analitis dan Pilihan Ganda Kompleks.

---

## XII. LEMBAR PENGESAHAN RESMI

| Mengetahui, <br/> Kepala Sekolah | Mojokerto, 23 Juli 2026 <br/> Guru Mata Pelajaran |
| :--- | :--- |
| <br/><br/> **Johan Bahrudin, S.Kom., M.T.** <br/> NIP. 197606202005011008 | <br/><br/> **Intan Kartika Putri, S.Si.** <br/> NIP. 198804122015032001 |`
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
      text: `Halo Bapak/Ibu Guru! Saya **Deep Learning Engine v3.0**. Dokumen ${currentDoc.subject || 'Pembelajaran'} Anda siap disempurnakan dengan AI Co-Pilot!`
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

  const handleOpenExportModal = () => {
    const currentTokens = typeof userStatus.kredit_tersisa === 'number' ? userStatus.kredit_tersisa : parseInt(userStatus.kredit_tersisa, 10) || 0;
    
    // ATURAN 3: User gratis / token kurang dari 7 sama sekali TIDAK BISA print/cetak (Memicu Paywall)
    if (!userStatus.is_premium && currentTokens < 7) {
      setPaywallReason('Akun Uji Coba Gratis hanya dapat membuat/edit dokumen. Untuk Cetak/Export (Word/PDF), silakan berlangganan Paket 7 Token (Rp19.000) atau Paket Bulanan (Rp50.000).');
      setIsPaywallOpen(true);
      return;
    }
    setIsExportModalOpen(true);
  };

  // Helper Pemotongan 7 Token Presisi (Mencegah Bug Reset Token ke 0)
  const deductSevenTokensForExport = () => {
    if (userStatus.is_premium) return true; // Premium Unlimited

    const currentTokens = typeof userStatus.kredit_tersisa === 'number' ? userStatus.kredit_tersisa : parseInt(userStatus.kredit_tersisa, 10) || 0;

    if (currentTokens < 7) {
      showToast('⚠️ Sisa token Anda tidak mencukupi (Minimal 7 token untuk 1 set dokumen).');
      setIsExportModalOpen(false);
      setPaywallReason('Sisa token Anda tidak mencukupi untuk mencetak 1 set perangkat ajar (Butuh 7 Token). Silakan top-up.');
      setIsPaywallOpen(true);
      return false;
    }

    const updatedTokens = Math.max(0, currentTokens - 7);
    const updatedUser = {
      ...userStatus,
      kredit_tersisa: updatedTokens,
      doc_generated_count: (userStatus.doc_generated_count || 0) + 1
    };

    setUserStatus(updatedUser);

    if (onUpdateUserStatus) {
      onUpdateUserStatus(updatedUser);
    }

    showToast(`⚡ Berhasil mencetak! 7 Token dipotong. Sisa Token: ${updatedTokens.toLocaleString('id-ID')}`);
    return true;
  };

  const formatMathFormula = (formulaStr) => {
    return formulaStr
      .replace(/\\mathbf\{(.*?)\}/g, '$1')
      .replace(/\\bar\{x\}/g, 'x̄')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
      .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, 'Σ($1..$2)')
      .replace(/\\sum/g, 'Σ')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\sin/g, 'sin')
      .replace(/\\cos/g, 'cos')
      .replace(/\\tan/g, 'tan')
      .replace(/\\theta/g, 'θ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\circ/g, '°')
      .replace(/\\times/g, '×')
      .replace(/\\div/g, '÷');
  };

  const filterContentByTab = (fullContent, tabId) => {
    if (!fullContent) return '';
    if (tabId === 'modul-ajar') return fullContent;

    const sections = fullContent.split(/(?=\n##\s+)/g);

    const matchedSection = sections.find(sec => {
      const firstLine = sec.trim().split('\n')[0].toUpperCase();
      if (!firstLine.startsWith('##')) return false;

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

    if (matchedSection) {
      return matchedSection.trim();
    } else {
      return `# SEKSI ${tabId.toUpperCase()} BELUM TERSEDIA

> ℹ️ Seksi **${tabId.toUpperCase()}** belum ditemukan di dalam dokumen saat ini. 
> Anda dapat meminta AI Co-Pilot di sebelah kiri untuk menyusun drafnya secara otomatis.

---
### ⚡ Draf Cepat AI Generator
Gunakan tombol di bawah ini untuk menginstruksikan AI menyusun seksi ini secara otomatis:`;
    }
  };

  const parseMarkdownToHTML = (markdown) => {
    if (!markdown) return '';
    let content = markdown;

    // 1. LATEX DISPLAY PARSER
    content = content.replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
      const cleanFormula = formatMathFormula(formula.trim());
      return `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:14px 0; background-color:#F1F5F9; border-left:4px solid #1E3A8A; border-radius:8px;">
        <tr>
          <td style="padding:12px 16px; text-align:center;">
            <div style="color:#D4AF37; font-size:10px; font-weight:bold; margin-bottom:4px; font-family:'Segoe UI', sans-serif; text-transform:uppercase;">[ FORMULA DEEP LEARNING ]</div>
            <div style="font-family:'Courier New', monospace; font-weight:bold; font-size:14px; color:#0F172A;">${cleanFormula}</div>
          </td>
        </tr>
      </table>`;
    });

    // 2. LATEX INLINE PARSER
    content = content.replace(/\$(.*?)\$/g, (match, formula) => {
      const cleanFormula = formatMathFormula(formula.trim());
      return `<code style="background-color:#F8FAFC; color:#1E3A8A; border:1px solid #CBD5E1; padding:2px 6px; border-radius:4px; font-family:'Courier New', monospace; font-weight:bold;">${cleanFormula}</code>`;
    });

    let lines = content.split('\n');
    let htmlResult = [];
    let inTable = false;
    let tableBuffer = [];

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
            tableHtml += `<th style="border:1px solid #CBD5E1; padding:10px 12px; text-align:left; font-weight:bold; color:#FFFFFF;">${cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</th>`;
          });
          tableHtml += `</tr>`;
        } else {
          let bg = rowIndex % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
          tableHtml += `<tr style="background-color:${bg}; color:#1E293B;">`;
          cells.forEach(cell => {
            tableHtml += `<td style="border:1px solid #CBD5E1; padding:8px 12px;">${cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</td>`;
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
        htmlResult.push(`<h1 style="color:#1E3A8A; border-bottom:2px solid #D4AF37; padding-bottom:6px; font-size:18px; font-weight:bold; margin-top:16px; margin-bottom:12px;">${line.replace('# ', '')}</h1>`);
      } else if (line.startsWith('## ')) {
        htmlResult.push(`<h2 style="color:#1E3A8A; border-bottom:1px solid #E2E8F0; padding-bottom:4px; font-size:15px; font-weight:bold; margin-top:18px; margin-bottom:10px;">${line.replace('## ', '')}</h2>`);
      } else if (line.startsWith('### ')) {
        htmlResult.push(`<h3 style="color:#2563EB; font-size:13px; font-weight:bold; margin-top:14px; margin-bottom:8px;">${line.replace('### ', '')}</h3>`);
      } else if (line.trim() === '---') {
        htmlResult.push(`<hr style="border:0; border-top:1px solid #CBD5E1; margin:16px 0;"/>`);
      } else if (line.trim().startsWith('> ')) {
        htmlResult.push(`<blockquote style="border-left:4px solid #D4AF37; background:#FEF3C7; padding:8px 12px; margin:10px 0; color:#78350F; font-size:11px;">${line.replace('> ', '')}</blockquote>`);
      } else if (line.trim().startsWith('- ')) {
        htmlResult.push(`<li style="margin-left:20px; margin-bottom:4px; color:#334155;">${line.replace('- ', '')}</li>`);
      } else if (line.trim().length > 0 && line.trim() !== '#') {
        htmlResult.push(`<p style="margin-bottom:8px; color:#334155; line-height:1.6;">${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`);
      }
    }

    if (inTable) htmlResult.push(renderTable(tableBuffer));
    return htmlResult.join('');
  };

  // Dynamic Comprehensive Section Synthesizer
  const generateLKPDBlock = (userInstruction) => {
    const textLower = userInstruction.toLowerCase();
    const subjectName = currentDoc.subject || 'IPA (Biologi)';

    if (textLower.includes('prosem') || textLower.includes('program semester')) {
      return `\n\n---\n## VII. PROGRAM SEMESTER (PROSEM)\n### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2 (${subjectName.toUpperCase()})\n| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **1** | Pengenalan Ekosistem & KomPONEN Biotik Abiotik | 6 JP | x | x | | | | |\n| **2** | Interaksi Ekosistem & Jaring-Jaring Makanan | 6 JP | | | x | x | | |\n| **3** | Aliran Energi, Daur Biogeokimia & Proyek Lingkungan | 6 JP | | | | | x | x |`;
    } else if (textLower.includes('kktp') || textLower.includes('rubrik')) {
      return `\n\n---\n## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)\n### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah (${subjectName.toUpperCase()})\n| Kriteria Penilaian | Skor 1 (Belum Memenuhi) | Skor 2 (Cukup) | Skor 3 (Baik) | Skor 4 (Sangat Baik) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Penerapan Konsep** | Belum menguasai konsep dasar | Menguasai 60% konsep | Menguasai 85% konsep dengan benar | Menguasai 100% konsep & mampu mengaplikasikan |\n| **Analisis & Logika** | Tidak mampu menyusun alur | Menyusun alur namun ada kekeliruan | Menyusun alur terstruktur & logis | Menyusun diagram sangat presisi & solutif |\n| **Kolaborasi Tim** | Pasif dalam diskusi kelompok | Berpartisipasi jika diminta | Aktif berkontribusi dalam tim | Memimpin & membantu rekan kelompok |`;
    } else {
      return `\n\n---\n## XIII. SUPLEMEN PERANGKAT AJAR DEEP LEARNING (REVISI CO-PILOT)\n**Instruksi Diterapkan**: "${userInstruction}"\n\n### A. PENGUATAN 3 PILAR PEDAGOGIK\n- **Mindful Learning**: Hening STOP selama 3 menit untuk memfokuskan ketenangan mental sebelum pemecahan masalah.\n- **Meaningful Learning**: Menganalisis studi kasus riil isu lingkungan lokal di daerah sekitar sekolah.\n- **Joyful Learning**: Diskusi kelompok interaktif, gamifikasi tantangan ekologis, dan apresiasi positif antar teman.`;
    }
  };

  const handleSendMessage = async (overridePrompt) => {
    const textToSend = overridePrompt || inputInstruction;
    if (!textToSend.trim() || isGenerating) return;

    // ATURAN 3: User Gratis BISA MEMBUAT/GENERATE DOKUMEN BEBAS DENGAN AI
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
          { id: Date.now() + 1, sender: 'ai', text: aiResponseText }
        ]);

        setIsGenerating(false);
        showToast(`⚡ Seksi berhasil diperbarui oleh AI!`);
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
    if (!deductSevenTokensForExport()) return;

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
          table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
          th { background-color: #1E3A8A; color: #FFFFFF; border: 1px solid #CBD5E1; padding: 10px; text-align: left; }
          td { border: 1px solid #CBD5E1; padding: 8px; }
        </style>
      </head>
      <body>
        <h1>${docTitle}</h1>
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
  };

  const handleDownloadTxt = () => {
    if (!deductSevenTokensForExport()) return;

    const docTitle = currentDoc.title || 'Modul_Ajar_Deep_Learning';
    const rawContent = `${docTitle}\nMata Pelajaran: ${currentDoc.subject}\n\n${docContent}`;

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
  };

  const handlePrintPDF = () => {
    if (!deductSevenTokensForExport()) return;

    setIsExportModalOpen(false);
    showToast('🖨️ Membuka jendela cetak / simpan PDF...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // HANDLER PAYMENT FORM WHATSAPP CONFIRMATION
  const handleConfirmWhatsApp = (e) => {
    e.preventDefault();
    if (!paymentForm.fullname || !paymentForm.email) {
      alert('Tolong isi Nama Lengkap dan Email Terdaftar terlebih dahulu!');
      return;
    }

    const planName = selectedPlan === 'SETOKEN' ? 'Paket Cetak 1 Set / 7 Token (Rp 19.000)' :
                     selectedPlan === 'BULANAN' ? 'Paket Langganan Bulanan (Rp 50.000 / 30 Hari)' : 
                     'Lisensi B2B Sekolah';

    const message = `Halo Admin TRISULA SMART LEARNING ENGINE, saya telah melakukan pembayaran untuk ${planName}.\n\n📌 Nama Lengkap: ${paymentForm.fullname}\n📌 Email Terdaftar: ${paymentForm.email}\n\nMohon bantuannya untuk mengaktifkan akses token/lisensi akun saya. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281298406844?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
    setIsPaywallOpen(false);
    setPaymentStep(1);
    showToast('🚀 Konfirmasi dikirim ke WhatsApp Admin!');
  };

  const activeTabContent = filterContentByTab(docContent, activeSubTab);

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 relative font-sans">
      
      {/* PRINT-ONLY STYLESHEET */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #printable-canvas, #printable-canvas * { visibility: visible !important; }
          #printable-canvas { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; padding: 0 !important; margin: 0 !important; background: white !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="no-print fixed top-16 right-6 z-50 bg-[#D4AF37] text-black font-bold px-4 py-2.5 rounded-xl shadow-2xl text-xs animate-bounce border border-amber-300">
          {toastMessage}
        </div>
      )}

      {/* LEFT PANEL: AI CO-PILOT CHAT */}
      <div className="no-print w-full md:w-5/12 bg-[#0F172A]/90 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors text-xs cursor-pointer"
            >
              ← Kembali
            </button>
            <div>
              <h3 className="font-bold text-xs text-slate-100 flex items-center gap-1.5">
                <span>🤖</span> AI Co-Pilot (Deep Learning v3.0)
              </h3>
              <p className="text-[10px] text-slate-400">Pilar: Mindful • Meaningful • Joyful</p>
            </div>
          </div>

          {/* User Status Badge */}
          <div className="flex items-center gap-2">
            {userStatus.is_premium ? (
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                ★ PREMIUM
              </span>
            ) : (
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30 font-mono font-bold">
                ⚡ {typeof userStatus.kredit_tersisa === 'number' ? userStatus.kredit_tersisa.toLocaleString('id-ID') : userStatus.kredit_tersisa} Token
              </span>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shrink-0 font-bold text-indigo-300">
                  🤖
                </div>
              )}
              <div className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}>
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

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => handleSendMessage(`Tolong buatkan seksi KKTP dan Rubrik Penilaian ${currentDoc.subject || ''}`)}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer"
            >
              🎯 + KKTP & Rubrik
            </button>
            <button
              onClick={() => handleSendMessage(`Tolong buatkan seksi PROSEM secara lengkap dan rinci untuk ${currentDoc.subject || ''}`)}
              className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer"
            >
              📅 + PROSEM {currentDoc.subject || ''}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputInstruction}
              onChange={(e) => setInputInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik instruksi penyempurnaan dokumen AI..."
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

      {/* RIGHT PANEL: LIVE CANVAS */}
      <div className="w-full md:w-7/12 bg-[#0F172A]/90 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        {/* Canvas Toolbar */}
        <div className="no-print p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/50">
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
            onClick={handleOpenExportModal}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>🖨️ Cetak / Export Dokumen</span>
          </button>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950/80">
          <div id="printable-canvas" className="p-8 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 min-h-full">
            <div className="no-print flex items-center justify-between border-b border-amber-400 pb-2 mb-4">
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-300 uppercase">
                ✨ Sub-Tab Active: {activeSubTab.replace('-', ' ')}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">● Live Synced</span>
            </div>

            <div
              className="prose prose-slate max-w-none text-xs leading-relaxed pt-1"
              dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(activeTabContent) }}
            />
          </div>
        </div>
      </div>

      {}
      {isPaywallOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-[#D4AF37]/50 w-full max-w-2xl rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative text-slate-100">
            
            <button
              onClick={() => { setIsPaywallOpen(false); setPaymentStep(1); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {paymentStep === 1 ? (
              <>
                <div className="text-center space-y-2">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold rounded-full uppercase tracking-wider">
                    🔒 Akses Cetak & Export Terkunci
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    Pilih Paket Langganan / Top-Up Token
                  </h2>
                  <p className="text-xs text-amber-300/90 max-w-md mx-auto">
                    {paywallReason || 'Akun Uji Coba Gratis hanya dapat membuat/edit dokumen. Silakan pilih paket di bawah untuk mengaktifkan fitur Cetak/Export.'}
                  </p>
                </div>

                {/* 3 OPTIONS CARDS (HARGA ATURAN BARU) */}
                <div className="grid md:grid-cols-3 gap-4 pt-2">
                  
                  {/* OPSI 1: CETAK 1 SET (7 TOKEN) */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded-full uppercase">
                        Paket Cetak Eceran
                      </span>
                      <h3 className="font-bold text-sm text-white mt-2">1 Set (7 Token)</h3>
                      <div className="text-xl font-black text-indigo-400 my-2">
                        Rp 19.000 <span className="text-xs text-slate-400 font-normal">/ 7 token</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Cukup untuk mencetak 1 set lengkap perangkat ajar utuh (Modul, CP, TP, ATP, KKTP, Prota, Prosem).
                      </p>
                    </div>
                    <button
                      onClick={() => { setSelectedPlan('SETOKEN'); setPaymentStep(2); }}
                      className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Beli 7 Token (Rp19rb)
                    </button>
                  </div>

                  {/* OPSI 2: LANGGANAN BULANAN (RP 50.000) */}
                  <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-[#D4AF37] transition-all relative">
                    <span className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#D4AF37] text-slate-950 font-bold text-[9px] rounded-full uppercase">
                      Paling Laris
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-white">Langganan Bulanan</h3>
                      <div className="text-xl font-black text-[#D4AF37] my-2">
                        Rp 50.000 <span className="text-xs text-slate-400 font-normal">/ 30 hr</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Akses Tanpa Batas 30 Hari: Unlimited Export Word/PDF & Unlimited Generate AI (Otomatis berhenti setelah 30 hari).
                      </p>
                    </div>
                    <button
                      onClick={() => { setSelectedPlan('BULANAN'); setPaymentStep(2); }}
                      className="mt-4 w-full py-2 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Pilih Paket Bulanan (Rp50rb)
                    </button>
                  </div>

                  {/* OPSI 3: B2B SEKOLAH */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                    <div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded-full uppercase">
                        Instansi
                      </span>
                      <h3 className="font-bold text-sm text-white mt-2">Lisensi Sekolah / B2B</h3>
                      <div className="text-xl font-black text-emerald-400 my-2">
                        Proposal <span className="text-xs text-slate-400 font-normal">/ thn</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Akses untuk seluruh guru di sekolah/yayasan + Faktur & Kwitansi Resmi Lembaga.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/6281298406844?text=Halo%20Admin%20TRISULA,%20saya%20tertarik%20dengan%20Lisensi%20Sekolah/B2B."
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all text-center block cursor-pointer"
                    >
                      Hubungi Admin WA
                    </a>
                  </div>

                </div>
              </>
            ) : (
              /* STEP 2: TRANSFER BANK / QRIS MANUAL & WA FORM */
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <button
                    onClick={() => setPaymentStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Kembali Pilihan Paket
                  </button>
                  <h3 className="font-bold text-base text-white">
                    Pembayaran: {selectedPlan === 'SETOKEN' ? 'Paket 7 Token (Rp 19.000)' : 'Paket Bulanan 30 Hari (Rp 50.000)'}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-center">
                  {/* QRIS / TRANSFER DETAILS */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Rekening & E-Wallet Resmi Transfer</span>

                    <div className="text-left text-xs space-y-2 pt-2">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">🏦 Bank BCA</span>
                        <span className="font-mono text-amber-300 text-sm font-bold block select-all">5765323549</span>
                        <span className="text-slate-400 block text-[10px]">a.n. iis istianawahid</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">💙 DANA / E-Wallet</span>
                        <span className="font-mono text-amber-300 text-sm font-bold block select-all">081519234087</span>
                        <span className="text-slate-400 block text-[10px]">a.n. iis istianawahid</span>
                      </div>
                    </div>
                  </div>

                  {/* FORM KONFIRMASI */}
                  <form onSubmit={handleConfirmWhatsApp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap Anda"
                        value={paymentForm.fullname}
                        onChange={(e) => setPaymentForm({ ...paymentForm, fullname: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Terdaftar</label>
                      <input
                        type="email"
                        required
                        placeholder="contoh@guru.sch.id"
                        value={paymentForm.email}
                        onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>🟢</span> Konfirmasi Pembayaran via WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* EXPORT CENTER MODAL */}
      {isExportModalOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <span>📄</span> Export Center Dokumen
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Mencetak 1 set perangkat ajar memotong 7 token.</p>
              </div>
              <button onClick={() => setIsExportModalOpen(false)} className="text-slate-500 hover:text-white text-lg font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <button onClick={handleDownloadWord} className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between text-left transition-all group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟦</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">Unduh Berkas Word (.doc)</div>
                    <div className="text-[10px] text-slate-400">Layout Tabel Native Presisi (-7 Token)</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Unduh →</span>
              </button>

              <button onClick={handleDownloadTxt} className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between text-left transition-all group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">Unduh Teks Polos (.txt)</div>
                    <div className="text-[10px] text-slate-400">Format markdown murni (-7 Token)</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Unduh →</span>
              </button>

              <button onClick={handlePrintPDF} className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#D4AF37] rounded-2xl flex items-center justify-between text-left transition-all group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖨️</span>
                  <div>
                    <div className="font-bold text-xs text-slate-100 group-hover:text-[#D4AF37]">Cetak / Simpan PDF</div>
                    <div className="text-[10px] text-slate-400">Mencetak kanvas dokumen A4 (-7 Token)</div>
                  </div>
                </div>
                <span className="text-xs text-[#D4AF37] font-bold">Cetak →</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
