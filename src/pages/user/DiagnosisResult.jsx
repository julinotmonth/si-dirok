/**
 * Diagnosis Result Page
 * Display diagnosis results with CF percentages
 */

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  RefreshCcw,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  Download,
  Share2,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react'
import { useDiagnosisStore } from '../../store'
import { interpretCF } from '../../utils/certaintyFactor'
import { downloadDiagnosisPDF } from '../../utils/pdfGenerator'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import ProgressRing from '../../components/common/ProgressRing'
import toast from 'react-hot-toast'

const DiagnosisResult = () => {
  const navigate = useNavigate()
  const { diagnosisSummary, resetDiagnosis } = useDiagnosisStore()

  // Redirect if no results
  useEffect(() => {
    if (!diagnosisSummary) {
      navigate('/consultation')
    }
  }, [diagnosisSummary, navigate])

  if (!diagnosisSummary) {
    return null
  }

  const { primaryDiagnosis, secondaryDiagnoses, riskFactor, recommendations, userData } = diagnosisSummary

  const handleDownloadPDF = () => {
    try {
      downloadDiagnosisPDF(diagnosisSummary)
      toast.success('PDF berhasil diunduh!')
    } catch (error) {
      toast.error('Gagal mengunduh PDF')
    }
  }

  const handleNewConsultation = () => {
    resetDiagnosis()
    navigate('/consultation')
  }

  const getSeverityColor = (percentage) => {
    if (percentage >= 70) return 'danger'
    if (percentage >= 50) return 'warning'
    if (percentage >= 30) return 'primary'
    return 'success'
  }

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-dark-100 mb-2">
          Hasil Diagnosis
        </h1>
        <p className="text-dark-400">
          Berdasarkan {diagnosisSummary.allResults[0]?.matchedSymptoms?.length || 0} gejala yang Anda pilih
        </p>
      </motion.div>

      {/* Primary Diagnosis */}
      {primaryDiagnosis && (
        <motion.div variants={itemVariants}>
          <Card className="p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Progress Ring */}
                <div className="flex-shrink-0">
                  <ProgressRing 
                    percentage={parseFloat(primaryDiagnosis.percentage)} 
                    size={160}
                    strokeWidth={12}
                    color="auto"
                    label="Kemungkinan"
                  />
                </div>

                {/* Disease Info */}
                <div className="flex-1 text-center md:text-left">
                  <Badge variant={getSeverityColor(parseFloat(primaryDiagnosis.percentage))} className="mb-3">
                    {primaryDiagnosis.interpretation?.level}
                  </Badge>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-dark-100 mb-3">
                    {primaryDiagnosis.disease.name}
                  </h2>
                  
                  <p className="text-dark-400 mb-4 line-clamp-3">
                    {primaryDiagnosis.disease.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <Info className="w-4 h-4 text-primary-400" />
                    <span className="text-dark-300">
                      {primaryDiagnosis.interpretation?.recommendation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Risk Factor */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-100">Faktor Risiko Merokok</h3>
              <p className="text-sm text-dark-400">Berdasarkan riwayat merokok Anda</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-dark-800/50">
              <p className="text-sm text-dark-400">Level Risiko</p>
              <p className="text-lg font-bold text-orange-400">{riskFactor.level}</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50">
              <p className="text-sm text-dark-400">Pack-Years</p>
              <p className="text-lg font-bold text-dark-100">{riskFactor.packYears}</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50">
              <p className="text-sm text-dark-400">Multiplier Risiko</p>
              <p className="text-lg font-bold text-dark-100">{riskFactor.multiplier.toFixed(2)}x</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Other Possible Diseases */}
      {secondaryDiagnoses && secondaryDiagnoses.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h3 className="font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-400" />
              Kemungkinan Penyakit Lain
            </h3>

            <div className="space-y-3">
              {secondaryDiagnoses.map((diagnosis, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-dark-800/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-dark-400 text-sm font-medium">
                      {index + 2}
                    </span>
                    <div>
                      <p className="font-medium text-dark-100">{diagnosis.disease.name}</p>
                      <p className="text-xs text-dark-400">
                        {diagnosis.interpretation?.level}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(parseFloat(diagnosis.percentage))}>
                    {diagnosis.percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Matched Symptoms */}
      {primaryDiagnosis?.matchedSymptoms && primaryDiagnosis.matchedSymptoms.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h3 className="font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Gejala yang Terdeteksi
            </h3>

            <div className="grid md:grid-cols-2 gap-3">
              {primaryDiagnosis.matchedSymptoms.map((ms, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-800/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary-400">{ms.symptom.code}</span>
                    <span className="text-sm text-dark-200">{ms.symptom.name}</span>
                  </div>
                  <span className="text-xs text-dark-400">
                    {(ms.certainty * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
            <h3 className="font-semibold text-dark-100 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Saran & Rekomendasi
            </h3>

            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    rec.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {rec.priority === 'urgent' ? (
                      <AlertTriangle className="w-3 h-3" />
                    ) : (
                      <CheckCircle className="w-3 h-3" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-dark-100">{rec.title}</p>
                    <p className="text-sm text-dark-400">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Prevention Tips */}
      {primaryDiagnosis?.disease?.prevention && (
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h3 className="font-semibold text-dark-100 mb-4">Langkah Pencegahan</h3>
            <ul className="space-y-2">
              {primaryDiagnosis.disease.prevention.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                  <span className="text-dark-300">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div variants={itemVariants}>
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-400 mb-1">Disclaimer</p>
              <p className="text-sm text-dark-400">
                Hasil diagnosis ini bersifat indikatif dan tidak menggantikan diagnosis medis profesional. 
                Selalu konsultasikan dengan dokter untuk diagnosis dan penanganan yang tepat.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center pt-6">
        <Button
          onClick={handleDownloadPDF}
          leftIcon={<Download className="w-5 h-5" />}
        >
          Cetak PDF
        </Button>
        <Button
          variant="outline"
          onClick={handleNewConsultation}
          leftIcon={<RefreshCcw className="w-5 h-5" />}
        >
          Konsultasi Ulang
        </Button>
        <Link to="/history">
          <Button variant="ghost" rightIcon={<ArrowRight className="w-5 h-5" />}>
            Lihat Riwayat
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default DiagnosisResult
