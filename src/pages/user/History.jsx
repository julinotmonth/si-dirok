/**
 * History Page
 * Display user's diagnosis history
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  History as HistoryIcon,
  Calendar,
  Trash2,
  Eye,
  Download,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react'
import { useDiagnosisStore } from '../../store'
import { downloadDiagnosisPDF } from '../../utils/pdfGenerator'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Modal from '../../components/common/Modal'
import { MiniProgressRing } from '../../components/common/ProgressRing'
import toast from 'react-hot-toast'

const History = () => {
  const { history, deleteHistoryEntry, clearHistory } = useDiagnosisStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState(null)

  const filteredHistory = history.filter(entry => {
    const searchLower = searchQuery.toLowerCase()
    return (
      entry.userData?.name?.toLowerCase().includes(searchLower) ||
      entry.results[0]?.disease?.name?.toLowerCase().includes(searchLower)
    )
  })

  const handleDelete = (id) => {
    setEntryToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (entryToDelete) {
      deleteHistoryEntry(entryToDelete)
      toast.success('Riwayat berhasil dihapus')
    }
    setShowDeleteConfirm(false)
    setEntryToDelete(null)
  }

  const handleClearAll = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
      clearHistory()
      toast.success('Semua riwayat berhasil dihapus')
    }
  }

  const handleDownload = (entry) => {
    try {
      downloadDiagnosisPDF(entry.summary)
      toast.success('PDF berhasil diunduh')
    } catch (error) {
      toast.error('Gagal mengunduh PDF')
    }
  }

  const getSeverityColor = (percentage) => {
    if (percentage >= 70) return 'danger'
    if (percentage >= 50) return 'warning'
    if (percentage >= 30) return 'primary'
    return 'success'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <HistoryIcon className="w-7 h-7 text-primary-400" />
            Riwayat Diagnosis
          </h1>
          <p className="text-dark-400 mt-1">
            {history.length} diagnosis tercatat
          </p>
        </div>

        {history.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearAll}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Hapus Semua
          </Button>
        )}
      </div>

      {/* Search */}
      {history.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Cari riwayat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50"
          />
        </div>
      )}

      {/* History List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((entry, index) => {
            const topResult = entry.results[0]
            const percentage = parseFloat(topResult?.percentage || 0)

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 hover:border-dark-600 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Progress */}
                    <div className="flex-shrink-0">
                      <MiniProgressRing percentage={percentage} size={60} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-dark-100">
                          {topResult?.disease?.name || 'Tidak terdeteksi'}
                        </h3>
                        <Badge variant={getSeverityColor(percentage)} size="sm">
                          {percentage.toFixed(1)}%
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(entry.timestamp).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span>
                          {entry.selectedSymptoms?.length || 0} gejala
                        </span>
                        {entry.userData?.name && (
                          <span>{entry.userData.name}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEntry(entry)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(entry)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <HistoryIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-300 mb-2">
            {searchQuery ? 'Tidak ada hasil' : 'Belum Ada Riwayat'}
          </h3>
          <p className="text-dark-400 mb-6">
            {searchQuery 
              ? 'Coba kata kunci pencarian yang berbeda'
              : 'Mulai diagnosis pertama Anda untuk melihat riwayat di sini'
            }
          </p>
          {!searchQuery && (
            <a href="/consultation">
              <Button>Mulai Diagnosis</Button>
            </a>
          )}
        </Card>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        title="Detail Diagnosis"
        size="lg"
      >
        {selectedEntry && (
          <div className="space-y-6">
            {/* Top Result */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50">
              <MiniProgressRing 
                percentage={parseFloat(selectedEntry.results[0]?.percentage || 0)} 
                size={80} 
              />
              <div>
                <h4 className="font-semibold text-dark-100">
                  {selectedEntry.results[0]?.disease?.name}
                </h4>
                <p className="text-sm text-dark-400">
                  {selectedEntry.results[0]?.disease?.description?.slice(0, 100)}...
                </p>
              </div>
            </div>

            {/* User Data */}
            <div>
              <h5 className="font-medium text-dark-200 mb-3">Data Pasien</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-dark-400">Nama:</span>
                  <span className="text-dark-100 ml-2">{selectedEntry.userData?.name}</span>
                </div>
                <div>
                  <span className="text-dark-400">Usia:</span>
                  <span className="text-dark-100 ml-2">{selectedEntry.userData?.age} tahun</span>
                </div>
                <div>
                  <span className="text-dark-400">Lama Merokok:</span>
                  <span className="text-dark-100 ml-2">{selectedEntry.userData?.smokingYears} tahun</span>
                </div>
                <div>
                  <span className="text-dark-400">Rokok/Hari:</span>
                  <span className="text-dark-100 ml-2">{selectedEntry.userData?.cigarettesPerDay} batang</span>
                </div>
              </div>
            </div>

            {/* Other Results */}
            {selectedEntry.results.length > 1 && (
              <div>
                <h5 className="font-medium text-dark-200 mb-3">Kemungkinan Lain</h5>
                <div className="space-y-2">
                  {selectedEntry.results.slice(1, 4).map((result, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30">
                      <span className="text-dark-300">{result.disease.name}</span>
                      <Badge variant={getSeverityColor(parseFloat(result.percentage))} size="sm">
                        {result.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-dark-700">
              <Button
                onClick={() => handleDownload(selectedEntry)}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Unduh PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedEntry(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Konfirmasi Hapus"
        size="sm"
      >
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-dark-300 mb-6">
            Apakah Anda yakin ingin menghapus riwayat diagnosis ini?
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="danger" onClick={confirmDelete}>
              Ya, Hapus
            </Button>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Batal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default History
