/**
 * Admin Diseases Page
 * CRUD for diseases data
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { HeartPulse, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { useAdminStore } from '../../store'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'

const AdminDiseases = () => {
  const { diseases, addDisease, updateDisease, deleteDisease, isLoading } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDisease, setEditingDisease] = useState(null)
  const [viewingDisease, setViewingDisease] = useState(null)

  const filteredDiseases = diseases.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus penyakit ini?')) {
      await deleteDisease(id)
      toast.success('Penyakit berhasil dihapus')
    }
  }

  const getSeverityBadge = (severity) => {
    const variants = {
      critical: 'danger',
      high: 'warning',
      moderate: 'primary',
      low: 'success'
    }
    return variants[severity] || 'default'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <HeartPulse className="w-7 h-7 text-red-400" />
            Data Penyakit
          </h1>
          <p className="text-dark-400 mt-1">{diseases.length} penyakit terdaftar</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-5 h-5" />}>
          Tambah Penyakit
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input
          type="text"
          placeholder="Cari penyakit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDiseases.map((disease, index) => (
          <motion.div
            key={disease.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-mono text-primary-400">{disease.code}</span>
                <Badge variant={getSeverityBadge(disease.severity)} size="sm">
                  {disease.severity}
                </Badge>
              </div>
              <h3 className="font-semibold text-dark-100 mb-2">{disease.name}</h3>
              <p className="text-sm text-dark-400 line-clamp-2 flex-1">{disease.description}</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-800">
                <span className="text-xs text-dark-500">{disease.symptoms?.length || 0} gejala</span>
                <div className="flex-1" />
                <button onClick={() => setViewingDisease(disease)} className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-dark-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => { setEditingDisease(disease); setIsModalOpen(true) }} className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-dark-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(disease.id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Modal isOpen={!!viewingDisease} onClose={() => setViewingDisease(null)} title={viewingDisease?.name} size="lg">
        {viewingDisease && (
          <div className="space-y-4">
            <p className="text-dark-300">{viewingDisease.description}</p>
            <div>
              <h4 className="font-medium text-dark-200 mb-2">Gejala Utama</h4>
              <div className="flex flex-wrap gap-2">
                {viewingDisease.mainSymptoms?.map(s => <Badge key={s} variant="primary" size="sm">{s}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-dark-200 mb-2">Pencegahan</h4>
              <ul className="text-sm text-dark-400 space-y-1">
                {viewingDisease.prevention?.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AdminDiseases
