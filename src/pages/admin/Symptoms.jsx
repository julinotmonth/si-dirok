/**
 * Admin Symptoms Page
 * CRUD for symptoms data
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Activity,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { useAdminStore } from '../../store'
import { symptomCategories } from '../../data/symptoms'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Modal from '../../components/common/Modal'

const AdminSymptoms = () => {
  const { symptoms, addSymptom, updateSymptom, deleteSymptom, isLoading } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSymptom, setEditingSymptom] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'respiratory',
    mb: 0.8,
    md: 0.1,
    relatedDiseases: []
  })

  const filteredSymptoms = symptoms.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleOpenModal = (symptom = null) => {
    if (symptom) {
      setEditingSymptom(symptom)
      setFormData({
        name: symptom.name,
        description: symptom.description,
        category: symptom.category,
        mb: symptom.mb,
        md: symptom.md,
        relatedDiseases: symptom.relatedDiseases || []
      })
    } else {
      setEditingSymptom(null)
      setFormData({
        name: '',
        description: '',
        category: 'respiratory',
        mb: 0.8,
        md: 0.1,
        relatedDiseases: []
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (editingSymptom) {
      await updateSymptom(editingSymptom.id, formData)
      toast.success('Gejala berhasil diperbarui')
    } else {
      await addSymptom(formData)
      toast.success('Gejala berhasil ditambahkan')
    }
    
    setIsModalOpen(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus gejala ini?')) {
      await deleteSymptom(id)
      toast.success('Gejala berhasil dihapus')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <Activity className="w-7 h-7 text-primary-400" />
            Data Gejala
          </h1>
          <p className="text-dark-400 mt-1">{symptoms.length} gejala terdaftar</p>
        </div>
        <Button onClick={() => handleOpenModal()} leftIcon={<Plus className="w-5 h-5" />}>
          Tambah Gejala
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Cari gejala..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {symptomCategories.slice(0, 6).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'bg-dark-800/50 text-dark-400 hover:text-primary-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Kode</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Nama Gejala</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Kategori</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">MB/MD</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSymptoms.map((symptom, index) => (
                <motion.tr
                  key={symptom.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-dark-800 hover:bg-dark-800/30"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-primary-400">{symptom.code}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-dark-100">{symptom.name}</p>
                      <p className="text-xs text-dark-400 truncate max-w-xs">{symptom.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="default" size="sm">
                      {symptomCategories.find(c => c.id === symptom.category)?.name || symptom.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-dark-300">
                      {symptom.mb} / {symptom.md}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(symptom)}
                        className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-dark-800 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(symptom.id)}
                        className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSymptom ? 'Edit Gejala' : 'Tambah Gejala Baru'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nama Gejala"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-dark-800/50 border border-dark-600/50 rounded-xl px-4 py-3 text-dark-100 focus:outline-none focus:border-primary-500/50"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-dark-800/50 border border-dark-600/50 rounded-xl px-4 py-3 text-dark-100"
              >
                {symptomCategories.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="MB"
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={formData.mb}
              onChange={(e) => setFormData({ ...formData, mb: parseFloat(e.target.value) })}
            />
            <Input
              label="MD"
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={formData.md}
              onChange={(e) => setFormData({ ...formData, md: parseFloat(e.target.value) })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" isLoading={isLoading}>
              {editingSymptom ? 'Simpan Perubahan' : 'Tambah Gejala'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminSymptoms
