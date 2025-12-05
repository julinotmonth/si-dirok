/**
 * Forgot Password Page
 * Password reset request form
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../../store'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid')
})

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { forgotPassword, isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data) => {
    const result = await forgotPassword(data.email)
    
    if (result.success) {
      setIsSubmitted(true)
      toast.success(result.message)
    } else {
      toast.error(result.error || 'Terjadi kesalahan')
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-dark-100 mb-4">
            Email Terkirim!
          </h1>
          
          <p className="text-dark-400 mb-8">
            Kami telah mengirimkan link reset password ke email Anda. 
            Silakan cek inbox atau folder spam.
          </p>

          <Link to="/login">
            <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Kembali ke Login
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Login</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-100 mb-2">
            Lupa Password?
          </h1>
          <p className="text-dark-400">
            Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<Send className="w-5 h-5" />}
          >
            Kirim Link Reset
          </Button>
        </form>

        <p className="text-center text-dark-400 mt-8">
          Ingat password?{' '}
          <Link
            to="/login"
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Masuk
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
