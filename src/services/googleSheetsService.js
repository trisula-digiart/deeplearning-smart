/**
 * TRISULA CODER v8.7 - GOOGLE SHEETS SYNC SERVICE
 * Menangani sinkronisasi data pengguna, status lisensi, dan pemotongan kredit secara real-time.
 */

export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJJp3CVGiAEkCQ-6zDTgS1Rz2Fz2vQYCvpn_hB-JkN13q9aWQOAFfAtpWH3cHnby6LEg/exec";

export const syncUserToGoogleSheets = async (userData, action = 'SYNC_USER') => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.warn('Webhook URL Google Sheets belum dikonfigurasi.');
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        action, 
        timestamp: new Date().toISOString(),
        user: userData 
      })
    });
    
    console.log(`[TRISULA SYNC] Action [${action}] untuk user ${userData.email} berhasil dikirim ke Apps Script.`);
    return true;
  } catch (err) {
    console.error('[TRISULA SYNC ERROR] Gagal melakukan sinkronisasi dengan Google Sheets:', err);
    return false;
  }
};

/**
 * Format helper untuk kalkulasi matematika Deep Learning LaTeX
 */
export const formatMathFormula = (formulaStr) => {
  if (!formulaStr) return '';
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
