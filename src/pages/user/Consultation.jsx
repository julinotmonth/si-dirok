/**
 * Consultation Page
 * Multi-step diagnosis form
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Cigarette,
  Activity,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Search
} from 'lucide-react'
import { useDiagnosisStore, useAuthStore, useAdminStore } from '../../store'
import { symptomCategories, certaintyLevels } from '../../data/symptoms'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import { ProcessingLoader } from '../../components/common/Loader'

const Consultation = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { symptoms } = useAdminStore()
  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    userData,
    setUserData,
    selectedSymptoms,
    addSymptom,
    removeSymptom,
    updateSymptomCertainty,
    processDiagnosis,
    isProcessing
  } = useDiagnosisStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [errors, setErrors] = useState({})

  // Initialize user data from auth
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.username || '',
        age: user.age || '',
        gender: user.gender || ''
      })
    }
  }, [user])

  // Filter symptoms
  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Validate step 1
  const validateStep1 = () => {
    const newErrors = {}
    if (!userData.name) newErrors.name = 'Nama harus diisi'
    if (!userData.age) newErrors.age = 'Usia harus diisi'
    if (!userData.gender) newErrors.gender = 'Jenis kelamin harus dipilih'
    if (!userData.smokingYears) newErrors.smokingYears = 'Lama merokok harus diisi'
    if (!userData.cigarettesPerDay) newErrors.cigarettesPerDay = 'Jumlah rokok harus diisi'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate step 2
  const validateStep2 = () => {
    if (selectedSymptoms.length === 0) {
      setErrors({ symptoms: 'Pilih minimal satu gejala' })
      return false
    }
    setErrors({})
    return true
  }

  const handleNext = () => {
    if (currentStep === 0 && validateStep1()) {
      nextStep()
    } else if (currentStep === 1 && validateStep2()) {
      handleProcessDiagnosis()
    }
  }

  const handleProcessDiagnosis = async () => {
    await processDiagnosis()
    navigate('/result')
  }

  const handleSymptomToggle = (symptomId) => {
    const existing = selectedSymptoms.find(s => s.symptomId === symptomId)
    if (existing) {
      removeSymptom(symptomId)
    } else {
      addSymptom(symptomId, 0.8) // Default certainty
    }
  }

  const handleCertaintyChange = (symptomId, certainty) => {
    updateSymptomCertainty(symptomId, certainty)
  }

  const steps = [
    { title: 'Data Diri', icon: User },
    { title: 'Pilih Gejala', icon: Activity },
    { title: 'Hasil', icon: CheckCircle }
  ]

  // Processing state
  if (isProcessing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ProcessingLoader 
          message="Memproses Diagnosis..." 
          subMessage="Menganalisis gejala dengan metode Certainty Factor"
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            
            return (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-primary-500 text-dark-950'
                        : isCompleted
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-dark-800 text-dark-400 border border-dark-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isActive ? 'text-primary-400' : 'text-dark-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-full h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-dark-700'
                  }`} style={{ minWidth: '50px' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Personal Data */}
        {currentStep === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark-100">Data Diri</h2>
                  <p className="text-sm text-dark-400">Isi informasi dasar Anda</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Masukkan nama Anda"
                    value={userData.name}
                    onChange={(e) => setUserData({ name: e.target.value })}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Usia"
                    type="number"
                    placeholder="Usia dalam tahun"
                    value={userData.age}
                    onChange={(e) => setUserData({ age: e.target.value })}
                    error={errors.age}
                    required
                  />
                </div>

                <Select
                  label="Jenis Kelamin"
                  value={userData.gender}
                  onChange={(e) => setUserData({ gender: e.target.value })}
                  options={[
                    { value: 'male', label: 'Laki-laki' },
                    { value: 'female', label: 'Perempuan' }
                  ]}
                  error={errors.gender}
                  required
                />

                <div className="pt-4 border-t border-dark-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                      <Cigarette className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-100">Riwayat Merokok</h3>
                      <p className="text-sm text-dark-400">Informasi kebiasaan merokok Anda</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Lama Merokok (Tahun)"
                      type="number"
                      placeholder="Berapa tahun merokok"
                      value={userData.smokingYears}
                      onChange={(e) => setUserData({ smokingYears: e.target.value })}
                      error={errors.smokingYears}
                      required
                    />
                    <Input
                      label="Jumlah Rokok/Hari"
                      type="number"
                      placeholder="Rata-rata batang per hari"
                      value={userData.cigarettesPerDay}
                      onChange={(e) => setUserData({ cigarettesPerDay: e.target.value })}
                      error={errors.cigarettesPerDay}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={handleNext} rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Selanjutnya
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Symptoms Selection */}
        {currentStep === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark-100">Pilih Gejala</h2>
                  <p className="text-sm text-dark-400">Pilih gejala yang Anda alami beserta tingkat keyakinan</p>
                </div>
              </div>

              {/* Selected count */}
              <div className="flex items-center justify-between mb-4">
                <Badge variant={selectedSymptoms.length > 0 ? 'primary' : 'default'}>
                  {selectedSymptoms.length} gejala dipilih
                </Badge>
                {errors.symptoms && (
                  <span className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.symptoms}
                  </span>
                )}
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
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
                  {symptomCategories.slice(0, 5).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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

              {/* Symptoms Grid */}
              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
                {filteredSymptoms.map((symptom) => {
                  const isSelected = selectedSymptoms.some(s => s.symptomId === symptom.id)
                  const selectedSymptom = selectedSymptoms.find(s => s.symptomId === symptom.id)
                  
                  return (
                    <div
                      key={symptom.id}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary-500/10 border-primary-500/50'
                          : 'bg-dark-800/30 border-dark-700/50 hover:border-dark-600'
                      }`}
                      onClick={() => handleSymptomToggle(symptom.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-dark-600'
                        }`}>
                          {isSelected && <CheckCircle className="w-4 h-4 text-dark-950" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-primary-400">{symptom.code}</span>
                            <h4 className="font-medium text-dark-100">{symptom.name}</h4>
                          </div>
                          <p className="text-sm text-dark-400">{symptom.description}</p>
                          
                          {/* Certainty Selection */}
                          {isSelected && (
                            <div className="mt-3 pt-3 border-t border-dark-700/50" onClick={(e) => e.stopPropagation()}>
                              <p className="text-xs text-dark-400 mb-2">Tingkat Keyakinan:</p>
                              <div className="flex flex-wrap gap-2">
                                {certaintyLevels.map((level) => (
                                  <button
                                    key={level.value}
                                    onClick={() => handleCertaintyChange(symptom.id, level.value)}
                                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                      selectedSymptom?.certainty === level.value
                                        ? 'bg-primary-500 text-dark-950'
                                        : 'bg-dark-700/50 text-dark-300 hover:bg-dark-700'
                                    }`}
                                  >
                                    {level.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-dark-800">
                <Button variant="outline" onClick={prevStep} leftIcon={<ArrowLeft className="w-5 h-5" />}>
                  Kembali
                </Button>
                <Button onClick={handleNext} rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Proses Diagnosis
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Consultation
