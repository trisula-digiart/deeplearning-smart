// src/services/gasService.js
import { GAS_API_URL } from "../config/api";

/**
 * Mengambil semua data proyek dari Google Sheets via GAS API
 */
export async function getProjectsFromGAS() {
  try {
    const res = await fetch(`${GAS_API_URL}?action=getProjects`);
    if (!res.ok) throw new Error("Gagal mengambil data dari Google Apps Script");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("GAS Fetch Error:", error);
    return [];
  }
}

/**
 * Menyimpan atau memperbarui data proyek ke Google Sheets via GAS API
 */
export async function saveProjectToGAS(projectData) {
  try {
    const res = await fetch(GAS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "saveProject",
        project: projectData
      })
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("GAS Save Error:", error);
    throw error;
  }
}
