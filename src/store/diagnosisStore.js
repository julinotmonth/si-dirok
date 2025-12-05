/**
 * Diagnosis Store - Zustand
 * Manages diagnosis state and history for SI-DIROK
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { 
  diagnose, 
  calculateRiskFactor, 
  adjustDiagnosisWithRisk,
  createDiagnosisSummary 
} from '../utils/certaintyFactor'

const useDiagnosisStore = create(
  persist(
    (set, get) => ({
      // State
      currentStep: 0,
      userData: {
        name: '',
        age: '',
        gender: '',
        smokingYears: '',
        cigarettesPerDay: ''
      },
      selectedSymptoms: [], // Array of { symptomId, certainty }
      diagnosisResult: null,
      diagnosisSummary: null,
      history: [],
      isProcessing: false,

      // Step management
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set(state => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      // User data management
      setUserData: (data) => set(state => ({
        userData: { ...state.userData, ...data }
      })),

      resetUserData: () => set({
        userData: {
          name: '',
          age: '',
          gender: '',
          smokingYears: '',
          cigarettesPerDay: ''
        }
      }),

      // Symptom management
      addSymptom: (symptomId, certainty) => {
        set(state => {
          const existing = state.selectedSymptoms.find(s => s.symptomId === symptomId)
          if (existing) {
            return {
              selectedSymptoms: state.selectedSymptoms.map(s =>
                s.symptomId === symptomId ? { ...s, certainty } : s
              )
            }
          }
          return {
            selectedSymptoms: [...state.selectedSymptoms, { symptomId, certainty }]
          }
        })
      },

      removeSymptom: (symptomId) => {
        set(state => ({
          selectedSymptoms: state.selectedSymptoms.filter(s => s.symptomId !== symptomId)
        }))
      },

      updateSymptomCertainty: (symptomId, certainty) => {
        set(state => ({
          selectedSymptoms: state.selectedSymptoms.map(s =>
            s.symptomId === symptomId ? { ...s, certainty } : s
          )
        }))
      },

      clearSymptoms: () => set({ selectedSymptoms: [] }),

      // Diagnosis process
      processDiagnosis: async () => {
        set({ isProcessing: true })
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const { userData, selectedSymptoms } = get()
        
        // Calculate risk factor based on smoking history
        const riskFactor = calculateRiskFactor({
          age: parseInt(userData.age) || 0,
          smokingYears: parseInt(userData.smokingYears) || 0,
          cigarettesPerDay: parseInt(userData.cigarettesPerDay) || 0
        })
        
        // Run diagnosis
        const rawResults = diagnose(selectedSymptoms)
        
        // Adjust with risk factor
        const adjustedResults = adjustDiagnosisWithRisk(rawResults, riskFactor)
        
        // Create summary
        const summary = createDiagnosisSummary(adjustedResults, userData, riskFactor)
        
        // Save to history
        const historyEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          userData,
          selectedSymptoms,
          results: adjustedResults,
          summary
        }
        
        set(state => ({
          diagnosisResult: adjustedResults,
          diagnosisSummary: summary,
          history: [historyEntry, ...state.history].slice(0, 50), // Keep last 50 entries
          isProcessing: false
        }))
        
        return summary
      },

      // Reset diagnosis for new consultation
      resetDiagnosis: () => set({
        currentStep: 0,
        userData: {
          name: '',
          age: '',
          gender: '',
          smokingYears: '',
          cigarettesPerDay: ''
        },
        selectedSymptoms: [],
        diagnosisResult: null,
        diagnosisSummary: null
      }),

      // History management
      getHistory: () => get().history,
      
      getHistoryById: (id) => get().history.find(h => h.id === id),
      
      clearHistory: () => set({ history: [] }),
      
      deleteHistoryEntry: (id) => set(state => ({
        history: state.history.filter(h => h.id !== id)
      })),

      // Get statistics
      getStatistics: () => {
        const history = get().history
        
        if (history.length === 0) {
          return {
            totalDiagnoses: 0,
            averageAge: 0,
            mostCommonDisease: null,
            diseaseDistribution: {}
          }
        }
        
        const totalDiagnoses = history.length
        const averageAge = history.reduce((sum, h) => 
          sum + (parseInt(h.userData.age) || 0), 0
        ) / totalDiagnoses
        
        const diseaseCount = {}
        history.forEach(h => {
          const primaryDisease = h.results[0]?.disease?.name
          if (primaryDisease) {
            diseaseCount[primaryDisease] = (diseaseCount[primaryDisease] || 0) + 1
          }
        })
        
        const mostCommonDisease = Object.entries(diseaseCount)
          .sort((a, b) => b[1] - a[1])[0]
        
        return {
          totalDiagnoses,
          averageAge: averageAge.toFixed(1),
          mostCommonDisease: mostCommonDisease ? {
            name: mostCommonDisease[0],
            count: mostCommonDisease[1]
          } : null,
          diseaseDistribution: diseaseCount
        }
      }
    }),
    {
      name: 'si-dirok-diagnosis',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        history: state.history 
      }),
    }
  )
)

export default useDiagnosisStore
