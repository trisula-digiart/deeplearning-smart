import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * TRISULAPROMPT - Gemini Service & Deep Learning Prompt Engine v3.0
 * Menangani komunikasi API Gemini dengan Smart Fallback Mock Engine & Comprehensive Document Synthesizer
 */

// Inisialisasi SDK Gemini (Membaca dari Environment Variable VITE_GEMINI_API_KEY)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Generator Prompt 3 Pilar Deep Learning & Standar Komprehensif 12 Halaman (Bab A - Bab G)
 * Diexport secara eksplisit untuk digunakan oleh AIWorkspace & Wizard
 */
export const generateDeepLearningPrompt = ({ subject, phase, topic, instruction }) => {
  return `
Role: Anda adalah Pakar Kurikulum Merdeka & Senior Educational Prompt Engineer (TRISULA AI Engine).
Tugas: Buat/Revisi perangkat ajar dan modul ajar YANG SANGAT DETAIL, UTUH, DAN PANJANG (Setara standar referensi 10-12 halaman) untuk mata pelajaran "${subject || 'Mata Pelajaran'}", ${phase || 'Fase E'}, topik "${topic || 'Materi Utama'}".

Instruksi Tambahan Pengguna:
"${instruction || 'Tingkatkan kualitas modul dengan prinsip 3 pilar Deep Learning dan materi yang sangat mendalam.'}"

STRUKTUR UTUH YANG WAJIB DIHASILKAN SECARA LENGKAP (BAB A s.d. BAB G):
1. A. IDENTITAS MODUL (Tabel resmi: Sekolah, Penyusun, Mapel, Kelas/Fase, Alokasi Waktu, Tahun Pelajaran).
2. B. IDENTIFIKASI KESIAPAN PESERTA DIDIK (Pengetahuan Awal Kognitif, Minat, Latar Belakang, & Kebutuhan Belajar Berdiferensiasi: Visual, Auditori, Kinestetik, ABK, Pengayaan).
3. C. KARAKTERISTIK MATERI PELAJARAN (Konseptual, Prosedural, Metakognitif, Relevansi Nyata, Kesulitan, & Integrasi Karakter).
4. D. DIMENSI PROFIL LULUSAN / PROFIL PELAJAR PANCASILA (Rincian dimensi keimanan, penalaran kritis, kreativitas, kolaborasi, kemandirian, komunikasi).
5. E. DESAIN PEMBELAJARAN KOMPREHENSIF (Capaian Pembelajaran Kemdikbud 2024, Lintas Disiplin Ilmu, Tujuan Pembelajaran ABCD, Topik Kontekstual, Kerangka Pedagogik PBL/PjBL).
6. F. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI RINCI (Pertemuan 1 s.d. 4: Kegiatan Pendahuluan, Inti, Penutup berintegrasi Mindful, Meaningful, Joyful lengkap dengan alokasi waktu menit).
7. G. ASESMEN PEMBELAJARAN UTUH (Diagnostik, Formatif, Sumatif Proyek/Soal Esai, & Lembar Pengesahan Tanda Tangan Kepala Sekolah & Guru).

Harap integrasikan 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) secara eksplisit pada setiap sesi kegiatan pembelajaran. Gunakan Tabel Markdown untuk ATP, Prota/Prosem, dan Rubrik KKTP.
  `.trim();
};

/**
 * Fungsi Utama Sintesis Perangkat Ajar dari Gemini AI / Smart Mock Engine
 */
