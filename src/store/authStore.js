/**
 * Auth Store - Zustand
 * Manages authentication state for SI-DIROK
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'admin@sidirok.com',
    password: 'admin123',
    username: 'Admin SI-DIROK',
    role: 'admin',
    age: 35,
    gender: 'male',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'user@test.com',
    password: 'user123',
    username: 'Test User',
    role: 'user',
    age: 30,
    gender: 'male',
    createdAt: '2024-02-15'
  }
]

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      users: mockUsers, // For demo, in real app this would be in backend

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const users = get().users
        const user = users.find(
          u => u.email === email && u.password === password
        )
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            isLoading: false,
            error: null
          })
          return { success: true, user: userWithoutPassword }
        } else {
          set({ 
            isLoading: false, 
            error: 'Email atau password salah' 
          })
          return { success: false, error: 'Email atau password salah' }
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const users = get().users
        
        // Check if email already exists
        if (users.some(u => u.email === userData.email)) {
          set({ 
            isLoading: false, 
            error: 'Email sudah terdaftar' 
          })
          return { success: false, error: 'Email sudah terdaftar' }
        }
        
        // Create new user
        const newUser = {
          id: String(users.length + 1),
          ...userData,
          role: 'user',
          createdAt: new Date().toISOString()
        }
        
        set(state => ({
          users: [...state.users, newUser],
          isLoading: false,
          error: null
        }))
        
        return { success: true, message: 'Registrasi berhasil!' }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        })
      },

      updateProfile: async (updates) => {
        set({ isLoading: true })
        
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const currentUser = get().user
        if (!currentUser) {
          set({ isLoading: false, error: 'User not found' })
          return { success: false }
        }
        
        const updatedUser = { ...currentUser, ...updates }
        
        set(state => ({
          user: updatedUser,
          users: state.users.map(u => 
            u.id === currentUser.id ? { ...u, ...updates } : u
          ),
          isLoading: false
        }))
        
        return { success: true }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const users = get().users
        const userExists = users.some(u => u.email === email)
        
        set({ isLoading: false })
        
        if (userExists) {
          return { 
            success: true, 
            message: 'Link reset password telah dikirim ke email Anda' 
          }
        } else {
          return { 
            success: false, 
            error: 'Email tidak ditemukan' 
          }
        }
      },

      clearError: () => set({ error: null }),

      // Admin functions
      getAllUsers: () => {
        const users = get().users
        return users.map(({ password, ...user }) => user)
      },

      deleteUser: async (userId) => {
        set({ isLoading: true })
        
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          users: state.users.filter(u => u.id !== userId),
          isLoading: false
        }))
        
        return { success: true }
      },

      updateUserRole: async (userId, newRole) => {
        set({ isLoading: true })
        
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set(state => ({
          users: state.users.map(u => 
            u.id === userId ? { ...u, role: newRole } : u
          ),
          isLoading: false
        }))
        
        return { success: true }
      }
    }),
    {
      name: 'si-dirok-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        users: state.users 
      }),
    }
  )
)

export default useAuthStore
