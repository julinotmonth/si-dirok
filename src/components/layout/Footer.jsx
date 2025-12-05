/**
 * Footer Component
 * Main footer for public pages
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Cigarette, 
  Heart, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/about', label: 'Tentang Kami' },
    { to: '/education', label: 'Edukasi' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Kontak' },
  ]

  const resources = [
    { to: '/education', label: 'Artikel Kesehatan' },
    { to: '/education', label: 'Video Edukasi' },
    { to: '/education', label: 'Tips Berhenti Merokok' },
    { to: '/consultation', label: 'Mulai Diagnosis' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="relative bg-dark-950 border-t border-dark-800/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow">
                <Cigarette className="w-6 h-6 text-dark-950 transform -rotate-45" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">SI-DIROK</span>
                <span className="block text-xs text-dark-400">Sistem Pakar Diagnosis</span>
              </div>
            </Link>
            
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              Sistem pakar untuk mendiagnosis penyakit yang disebabkan oleh rokok. 
              Membantu Anda memahami risiko kesehatan dan mengambil langkah pencegahan.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-6">
              Tautan Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-6">
              Sumber Daya
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-6">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@sidirok.com"
                  className="flex items-start gap-3 text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>info@sidirok.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+62211234567"
                  className="flex items-start gap-3 text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+62 21 1234 567</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-dark-400">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20">
              <p className="text-sm text-dark-200 mb-3">
                Mulai diagnosis kesehatan Anda sekarang!
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors"
              >
                Mulai Diagnosis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-dark-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm text-center md:text-left">
              © {currentYear} SI-DIROK. Dibuat dengan{' '}
              <Heart className="w-4 h-4 inline text-red-500 animate-pulse" />{' '}
              untuk kesehatan Indonesia.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-dark-400">
              <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                Kebijakan Privasi
              </Link>
              <span className="text-dark-700">|</span>
              <Link to="/terms" className="hover:text-primary-400 transition-colors">
                Syarat & Ketentuan
              </Link>
              <span className="text-dark-700">|</span>
              <Link to="/disclaimer" className="hover:text-primary-400 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
          
          {/* Disclaimer */}
          <p className="mt-6 text-xs text-dark-500 text-center">
            ⚠️ Hasil diagnosis dari sistem ini bersifat indikatif dan bukan pengganti konsultasi medis profesional. 
            Selalu konsultasikan dengan dokter untuk diagnosis dan penanganan yang tepat.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
