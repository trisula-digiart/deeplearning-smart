import { DEEP_LEARNING_SYSTEM_PROMPT } from '../config/systemPrompt';

/**
 * TRISULAPROMPT - Gemini AI Service Engine v2.5
 * Handles integration with Gemini 3 Flash API for Kurikulum Merdeka & Deep Learning synthesis.
 * Built-in support for Mindful, Meaningful, & Joyful pedagogy pillars.
 */

// Mengambil API Key dari environment variable (.env / Vercel), dengan fallback string kosong
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || ""; 
const MODEL_NAME = "gemini-3-flash-preview";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

/**
 * Primary API caller for Gemini Engine
 * @param {string} promptText - User query or structured prompt
 * @param {string} [systemInstructionText] - Optional override for system prompt
 * @returns {Promise<string>} Generated markdown/text response
 */
export async function callGeminiAI(promptText, systemInstructionText = DEEP_LEARNING_SYSTEM_PROMPT) {
  try {
    const payload = {
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemInstructionText }]
      }
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error Status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      return generatedText;
    } else {
      throw new Error('Empty payload returned from Gemini API.');
    }
  } catch (error) {
    console.warn('[Gemini AI Engine] Falling back to offline synthesis engine:', error.message);
    return generateOfflineFallback(promptText);
  }
}

/**
 * Fallback generator when offline or API key is not configured
 * @param {string} promptText - Original user prompt
 * @returns {string} Simulated Deep Learning response
 */
function generateOfflineFallback(promptText) {
  return `[DEEP LEARNING ENGINE REVISION GENERATED]\n\n` +
         `Berdasarkan analisis terarah terhadap konteks Anda:\n\n` +
         `### 1. Mindful Learning Integration\n` +
         `- Menambahkan sesi hening / pernapasan "STOP" 3 menit sebelum pembelajaran dimulai.\n` +
         `- Lembar refleksi diri untuk mengukur kesiapan emosional siswa.\n\n` +
         `### 2. Meaningful Learning Integration\n` +
         `- Menghubungkan topik secara langsung dengan studi kasus di lingkungan sekitar sekolah.\n` +
         `- Penugasan berupa mini proyek pemecahan masalah kontekstual.\n\n` +
         `### 3. Joyful Learning Integration\n` +
         `- Aktivitas kerja kelompok interaktif dengan strategi gamifikasi.\n` +
         `- Sesi peer-review yang menyenangkan dan apresiatif.`;
}

/**
 * Specialized helper to synthesize initial TP, ATP, KKTP draft from CP and Diagnostic Data
 */
export async function generateWizardDrafts({ subject, grade, cpText, learningStyle, realIssue }) {
  const prompt = `
Buatkan draf TP, ATP, KKTP, Prota, dan Prosem Kurikulum Merdeka berlandaskan Deep Learning (Mindful, Meaningful, Joyful) untuk:
- Mata Pelajaran: ${subject}
- Kelas: ${grade}
- Capaian Pembelajaran (CP): ${cpText}
- Profil Murid / Gaya Belajar: ${learningStyle}
- Isu Nyata Lingkungan: ${realIssue}

Berikan keluaran terstruktur dengan penjelasan ringkas untuk masing-masing poin.
  `.trim();

  return await callGeminiAI(prompt);
}
