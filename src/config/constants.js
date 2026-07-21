/**
 * TRISULAPROMPT - Core Constants & Initial Data v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Global Constants, Initial Mock Projects, & System Options
 */

// Navigasi Pohon Dokumen Kurikulum Merdeka
export const DOC_TREE_LABELS = [
  { id: 'cp', label: '1. Capaian Pembelajaran (CP)' },
  { id: 'tp', label: '2. Tujuan Pembelajaran (TP)' },
  { id: 'atp', label: '3. Alur TP (ATP)' },
  { id: 'kktp', label: '4. KKTP Rubrik Penilaian' },
  { id: 'prota', label: '5. Program Tahunan (Prota)' },
  { id: 'prosem', label: '6. Program Semester (Prosem)' },
  { id: 'modul', label: '7. Modul Ajar Utuh (3 Pilar)' }
];

// Pilihan Option Dropdown Kurikulum
export const FASE_OPTIONS = [
  { value: 'Fase A', label: 'Fase A (Kelas 1-2 SD)' },
  { value: 'Fase B', label: 'Fase B (Kelas 3-4 SD)' },
  { value: 'Fase C', label: 'Fase C (Kelas 5-6 SD)' },
  { value: 'Fase D', label: 'Fase D (Kelas 7-9 SMP)' },
  { value: 'Fase E', label: 'Fase E (Kelas 10 SMA/SMK)' },
  { value: 'Fase F', label: 'Fase F (Kelas 11-12 SMA/SMK)' }
];

export const SEMESTER_OPTIONS = [
  { value: 'Semester 1 (Ganjil)', label: 'Semester 1 (Ganjil)' },
  { value: 'Semester 2 (Genap)', label: 'Semester 2 (Genap)' }
];

export const STATUS_OPTIONS = ['All', 'In Progress', 'Completed'];

// Form State Awal untuk Deep Learning Wizard 4-Step
export const DEFAULT_WIZARD_DATA = {
  subject: 'Bahasa Indonesia',
  grade: 'Kelas X',
  semester: 'Semester 1 (Ganjil)',
  phase: 'Fase E',
  cpText: 'Peserta didik mampu mengevaluasi informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari berbagai jenis teks untuk menemukan makna tersurat dan tersirat.',
  learningStyle: 'Visual & Kinestetik Dominan (65%), Auditori (35%)',
  infrastructure: 'Proyektor Kelas, Smartphone Siswa, Perpustakaan Sekolah',
  realIssue: 'Rendahnya literasi kritis terhadap fenomena disinformasi/hoaks di media sosial lokal.',
  generatedTP: '',
  generatedATP: '',
  generatedKKTP: '',
  generatedProta: '',
  generatedProsem: ''
};

