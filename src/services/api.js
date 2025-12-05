/**
 * API Service
 * Handles all API calls (mock implementation)
 * In production, replace with actual API endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Simulated delay for mock API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    await delay(1000)
    // Mock implementation - in production, call actual API
    return { success: true, token: 'mock-token' }
  },

  register: async (userData) => {
    await delay(1000)
    return { success: true, message: 'Registration successful' }
  },

  logout: async () => {
    await delay(500)
    return { success: true }
  },

  forgotPassword: async (email) => {
    await delay(1000)
    return { success: true, message: 'Reset link sent' }
  }
}

// Diagnosis API
export const diagnosisAPI = {
  submit: async (data) => {
    await delay(1500)
    return { success: true, resultId: Date.now() }
  },

  getHistory: async (userId) => {
    await delay(500)
    return { success: true, data: [] }
  },

  getResult: async (resultId) => {
    await delay(500)
    return { success: true, data: null }
  }
}

// Admin API
export const adminAPI = {
  // Symptoms
  getSymptoms: async () => {
    await delay(500)
    return { success: true, data: [] }
  },

  createSymptom: async (data) => {
    await delay(500)
    return { success: true, data }
  },

  updateSymptom: async (id, data) => {
    await delay(500)
    return { success: true, data }
  },

  deleteSymptom: async (id) => {
    await delay(500)
    return { success: true }
  },

  // Diseases
  getDiseases: async () => {
    await delay(500)
    return { success: true, data: [] }
  },

  createDisease: async (data) => {
    await delay(500)
    return { success: true, data }
  },

  updateDisease: async (id, data) => {
    await delay(500)
    return { success: true, data }
  },

  deleteDisease: async (id) => {
    await delay(500)
    return { success: true }
  },

  // Education
  getEducation: async () => {
    await delay(500)
    return { success: true, data: [] }
  },

  createEducation: async (data) => {
    await delay(500)
    return { success: true, data }
  },

  updateEducation: async (id, data) => {
    await delay(500)
    return { success: true, data }
  },

  deleteEducation: async (id) => {
    await delay(500)
    return { success: true }
  },

  // Rules
  getRules: async () => {
    await delay(500)
    return { success: true, data: [] }
  },

  createRule: async (data) => {
    await delay(500)
    return { success: true, data }
  },

  updateRule: async (id, data) => {
    await delay(500)
    return { success: true, data }
  },

  deleteRule: async (id) => {
    await delay(500)
    return { success: true }
  },

  // Reports
  getReports: async (filters) => {
    await delay(500)
    return { success: true, data: [] }
  },

  // Users
  getUsers: async () => {
    await delay(500)
    return { success: true, data: [] }
  },

  updateUserRole: async (userId, role) => {
    await delay(500)
    return { success: true }
  },

  deleteUser: async (userId) => {
    await delay(500)
    return { success: true }
  }
}

export default {
  authAPI,
  diagnosisAPI,
  adminAPI
}
