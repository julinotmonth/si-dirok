/**
 * Login Page
 * User authentication login form
 */

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { LogIn, Mail, Lock } from 'lucide-react'
import { useAuthStore } from '../../store'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter')
})

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuthStore()
  
  const from = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password)
    
    if (result.success) {
      toast.success('Login berhasil!')
      
      if (result.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate(from, { replace: true })
      }
    } else {
      toast.error(result.error || 'Login gagal')
    }
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-100 mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-dark-400">
            Masuk ke akun SI-DIROK Anda
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

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            leftIcon={<Lock className="w-5 h-5" />}
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
              />
              <span className="text-sm text-dark-400">Ingat saya</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Lupa password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<LogIn className="w-5 h-5" />}
          >
            Masuk
          </Button>
        </form>

        <div className="mt-6 p-4 rounded-xl bg-dark-800/50 border border-dark-700/50">
          <p className="text-xs text-dark-400 text-center mb-2">Demo Credentials:</p>
          <div className="text-xs text-dark-300 space-y-1">
            <p><span className="text-primary-400">Admin:</span> admin@sidirok.com / admin123</p>
            <p><span className="text-primary-400">User:</span> user@test.com / user123</p>
          </div>
        </div>

        <p className="text-center text-dark-400 mt-8">
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Daftar Sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
