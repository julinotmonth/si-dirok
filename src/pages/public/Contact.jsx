/**
 * Contact Page
 * Contact form and information
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  subject: z.string().min(5, 'Subjek minimal 5 karakter'),
  message: z.string().min(20, 'Pesan minimal 20 karakter')
})

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
    reset()
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@sidirok.com',
      link: 'mailto:info@sidirok.com'
    },
    {
      icon: Phone,
      title: 'Telepon',
      value: '+62 21 1234 5678',
      link: 'tel:+622112345678'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: 'Jakarta, Indonesia',
      link: null
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      value: 'Sen - Jum, 09:00 - 17:00 WIB',
      link: null
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-primary-400 font-medium mb-4 block">KONTAK</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-100 mb-6">
              Hubungi{' '}
              <span className="gradient-text">Kami</span>
            </h1>
            <p className="text-lg text-dark-300">
              Ada pertanyaan atau masukan? Kami siap membantu Anda. Silakan hubungi 
              kami melalui form di bawah atau kontak langsung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-dark-100 mb-6">
                Informasi Kontak
              </h2>

              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const Content = (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-dark-400 text-sm">{info.title}</p>
                      <p className="text-dark-100 font-medium">{info.value}</p>
                    </div>
                  </div>
                )

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4"
                  >
                    {info.link ? (
                      <a href={info.link} className="hover:opacity-80 transition-opacity">
                        {Content}
                      </a>
                    ) : (
                      Content
                    )}
                  </motion.div>
                )
              })}

              {/* Social Links */}
              <div className="pt-6">
                <p className="text-dark-400 text-sm mb-4">Ikuti Kami</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-dark-800/50 border border-dark-700/50 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/50 transition-all"
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
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-primary-400" />
                  <h2 className="text-2xl font-bold text-dark-100">
                    Kirim Pesan
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Nama Lengkap"
                      placeholder="Masukkan nama Anda"
                      error={errors.name?.message}
                      required
                      {...register('name')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="nama@email.com"
                      error={errors.email?.message}
                      required
                      {...register('email')}
                    />
                  </div>

                  <Input
                    label="Subjek"
                    placeholder="Apa yang ingin Anda tanyakan?"
                    error={errors.subject?.message}
                    required
                    {...register('subject')}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-dark-200">
                      Pesan <span className="text-primary-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tulis pesan Anda di sini..."
                      className={`
                        w-full bg-dark-800/50 border rounded-xl px-4 py-3
                        text-dark-100 placeholder-dark-400 transition-all duration-300
                        focus:outline-none focus:ring-2 resize-none
                        ${errors.message 
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-dark-600/50 focus:border-primary-500/50 focus:ring-primary-500/20'
                        }
                      `}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="glass-card overflow-hidden">
            <div className="aspect-[3/1] bg-dark-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary-400/50 mx-auto mb-4" />
                <p className="text-dark-400">Peta Lokasi</p>
                <p className="text-dark-500 text-sm">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
