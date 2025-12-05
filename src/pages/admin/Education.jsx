/**
 * Admin Education Page
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { BookOpen, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { useAdminStore } from '../../store'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Modal from '../../components/common/Modal'

const AdminEducation = () => {
  const { education, deleteEducation, isLoading } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContent = education.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin?')) {
      await deleteEducation(id)
      toast.success('Konten berhasil dihapus')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-blue-400" />
            Konten Edukasi
          </h1>
          <p className="text-dark-400 mt-1">{education.length} konten tersedia</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>Tambah Konten</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input type="text" placeholder="Cari konten..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50" />
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-800/50">
            <tr>
              <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Judul</th>
              <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Tipe</th>
              <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Kategori</th>
              <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Views</th>
              <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map((item) => (
              <tr key={item.id} className="border-b border-dark-800 hover:bg-dark-800/30">
                <td className="px-6 py-4"><p className="font-medium text-dark-100 truncate max-w-xs">{item.title}</p></td>
                <td className="px-6 py-4"><Badge variant={item.type === 'article' ? 'primary' : item.type === 'video' ? 'danger' : 'success'} size="sm">{item.type}</Badge></td>
                <td className="px-6 py-4 text-dark-400 text-sm">{item.category}</td>
                <td className="px-6 py-4 text-dark-400 text-sm">{item.views?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-dark-800"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default AdminEducation