// Mock Data Proyek Perangkat Ajar Siap Pakai
export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Modul Ajar Informatika - Algoritma Pemrograman Python',
    subject: 'Informatika',
    grade: 'Kelas X',
    semester: 'Semester 1 (Ganjil)',
    phase: 'Fase E',
    status: 'In Progress',
    progress: 65,
    lastEdited: '2 jam yang lalu',
    cp: 'Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit volume besar.',
    diagnostic: {
      learningStyle: 'Kinestetik & Visual (60%), Auditori (40%)',
      infrastructure: 'Lab Komputer (20 PC), Akses Internet WiFi, Proyektor',
      realIssue: 'Siswa kesulitan memahami logika looping dan rekursi tanpa visualisasi konkret.'
    },
    docTree: {
      cp: 'Peserta didik mampu menerapkan strategi algoritmik standar untuk menghasilkan beberapa solusi persoalan dengan data diskrit volume besar.',
      tp: '10.1 Memahami konsep dasar algoritma dan flowchart secara terstruktur.\n10.2 Menganalisis efisiensi alur logika pemrograman percabangan dan perulangan.\n10.3 Merancang solusi masalah kontekstual dengan struktur kontrol Python.',
      atp: '| Kode ATP | Tujuan Pembelajaran | Alokasi Waktu | Asesmen |\n|---|---|---|---|\n| ATP.1 | Konsep Dasar Algoritma & Flowchart | 4 JP | Formatif Tes Lisan |\n| ATP.2 | Struktur Kontrol Percabangan & Perulangan | 8 JP | Tugas Proyek Kelompok |\n| ATP.3 | Mini Proyek Pemrograman Kontekstual | 6 JP | Produk & Presentasi |',
      kktp: '| Indikator | Belum Memenuhi (0-60) | Memenuhi (61-80) | Sangat Baik (81-100) |\n|---|---|---|---|\n| Pemahaman Logika | Belum memahami alur | Mampu menyusun flowchart | Mampu optimasi kode Python |',
      prota: 'Semester 1: 36 JP (4 Bab Utama)\nSemester 2: 36 JP (3 Bab Proyek Lanjutan)',
      prosem: 'Bulan Juli: 8 JP Algoritma\nBulan Agustus: 12 JP Struktur Data\nBulan September: 16 JP Bahasa Python',
      modul: `# MODUL AJAR DEEP LEARNING: INFORMATIKA FASE E

## I. INFORMASI UMUM
- **Penyusun**: Tim Guru Informatika
- **Satuan Pendidikan**: SMA Negeri 1 Indonesia
- **Tahun Ajaran**: 2026/2027
- **Fase / Kelas**: E / X
- **Alokasi Waktu**: 4 JP (2 x Pertemuan)

---

## II. PILAR DEEP LEARNING INTEGRATION

### 1. Mindful Learning (Penyadaran Diri & Faktual)
- **Aktivitas STOP**: Sebelum memulai sesi coding, murid diajak melakukan teknik pernapasan 2 menit untuk fokus dan mengurangi kecemasan logika.
- **Refleksi Kesadaran**: Murid mencatat ekspektasi dan kekhawatiran mereka terhadap materi algoritma.

### 2. Meaningful Learning (Kontekstual & Bermakna)
- **Studi Kasus Nyata**: Siswa menganalisis logika antrean sistem pendaftaran BPJS / Kasir Minimarket lokal di lingkungan sekitar sekolah.
- **Problem-Based Challenge**: Membuat simulasi logika pemesanan tiket angkutan daerah.

### 3. Joyful Learning (Kolaboratif & Reflektif)
- **Game Algoritma Unplugged**: Bermain peran sebagai CPU dan Memori dalam menyelesaikan puzzle logika fisik.
- **Peer Code Review**: Diskusi kelompok saling memberikan umpan balik positif terhadap alur flowchart teman.`
    }
  },
  {
    id: 'proj-2',
    title: 'Perangkat Ajar Matematika - Analisis Data & Peluang',
    subject: 'Matematika',
    grade: 'Kelas XI',
    semester: 'Semester 2 (Genap)',
    phase: 'Fase F',
    status: 'Completed',
    progress: 100,
    lastEdited: '1 hari yang lalu',
    cp: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.',
    diagnostic: {
      learningStyle: 'Auditori & Visual',
      infrastructure: 'Smartphone Siswa, Buku Paket, Kuota Internet',
      realIssue: 'Literasi data statistik pada berita hoaks sosial media.'
    },
    docTree: {
      cp: 'Peserta didik mampu melakukan evaluasi kritis terhadap penyajian data statistik.',
      tp: '11.1 Membaca dan menafsirkan diagram tebar data.\n11.2 Menghitung ukuran pemusatan data kelompok.',
      atp: '| ATP | Tujuan | JP | Asesmen |\n|---|---|---|---|\n| 1 | Diagram Tebar | 4 JP | Quiz |\n| 2 | Regresi Linear | 6 JP | Proyek |',
      kktp: '| Indikator | Belum Memenuhi (0-60) | Memenuhi (61-80) | Sangat Baik (81-100) |\n|---|---|---|---|\n| Analisis Statistik | Belum bisa membaca grafik | Mampu menghitung rata-rata | Mampu evaluasi korelasi data |',
      prota: '72 JP Total Tahun Ajaran',
      prosem: 'Distribusikan pada Bulan Jan-Mei',
      modul: `# MODUL AJAR MATEMATIKA DEEP LEARNING FASE F\n\n## Pendekatan Kontekstual Data Statistik Real-World`
    }
  }
];
