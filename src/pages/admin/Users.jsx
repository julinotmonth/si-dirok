/**
 * Admin Users Page
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Users, Search, Shield, Trash2, UserCheck } from 'lucide-react'
import { useAuthStore } from '../../store'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'

const AdminUsers = () => {
  const { getAllUsers, deleteUser, updateUserRole, user: currentUser } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')

  const users = getAllUsers()
  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (id === currentUser?.id) {
      toast.error('Tidak dapat menghapus akun sendiri')
      return
    }
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      await deleteUser(id)
      toast.success('Pengguna berhasil dihapus')
    }
  }

  const handleToggleRole = async (userId, currentRole) => {
    if (userId === currentUser?.id) {
      toast.error('Tidak dapat mengubah role sendiri')
      return
    }
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    await updateUserRole(userId, newRole)
    toast.success(`Role berhasil diubah menjadi ${newRole}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <Users className="w-7 h-7 text-purple-400" />
            Kelola Pengguna
          </h1>
          <p className="text-dark-400 mt-1">{users.length} pengguna terdaftar</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input type="text" placeholder="Cari pengguna..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Username</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Email</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Role</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Bergabung</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-dark-800 hover:bg-dark-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.role === 'admin' ? 'bg-red-500/20' : 'bg-primary-500/20'}`}>
                        <span className={`text-xs font-bold ${user.role === 'admin' ? 'text-red-400' : 'text-primary-400'}`}>
                          {user.username?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-dark-200">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === 'admin' ? 'danger' : 'primary'} size="sm">
                      {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <UserCheck className="w-3 h-3 mr-1" />}
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-dark-400 text-sm">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleRole(user.id, user.role)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          user.role === 'admin' 
                            ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30' 
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                      >
                        {user.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin'}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default AdminUsers
