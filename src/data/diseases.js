/**
 * Data Penyakit (Diseases) untuk SI-DIROK
 * Total: 8 Penyakit yang disebabkan oleh rokok
 */

export const diseases = [
  {
    id: 'P1',
    code: 'P1',
    name: 'Kanker Paru-paru',
    description: 'Kanker paru-paru adalah pertumbuhan sel abnormal yang tidak terkendali di dalam paru-paru. Merokok adalah penyebab utama kanker paru-paru, bertanggung jawab atas sekitar 85% kasus.',
    symptoms: ['G01', 'G02', 'G03', 'G06', 'G11', 'G12', 'G13', 'G14', 'G15'],
    mainSymptoms: ['G02', 'G01', 'G06'],
    probability: 0.85,
    severity: 'critical',
    prevention: [
      'Berhenti merokok adalah langkah paling efektif',
      'Hindari paparan asap rokok (perokok pasif)',
      'Hindari karsinogen di tempat kerja',
      'Konsumsi makanan kaya buah dan sayuran',
      'Lakukan pemeriksaan rutin terutama jika berisiko tinggi'
    ],
    treatment: [
      'Pembedahan untuk mengangkat tumor',
      'Kemoterapi',
      'Radioterapi',
      'Imunoterapi',
      'Terapi target molekuler'
    ],
    statistics: {
      mortalityRate: '80-85%',
      survivalRate5Year: '15-20%',
      riskIncrease: '15-30x lebih tinggi pada perokok'
    },
    image: '/images/lung-cancer.jpg'
  },
  {
    id: 'P2',
    code: 'P2',
    name: 'Kanker Mulut',
    description: 'Kanker mulut adalah kanker yang berkembang di jaringan mulut atau tenggorokan. Penggunaan tembakau (rokok, cerutu, tembakau kunyah) adalah faktor risiko utama.',
    symptoms: ['G08', 'G09', 'G11', 'G15', 'G24', 'G25', 'G27', 'G28'],
    mainSymptoms: ['G24', 'G25', 'G27'],
    probability: 0.75,
    severity: 'high',
    prevention: [
      'Berhenti menggunakan semua produk tembakau',
      'Batasi konsumsi alkohol',
      'Lindungi bibir dari sinar matahari berlebih',
      'Pemeriksaan gigi rutin',
      'Konsumsi diet seimbang dengan banyak sayuran'
    ],
    treatment: [
      'Pembedahan untuk mengangkat tumor',
      'Radioterapi',
      'Kemoterapi',
      'Terapi obat target',
      'Rehabilitasi untuk berbicara dan menelan'
    ],
    statistics: {
      mortalityRate: '40-50%',
      survivalRate5Year: '50-60%',
      riskIncrease: '6x lebih tinggi pada perokok'
    },
    image: '/images/oral-cancer.jpg'
  },
  {
    id: 'P3',
    code: 'P3',
    name: 'Kanker Tenggorokan',
    description: 'Kanker tenggorokan (kanker faring/laring) adalah tumor ganas yang berkembang di tenggorokan, kotak suara, atau amandel. Merokok dan alkohol adalah faktor risiko utama.',
    symptoms: ['G08', 'G09', 'G11', 'G15', 'G26', 'G27', 'G28'],
    mainSymptoms: ['G26', 'G09', 'G28'],
    probability: 0.7,
    severity: 'high',
    prevention: [
      'Berhenti merokok',
      'Hindari alkohol berlebihan',
      'Konsumsi makanan kaya antioksidan',
      'Vaksinasi HPV',
      'Pemeriksaan THT rutin'
    ],
    treatment: [
      'Pembedahan',
      'Radioterapi',
      'Kemoterapi',
      'Kombinasi radio-kemoterapi',
      'Terapi rehabilitasi suara'
    ],
    statistics: {
      mortalityRate: '35-45%',
      survivalRate5Year: '55-65%',
      riskIncrease: '10-15x lebih tinggi pada perokok'
    },
    image: '/images/throat-cancer.jpg'
  },
  {
    id: 'P4',
    code: 'P4',
    name: 'Serangan Jantung',
    description: 'Serangan jantung (infark miokard) terjadi ketika aliran darah ke jantung tersumbat. Merokok merusak pembuluh darah dan meningkatkan risiko penyakit jantung secara signifikan.',
    symptoms: ['G03', 'G06', 'G07', 'G12', 'G16', 'G17', 'G18', 'G19'],
    mainSymptoms: ['G07', 'G06', 'G18'],
    probability: 0.8,
    severity: 'critical',
    prevention: [
      'Berhenti merokok - risiko menurun dalam 1 tahun',
      'Olahraga teratur minimal 30 menit/hari',
      'Jaga berat badan ideal',
      'Kontrol tekanan darah dan kolesterol',
      'Kelola stres dengan baik'
    ],
    treatment: [
      'PCI (Percutaneous Coronary Intervention)',
      'Operasi bypass jantung',
      'Obat pengencer darah',
      'Obat penurun kolesterol',
      'Rehabilitasi jantung'
    ],
    statistics: {
      mortalityRate: '25-30%',
      survivalRate5Year: '70-75%',
      riskIncrease: '2-4x lebih tinggi pada perokok'
    },
    image: '/images/heart-attack.jpg'
  },
  {
    id: 'P5',
    code: 'P5',
    name: 'PPOK (Penyakit Paru Obstruktif Kronik)',
    description: 'PPOK adalah penyakit paru-paru kronis yang menyebabkan kesulitan bernapas. Merokok adalah penyebab utama PPOK, bertanggung jawab atas 80-90% kasus.',
    symptoms: ['G01', 'G03', 'G04', 'G05', 'G12', 'G17', 'G33'],
    mainSymptoms: ['G03', 'G04', 'G01'],
    probability: 0.85,
    severity: 'high',
    prevention: [
      'Berhenti merokok adalah pencegahan utama',
      'Hindari polusi udara dan iritan',
      'Vaksinasi flu dan pneumonia',
      'Olahraga pernapasan rutin',
      'Deteksi dini dengan spirometri'
    ],
    treatment: [
      'Bronkodilator',
      'Kortikosteroid inhalasi',
      'Terapi oksigen',
      'Rehabilitasi paru',
      'Pembedahan (kasus berat)'
    ],
    statistics: {
      mortalityRate: 'Penyebab kematian ke-3 di dunia',
      survivalRate5Year: 'Bervariasi tergantung stadium',
      riskIncrease: '10-13x lebih tinggi pada perokok'
    },
    image: '/images/copd.jpg'
  },
  {
    id: 'P6',
    code: 'P6',
    name: 'Stroke',
    description: 'Stroke terjadi ketika suplai darah ke otak terganggu. Merokok meningkatkan risiko stroke dengan merusak pembuluh darah dan meningkatkan tekanan darah.',
    symptoms: ['G10', 'G19', 'G20', 'G21', 'G22', 'G23'],
    mainSymptoms: ['G20', 'G21', 'G10'],
    probability: 0.75,
    severity: 'critical',
    prevention: [
      'Berhenti merokok',
      'Kontrol tekanan darah',
      'Kontrol diabetes',
      'Jaga berat badan sehat',
      'Olahraga teratur'
    ],
    treatment: [
      'tPA (tissue plasminogen activator) untuk stroke iskemik',
      'Trombektomi mekanik',
      'Obat anti-platelet',
      'Rehabilitasi neurologis',
      'Terapi wicara dan fisik'
    ],
    statistics: {
      mortalityRate: '20-30%',
      survivalRate5Year: '50-70%',
      riskIncrease: '2-4x lebih tinggi pada perokok'
    },
    image: '/images/stroke.jpg'
  },
  {
    id: 'P7',
    code: 'P7',
    name: 'ISPA (Infeksi Saluran Pernapasan Akut)',
    description: 'ISPA adalah infeksi yang menyerang saluran pernapasan. Perokok lebih rentan terhadap infeksi karena sistem kekebalan yang melemah dan kerusakan pada saluran napas.',
    symptoms: ['G01', 'G03', 'G04', 'G05', 'G08', 'G13', 'G32', 'G33'],
    mainSymptoms: ['G33', 'G01', 'G32'],
    probability: 0.6,
    severity: 'moderate',
    prevention: [
      'Berhenti merokok untuk memperkuat sistem imun',
      'Cuci tangan secara teratur',
      'Hindari kontak dengan orang sakit',
      'Jaga kebersihan lingkungan',
      'Vaksinasi flu tahunan'
    ],
    treatment: [
      'Istirahat yang cukup',
      'Banyak minum cairan',
      'Obat pereda gejala',
      'Antibiotik (jika infeksi bakteri)',
      'Inhalasi uap'
    ],
    statistics: {
      mortalityRate: 'Rendah untuk kasus ringan',
      survivalRate5Year: 'Sangat tinggi',
      riskIncrease: '2-3x lebih tinggi pada perokok'
    },
    image: '/images/ispa.jpg'
  },
  {
    id: 'P8',
    code: 'P8',
    name: 'Impotensi (Disfungsi Ereksi)',
    description: 'Disfungsi ereksi adalah ketidakmampuan untuk mencapai atau mempertahankan ereksi. Merokok merusak pembuluh darah yang mengalirkan darah ke penis.',
    symptoms: ['G29', 'G30', 'G31'],
    mainSymptoms: ['G29', 'G30'],
    probability: 0.7,
    severity: 'moderate',
    prevention: [
      'Berhenti merokok',
      'Batasi konsumsi alkohol',
      'Olahraga teratur',
      'Jaga berat badan ideal',
      'Kelola stres'
    ],
    treatment: [
      'Obat oral (PDE5 inhibitor)',
      'Terapi hormon',
      'Alat vakum',
      'Implant penis',
      'Konseling psikologis'
    ],
    statistics: {
      mortalityRate: 'Tidak mengancam jiwa',
      survivalRate5Year: 'Tidak berlaku',
      riskIncrease: '50% lebih tinggi pada perokok'
    },
    image: '/images/impotence.jpg'
  }
]

// Tingkat keparahan
export const severityLevels = {
  critical: { label: 'Kritis', color: 'red', priority: 1 },
  high: { label: 'Tinggi', color: 'orange', priority: 2 },
  moderate: { label: 'Sedang', color: 'yellow', priority: 3 },
  low: { label: 'Rendah', color: 'green', priority: 4 }
}

export default diseases
