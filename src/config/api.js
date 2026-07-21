
 * TRISULAPROMPT - API Endpoint Configuration v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Google Apps Script (GAS) Web App Endpoint & Environment Resolver
 */

// URL Web App Google Apps Script (GAS) untuk integrasi Google Sheets Database
// Diambil secara otomatis dari .env (VITE_GAS_API_URL) atau fallback string kosong jika belum di-set
export const GAS_API_URL = import.meta.env?.VITE_GAS_API_URL || "https://script.google.com/macros/s/AKfycbyJJp3CVGiAEkCQ-6zDTgS1Rz2Fz2vQYCvpn_hB-JkN13q9aWQOAFfAtpWH3cHnby6LEg/exec"; // Contoh: https://script.google.com/macros/s/AKfycbx.../exec";

// Konfigurasi Timeout dan Retry untuk request ke GAS Backend
export const API_CONFIG = {
  timeoutMs: 15000,
  retryAttempts: 2,
  headers: {
    'Content-Type': 'text/plain;charset=utf-8', // Format khusus GAS Web App CORS bypass
  }
};
