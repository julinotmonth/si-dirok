/**
 * User Dashboard Page
 * Main dashboard for logged in users
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Stethoscope,
  History,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Activity
} from 'lucide-react'
import { useAuthStore, useDiagnosisStore, useAdminStore } from '../../store'
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import { MiniProgressRing } from '../../components/common/ProgressRing'

const UserDashboard = () => {
  const { user } = useAuthStore()
  const { history, getStatistics } = useDiagnosisStore()
  const { education } = useAdminStore()
  
  const stats = getStatistics()
  const recentHistory = history.slice(0, 5)
  const latestArticles = education.filter(e => e.type === 'article').slice(0, 3)

  const quickStats = [
    {
      icon: History,
      label: 'Total Diagnosis',
      value: stats.totalDiagnoses,
      color: 'primary'
    },
    {
      icon: Activity,
      label: 'Penyakit Terdeteksi',
      value: stats.mostCommonDisease?.name || '-',
      subValue: stats.mostCommonDisease ? `${stats.mostCommonDisease.count}x` : '',
      color: 'warning'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-dark-100 mb-2">
          Selamat Datang, {user?.username || 'User'}! 👋
        </h1>
        <p className="text-dark-400">
          Pantau kesehatan Anda dan lakukan diagnosis secara berkala.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Start Diagnosis Card */}
        <motion.div variants={itemVariants}>
          <Link to="/consultation">
            <Card variant="gradient" className="p-6 group cursor-pointer hover:border-primary-500/30 transition-all h-full">
              <div className="flex items-start justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Stethoscope className="w-6 h-6 text-dark-950" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-100 mb-2">
                    Mulai Diagnosis
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Lakukan pemeriksaan kesehatan sekarang
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 h-full">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color === 'primary' ? 'primary' : 'yellow'}-500/20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color === 'primary' ? 'primary' : 'yellow'}-400`} />
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-dark-100">{stat.value}</p>
                    {stat.subValue && (
                      <p className="text-xs text-primary-400">{stat.subValue}</p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary-400" />
                Riwayat Diagnosis Terbaru
              </CardTitle>
              <Link to="/history">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Lihat Semua
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              {recentHistory.length > 0 ? (
                <div className="space-y-4">
                  {recentHistory.map((item, index) => {
                    const topResult = item.results[0]
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/30 hover:bg-dark-800/50 transition-colors"
                      >
                        <MiniProgressRing percentage={parseFloat(topResult?.percentage || 0)} />
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-dark-100 truncate">
                            {topResult?.disease?.name || 'Tidak terdeteksi'}
                          </p>
                          <p className="text-xs text-dark-400">
                            {new Date(item.timestamp).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>

                        <Badge 
                          variant={parseFloat(topResult?.percentage || 0) >= 60 ? 'danger' : parseFloat(topResult?.percentage || 0) >= 40 ? 'warning' : 'success'}
                          size="sm"
                        >
                          {topResult?.percentage}%
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                  <p className="text-dark-400">Belum ada riwayat diagnosis</p>
                  <Link to="/consultation" className="mt-4 inline-block">
                    <Button variant="outline" size="sm">
                      Mulai Diagnosis Pertama
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Latest Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-400" />
                Artikel Terbaru
              </CardTitle>
              <Link to="/education">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>

            <CardContent className="space-y-4">
              {latestArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/education/${article.slug}`}
                  className="block group"
                >
                  <div className="p-3 rounded-xl hover:bg-dark-800/30 transition-colors">
                    <h4 className="font-medium text-dark-200 text-sm group-hover:text-primary-400 transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-dark-500">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Health Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/5 border-primary-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-dark-100 mb-1">Tips Kesehatan Hari Ini</h3>
              <p className="text-dark-400 text-sm">
                Berhenti merokok dapat meningkatkan kapasitas paru-paru Anda hingga 10% dalam 9 bulan. 
                Mulailah perjalanan hidup sehat Anda hari ini!
              </p>
            </div>
            <Link to="/education">
              <Button variant="outline" size="sm">
                Pelajari Lebih
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default UserDashboard
