/**
 * Data Gejala (Symptoms) untuk SI-DIROK
 * Total: 33 Gejala
 * 
 * MB = Measure of Belief (Tingkat Kepercayaan)
 * MD = Measure of Disbelief (Tingkat Ketidakpercayaan)
 */

export const symptoms = [
  // Gejala Umum Pernapasan
  {
    id: 'G01',
    code: 'G01',
    name: 'Batuk berkepanjangan lebih dari 3 minggu',
    description: 'Batuk terus menerus yang tidak kunjung sembuh selama lebih dari 3 minggu',
    category: 'respiratory',
    mb: 0.8,
    md: 0.1,
    relatedDiseases: ['P1', 'P5', 'P7']
  },
  {
    id: 'G02',
    code: 'G02',
    name: 'Batuk berdarah (hemoptisis)',
    description: 'Mengeluarkan darah saat batuk, bisa berupa bercak atau dalam jumlah banyak',
    category: 'respiratory',
    mb: 0.9,
    md: 0.05,
    relatedDiseases: ['P1', 'P3']
  },
  {
    id: 'G03',
    code: 'G03',
    name: 'Sesak napas (dispnea)',
    description: 'Kesulitan bernapas atau napas terasa berat bahkan saat beristirahat',
    category: 'respiratory',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P1', 'P4', 'P5', 'P7']
  },
  {
    id: 'G04',
    code: 'G04',
    name: 'Mengi (wheezing)',
    description: 'Suara siulan atau mencicit saat bernapas',
    category: 'respiratory',
    mb: 0.75,
    md: 0.15,
    relatedDiseases: ['P5', 'P7']
  },
  {
    id: 'G05',
    code: 'G05',
    name: 'Produksi dahak berlebihan',
    description: 'Mengeluarkan lendir atau dahak dalam jumlah banyak saat batuk',
    category: 'respiratory',
    mb: 0.7,
    md: 0.15,
    relatedDiseases: ['P5', 'P7']
  },
  
  // Gejala Nyeri
  {
    id: 'G06',
    code: 'G06',
    name: 'Nyeri dada persisten',
    description: 'Rasa sakit atau nyeri di area dada yang terus menerus atau berulang',
    category: 'pain',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P1', 'P4']
  },
  {
    id: 'G07',
    code: 'G07',
    name: 'Nyeri dada yang menjalar ke lengan kiri',
    description: 'Nyeri dada yang menyebar ke lengan kiri, leher, atau rahang',
    category: 'pain',
    mb: 0.95,
    md: 0.02,
    relatedDiseases: ['P4']
  },
  {
    id: 'G08',
    code: 'G08',
    name: 'Sakit tenggorokan kronis',
    description: 'Rasa sakit atau tidak nyaman di tenggorokan yang berlangsung lama',
    category: 'pain',
    mb: 0.8,
    md: 0.1,
    relatedDiseases: ['P2', 'P3', 'P7']
  },
  {
    id: 'G09',
    code: 'G09',
    name: 'Nyeri saat menelan (odinofagia)',
    description: 'Rasa sakit saat menelan makanan atau minuman',
    category: 'pain',
    mb: 0.85,
    md: 0.08,
    relatedDiseases: ['P2', 'P3']
  },
  {
    id: 'G10',
    code: 'G10',
    name: 'Sakit kepala parah secara tiba-tiba',
    description: 'Sakit kepala hebat yang muncul mendadak',
    category: 'pain',
    mb: 0.9,
    md: 0.05,
    relatedDiseases: ['P6']
  },
  
  // Gejala Sistemik
  {
    id: 'G11',
    code: 'G11',
    name: 'Penurunan berat badan drastis tanpa sebab',
    description: 'Kehilangan berat badan signifikan tanpa diet atau olahraga',
    category: 'systemic',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P1', 'P2', 'P3']
  },
  {
    id: 'G12',
    code: 'G12',
    name: 'Kelelahan ekstrem',
    description: 'Rasa lelah yang sangat berat dan tidak hilang dengan istirahat',
    category: 'systemic',
    mb: 0.7,
    md: 0.2,
    relatedDiseases: ['P1', 'P4', 'P5']
  },
  {
    id: 'G13',
    code: 'G13',
    name: 'Demam yang tidak dapat dijelaskan',
    description: 'Suhu tubuh tinggi tanpa penyebab infeksi yang jelas',
    category: 'systemic',
    mb: 0.65,
    md: 0.2,
    relatedDiseases: ['P1', 'P7']
  },
  {
    id: 'G14',
    code: 'G14',
    name: 'Keringat malam berlebihan',
    description: 'Berkeringat sangat banyak saat tidur malam',
    category: 'systemic',
    mb: 0.7,
    md: 0.15,
    relatedDiseases: ['P1']
  },
  {
    id: 'G15',
    code: 'G15',
    name: 'Kehilangan nafsu makan',
    description: 'Tidak merasa lapar atau tidak tertarik untuk makan',
    category: 'systemic',
    mb: 0.65,
    md: 0.2,
    relatedDiseases: ['P1', 'P2', 'P3']
  },
  
  // Gejala Kardiovaskular
  {
    id: 'G16',
    code: 'G16',
    name: 'Jantung berdebar-debar (palpitasi)',
    description: 'Detak jantung terasa cepat, kuat, atau tidak teratur',
    category: 'cardiovascular',
    mb: 0.8,
    md: 0.1,
    relatedDiseases: ['P4']
  },
  {
    id: 'G17',
    code: 'G17',
    name: 'Pembengkakan kaki dan pergelangan',
    description: 'Kaki dan pergelangan kaki membengkak karena penumpukan cairan',
    category: 'cardiovascular',
    mb: 0.75,
    md: 0.15,
    relatedDiseases: ['P4', 'P5']
  },
  {
    id: 'G18',
    code: 'G18',
    name: 'Keringat dingin',
    description: 'Berkeringat dengan sensasi dingin, sering terjadi saat serangan jantung',
    category: 'cardiovascular',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P4']
  },
  {
    id: 'G19',
    code: 'G19',
    name: 'Mual dan muntah',
    description: 'Perasaan mual yang dapat disertai muntah',
    category: 'cardiovascular',
    mb: 0.6,
    md: 0.25,
    relatedDiseases: ['P4', 'P6']
  },
  
  // Gejala Neurologis
  {
    id: 'G20',
    code: 'G20',
    name: 'Kelemahan atau mati rasa pada wajah, lengan, atau kaki',
    description: 'Salah satu sisi tubuh terasa lemah atau mati rasa secara tiba-tiba',
    category: 'neurological',
    mb: 0.95,
    md: 0.02,
    relatedDiseases: ['P6']
  },
  {
    id: 'G21',
    code: 'G21',
    name: 'Kesulitan berbicara atau memahami pembicaraan',
    description: 'Sulit mengucapkan kata-kata atau memahami apa yang dikatakan orang lain',
    category: 'neurological',
    mb: 0.9,
    md: 0.05,
    relatedDiseases: ['P6']
  },
  {
    id: 'G22',
    code: 'G22',
    name: 'Gangguan penglihatan mendadak',
    description: 'Penglihatan kabur atau hilang pada satu atau kedua mata secara tiba-tiba',
    category: 'neurological',
    mb: 0.85,
    md: 0.08,
    relatedDiseases: ['P6']
  },
  {
    id: 'G23',
    code: 'G23',
    name: 'Kehilangan keseimbangan atau koordinasi',
    description: 'Sulit menjaga keseimbangan atau mengkoordinasikan gerakan',
    category: 'neurological',
    mb: 0.8,
    md: 0.1,
    relatedDiseases: ['P6']
  },
  
  // Gejala Mulut dan Tenggorokan
  {
    id: 'G24',
    code: 'G24',
    name: 'Luka di mulut yang tidak sembuh',
    description: 'Sariawan atau luka di mulut yang tidak kunjung sembuh dalam 2 minggu',
    category: 'oral',
    mb: 0.9,
    md: 0.05,
    relatedDiseases: ['P2']
  },
  {
    id: 'G25',
    code: 'G25',
    name: 'Bercak putih atau merah di mulut',
    description: 'Perubahan warna pada gusi, lidah, atau bagian dalam mulut',
    category: 'oral',
    mb: 0.85,
    md: 0.08,
    relatedDiseases: ['P2']
  },
  {
    id: 'G26',
    code: 'G26',
    name: 'Suara serak berkepanjangan',
    description: 'Perubahan suara menjadi serak selama lebih dari 2 minggu',
    category: 'oral',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P3']
  },
  {
    id: 'G27',
    code: 'G27',
    name: 'Kesulitan menelan (disfagia)',
    description: 'Merasa ada hambatan saat menelan makanan atau minuman',
    category: 'oral',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P2', 'P3']
  },
  {
    id: 'G28',
    code: 'G28',
    name: 'Benjolan di leher',
    description: 'Pembengkakan atau benjolan yang teraba di area leher',
    category: 'oral',
    mb: 0.8,
    md: 0.12,
    relatedDiseases: ['P2', 'P3']
  },
  
  // Gejala Reproduksi
  {
    id: 'G29',
    code: 'G29',
    name: 'Disfungsi ereksi',
    description: 'Kesulitan mencapai atau mempertahankan ereksi',
    category: 'reproductive',
    mb: 0.85,
    md: 0.1,
    relatedDiseases: ['P8']
  },
  {
    id: 'G30',
    code: 'G30',
    name: 'Penurunan libido',
    description: 'Berkurangnya minat atau hasrat seksual',
    category: 'reproductive',
    mb: 0.75,
    md: 0.15,
    relatedDiseases: ['P8']
  },
  {
    id: 'G31',
    code: 'G31',
    name: 'Gangguan kesuburan',
    description: 'Kesulitan untuk memiliki keturunan',
    category: 'reproductive',
    mb: 0.7,
    md: 0.2,
    relatedDiseases: ['P8']
  },
  
  // Gejala ISPA
  {
    id: 'G32',
    code: 'G32',
    name: 'Pilek berulang',
    description: 'Hidung berair atau tersumbat yang sering kambuh',
    category: 'respiratory',
    mb: 0.65,
    md: 0.2,
    relatedDiseases: ['P7']
  },
  {
    id: 'G33',
    code: 'G33',
    name: 'Infeksi saluran napas berulang',
    description: 'Sering mengalami infeksi seperti bronkitis atau pneumonia',
    category: 'respiratory',
    mb: 0.8,
    md: 0.1,
    relatedDiseases: ['P5', 'P7']
  }
]

// Kategori gejala untuk filtering
export const symptomCategories = [
  { id: 'all', name: 'Semua Gejala', icon: 'List' },
  { id: 'respiratory', name: 'Pernapasan', icon: 'Wind' },
  { id: 'pain', name: 'Nyeri', icon: 'Zap' },
  { id: 'systemic', name: 'Sistemik', icon: 'Activity' },
  { id: 'cardiovascular', name: 'Kardiovaskular', icon: 'Heart' },
  { id: 'neurological', name: 'Neurologis', icon: 'Brain' },
  { id: 'oral', name: 'Mulut & Tenggorokan', icon: 'MessageCircle' },
  { id: 'reproductive', name: 'Reproduksi', icon: 'Shield' }
]

// Tingkat keyakinan user
export const certaintyLevels = [
  { value: 1.0, label: 'Sangat Yakin', color: 'text-green-500' },
  { value: 0.8, label: 'Yakin', color: 'text-emerald-400' },
  { value: 0.6, label: 'Cukup Yakin', color: 'text-yellow-500' },
  { value: 0.4, label: 'Ragu-ragu', color: 'text-orange-500' },
  { value: 0.2, label: 'Tidak Yakin', color: 'text-red-500' }
]

export default symptoms
