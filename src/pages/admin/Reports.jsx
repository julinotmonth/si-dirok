/**
 * Admin Reports Page
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Search, Eye } from 'lucide-react'
import { useDiagnosisStore } from '../../store'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import { MiniProgressRing } from '../../components/common/ProgressRing'

const AdminReports = () => {
  const { history } = useDiagnosisStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHistory = history.filter(h =>
    h.userData?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.results[0]?.disease?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSeverityColor = (percentage) => {
    if (percentage >= 70) return 'danger'
    if (percentage >= 50) return 'warning'
    if (percentage >= 30) return 'primary'
    return 'success'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <FileText className="w-7 h-7 text-orange-400" />
            Laporan Diagnosis
          </h1>
          <p className="text-dark-400 mt-1">{history.length} diagnosis tercatat</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-5 h-5" />}>Export CSV</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input type="text" placeholder="Cari laporan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50" />
      </div>

      {filteredHistory.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800/50">
                <tr>
                  <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Tanggal</th>
                  <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Nama Pasien</th>
                  <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Usia</th>
                  <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Diagnosis Utama</th>
                  <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Persentase</th>
                  <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Gejala</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry) => {
                  const topResult = entry.results[0]
                  const percentage = parseFloat(topResult?.percentage || 0)
                  return (
                    <tr key={entry.id} className="border-b border-dark-800 hover:bg-dark-800/30">
                      <td className="px-6 py-4 text-dark-400 text-sm">
                        {new Date(entry.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-dark-200">{entry.userData?.name || '-'}</td>
                      <td className="px-6 py-4 text-dark-400">{entry.userData?.age || '-'}</td>
                      <td className="px-6 py-4 text-dark-200">{topResult?.disease?.name || '-'}</td>
                      <td className="px-6 py-4">
                        <Badge variant={getSeverityColor(percentage)} size="sm">{percentage.toFixed(1)}%</Badge>
                      </td>
                      <td className="px-6 py-4 text-dark-400">{entry.selectedSymptoms?.length || 0}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-300 mb-2">Belum Ada Laporan</h3>
          <p className="text-dark-400">Laporan diagnosis akan muncul di sini setelah pengguna melakukan konsultasi.</p>
        </Card>
      )}
    </div>
  )
}

export default AdminReports
