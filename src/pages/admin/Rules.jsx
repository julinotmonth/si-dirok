/**
 * Admin Rules Page
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { GitBranch, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useAdminStore } from '../../store'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'

const AdminRules = () => {
  const { rules, symptoms, diseases, deleteRule, isLoading } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDisease, setFilterDisease] = useState('all')

  const filteredRules = rules.filter(r => {
    const symptom = symptoms.find(s => s.id === r.symptomId)
    const matchesSearch = symptom?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDisease = filterDisease === 'all' || r.diseaseId === filterDisease
    return matchesSearch && matchesDisease
  })

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin?')) {
      await deleteRule(id)
      toast.success('Rule berhasil dihapus')
    }
  }

  const getSymptomName = (id) => symptoms.find(s => s.id === id)?.name || id
  const getDiseaseName = (id) => diseases.find(d => d.id === id)?.name || id

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <GitBranch className="w-7 h-7 text-green-400" />
            Rule Base
          </h1>
          <p className="text-dark-400 mt-1">{rules.length} rules terdaftar</p>
        </div>
        <Button leftIcon={<Plus className="w-5 h-5" />}>Tambah Rule</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input type="text" placeholder="Cari rule..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-2.5 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50" />
        </div>
        <select value={filterDisease} onChange={(e) => setFilterDisease(e.target.value)}
          className="bg-dark-800/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-dark-100">
          <option value="all">Semua Penyakit</option>
          {diseases.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800/50">
              <tr>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">ID</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Gejala</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Penyakit</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">MB</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">MD</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">CF</th>
                <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="border-b border-dark-800 hover:bg-dark-800/30">
                  <td className="px-6 py-4"><span className="font-mono text-primary-400 text-sm">{rule.id}</span></td>
                  <td className="px-6 py-4"><span className="text-dark-200 text-sm">{getSymptomName(rule.symptomId)}</span></td>
                  <td className="px-6 py-4"><Badge variant="default" size="sm">{getDiseaseName(rule.diseaseId)}</Badge></td>
                  <td className="px-6 py-4 text-dark-300">{rule.mb}</td>
                  <td className="px-6 py-4 text-dark-300">{rule.md}</td>
                  <td className="px-6 py-4"><span className="text-primary-400 font-medium">{(rule.mb - rule.md).toFixed(2)}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-dark-800"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(rule.id)} className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
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

export default AdminRules
