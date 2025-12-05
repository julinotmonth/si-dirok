/**
 * Home Page
 * Landing page with hero, statistics, features, and CTA sections
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Cigarette,
  Activity,
  Brain,
  Shield,
  Heart,
  Users,
  FileText,
  Stethoscope,
  ChevronRight,
  Play,
  CheckCircle,
  AlertTriangle,
  Wind,
  Zap
} from 'lucide-react'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

const Home = () => {
  const stats = [
    { value: '8 Juta+', label: 'Kematian/Tahun', icon: AlertTriangle, color: 'text-red-400' },
    { value: '90%', label: 'Kanker Paru dari Rokok', icon: Activity, color: 'text-orange-400' },
    { value: '7000+', label: 'Bahan Kimia Berbahaya', icon: Cigarette, color: 'text-yellow-400' },
    { value: '50%', label: 'Risiko Jantung Meningkat', icon: Heart, color: 'text-pink-400' },
  ]

  const features = [
    {
      icon: Brain,
      title: 'Sistem Pakar AI',
      description: 'Menggunakan metode Certainty Factor untuk diagnosis yang akurat berdasarkan gejala yang dialami.'
    },
    {
      icon: Stethoscope,
      title: 'Diagnosis 8 Penyakit',
      description: 'Mendeteksi kanker paru, kanker mulut, stroke, PPOK, serangan jantung, dan penyakit lainnya.'
    },
    {
      icon: FileText,
      title: 'Laporan PDF',
      description: 'Dapatkan laporan hasil diagnosis lengkap dalam format PDF yang bisa Anda simpan atau cetak.'
    },
    {
      icon: Shield,
      title: 'Data Aman',
      description: 'Data kesehatan Anda dijaga kerahasiaannya dengan sistem keamanan yang terpercaya.'
    },
  ]

  const diseases = [
    { name: 'Kanker Paru-paru', icon: Wind, severity: 'critical' },
    { name: 'Kanker Mulut', icon: Activity, severity: 'high' },
    { name: 'Kanker Tenggorokan', icon: Activity, severity: 'high' },
    { name: 'Serangan Jantung', icon: Heart, severity: 'critical' },
    { name: 'PPOK', icon: Wind, severity: 'high' },
    { name: 'Stroke', icon: Brain, severity: 'critical' },
    { name: 'ISPA', icon: Wind, severity: 'moderate' },
    { name: 'Impotensi', icon: Zap, severity: 'moderate' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dark-800/30 rounded-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-6"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                <span className="text-primary-400 text-sm font-medium">
                  Sistem Pakar Diagnosis Kesehatan
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-dark-100">Ketahui </span>
                <span className="gradient-text">Risiko Kesehatan</span>
                <br />
                <span className="text-dark-100">Akibat Rokok</span>
              </h1>

              <p className="text-lg text-dark-300 mb-8 max-w-lg">
                SI-DIROK membantu Anda mendiagnosis penyakit yang berpotensi disebabkan 
                oleh kebiasaan merokok menggunakan teknologi sistem pakar berbasis AI.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Mulai Diagnosis
                  </Button>
                </Link>
                <Link to="/education">
                  <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
                    Pelajari Lebih
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-dark-600 to-dark-700 border-2 border-dark-900 flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-dark-300" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-dark-100 font-semibold">1,000+ Pengguna</p>
                  <p className="text-dark-400 text-sm">Telah melakukan diagnosis</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" />
                <div className="relative glass-card p-8 rounded-3xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-2xl bg-red-500/10 border-red-500/20">
                      <Wind className="w-8 h-8 text-red-400 mb-2" />
                      <p className="text-sm font-medium text-dark-100">Paru-paru</p>
                      <p className="text-xs text-dark-400">Berisiko Tinggi</p>
                    </div>
                    <div className="glass-card p-4 rounded-2xl bg-orange-500/10 border-orange-500/20">
                      <Heart className="w-8 h-8 text-orange-400 mb-2" />
                      <p className="text-sm font-medium text-dark-100">Jantung</p>
                      <p className="text-xs text-dark-400">Perlu Perhatian</p>
                    </div>
                    <div className="glass-card p-4 rounded-2xl bg-yellow-500/10 border-yellow-500/20">
                      <Brain className="w-8 h-8 text-yellow-400 mb-2" />
                      <p className="text-sm font-medium text-dark-100">Otak</p>
                      <p className="text-xs text-dark-400">Risiko Stroke</p>
                    </div>
                    <div className="glass-card p-4 rounded-2xl bg-green-500/10 border-green-500/20">
                      <Shield className="w-8 h-8 text-green-400 mb-2" />
                      <p className="text-sm font-medium text-dark-100">Imunitas</p>
                      <p className="text-xs text-dark-400">Menurun</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-dark-950" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark-100">Diagnosis Cepat</p>
                        <p className="text-sm text-dark-400">Hasil dalam hitungan detik</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-6 text-center hover:border-primary-500/30 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-dark-400 text-sm">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-medium mb-4 block">FITUR UNGGULAN</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
              Diagnosis Akurat dengan Teknologi AI
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Sistem pakar kami menggunakan metode Certainty Factor untuk memberikan 
              hasil diagnosis yang akurat berdasarkan gejala yang Anda alami.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card-hover p-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-100 mb-2">{feature.title}</h3>
                  <p className="text-dark-400 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Diseases Section */}
      <section className="py-20 relative bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-medium mb-4 block">PENYAKIT TERDETEKSI</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
              8 Penyakit Akibat Rokok
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              SI-DIROK dapat mendeteksi berbagai penyakit serius yang disebabkan oleh rokok.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {diseases.map((disease, index) => {
              const Icon = disease.icon
              const severityColors = {
                critical: 'border-red-500/30 bg-red-500/5',
                high: 'border-orange-500/30 bg-orange-500/5',
                moderate: 'border-yellow-500/30 bg-yellow-500/5'
              }
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`p-4 rounded-xl border ${severityColors[disease.severity]} hover:scale-105 transition-all cursor-default`}
                >
                  <Icon className="w-6 h-6 text-primary-400 mb-2" />
                  <p className="font-medium text-dark-100 text-sm">{disease.name}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-medium mb-4 block">CARA KERJA</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
              3 Langkah Mudah
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Isi Data Diri', desc: 'Masukkan informasi dasar seperti usia dan riwayat merokok Anda.' },
              { step: '02', title: 'Pilih Gejala', desc: 'Centang gejala yang Anda alami beserta tingkat keyakinan.' },
              { step: '03', title: 'Dapatkan Hasil', desc: 'Lihat hasil diagnosis dan rekomendasi dari sistem pakar.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-8 h-full">
                  <span className="text-6xl font-bold text-primary-500/20 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-primary-400">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-dark-100 mb-2">{item.title}</h3>
                    <p className="text-dark-400">{item.desc}</p>
                  </div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ChevronRight className="w-8 h-8 text-primary-500/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500/20 via-primary-600/10 to-primary-500/20 border border-primary-500/30 p-12 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
                Siap Memulai Diagnosis?
              </h2>
              <p className="text-dark-300 mb-8 max-w-xl mx-auto">
                Daftar sekarang dan ketahui kondisi kesehatan Anda. Gratis dan cepat!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Daftar Gratis
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sudah Punya Akun
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