export const generateTeachingMaterial = async (payload) => {
  const { subject, phase, topic, instruction } = payload || {};
  const prompt = generateDeepLearningPrompt({
    subject: subject || 'Mata Pelajaran',
    phase: phase || 'Fase E',
    topic: topic || 'Materi Utama',
    instruction
  });

  // Jika API Key tersedia, gunakan Real Gemini AI API
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return { success: true, data: text, source: 'gemini-api' };
    } catch (error) {
      console.warn('Gemini API call failed, switching to Smart Mock Engine:', error);
    }
  }

  // Smart Fallback Mock Engine (Menghasilkan dokumen panjang & komprehensif Bab A - Bab G)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        source: 'mock-engine',
        data: `# MODUL AJAR DEEP LEARNING: ${(subject || 'IPA & BIOLOGI').toUpperCase()} ${(phase || 'FASE E').toUpperCase()}
## BAB: ${(topic || 'EKOSISTEM & PERUBAHAN LINGKUNGAN').toUpperCase()}

---

## A. IDENTITAS MODUL
| Komponen Utama | Rincian Keterangan Formal |
| :--- | :--- |
| **Nama Sekolah** | SMA Negeri 1 Unggulan / Sesuai Instansi |
| **Nama Penyusun** | Tim Kurikulum & Guru Penggerak Profesional |
| **Mata Pelajaran** | ${subject || 'IPA & Biologi'} |
| **Kelas / Fase / Semester** | ${phase || 'Fase E (Kelas 10)'} / Ganjil |
| **Alokasi Waktu** | 3 Jam Pelajaran (Eksplorasi Mendalam & Praktikum) |
| **Tahun Pelajaran** | 2026 / 2027 |

---

## B. IDENTIFIKASI KESIAPAN PESERTA DIDIK
Sebelum memulai pembelajaran mendalam terkait ${topic || 'materi ini'}, asesmen diagnostik komprehensif dilakukan untuk memetakan kesiapan murid:

- **Pengetahuan Awal (Kognitif)**:
  - Pemahaman fundamental mengenai konsep utama dan hubungannya dengan fenomena alam/sosial nyata.
  - Kemampuan mengidentifikasi variabel-variabel pengamatan abiotik dan biotik yang memengaruhi sistem.
  - Penguasaan kaidah dasar penalaran kausalitas dan hubungan timbal balik dalam sistem.

- **Minat & Ketertarikan Murid**:
  - Pemetaan hasil kuesioner awal terkait ketertarikan peserta didik terhadap isu lingkungan, eksperimen laboratorium, atau investigasi lapangan.
  - Pengamatan respons spontan murid terhadap studi kasus faktual yang disajikan di awal bab.

- **Kebutuhan Belajar Berdiferensiasi**:
  - **Gaya Belajar Visual**: Membutuhkan diagram alir, infografis data statistik, grafik kurva, dan video simulasi interaktif.
  - **Gaya Belajar Auditori**: Mengoptimalkan diskusi kelompok terarah, debat ilmiah, dan presentasi lisan interaktif.
  - **Gaya Belajar Kinestetik**: Membutuhkan praktikum langsung, eksplorasi lingkungan luar kelas, dan perancangan model fisik proyek.
  - **Dukungan ABK / Kesulitan Belajar**: Penyederhanaan instruksi bertahap, panduan visual pendukung, serta fleksibilitas waktu pengerjaan tugas.
  - **Pengayaan Murid Berkemampuan Tinggi**: Tantangan studi kasus ilmiah tingkat lanjut, analisis data sekunder, dan investigasi mandiri.

---

## C. KARAKTERISTIK MATERI PELAJARAN
- **Jenis Pengetahuan**: Konseptual, Prosedural, dan Metakognitif tingkat tinggi.
- **Relevansi Kontekstual**: Terhubung langsung dengan permasalahan nyata di lingkungan sekolah, daerah, dan isu global mutakhir.
- **Tingkat Kesulitan**: Tingkat sedang hingga tinggi dengan transisi mulus dari pemahaman konkrit menuju pemecahan masalah abstrak.
- **Integrasi Nilai & Karakter**: Kepedulian Lingkungan, Tanggung Jawab Sosial, Kolaborasi Inklusif, Berpikir Kritis, dan Rasa Ingin Tahu Ilmiah.

---

## D. DIMENSI PROFIL LULUSAN (PROFIL PELAJAR PANCASILA)
- **Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia**: Mensyukuri keteraturan sistem alam ciptaan Tuhan dan menjaga kelestarian bumi.
- **Penalaran Kritis**: Menganalisis data empiris, mengevaluasi validitas informasi, dan merumuskan argumen logis berbasis bukti.
- **Kreativitas**: Menghasilkan ide-ide solutif, inovatif, dan estetis dalam menjawab tantangan seputar materi.
- **Kolaborasi**: Berpartisipasi aktif, menghargai ragam pendapat, dan bekerja sama secara harmonis dalam tim heterogen.
- **Kemandirian**: Mengatur strategi belajar pribadi, regulasi emosi, dan bertanggung jawab menuntaskan penugasan.

---

## E. DESAIN PEMBELAJARAN KOMPREHENSIF

### 1. CAPAIAN PEMBELAJARAN (CP) RESMI KEMDIKBUD
Peserta didik mampu memahami konsep esensial, mengaitkannya dengan fenomena faktual, serta merancang solusi kreatif melalui pendekatan inkuiri ilmiah, pemodelan logika, dan kolaborasi bermakna.

---

## II. CAPAIAN PEMBELAJARAN (CP)
### 📘 Analisis Capaian Pembelajaran Elemen
Peserta didik mampu menerapkan pemahaman untuk menganalisis sistem, menyusun model logika, serta merancang pemecahan masalah kontekstual secara kritis, mandiri, dan kolaboratif.

---

## III. TUJUAN PEMBELAJARAN (TP)
### 🎯 Poin Tujuan Pembelajaran ABCD
- **TP1**: Menganalisis struktur, komponen, dan dinamika materi berdasarkan data empiris lapangan.
- **TP2**: Menyusun model matematika, diagram alir, atau logika terstruktur terkait sistem pembelajaran.
- **TP3**: Mempresentasikan hasil analisis proyek kelompok secara kolaboratif dengan argumen ilmiah yang valid.

---

## IV. ALUR TUJUAN PEMBELAJARAN (ATP)
### 🗺️ Pemetaan Runtutan ATP
| Kode ATP | Alokasi Waktu | Indikator Ketercapaian Tujuan Pembelajaran | Rencana Asesmen |
| :--- | :--- | :--- | :--- |
| **ATP.01** | 3 JP | Mampu memetakan komponen utama & analisis konsep dasar | Formatif Latihan Soal & Kuis |
| **ATP.02** | 3 JP | Mampu membuat diagram alir, grafik, & model terstruktur | Unjuk Kerja Kelompok |
| **ATP.03** | 3 JP | Mampu melakukan investigasi mandiri & evaluasi solusi | Penilaian Proyek & Laporan |

---

## V. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
### 📊 Rubrik Observasi Unjuk Kerja Pemecahan Masalah
| Kriteria Penilaian | Belum Memenuhi (1) | Cukup (2) | Baik (3) | Sangat Baik (4) |
| :--- | :--- | :--- | :--- | :--- |
| **Penerapan Konsep** | Salah mengidentifikasi komponen | Memahami 60% konsep | Memahami 85% konsep dengan benar | Memahami 100% konsep & sangat solutif |
| **Analisis & Logika** | Tidak mampu menyusun alur | Ada kekeliruan alur logika | Alur terstruktur & logis | Sangat presisi, mendalam, & solutif |
| **Kolaborasi Tim** | Pasif dalam kerja kelompok | Berpartisipasi jika diminta | Aktif berkontribusi & berdiskusi | Memimpin, merangkul, & membantu rekan |

---

## VI. PROGRAM TAHUNAN (PROTA)
### 🗓️ Alokasi Efektif Jam Pelajaran Tahunan
| No | Bab / Elemen Materi Utama | Alokasi Waktu (JP) | Keterangan Semester |
| :--- | :--- | :--- | :--- |
| **1** | Eksplorasi & Analisis Mendalam Materi Utama | 18 JP | Semester Ganjil |
| **2** | Perancangan Proyek Terapan & Evaluasi | 18 JP | Semester Genap |

---

## VII. PROGRAM SEMESTER (PROSEM)
### 📅 Alokasi Pemetaan Jam Pelajaran Semester 1 & 2
| No | Materi / Tujuan Pembelajaran | JP | Juli | Ags | Sep | Okt | Nov | Des |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Analisis Konsep & Pemodelan Sistem | 6 JP | x | x | | | | |
| **2** | Perancangan Proyek & Observasi Lapangan | 6 JP | | | x | x | | |
| **3** | Evaluasi, Presentasi & Kampanye Solutif | 6 JP | | | | | x | x |

---

## VIII. INTEGRASI 3 PILAR DEEP LEARNING
- **Mindful Learning**: Siswa diajak melakukan sesi hening STOP (Sedar, Tenang, Observasi, Pernafasan) selama 3 menit untuk membangun kesadaran diri dan fokus mental.
- **Meaningful Learning**: Menganalisis isu dan studi kasus nyata yang relevan dengan kehidupan sehari-hari di lingkungan sekitar.
- **Joyful Learning**: Kuis interaktif berbasis gamifikasi kelompok, permainan simulasi peran, dan sesi apresiasi sebaya yang menggembirakan.

---

## IX. RUMUS & MODEL LOGIKA (LATEX FORMULA)
Berikut adalah formula dasar perhitungan, pemodelan, dan evaluasi data dalam sistem:
- **Model Pertumbuhan / Laju Sistem**: $$P(t) = P_0 e^{rt}$$
- **Rata-rata Sampel Observasi**: $\\bar{x} = \\frac{\\sum x_i}{n}$
- **Deviasi Standar Pengamatan**: $$S = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}$$

---

## X. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI RINCI
### PERTEMUAN 1: EKSPLORASI KONSEP & OBSERVASI FAKTUAL (3 JP)

#### A. KEGIATAN PENDAHULUAN (15 Menit - Mindful, Meaningful, Joyful)
1. **Pembukaan & Kesadaran Diri (5 Menit)**: Guru menyapa murid, berdoa bersama, dan memimpin latihan hening STOP.
2. **Apersepsi & Pertanyaan Pemantik (5 Menit)**: Menampilkan visual fenomena faktual dan memicu rasa ingin tahu awal.
3. **Asesmen Diagnostik (5 Menit)**: Kuesioner cepat memetakan pengetahuan awal dan kesiapan kognitif.

#### B. KEGIATAN INTI (105 Menit - Memahami, Mengaplikasi, Merefleksi)
1. **Eksplorasi & Direct Observation (20 Menit)**: Mengamati sampel data dan fenomena nyata secara terbimbing.
2. **Identifikasi Masalah Kelompok (30 Menit)**: Pembagian kelompok heterogen untuk merumuskan rumusan masalah.
3. **Pengolahan Data & Diskusi Analitis (30 Menit)**: Menyusun grafik, tabel data, dan diagram alir pemecahan masalah.
4. **Presentasi & Klarifikasi Konsep (25 Menit)**: Diskusi kelas, tanya jawab, dan penguatan materi oleh guru.

#### C. KEGIATAN PENUTUP (15 Menit)
1. **Refleksi Diri 3-2-1 (10 Menit)**: Menuliskan 3 hal dipelajari, 2 hal menarik, dan 1 pertanyaan tersisa.
2. **Kesimpulan & Tindak Lanjut (5 Menit)**: Menyimpulkan poin pembelajaran dan instruksi tugas mandiri.

---

## XI. ASESMEN PEMBELAJARAN UTUH
- **Asesmen Diagnostik**: Tes tertulis singkat awal & pemetaan profil belajar murid.
- **Asesmen Formatif**: Rubrik observasi partisipasi aktif diskusi kelompok & jurnal harian.
- **Asesmen Sumatif**: Penilaian Proyek Solutif Kelompok & Tes Tertulis Analitis Komprehensif.

---

## XII. LEMBAR PENGESAHAN RESMI

| Mengetahui, <br/> Kepala Sekolah / Instansi | Jakarta, 23 Juli 2026 <br/> Guru Mata Pelajaran |
| :--- | :--- |
| <br/><br/> **Dr. Herman Wijaya, M.Pd.** <br/> NIP. 197503152002121003 | <br/><br/> **Tim Guru Penggerak, S.Pd.** <br/> NIP. 198808202014022001 |
      `
      });
    }, 1200);
  });
};

// Alias ekspor dinamik agar kompatibel penuh dengan DeepLearningWizard.jsx & AIWorkspace.jsx
export const generatePerangkatAjar = generateTeachingMaterial;

export default {
  generateDeepLearningPrompt,
  generateTeachingMaterial,
  generatePerangkatAjar
};
```eof
