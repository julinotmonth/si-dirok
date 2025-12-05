/**
 * Data Edukasi untuk SI-DIROK
 * Berisi artikel, video, dan tips kesehatan
 */

export const educationContent = [
  {
    id: 'E01',
    type: 'article',
    title: 'Bahaya Merokok bagi Kesehatan Paru-paru',
    slug: 'bahaya-merokok-paru-paru',
    excerpt: 'Rokok mengandung lebih dari 7000 bahan kimia berbahaya yang dapat merusak paru-paru secara permanen.',
    content: `
      <h2>Dampak Rokok pada Paru-paru</h2>
      <p>Rokok mengandung lebih dari 7000 bahan kimia, dan setidaknya 70 di antaranya diketahui menyebabkan kanker. Ketika Anda menghirup asap rokok, bahan-bahan kimia ini langsung masuk ke paru-paru dan mulai menyebabkan kerusakan.</p>
      
      <h3>Kerusakan yang Terjadi</h3>
      <ul>
        <li><strong>Peradangan kronis:</strong> Asap rokok menyebabkan peradangan pada saluran napas</li>
        <li><strong>Kerusakan silia:</strong> Rambut halus pembersih paru-paru rusak</li>
        <li><strong>Penumpukan tar:</strong> Tar menempel dan menumpuk di paru-paru</li>
        <li><strong>Emfisema:</strong> Kantung udara di paru-paru rusak secara permanen</li>
      </ul>
      
      <h3>Statistik Mengkhawatirkan</h3>
      <p>90% kasus kanker paru-paru disebabkan oleh merokok. Perokok memiliki risiko 15-30 kali lebih tinggi terkena kanker paru-paru dibandingkan non-perokok.</p>
      
      <h3>Kabar Baiknya</h3>
      <p>Berhenti merokok dapat mengurangi risiko ini secara signifikan. Dalam 10-15 tahun setelah berhenti, risiko kanker paru-paru turun hingga setengah dari risiko perokok aktif.</p>
    `,
    category: 'respiratory',
    tags: ['paru-paru', 'kanker', 'bahaya rokok'],
    author: 'Dr. Siti Rahayu',
    publishedAt: '2024-01-15',
    readTime: 5,
    views: 12453,
    image: '/images/articles/lung-damage.jpg',
    featured: true
  },
  {
    id: 'E02',
    type: 'article',
    title: 'Rokok dan Penyakit Jantung: Hubungan yang Mematikan',
    slug: 'rokok-penyakit-jantung',
    excerpt: 'Merokok merusak pembuluh darah dan meningkatkan risiko serangan jantung hingga 4 kali lipat.',
    content: `
      <h2>Bagaimana Rokok Merusak Jantung</h2>
      <p>Rokok tidak hanya merusak paru-paru, tetapi juga memiliki dampak yang sangat berbahaya bagi sistem kardiovaskular Anda.</p>
      
      <h3>Mekanisme Kerusakan</h3>
      <ol>
        <li><strong>Aterosklerosis:</strong> Plak menumpuk di arteri</li>
        <li><strong>Tekanan darah tinggi:</strong> Nikotin meningkatkan tekanan darah</li>
        <li><strong>Pembekuan darah:</strong> Darah menjadi lebih kental dan mudah menggumpal</li>
        <li><strong>Oksigen berkurang:</strong> Karbon monoksida menggantikan oksigen dalam darah</li>
      </ol>
      
      <h3>Fakta Penting</h3>
      <p>Perokok memiliki risiko 2-4 kali lebih tinggi mengalami serangan jantung. Bahkan perokok ringan (1-4 batang/hari) tetap memiliki risiko yang meningkat.</p>
      
      <h3>Pemulihan Setelah Berhenti</h3>
      <p>Hanya dalam 1 tahun setelah berhenti merokok, risiko penyakit jantung turun hingga setengahnya!</p>
    `,
    category: 'cardiovascular',
    tags: ['jantung', 'serangan jantung', 'pembuluh darah'],
    author: 'Dr. Ahmad Rizki',
    publishedAt: '2024-01-20',
    readTime: 6,
    views: 9872,
    image: '/images/articles/heart-disease.jpg',
    featured: true
  },
  {
    id: 'E03',
    type: 'article',
    title: 'PPOK: Penyakit Paru yang Mengintai Perokok',
    slug: 'ppok-perokok',
    excerpt: 'PPOK adalah penyakit kronis yang tidak dapat disembuhkan dan 80-90% kasusnya disebabkan oleh merokok.',
    content: `
      <h2>Mengenal PPOK</h2>
      <p>Penyakit Paru Obstruktif Kronik (PPOK) adalah kondisi serius yang menyebabkan kesulitan bernapas dan memburuk seiring waktu.</p>
      
      <h3>Gejala PPOK</h3>
      <ul>
        <li>Sesak napas yang semakin parah</li>
        <li>Batuk kronis dengan dahak</li>
        <li>Mengi saat bernapas</li>
        <li>Infeksi paru berulang</li>
        <li>Kelelahan ekstrem</li>
      </ul>
      
      <h3>Mengapa PPOK Berbahaya</h3>
      <p>PPOK adalah penyebab kematian ke-3 di dunia. Kerusakan paru-paru akibat PPOK bersifat permanen dan tidak dapat diperbaiki.</p>
      
      <h3>Pencegahan</h3>
      <p>Cara terbaik mencegah PPOK adalah dengan tidak merokok atau berhenti merokok sesegera mungkin.</p>
    `,
    category: 'respiratory',
    tags: ['PPOK', 'paru-paru', 'kronis'],
    author: 'Dr. Maya Indah',
    publishedAt: '2024-02-01',
    readTime: 7,
    views: 7654,
    image: '/images/articles/copd.jpg',
    featured: false
  },
  {
    id: 'E04',
    type: 'video',
    title: 'Cara Efektif Berhenti Merokok',
    slug: 'cara-berhenti-merokok',
    excerpt: 'Panduan lengkap dan tips praktis untuk membantu Anda berhenti merokok.',
    videoUrl: 'https://www.youtube.com/embed/example1',
    duration: '12:45',
    category: 'tips',
    tags: ['berhenti merokok', 'tips', 'kesehatan'],
    author: 'Tim SI-DIROK',
    publishedAt: '2024-02-10',
    views: 15678,
    image: '/images/videos/quit-smoking.jpg',
    featured: true
  },
  {
    id: 'E05',
    type: 'article',
    title: 'Dampak Rokok pada Kesehatan Mulut',
    slug: 'rokok-kesehatan-mulut',
    excerpt: 'Dari gigi kuning hingga kanker mulut, rokok memiliki dampak serius pada kesehatan rongga mulut.',
    content: `
      <h2>Rokok dan Kesehatan Mulut</h2>
      <p>Mulut adalah pintu masuk pertama asap rokok, sehingga menerima paparan langsung bahan-bahan berbahaya.</p>
      
      <h3>Dampak pada Mulut</h3>
      <ul>
        <li><strong>Gigi kuning dan noda:</strong> Tar dan nikotin menodai gigi</li>
        <li><strong>Bau mulut:</strong> Rokok menyebabkan bau mulut kronis</li>
        <li><strong>Penyakit gusi:</strong> Risiko periodontitis meningkat</li>
        <li><strong>Kanker mulut:</strong> Risiko 6x lebih tinggi</li>
        <li><strong>Gigi tanggal:</strong> Perokok kehilangan gigi lebih cepat</li>
      </ul>
      
      <h3>Tanda-tanda Peringatan Kanker Mulut</h3>
      <p>Waspadai luka yang tidak sembuh, bercak putih/merah, benjolan, atau kesulitan menelan.</p>
    `,
    category: 'oral',
    tags: ['mulut', 'gigi', 'kanker mulut'],
    author: 'drg. Putri Wulandari',
    publishedAt: '2024-02-15',
    readTime: 5,
    views: 6234,
    image: '/images/articles/oral-health.jpg',
    featured: false
  },
  {
    id: 'E06',
    type: 'article',
    title: 'Rokok dan Stroke: Ancaman Serius bagi Otak',
    slug: 'rokok-stroke',
    excerpt: 'Perokok memiliki risiko 2-4 kali lebih tinggi mengalami stroke dibandingkan non-perokok.',
    content: `
      <h2>Hubungan Rokok dan Stroke</h2>
      <p>Stroke terjadi ketika suplai darah ke otak terganggu. Merokok secara signifikan meningkatkan risiko kondisi mematikan ini.</p>
      
      <h3>Mengapa Rokok Menyebabkan Stroke</h3>
      <ul>
        <li>Merusak dinding pembuluh darah</li>
        <li>Meningkatkan tekanan darah</li>
        <li>Membuat darah lebih mudah menggumpal</li>
        <li>Mempercepat pembentukan plak di arteri</li>
      </ul>
      
      <h3>Kenali Tanda Stroke (FAST)</h3>
      <ul>
        <li><strong>F</strong>ace: Wajah turun di satu sisi</li>
        <li><strong>A</strong>rms: Lengan lemah</li>
        <li><strong>S</strong>peech: Bicara pelo</li>
        <li><strong>T</strong>ime: Segera cari pertolongan</li>
      </ul>
    `,
    category: 'neurological',
    tags: ['stroke', 'otak', 'pembuluh darah'],
    author: 'Dr. Budi Santoso',
    publishedAt: '2024-02-20',
    readTime: 6,
    views: 5432,
    image: '/images/articles/stroke.jpg',
    featured: false
  },
  {
    id: 'E07',
    type: 'video',
    title: 'Proses Pemulihan Tubuh Setelah Berhenti Merokok',
    slug: 'pemulihan-setelah-berhenti-merokok',
    excerpt: 'Lihat bagaimana tubuh Anda pulih dari menit pertama hingga tahun-tahun setelah berhenti merokok.',
    videoUrl: 'https://www.youtube.com/embed/example2',
    duration: '08:30',
    category: 'recovery',
    tags: ['pemulihan', 'berhenti merokok', 'timeline'],
    author: 'Tim SI-DIROK',
    publishedAt: '2024-02-25',
    views: 18934,
    image: '/images/videos/recovery-timeline.jpg',
    featured: true
  },
  {
    id: 'E08',
    type: 'article',
    title: 'Dampak Rokok pada Kesuburan Pria',
    slug: 'rokok-kesuburan-pria',
    excerpt: 'Merokok dapat menyebabkan disfungsi ereksi dan mengurangi kualitas sperma secara signifikan.',
    content: `
      <h2>Rokok dan Kesehatan Reproduksi Pria</h2>
      <p>Merokok memiliki dampak serius pada kesehatan seksual dan kesuburan pria yang sering diabaikan.</p>
      
      <h3>Dampak pada Fungsi Seksual</h3>
      <ul>
        <li><strong>Disfungsi ereksi:</strong> 50% lebih tinggi pada perokok</li>
        <li><strong>Penurunan libido:</strong> Hasrat seksual berkurang</li>
        <li><strong>Kualitas sperma:</strong> Jumlah dan kualitas sperma menurun</li>
      </ul>
      
      <h3>Mengapa Ini Terjadi</h3>
      <p>Rokok merusak pembuluh darah yang mengalirkan darah ke penis dan mengganggu produksi hormon testosteron.</p>
      
      <h3>Kabar Baik</h3>
      <p>Fungsi seksual dapat membaik setelah berhenti merokok. Semakin cepat berhenti, semakin baik hasilnya.</p>
    `,
    category: 'reproductive',
    tags: ['impotensi', 'kesuburan', 'pria'],
    author: 'Dr. Hendri Wijaya, Sp.And',
    publishedAt: '2024-03-01',
    readTime: 5,
    views: 8765,
    image: '/images/articles/male-fertility.jpg',
    featured: false
  },
  {
    id: 'E09',
    type: 'tips',
    title: '10 Tips Mengatasi Keinginan Merokok',
    slug: 'tips-mengatasi-keinginan-merokok',
    excerpt: 'Strategi praktis untuk mengatasi craving dan tetap konsisten dalam perjalanan berhenti merokok.',
    content: `
      <h2>Strategi Mengatasi Craving</h2>
      
      <h3>1. Tunda 10 Menit</h3>
      <p>Ketika keinginan muncul, tunggu 10 menit. Biasanya craving akan mereda.</p>
      
      <h3>2. Minum Air Putih</h3>
      <p>Minum air dapat membantu mengurangi keinginan dan membersihkan toksin.</p>
      
      <h3>3. Aktivitas Fisik</h3>
      <p>Jalan cepat atau olahraga ringan dapat mengalihkan perhatian.</p>
      
      <h3>4. Permen atau Makanan Ringan</h3>
      <p>Gunakan permen bebas gula atau wortel untuk menjaga mulut sibuk.</p>
      
      <h3>5. Teknik Pernapasan</h3>
      <p>Tarik napas dalam-dalam untuk menenangkan diri.</p>
      
      <h3>6. Hindari Pemicu</h3>
      <p>Kenali dan hindari situasi yang memicu keinginan merokok.</p>
      
      <h3>7. Dukungan Sosial</h3>
      <p>Hubungi teman atau keluarga saat keinginan muncul.</p>
      
      <h3>8. Aplikasi Pendukung</h3>
      <p>Gunakan aplikasi tracker untuk memantau progres.</p>
      
      <h3>9. Pengganti Nikotin</h3>
      <p>Pertimbangkan patch atau permen nikotin.</p>
      
      <h3>10. Visualisasi</h3>
      <p>Bayangkan hidup sehat tanpa rokok.</p>
    `,
    category: 'tips',
    tags: ['tips', 'craving', 'berhenti merokok'],
    author: 'Tim SI-DIROK',
    publishedAt: '2024-03-05',
    readTime: 4,
    views: 21345,
    image: '/images/articles/quit-tips.jpg',
    featured: true
  },
  {
    id: 'E10',
    type: 'article',
    title: 'Perokok Pasif: Bahaya Asap Rokok bagi Non-Perokok',
    slug: 'bahaya-perokok-pasif',
    excerpt: 'Asap rokok tidak hanya berbahaya bagi perokok, tetapi juga bagi orang-orang di sekitarnya.',
    content: `
      <h2>Apa itu Perokok Pasif?</h2>
      <p>Perokok pasif adalah orang yang menghirup asap rokok dari perokok lain. Asap ini sama berbahayanya dengan asap yang dihirup perokok aktif.</p>
      
      <h3>Dampak pada Kesehatan</h3>
      <ul>
        <li>Risiko kanker paru-paru meningkat 20-30%</li>
        <li>Risiko penyakit jantung meningkat 25-30%</li>
        <li>Masalah pernapasan pada anak-anak</li>
        <li>SIDS (Sudden Infant Death Syndrome)</li>
      </ul>
      
      <h3>Melindungi Keluarga</h3>
      <p>Jika Anda merokok, lindungi keluarga dengan tidak merokok di dalam rumah atau mobil.</p>
    `,
    category: 'general',
    tags: ['perokok pasif', 'keluarga', 'anak-anak'],
    author: 'Dr. Linda Kusuma',
    publishedAt: '2024-03-10',
    readTime: 5,
    views: 11234,
    image: '/images/articles/passive-smoking.jpg',
    featured: false
  }
]

// Kategori edukasi
export const educationCategories = [
  { id: 'all', name: 'Semua', icon: 'LayoutGrid' },
  { id: 'respiratory', name: 'Pernapasan', icon: 'Wind' },
  { id: 'cardiovascular', name: 'Jantung', icon: 'Heart' },
  { id: 'oral', name: 'Mulut', icon: 'MessageCircle' },
  { id: 'neurological', name: 'Neurologis', icon: 'Brain' },
  { id: 'reproductive', name: 'Reproduksi', icon: 'Shield' },
  { id: 'tips', name: 'Tips', icon: 'Lightbulb' },
  { id: 'recovery', name: 'Pemulihan', icon: 'TrendingUp' },
  { id: 'general', name: 'Umum', icon: 'Info' }
]

// Tipe konten
export const contentTypes = [
  { id: 'all', name: 'Semua Konten' },
  { id: 'article', name: 'Artikel' },
  { id: 'video', name: 'Video' },
  { id: 'tips', name: 'Tips' }
]

export default educationContent
