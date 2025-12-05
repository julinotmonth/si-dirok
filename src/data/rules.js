/**
 * Rule Base untuk Sistem Pakar SI-DIROK
 * Menghubungkan gejala dengan penyakit dan nilai kepercayaan
 */

export const rules = [
  // Rules untuk Kanker Paru-paru (P1)
  { id: 'R01', symptomId: 'G01', diseaseId: 'P1', mb: 0.8, md: 0.1, weight: 0.9 },
  { id: 'R02', symptomId: 'G02', diseaseId: 'P1', mb: 0.95, md: 0.02, weight: 1.0 },
  { id: 'R03', symptomId: 'G03', diseaseId: 'P1', mb: 0.85, md: 0.1, weight: 0.95 },
  { id: 'R04', symptomId: 'G06', diseaseId: 'P1', mb: 0.9, md: 0.08, weight: 0.95 },
  { id: 'R05', symptomId: 'G11', diseaseId: 'P1', mb: 0.85, md: 0.1, weight: 0.9 },
  { id: 'R06', symptomId: 'G12', diseaseId: 'P1', mb: 0.7, md: 0.2, weight: 0.75 },
  { id: 'R07', symptomId: 'G13', diseaseId: 'P1', mb: 0.65, md: 0.2, weight: 0.7 },
  { id: 'R08', symptomId: 'G14', diseaseId: 'P1', mb: 0.75, md: 0.15, weight: 0.8 },
  { id: 'R09', symptomId: 'G15', diseaseId: 'P1', mb: 0.65, md: 0.2, weight: 0.7 },

  // Rules untuk Kanker Mulut (P2)
  { id: 'R10', symptomId: 'G08', diseaseId: 'P2', mb: 0.75, md: 0.15, weight: 0.8 },
  { id: 'R11', symptomId: 'G09', diseaseId: 'P2', mb: 0.85, md: 0.1, weight: 0.9 },
  { id: 'R12', symptomId: 'G11', diseaseId: 'P2', mb: 0.8, md: 0.12, weight: 0.85 },
  { id: 'R13', symptomId: 'G15', diseaseId: 'P2', mb: 0.65, md: 0.2, weight: 0.7 },
  { id: 'R14', symptomId: 'G24', diseaseId: 'P2', mb: 0.95, md: 0.03, weight: 1.0 },
  { id: 'R15', symptomId: 'G25', diseaseId: 'P2', mb: 0.9, md: 0.05, weight: 0.95 },
  { id: 'R16', symptomId: 'G27', diseaseId: 'P2', mb: 0.85, md: 0.1, weight: 0.9 },
  { id: 'R17', symptomId: 'G28', diseaseId: 'P2', mb: 0.8, md: 0.12, weight: 0.85 },

  // Rules untuk Kanker Tenggorokan (P3)
  { id: 'R18', symptomId: 'G08', diseaseId: 'P3', mb: 0.8, md: 0.12, weight: 0.85 },
  { id: 'R19', symptomId: 'G09', diseaseId: 'P3', mb: 0.9, md: 0.05, weight: 0.95 },
  { id: 'R20', symptomId: 'G11', diseaseId: 'P3', mb: 0.8, md: 0.12, weight: 0.85 },
  { id: 'R21', symptomId: 'G15', diseaseId: 'P3', mb: 0.65, md: 0.2, weight: 0.7 },
  { id: 'R22', symptomId: 'G26', diseaseId: 'P3', mb: 0.95, md: 0.03, weight: 1.0 },
  { id: 'R23', symptomId: 'G27', diseaseId: 'P3', mb: 0.88, md: 0.08, weight: 0.92 },
  { id: 'R24', symptomId: 'G28', diseaseId: 'P3', mb: 0.82, md: 0.1, weight: 0.87 },

  // Rules untuk Serangan Jantung (P4)
  { id: 'R25', symptomId: 'G03', diseaseId: 'P4', mb: 0.8, md: 0.12, weight: 0.85 },
  { id: 'R26', symptomId: 'G06', diseaseId: 'P4', mb: 0.88, md: 0.08, weight: 0.92 },
  { id: 'R27', symptomId: 'G07', diseaseId: 'P4', mb: 0.98, md: 0.01, weight: 1.0 },
  { id: 'R28', symptomId: 'G12', diseaseId: 'P4', mb: 0.7, md: 0.18, weight: 0.75 },
  { id: 'R29', symptomId: 'G16', diseaseId: 'P4', mb: 0.82, md: 0.1, weight: 0.87 },
  { id: 'R30', symptomId: 'G17', diseaseId: 'P4', mb: 0.75, md: 0.15, weight: 0.8 },
  { id: 'R31', symptomId: 'G18', diseaseId: 'P4', mb: 0.92, md: 0.05, weight: 0.95 },
  { id: 'R32', symptomId: 'G19', diseaseId: 'P4', mb: 0.65, md: 0.22, weight: 0.7 },

  // Rules untuk PPOK (P5)
  { id: 'R33', symptomId: 'G01', diseaseId: 'P5', mb: 0.88, md: 0.08, weight: 0.92 },
  { id: 'R34', symptomId: 'G03', diseaseId: 'P5', mb: 0.95, md: 0.03, weight: 1.0 },
  { id: 'R35', symptomId: 'G04', diseaseId: 'P5', mb: 0.9, md: 0.05, weight: 0.95 },
  { id: 'R36', symptomId: 'G05', diseaseId: 'P5', mb: 0.85, md: 0.1, weight: 0.9 },
  { id: 'R37', symptomId: 'G12', diseaseId: 'P5', mb: 0.7, md: 0.18, weight: 0.75 },
  { id: 'R38', symptomId: 'G17', diseaseId: 'P5', mb: 0.72, md: 0.16, weight: 0.77 },
  { id: 'R39', symptomId: 'G33', diseaseId: 'P5', mb: 0.85, md: 0.1, weight: 0.9 },

  // Rules untuk Stroke (P6)
  { id: 'R40', symptomId: 'G10', diseaseId: 'P6', mb: 0.92, md: 0.05, weight: 0.95 },
  { id: 'R41', symptomId: 'G19', diseaseId: 'P6', mb: 0.6, md: 0.25, weight: 0.65 },
  { id: 'R42', symptomId: 'G20', diseaseId: 'P6', mb: 0.98, md: 0.01, weight: 1.0 },
  { id: 'R43', symptomId: 'G21', diseaseId: 'P6', mb: 0.95, md: 0.03, weight: 0.97 },
  { id: 'R44', symptomId: 'G22', diseaseId: 'P6', mb: 0.88, md: 0.08, weight: 0.92 },
  { id: 'R45', symptomId: 'G23', diseaseId: 'P6', mb: 0.85, md: 0.1, weight: 0.9 },

  // Rules untuk ISPA (P7)
  { id: 'R46', symptomId: 'G01', diseaseId: 'P7', mb: 0.75, md: 0.15, weight: 0.8 },
  { id: 'R47', symptomId: 'G03', diseaseId: 'P7', mb: 0.7, md: 0.18, weight: 0.75 },
  { id: 'R48', symptomId: 'G04', diseaseId: 'P7', mb: 0.72, md: 0.16, weight: 0.77 },
  { id: 'R49', symptomId: 'G05', diseaseId: 'P7', mb: 0.78, md: 0.12, weight: 0.82 },
  { id: 'R50', symptomId: 'G08', diseaseId: 'P7', mb: 0.7, md: 0.18, weight: 0.75 },
  { id: 'R51', symptomId: 'G13', diseaseId: 'P7', mb: 0.65, md: 0.2, weight: 0.7 },
  { id: 'R52', symptomId: 'G32', diseaseId: 'P7', mb: 0.8, md: 0.12, weight: 0.85 },
  { id: 'R53', symptomId: 'G33', diseaseId: 'P7', mb: 0.88, md: 0.08, weight: 0.92 },

  // Rules untuk Impotensi (P8)
  { id: 'R54', symptomId: 'G29', diseaseId: 'P8', mb: 0.95, md: 0.03, weight: 1.0 },
  { id: 'R55', symptomId: 'G30', diseaseId: 'P8', mb: 0.85, md: 0.1, weight: 0.9 },
  { id: 'R56', symptomId: 'G31', diseaseId: 'P8', mb: 0.75, md: 0.15, weight: 0.8 }
]

// Fungsi untuk mendapatkan rules berdasarkan penyakit
export const getRulesByDisease = (diseaseId) => {
  return rules.filter(rule => rule.diseaseId === diseaseId)
}

// Fungsi untuk mendapatkan rules berdasarkan gejala
export const getRulesBySymptom = (symptomId) => {
  return rules.filter(rule => rule.symptomId === symptomId)
}

// Fungsi untuk mendapatkan rule spesifik
export const getRule = (symptomId, diseaseId) => {
  return rules.find(rule => 
    rule.symptomId === symptomId && rule.diseaseId === diseaseId
  )
}

export default rules
