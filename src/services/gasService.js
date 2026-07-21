import { GAS_API_URL, API_CONFIG } from '../config/api';

/**
 * TRISULAPROMPT - Google Apps Script Service Engine v2.5
 * Author: TRISULACODER v8.7 - Lead Solution Architect
 * Module: Async REST Bridge for Google Apps Script & Google Sheets Database
 */

/** 
 * Mengambil seluruh daftar proyek perangkat ajar dari Google Sheets via GAS API
 * @returns {Promise<Array>} Array of project objects
 */
export async function getProjectsFromGAS() {
  try {
    if (!GAS_API_URL || GAS_API_URL.includes("PASANG_WEB_APP_URL")) {
      console.warn('[GAS Engine] Web App URL belum dikonfigurasi, menggunakan local cache.');
      return null;
    }

    const response = await fetch(`${GAS_API_URL}?action=getProjects`, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('[GAS Engine Error] Gagal mengambil proyek dari Google Sheets:', error);
    return null;
  }
}

/**
 * Mengambil proyek spesifik berdasarkan ID unik
 * @param {string} id - Project ID
 * @returns {Promise<Object|null>} Single project object
 */
export async function getProjectByIdFromGAS(id) {
  try {
    if (!GAS_API_URL || GAS_API_URL.includes("PASANG_WEB_APP_URL")) {
      return null;
    }

    const response = await fetch(`${GAS_API_URL}?action=getProjectById&id=${id}`, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const json = await response.json();
    return json.data || null;
  } catch (error) {
    console.error(`[GAS Engine Error] Gagal mengambil proyek ID ${id}:`, error);
    return null;
  }
}

/**
 * Menyimpan atau memperbarui proyek ke Google Sheets via GAS POST endpoint
 * @param {Object} projectData - Data perangkat ajar utuh
 * @returns {Promise<Object>} Status respon pembuatan/pembaruan
 */
export async function saveProjectToGAS(projectData) {
  try {
    if (!GAS_API_URL || GAS_API_URL.includes("PASANG_WEB_APP_URL")) {
      console.warn('[GAS Engine] API URL belum diisi. Menyimpan di Local Storage saja.');
      return { status: 200, success: true, offline: true };
    }

    const payload = {
      action: 'saveProject',
      project: projectData
    };

    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`GAS Save Error: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('[GAS Engine Error] Gagal menyimpan ke Google Sheets:', error);
    throw error;
  }
}

/**
 * Memperbarui status dan persentase progres dokumen proyek secara instan
 * @param {string} id - Project ID
 * @param {number} progress - Persentase progres (0-100)
 * @param {string} status - Status dokumen ('In Progress' | 'Completed')
 * @returns {Promise<Object>} Respon pembaruan
 */
export async function updateProjectProgressInGAS(id, progress, status) {
  try {
    if (!GAS_API_URL || GAS_API_URL.includes("PASANG_WEB_APP_URL")) {
      return { success: true, offline: true };
    }

    const payload = {
      action: 'updateProjectProgress',
      id: id,
      progress: progress,
      status: status
    };

    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (error) {
    console.error(`[GAS Engine Error] Gagal update progress ID ${id}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Menghapus proyek dari database Google Sheets
 * @param {string} id - Project ID
 * @returns {Promise<Object>} Respon penghapusan
 */
export async function deleteProjectFromGAS(id) {
  try {
    if (!GAS_API_URL || GAS_API_URL.includes("PASANG_WEB_APP_URL")) {
      return { success: true, offline: true };
    }

    const payload = {
      action: 'deleteProject',
      id: id
    };

    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (error) {
    console.error(`[GAS Engine Error] Gagal menghapus proyek ID ${id}:`, error);
    throw error;
  }
}
