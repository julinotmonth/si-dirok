/**
 * Profile Page
 * User profile management
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  User,
  Mail,
  Calendar,
  Shield,
  Save,
  Camera
} from 'lucide-react'
import { useAuthStore } from '../../store'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Card from '../../components/common/Card'

const profileSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  age: z.string().optional(),
  gender: z.string().optional()
})

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      age: user?.age?.toString() || '',
      gender: user?.gender || ''
    }
  })

  const onSubmit = async (data) => {
    const result = await updateProfile(data)
    
    if (result.success) {
      toast.success('Profil berhasil diperbarui!')
      setIsEditing(false)
    } else {
      toast.error('Gagal memperbarui profil')
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const genderOptions = [
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' }
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Profil Saya</h1>
        <p className="text-dark-400 mt-1">Kelola informasi akun Anda</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8 pb-8 border-b border-dark-800">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-dark-950">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-dark-700 border-2 border-dark-900 flex items-center justify-center text-dark-300 hover:text-primary-400 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-dark-100">
              {user?.username}
            </h2>
            <p className="text-dark-400">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Shield className={`w-4 h-4 ${user?.role === 'admin' ? 'text-red-400' : 'text-primary-400'}`} />
              <span className={`text-sm ${user?.role === 'admin' ? 'text-red-400' : 'text-primary-400'}`}>
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Username"
                placeholder="Username"
                leftIcon={<User className="w-5 h-5" />}
                disabled={!isEditing}
                error={errors.username?.message}
                {...register('username')}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                leftIcon={<Mail className="w-5 h-5" />}
                disabled={!isEditing}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Usia"
                type="number"
                placeholder="Usia"
                leftIcon={<Calendar className="w-5 h-5" />}
                disabled={!isEditing}
                error={errors.age?.message}
                {...register('age')}
              />
              <Select
                label="Jenis Kelamin"
                options={genderOptions}
                disabled={!isEditing}
                error={errors.gender?.message}
                {...register('gender')}
              />
            </div>

            {/* Account Info */}
            <div className="pt-6 border-t border-dark-800">
              <h3 className="font-medium text-dark-200 mb-4">Informasi Akun</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-400">Member Sejak</span>
                  <span className="text-dark-200">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Role</span>
                  <span className="text-dark-200 capitalize">{user?.role}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6">
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    leftIcon={<Save className="w-5 h-5" />}
                  >
                    Simpan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Batal
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profil
                </Button>
              )}
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <Card className="p-6 border-red-500/20 bg-red-500/5">
        <h3 className="font-semibold text-red-400 mb-2">Zona Berbahaya</h3>
        <p className="text-sm text-dark-400 mb-4">
          Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan.
        </p>
        <Button variant="danger" size="sm">
          Hapus Akun
        </Button>
      </Card>
    </div>
  )
}

export default Profile
