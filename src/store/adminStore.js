/**
 * Admin Store - Zustand
 * Manages admin data for symptoms, diseases, education, and rules
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { symptoms as initialSymptoms } from '../data/symptoms'
import { diseases as initialDiseases } from '../data/diseases'
import { rules as initialRules } from '../data/rules'
import { educationContent as initialEducation } from '../data/education'

const useAdminStore = create(
  persist(
    (set, get) => ({
      // State
      symptoms: initialSymptoms,
      diseases: initialDiseases,
      rules: initialRules,
      education: initialEducation,
      reports: [],
      isLoading: false,

      // === SYMPTOMS CRUD ===
      addSymptom: async (symptom) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newSymptom = {
          ...symptom,
          id: `G${String(get().symptoms.length + 1).padStart(2, '0')}`,
          code: `G${String(get().symptoms.length + 1).padStart(2, '0')}`
        }
        
        set(state => ({
          symptoms: [...state.symptoms, newSymptom],
          isLoading: false
        }))
        
        return { success: true, data: newSymptom }
      },

      updateSymptom: async (id, updates) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          symptoms: state.symptoms.map(s => 
            s.id === id ? { ...s, ...updates } : s
          ),
          isLoading: false
        }))
        
        return { success: true }
      },

      deleteSymptom: async (id) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          symptoms: state.symptoms.filter(s => s.id !== id),
          // Also remove related rules
          rules: state.rules.filter(r => r.symptomId !== id),
          isLoading: false
        }))
        
        return { success: true }
      },

      getSymptomById: (id) => get().symptoms.find(s => s.id === id),

      // === DISEASES CRUD ===
      addDisease: async (disease) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newDisease = {
          ...disease,
          id: `P${get().diseases.length + 1}`,
          code: `P${get().diseases.length + 1}`
        }
        
        set(state => ({
          diseases: [...state.diseases, newDisease],
          isLoading: false
        }))
        
        return { success: true, data: newDisease }
      },

      updateDisease: async (id, updates) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          diseases: state.diseases.map(d => 
            d.id === id ? { ...d, ...updates } : d
          ),
          isLoading: false
        }))
        
        return { success: true }
      },

      deleteDisease: async (id) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          diseases: state.diseases.filter(d => d.id !== id),
          // Also remove related rules
          rules: state.rules.filter(r => r.diseaseId !== id),
          isLoading: false
        }))
        
        return { success: true }
      },

      getDiseaseById: (id) => get().diseases.find(d => d.id === id),

      // === RULES CRUD ===
      addRule: async (rule) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newRule = {
          ...rule,
          id: `R${String(get().rules.length + 1).padStart(2, '0')}`
        }
        
        set(state => ({
          rules: [...state.rules, newRule],
          isLoading: false
        }))
        
        return { success: true, data: newRule }
      },

      updateRule: async (id, updates) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          rules: state.rules.map(r => 
            r.id === id ? { ...r, ...updates } : r
          ),
          isLoading: false
        }))
        
        return { success: true }
      },

      deleteRule: async (id) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          rules: state.rules.filter(r => r.id !== id),
          isLoading: false
        }))
        
        return { success: true }
      },

      getRuleById: (id) => get().rules.find(r => r.id === id),
      
      getRulesByDisease: (diseaseId) => get().rules.filter(r => r.diseaseId === diseaseId),
      
      getRulesBySymptom: (symptomId) => get().rules.filter(r => r.symptomId === symptomId),

      // === EDUCATION CRUD ===
      addEducation: async (content) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newContent = {
          ...content,
          id: `E${String(get().education.length + 1).padStart(2, '0')}`,
          publishedAt: new Date().toISOString().split('T')[0],
          views: 0
        }
        
        set(state => ({
          education: [...state.education, newContent],
          isLoading: false
        }))
        
        return { success: true, data: newContent }
      },

      updateEducation: async (id, updates) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          education: state.education.map(e => 
            e.id === id ? { ...e, ...updates } : e
          ),
          isLoading: false
        }))
        
        return { success: true }
      },

      deleteEducation: async (id) => {
        set({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          education: state.education.filter(e => e.id !== id),
          isLoading: false
        }))
        
        return { success: true }
      },

      getEducationById: (id) => get().education.find(e => e.id === id),
      
      getEducationBySlug: (slug) => get().education.find(e => e.slug === slug),

      incrementEducationViews: (id) => {
        set(state => ({
          education: state.education.map(e => 
            e.id === id ? { ...e, views: (e.views || 0) + 1 } : e
          )
        }))
      },

      // === REPORTS ===
      addReport: (report) => {
        const newReport = {
          ...report,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
        
        set(state => ({
          reports: [newReport, ...state.reports]
        }))
        
        return newReport
      },

      getReports: (filters = {}) => {
        let reports = get().reports
        
        if (filters.startDate) {
          reports = reports.filter(r => 
            new Date(r.createdAt) >= new Date(filters.startDate)
          )
        }
        
        if (filters.endDate) {
          reports = reports.filter(r => 
            new Date(r.createdAt) <= new Date(filters.endDate)
          )
        }
        
        if (filters.diseaseId) {
          reports = reports.filter(r => 
            r.primaryDiseaseId === filters.diseaseId
          )
        }
        
        return reports
      },

      // === STATISTICS ===
      getAdminStats: () => {
        const state = get()
        return {
          totalSymptoms: state.symptoms.length,
          totalDiseases: state.diseases.length,
          totalRules: state.rules.length,
          totalEducation: state.education.length,
          totalReports: state.reports.length,
          articleCount: state.education.filter(e => e.type === 'article').length,
          videoCount: state.education.filter(e => e.type === 'video').length,
          tipsCount: state.education.filter(e => e.type === 'tips').length
        }
      },

      // === RESET ===
      resetToDefaults: () => {
        set({
          symptoms: initialSymptoms,
          diseases: initialDiseases,
          rules: initialRules,
          education: initialEducation,
          reports: []
        })
      }
    }),
    {
      name: 'si-dirok-admin',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        symptoms: state.symptoms,
        diseases: state.diseases,
        rules: state.rules,
        education: state.education,
        reports: state.reports
      }),
    }
  )
)

export default useAdminStore
