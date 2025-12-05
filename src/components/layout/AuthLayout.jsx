/**
 * AuthLayout Component
 * Layout wrapper for authentication pages
 */

import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cigarette, ArrowLeft } from 'lucide-react'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary-500/10 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-8 shadow-glow-lg"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(245, 158, 11, 0.3)',
                  '0 0 40px rgba(245, 158, 11, 0.5)',
                  '0 0 20px rgba(245, 158, 11, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cigarette className="w-12 h-12 text-dark-950 transform -rotate-45" />
            </motion.div>

            <h1 className="text-4xl font-bold gradient-text mb-4">
              SI-DIROK
            </h1>
            <p className="text-xl text-dark-300 mb-8 max-w-md">
              Sistem Pakar Diagnosis Penyakit yang Disebabkan oleh Rokok
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 text-center"
              >
                <p className="text-3xl font-bold gradient-text">8+</p>
                <p className="text-dark-400 text-sm mt-1">Penyakit Terdeteksi</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 text-center"
              >
                <p className="text-3xl font-bold gradient-text">33+</p>
                <p className="text-dark-400 text-sm mt-1">Gejala Dianalisis</p>
              </motion.div>
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-6 border-l-2 border-primary-500 text-left"
            >
              <p className="text-dark-300 italic">
                "Setiap batang rokok yang tidak Anda hisap adalah hadiah untuk kesehatan Anda."
              </p>
              <footer className="text-dark-500 text-sm mt-2">
                — Tim SI-DIROK
              </footer>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Back to home */}
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Kembali</span>
        </Link>

        {/* Mobile Logo */}
        <div className="absolute top-8 right-8 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Cigarette className="w-5 h-5 text-dark-950 transform -rotate-45" />
            </div>
            <span className="font-bold gradient-text">SI-DIROK</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout
