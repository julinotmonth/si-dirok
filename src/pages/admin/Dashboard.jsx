/**
 * Admin Dashboard Page
 * Overview statistics and quick access for admin
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Activity,
  HeartPulse,
  BookOpen,
  Users,
  FileText,
  GitBranch,
  TrendingUp,
  ArrowRight
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useAdminStore, useAuthStore, useDiagnosisStore } from '../../store'
import Card from '../../components/common/Card'

const AdminDashboard = () => {
  const { getAdminStats, diseases } = useAdminStore()
  const { getAllUsers } = useAuthStore()
  const { history } = useDiagnosisStore()
  
  const stats = getAdminStats()
  const users = getAllUsers()

  const quickStats = [
    { title: 'Total Gejala', value: stats.totalSymptoms, icon: Activity, color: 'primary', link: '/admin/symptoms' },
    { title: 'Total Penyakit', value: stats.totalDiseases, icon: HeartPulse, color: 'red', link: '/admin/diseases' },
    { title: 'Rule Base', value: stats.totalRules, icon: GitBranch, color: 'green', link: '/admin/rules' },
    { title: 'Konten Edukasi', value: stats.totalEducation, icon: BookOpen, color: 'blue', link: '/admin/education' },
    { title: 'Total Pengguna', value: users.length, icon: Users, color: 'purple', link: '/admin/users' },
    { title: 'Total Diagnosis', value: history.length, icon: FileText, color: 'orange', link: '/admin/reports' }
  ]

  const diseaseChartData = diseases.map(d => ({
    name: d.name.split(' ').slice(0, 2).join(' '),
    symptoms: d.symptoms.length
  }))

  const contentTypeData = [
    { name: 'Artikel', value: stats.articleCount, color: '#f59e0b' },
    { name: 'Video', value: stats.videoCount, color: '#ef4444' },
    { name: 'Tips', value: stats.tipsCount, color: '#22c55e' }
  ]

  const colorClasses = {
    primary: 'bg-primary-500/20 text-primary-400',
    red: 'bg-red-500/20 text-red-400',
    green: 'bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark-100">Dashboard Admin</h1>
        <p className="text-dark-400 mt-1">Selamat datang di panel administrasi SI-DIROK</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={stat.link}>
                <Card className="p-4 hover:border-dark-600 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${colorClasses[stat.color]} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-dark-100">{stat.value}</p>
                  <p className="text-xs text-dark-400 mt-1">{stat.title}</p>
                  <ArrowRight className="w-4 h-4 text-dark-600 group-hover:text-primary-400 mt-2 transition-colors" />
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Disease Symptoms Chart */}
        <Card className="p-6">
          <h3 className="font-semibold text-dark-100 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            Gejala per Penyakit
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="symptoms" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Content Type Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold text-dark-100 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-400" />
            Distribusi Konten Edukasi
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-semibold text-dark-100 mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/symptoms" className="p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors text-center">
            <Activity className="w-6 h-6 text-primary-400 mx-auto mb-2" />
            <span className="text-sm text-dark-300">Kelola Gejala</span>
          </Link>
          <Link to="/admin/diseases" className="p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors text-center">
            <HeartPulse className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <span className="text-sm text-dark-300">Kelola Penyakit</span>
          </Link>
          <Link to="/admin/education" className="p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors text-center">
            <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <span className="text-sm text-dark-300">Kelola Edukasi</span>
          </Link>
          <Link to="/admin/reports" className="p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors text-center">
            <FileText className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <span className="text-sm text-dark-300">Lihat Laporan</span>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
