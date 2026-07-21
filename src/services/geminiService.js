import { GoogleGenAI } from '@google/genai';

/**
 * TRISULAPROMPT - Gemini AI Service Integration Layer v2.5
 * Menghubungkan Engine Deep Learning Kurikulum Merdeka ke Google Gemini AI
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Inisialisasi Google GenAI SDK jika API Key tersedia
let ai = null;
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.warn("[TRISULA AI] Inisialisasi Gemini SDK gagal, beralih ke Mock Engine Mode:", error);
  }
}

/**
 * System Prompt Utama untuk Kurikulum Merdeka 3 Pilar Deep Learning
 */
const SYSTEM_PROMPT_KURIKULUM_MERDEKA = `
Anda adalah Pakar Kurikulum Merdeka & Senior Educational Designer berpengalaman.
Tugas Anda adalah membuat dokumen Perangkat Ajar Kurikulum Merdeka secara otomatis, rapi, terstruktur, dan presisi tinggi.

Setiap dokumen yang dibuat WAJIB mengintegrasikan 3 Pilar Deep Learning:
1. Mindful Learning (Pembelajaran Sadar & Reflektif)
2. Meaningful Learning (Pembelajaran Bermakna & Kontekstual)
3. Joyful Learning (Pembelajaran Menyenangkan & Mengembangkan Potensi)

Format output harus berupa JSON yang valid dan bersih agar dapat diproses oleh sistem UI SaaS.
`;

/**
 * Generasi Perangkat Ajar Utama (Modul Ajar / TP / ATP / KKTP / Prota / Prosem)
 * @param {Object} params Parameter Kurikulum Merdeka dari Wizard Form
 * @returns {Promise<Object>} Output dokumen terstruktur
 */
export const generatePerangkatAjar = async (params) => {
  const {
    mataPelajaran = 'Informatika',
    fase = 'Fase E (Kelas 10)',
    topik = 'Algoritma Pemrograman',
    jenisDokumen = 'Modul Ajar',
    durasi = '2 JP (2 x 45 Menit)',
    pilarFocus = ['Mindful', 'Meaningful', 'Joyful']
  } = params;

  // Prompt Khusus Per jenisDokumen
  const userPrompt = `
  Buatkan dokumen ${jenisDokumen} Kurikulum Merdeka dengan spesifikasi berikut:
  - Mata Pelajaran: ${mataPelajaran}
  - Fase/Kelas: ${fase}
  - Topik/Materi Utama: ${topik}
  - Alokasi Waktu: ${durasi}
  - Fokus Pilar Deep Learning: ${pilarFocus.join(', ')}

  Sertakan struktur lengkap:
  1. Identitas Modul
  2. Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP)
  3. Indikator Ketercapaian (KKTP)
  4. Kegiatan Pembelajaran (Pendahuluan, Inti - 3 Pilar, Penutup)
  5. Asesmen (Diagnostik, Formatif, Sumatif)
  6. Lembar Kerja Peserta Didik (LKPD) & Bahan Bacaan

  Kembalikan dalam format JSON dengan struktur:
  {
    "title": "Judul Dokumen",
    "subject": "${mataPelajaran}",
    "phase": "${fase}",
    "topic": "${topik}",
    "summary": "Ringkasan Eksekutif",
    "components": [
      { "section": "Nama Bagian", "content": "Detail penjelasan atau markdown list" }
    ]
  }
  `;

  // Path 1: Menggunakan Live Gemini API
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT_KURIKULUM_MERDEKA + '\n\n' + userPrompt }] }
        ],
        config: {
          temperature: 0.7,
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text();
      const parsedData = JSON.parse(responseText);
      return {
        success: true,
        source: 'gemini-api',
        data: parsedData
      };
    } catch (err) {
      console.error("[TRISULA AI] Gemini API Error, fallback ke Smart Mock Engine:", err);
    }
  }

  // Path 2: Fallback Smart Mock Engine (Diaktifkan jika API Key Kosong/Limit Error)
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulasi latency jaringan

  return {
    success: true,
    source: 'mock-engine',
    data: {
      title: `${jenisDokumen} - ${topik}`,
      subject: mataPelajaran,
      phase: fase,
      topic: topik,
      summary: `Perangkat ajar berbasis 3 Pilar Deep Learning (${pilarFocus.join(', ')}) dirancang khusus untuk meningkatkan pemahaman kontekstual dan keterlibatan aktif siswa.`,
      components: [
        {
          section: "1. Identitas & Informasi Umum",
          content: `• Mata Pelajaran: ${mataPelajaran}\n• Fase / Kelas: ${fase}\n• Alokasi Waktu: ${durasi}\n• Target Peserta Didik: Reguler / Tipikal\n• Moda Pembelajaran: Tatap Muka (Luring)`
        },
        {
          section: "2. Capaian & Tujuan Pembelajaran (TP)",
          content: `• Capaian Pembelajaran: Peserta didik mampu menganalisis dan menerapkan konsep dasar ${topik} secara kritis.\n• Tujuan Pembelajaran (TP 1.1): Memahami alur logika dan implementasi ${topik} dalam kehidupan sehari-hari.\n• Indikator (KKTP): Mampu merancang alur penyelesaian masalah dengan akurasi min. 80%.`
        },
        {
          section: "3. Kegiatan Pembelajaran (3 Pilar Deep Learning)",
          content: `• Mindful Learning (15 Menit): Refleksi awal & orientasi masalah interaktif.\n• Meaningful Learning (50 Menit): Diskusi kelompok memecahkan studi kasus dunia nyata terkait ${topik}.\n• Joyful Learning (25 Menit): Kuis gamifikasi & presentasi kolaboratif antarkelompok.`
        },
        {
          section: "4. Rencana Asesmen",
          content: `• Asesmen Awal (Diagnostik): Pertanyaan pemantik logika.\n• Asesmen Formatif: Lembar observasi diskusi & unjuk kerja.\n• Asesmen Sumatif: Tes tertulis pilihan ganda beralasan & pembuatan proyek sederhana.`
        }
      ]
    }
  };
};

export default {
  generatePerangkatAjar
};
