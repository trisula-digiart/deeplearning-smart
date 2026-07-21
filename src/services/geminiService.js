import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * TRISULAPROMPT - Gemini Service & Deep Learning Prompt Engine v2.5
 * Menangani komunikasi API Gemini dengan Smart Fallback Mock Engine
 */

// Inisialisasi SDK Gemini (Membaca dari Environment Variable VITE_GEMINI_API_KEY)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Generator Prompt 3 Pilar Deep Learning (Mindful, Meaningful, Joyful)
 * Diexport secara eksplisit untuk digunakan oleh AIWorkspace & Wizard
 */
export const generateDeepLearningPrompt = ({ subject, phase, topic, instruction }) => {
  return `
Role: Anda adalah Pakar Kurikulum Merdeka & Senior Educational Prompt Engineer (TRISULA AI Engine).
Tugas: Buat/Revisi modul ajar untuk mata pelajaran "${subject}", ${phase}, topik "${topic}".

Instruksi Tambahan Pengguna:
"${instruction || 'Tingkatkan kualitas modul dengan prinsip 3 pilar Deep Learning.'}"

Harap integrasikan 3 Pilar Deep Learning berikut secara eksplisit:
1. MINDFUL LEARNING (Penyadaran Diri & Kesadaran Mental)
2. MEANINGFUL LEARNING (Pembelajaran Bermakna & Studi Kasus Kontekstual Nyata)
3. JOYFUL LEARNING (Pembelajaran Menggembirakan, Gamifikasi & Apresiasi)

Sajikan respons secara terstruktur, jelas, dan profesional.
  `.trim();
};

/**
 * Fungsi Utama Sintesis Perangkat Ajar dari Gemini AI / Smart Mock
 * Aliased untuk generatePerangkatAjar & generateTeachingMaterial
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

  // Smart Fallback Mock Engine (Jika API Key kosong atau kuota terlampaui)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        source: 'mock-engine',
        data: `# MODUL AJAR DEEP LEARNING: ${(subject || 'UMUM').toUpperCase()} ${(phase || 'FASE E').toUpperCase()}

## I. INFORMASI UMUM
- **Mata Pelajaran**: ${subject || 'Informatika'}
- **Fase / Kelas**: ${phase || 'Fase E (Kelas 10)'}
- **Topik Utama**: ${topic || 'Algoritma & Pemrograman'}

---

## II. INTEGRASI 3 PILAR DEEP LEARNING

### 1. Mindful Learning (Penyadaran Diri)
- **Latihan Hening STOP**: Sebelum memulai pelajaran, murid diajak hening selama 3 menit untuk menyiapkan kestabilan mental & fokus belajar.
- **Refleksi Awal**: Murid mengisi jurnal singkat mengenai harapan dan tingkat kesiapan memahami materi ${topic || 'pembelajaran'}.

### 2. Meaningful Learning (Keterhubungan Masalah Nyata)
- **Kontekstualisasi**: Mengaitkan konsep ${topic || 'pembelajaran'} dengan permasalahan nyata kehidupan sehari-hari di lingkungan murid.
- **Tugas Terapan**: Murid menganalisis studi kasus lokal dan merancang solusi praktis.

### 3. Joyful Learning (Kolaboratif & Menggembirakan)
- **Gamifikasi Pembelajaran**: Tantangan tim interaktif berbasis kuis/permainan "BONGKAR LOGIKA".
- **Apresiasi Sebaya**: Sesi saling memberikan umpan balik positif antar kelompok.`
      });
    }, 1200);
  });
};

// Alias ekspor dinamik agar DeepLearningWizard.jsx & AIWorkspace.jsx keduanya terlayani 100%
export const generatePerangkatAjar = generateTeachingMaterial;

export default {
  generateDeepLearningPrompt,
  generateTeachingMaterial,
  generatePerangkatAjar
};
