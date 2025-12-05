/**
 * Register Page
 * User registration form
 */

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { UserPlus, Mail, Lock, User, Calendar } from 'lucide-react'
import { useAuthStore } from '../../store'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'

const registerSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
  age: z.string().min(1, 'Usia harus diisi'),
  gender: z.string().min(1, 'Jenis kelamin harus dipilih')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword']
})

const Register = () => {
  const navigate = useNavigate()
  const { register: registerUser, isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data
    const result = await registerUser(userData)
    
    if (result.success) {
      toast.success('Registrasi berhasil! Silakan login.')
      navigate('/login')
    } else {
      toast.error(result.error || 'Registrasi gagal')
    }
  }

  const genderOptions = [
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' }
  ]

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-100 mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-dark-400">
            Daftar untuk memulai diagnosis kesehatan
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Username"
            placeholder="Masukkan username"
            leftIcon={<User className="w-5 h-5" />}
            error={errors.username?.message}
            required
            {...register('username')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Usia"
              type="number"
              placeholder="Usia"
              leftIcon={<Calendar className="w-5 h-5" />}
              error={errors.age?.message}
              required
              {...register('age')}
            />

            <Select
              label="Jenis Kelamin"
              options={genderOptions}
              placeholder="Pilih"
              error={errors.gender?.message}
              required
              {...register('gender')}
            />
          </div>

          <Input
            label="Password"
            type="password"
            placeholder="Minimal 6 karakter"
            leftIcon={<Lock className="w-5 h-5" />}
            error={errors.password?.message}
            required
            {...register('password')}
          />

          <Input
            label="Konfirmasi Password"
            type="password"
            placeholder="Ulangi password"
            leftIcon={<Lock className="w-5 h-5" />}
            error={errors.confirmPassword?.message}
            required
            {...register('confirmPassword')}
          />

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-0.5 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
              />
              <span className="text-sm text-dark-400">
                Saya setuju dengan{' '}
                <Link to="/terms" className="text-primary-400 hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link to="/privacy" className="text-primary-400 hover:underline">
                  Kebijakan Privasi
                </Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<UserPlus className="w-5 h-5" />}
          >
            Daftar
          </Button>
        </form>

        <p className="text-center text-dark-400 mt-8">
          Sudah punya akun?{' '}
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

export default Register
