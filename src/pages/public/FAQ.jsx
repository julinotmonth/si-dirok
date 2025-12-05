/**
 * FAQ Page
 * Frequently Asked Questions
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Umum',
      questions: [
        {
          q: 'Apa itu SI-DIROK?',
          a: 'SI-DIROK (Sistem Pakar Diagnosis Penyakit yang Disebabkan oleh Rokok) adalah aplikasi berbasis web yang menggunakan metode Certainty Factor untuk membantu mendiagnosis penyakit yang berpotensi disebabkan oleh kebiasaan merokok.'
        },
        {
          q: 'Apakah hasil diagnosis SI-DIROK akurat?',
          a: 'SI-DIROK menggunakan metode Certainty Factor yang telah teruji untuk memberikan hasil yang akurat. Namun, hasil diagnosis bersifat indikatif dan tidak menggantikan diagnosis dari dokter. Selalu konsultasikan hasil dengan tenaga medis profesional.'
        },
        {
          q: 'Apakah SI-DIROK gratis?',
          a: 'Ya, SI-DIROK dapat digunakan secara gratis. Anda hanya perlu mendaftar untuk dapat melakukan diagnosis.'
        }
      ]
    },
    {
      category: 'Penggunaan',
      questions: [
        {
          q: 'Bagaimana cara melakukan diagnosis?',
          a: '1) Daftar atau masuk ke akun Anda. 2) Klik menu "Konsultasi". 3) Isi data diri dan riwayat merokok. 4) Pilih gejala yang Anda alami beserta tingkat keyakinan. 5) Klik "Proses Diagnosis" untuk melihat hasil.'
        },
        {
          q: 'Apa maksud dari tingkat keyakinan?',
          a: 'Tingkat keyakinan adalah seberapa yakin Anda mengalami gejala tersebut. Pilihan berkisar dari "Sangat Yakin" (1.0) hingga "Tidak Yakin" (0.2). Pilih sesuai dengan kondisi yang Anda rasakan.'
        },
        {
          q: 'Berapa lama waktu yang dibutuhkan untuk diagnosis?',
          a: 'Proses diagnosis hanya membutuhkan waktu beberapa detik setelah Anda mengisi semua data dan gejala.'
        },
        {
          q: 'Bagaimana cara mencetak hasil diagnosis?',
          a: 'Setelah diagnosis selesai, Anda dapat mengklik tombol "Cetak PDF" untuk mengunduh laporan hasil diagnosis dalam format PDF.'
        }
      ]
    },
    {
      category: 'Akun & Privasi',
      questions: [
        {
          q: 'Apakah data saya aman?',
          a: 'Ya, kami menjaga kerahasiaan data Anda. Data kesehatan yang Anda masukkan disimpan dengan aman dan tidak akan dibagikan ke pihak ketiga tanpa izin.'
        },
        {
          q: 'Bagaimana cara menghapus akun saya?',
          a: 'Untuk menghapus akun, silakan hubungi tim support kami melalui halaman Kontak atau email ke support@sidirok.com.'
        },
        {
          q: 'Apakah saya bisa melihat riwayat diagnosis saya?',
          a: 'Ya, semua hasil diagnosis tersimpan di menu "Riwayat" di dashboard Anda. Anda dapat melihat dan mengunduh hasil diagnosis sebelumnya kapan saja.'
        }
      ]
    },
    {
      category: 'Penyakit & Gejala',
      questions: [
        {
          q: 'Penyakit apa saja yang bisa dideteksi?',
          a: 'SI-DIROK dapat mendeteksi 8 penyakit: Kanker Paru-paru, Kanker Mulut, Kanker Tenggorokan, Serangan Jantung, PPOK, Stroke, ISPA, dan Impotensi.'
        },
        {
          q: 'Bagaimana jika gejala saya tidak ada dalam daftar?',
          a: 'Sistem kami mencakup 33 gejala umum yang terkait dengan penyakit akibat rokok. Jika gejala Anda tidak tercantum, pilih gejala yang paling mendekati atau konsultasikan langsung dengan dokter.'
        },
        {
          q: 'Apa yang harus dilakukan jika hasil diagnosis menunjukkan risiko tinggi?',
          a: 'Jika hasil diagnosis menunjukkan risiko tinggi, sangat disarankan untuk segera berkonsultasi dengan dokter atau tenaga medis profesional untuk pemeriksaan lebih lanjut.'
        }
      ]
    },
    {
      category: 'Teknis',
      questions: [
        {
          q: 'Apa itu metode Certainty Factor?',
          a: 'Certainty Factor adalah metode untuk menangani ketidakpastian dalam sistem pakar. Nilai CF berkisar dari -1 hingga 1, di mana 1 berarti pasti dan -1 berarti pasti tidak. Metode ini dikembangkan oleh Shortliffe dan Buchanan.'
        },
        {
          q: 'Browser apa yang didukung?',
          a: 'SI-DIROK mendukung browser modern seperti Google Chrome, Mozilla Firefox, Microsoft Edge, dan Safari versi terbaru.'
        },
        {
          q: 'Apakah bisa diakses dari smartphone?',
          a: 'Ya, SI-DIROK didesain responsif dan dapat diakses dengan nyaman dari smartphone, tablet, maupun komputer.'
        }
      ]
    }
  ]

  // Filter FAQs based on search
  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-100 mb-6">
              Pertanyaan{' '}
              <span className="gradient-text">Umum</span>
            </h1>
            <p className="text-lg text-dark-300 mb-8">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang SI-DIROK.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-12 pr-4 py-3 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-8">
              {filteredFaqs.map((category, catIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h2 className="text-lg font-semibold text-primary-400 mb-4">
                    {category.category}
                  </h2>
                  
                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const index = `${catIndex}-${faqIndex}`
                      const isOpen = openIndex === index
                      
                      return (
                        <div
                          key={index}
                          className="glass-card overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left"
                          >
                            <span className="font-medium text-dark-100 pr-4">
                              {faq.q}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-primary-400 flex-shrink-0" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-6 pb-4 text-dark-300 border-t border-dark-800">
                                  <p className="pt-4 whitespace-pre-line">{faq.a}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-300 mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-dark-400">
                Coba kata kunci pencarian yang berbeda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center glass-card p-12"
          >
            <MessageCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark-100 mb-4">
              Masih Punya Pertanyaan?
            </h2>
            <p className="text-dark-300 mb-6">
              Jika pertanyaan Anda belum terjawab, jangan ragu untuk menghubungi kami.
            </p>
            <Link to="/contact">
              <Button>
                Hubungi Kami
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
