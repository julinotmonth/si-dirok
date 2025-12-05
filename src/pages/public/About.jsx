/**
 * About Page
 * Information about SI-DIROK system
 */

import { motion } from 'framer-motion'
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Lightbulb,
  CheckCircle,
  Cigarette,
  Brain
} from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Akurasi',
      description: 'Menggunakan metode Certainty Factor yang telah teruji untuk hasil diagnosis yang akurat.'
    },
    {
      icon: Heart,
      title: 'Kepedulian',
      description: 'Berkomitmen untuk membantu masyarakat Indonesia lebih peduli terhadap bahaya rokok.'
    },
    {
      icon: Users,
      title: 'Aksesibilitas',
      description: 'Memberikan akses diagnosis kesehatan yang mudah dan gratis untuk semua orang.'
    },
    {
      icon: Lightbulb,
      title: 'Edukasi',
      description: 'Menyediakan informasi dan edukasi lengkap tentang bahaya rokok.'
    }
  ]

  const team = [
    { name: 'Dr. Siti Rahayu', role: 'Medical Advisor', image: null },
    { name: 'Ahmad Rizki, S.Kom', role: 'Lead Developer', image: null },
    { name: 'Maya Indah, M.Kom', role: 'AI Specialist', image: null },
    { name: 'Budi Santoso', role: 'UI/UX Designer', image: null }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary-400 font-medium mb-4 block">TENTANG KAMI</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-100 mb-6">
              Membantu Indonesia{' '}
              <span className="gradient-text">Bebas Rokok</span>
            </h1>
            <p className="text-lg text-dark-300">
              SI-DIROK adalah sistem pakar berbasis web yang dirancang untuk membantu 
              masyarakat Indonesia mendiagnosis penyakit yang berpotensi disebabkan 
              oleh kebiasaan merokok.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-dark-100 mb-4">Visi</h2>
              <p className="text-dark-300 leading-relaxed">
                Menjadi platform sistem pakar kesehatan terdepan di Indonesia yang membantu 
                masyarakat memahami dan mencegah penyakit akibat rokok, serta mendorong 
                gaya hidup sehat bebas asap rokok.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-dark-100 mb-4">Misi</h2>
              <ul className="space-y-3 text-dark-300">
                {[
                  'Memberikan akses diagnosis kesehatan yang mudah dan akurat',
                  'Meningkatkan kesadaran masyarakat tentang bahaya rokok',
                  'Menyediakan edukasi kesehatan berkualitas',
                  'Mendorong perokok untuk berhenti merokok'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Expert System */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-primary-400 font-medium mb-4 block">TEKNOLOGI</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
              Sistem Pakar Certainty Factor
            </h2>
            <p className="text-dark-400">
              SI-DIROK menggunakan metode Certainty Factor yang dikembangkan oleh 
              Shortliffe dan Buchanan untuk menangani ketidakpastian dalam diagnosis medis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <Brain className="w-12 h-12 text-primary-400 mb-6" />
                <h3 className="text-xl font-bold text-dark-100 mb-4">Cara Kerja Sistem</h3>
                <div className="space-y-4 text-dark-300">
                  <p>
                    Metode Certainty Factor (CF) adalah pendekatan untuk mengakomodasi 
                    ketidakpastian pemikiran seorang pakar. Nilai CF berkisar dari -1 
                    (pasti tidak) hingga 1 (pasti ya).
                  </p>
                  <div className="bg-dark-800/50 rounded-xl p-4 font-mono text-sm">
                    <p className="text-primary-400">CF = MB - MD</p>
                    <p className="text-dark-400 mt-2 text-xs">
                      MB = Measure of Belief (Tingkat Kepercayaan)<br />
                      MD = Measure of Disbelief (Tingkat Ketidakpercayaan)
                    </p>
                  </div>
                  <p>
                    Sistem mengkombinasikan CF dari berbagai gejala untuk menghitung 
                    kemungkinan penyakit secara keseluruhan.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { label: 'Sangat Yakin', value: '1.0', color: 'bg-green-500' },
                { label: 'Yakin', value: '0.8', color: 'bg-emerald-500' },
                { label: 'Cukup Yakin', value: '0.6', color: 'bg-yellow-500' },
                { label: 'Ragu-ragu', value: '0.4', color: 'bg-orange-500' },
                { label: 'Tidak Yakin', value: '0.2', color: 'bg-red-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-dark-300 flex-1">{item.label}</span>
                  <span className="font-mono text-primary-400">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-medium mb-4 block">NILAI KAMI</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100">
              Apa yang Kami Yakini
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card-hover p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-100 mb-2">{value.title}</h3>
                  <p className="text-dark-400 text-sm">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-medium mb-4 block">TIM KAMI</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-100">
              Orang-orang di Balik SI-DIROK
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-dark-950" />
                </div>
                <h3 className="font-semibold text-dark-100">{member.name}</h3>
                <p className="text-primary-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '8', label: 'Penyakit Terdeteksi' },
              { value: '33', label: 'Gejala Dianalisis' },
              { value: '56', label: 'Rule Base' },
              { value: '1000+', label: 'Pengguna' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-dark-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
